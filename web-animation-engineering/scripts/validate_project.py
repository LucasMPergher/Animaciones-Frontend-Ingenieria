#!/usr/bin/env python3
"""Validate Agent Skills, local documentation links, and example integrity."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

import yaml


ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = ROOT / "skills"
EXAMPLES_DIR = ROOT / "examples"
MARKDOWN_LINK = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
SKILL_NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
IMPORT_FROM = re.compile(r"\bfrom\s+['\"]([^'\"]+)['\"]")
SCRIPT_SOURCE = re.compile(r"<script\b[^>]*\bsrc=['\"]([^'\"]+)['\"][^>]*>", re.IGNORECASE)
ALLOWED_JS_IMPORTS = {"react", "motion/react", "gsap", "@gsap/react"}


def read_frontmatter(skill_file: Path) -> tuple[dict, str]:
    content = skill_file.read_text(encoding="utf-8")
    match = re.match(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)", content, re.DOTALL)
    if not match:
        raise ValueError("falta frontmatter YAML delimitado por ---")
    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError as exc:
        raise ValueError("frontmatter YAML inválido: " + str(exc)) from exc
    if not isinstance(frontmatter, dict):
        raise ValueError("el frontmatter debe ser un mapa YAML")
    return frontmatter, content[match.end():]


def check_skill(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    skill_file = skill_dir / "SKILL.md"
    if not skill_file.is_file():
        return [f"{skill_dir.relative_to(ROOT)}: falta SKILL.md"]
    try:
        data, body = read_frontmatter(skill_file)
    except ValueError as exc:
        return [f"{skill_file.relative_to(ROOT)}: {exc}"]

    name = data.get("name")
    description = data.get("description")
    if not isinstance(name, str) or not name.strip():
        errors.append(f"{skill_file.relative_to(ROOT)}: name debe ser texto no vacío")
    else:
        if not SKILL_NAME.fullmatch(name):
            errors.append(f"{skill_file.relative_to(ROOT)}: name no cumple kebab-case")
        if len(name) > 64:
            errors.append(f"{skill_file.relative_to(ROOT)}: name supera 64 caracteres")
        if name != skill_dir.name:
            errors.append(f"{skill_file.relative_to(ROOT)}: name no coincide con la carpeta")
    if not isinstance(description, str) or not description.strip():
        errors.append(f"{skill_file.relative_to(ROOT)}: description debe ser texto no vacío")
    elif len(description) > 1024:
        errors.append(f"{skill_file.relative_to(ROOT)}: description supera 1024 caracteres")
    if not body.strip():
        errors.append(f"{skill_file.relative_to(ROOT)}: faltan instrucciones")
    if "[TODO:" in body:
        errors.append(f"{skill_file.relative_to(ROOT)}: quedan marcadores TODO")
    return errors


def check_markdown_links(markdown_file: Path) -> list[str]:
    errors: list[str] = []
    for match in MARKDOWN_LINK.finditer(markdown_file.read_text(encoding="utf-8")):
        target = match.group(1).strip().split()[0].strip("<>")
        parts = urlsplit(target)
        if parts.scheme or target.startswith("//") or not parts.path:
            continue
        local_path = unquote(parts.path)
        candidate = (markdown_file.parent / local_path).resolve()
        try:
            candidate.relative_to(ROOT.resolve())
        except ValueError:
            errors.append(f"{markdown_file.relative_to(ROOT)}: enlace sale del paquete: {target}")
            continue
        if not candidate.exists():
            errors.append(f"{markdown_file.relative_to(ROOT)}: enlace local roto: {target}")
    return errors


class ExampleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tags: set[str] = set()
        self.html_language = ""
        self.title_text = ""
        self.inside_title = False
        self.inside_inline_script = False
        self.current_script: list[str] = []
        self.inline_scripts: list[str] = []
        self.local_urls: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.add(tag.lower())
        attributes = dict(attrs)
        for attribute in ("href", "src"):
            value = attributes.get(attribute)
            if value:
                self.local_urls.append(value)
        if tag.lower() == "html":
            self.html_language = attributes.get("lang") or ""
        if tag.lower() == "title":
            self.inside_title = True
        if tag.lower() == "script":
            self.inside_inline_script = not bool(attributes.get("src"))
            self.current_script = []

    def handle_data(self, data: str) -> None:
        if self.inside_title:
            self.title_text += data
        if self.inside_inline_script:
            self.current_script.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self.inside_title = False
        if tag.lower() == "script":
            if self.inside_inline_script:
                self.inline_scripts.append("".join(self.current_script))
            self.inside_inline_script = False
            self.current_script = []


def check_html(example_file: Path, node_path: str | None) -> list[str]:
    errors: list[str] = []
    relative = example_file.relative_to(ROOT)
    parser = ExampleParser()
    source = example_file.read_text(encoding="utf-8")
    try:
        parser.feed(source)
        parser.close()
    except Exception as exc:  # HTMLParser can reject malformed character references.
        errors.append(f"{relative}: HTML no se pudo analizar: {exc}")
        return errors

    for tag in ("html", "head", "body", "title"):
        if tag not in parser.tags:
            errors.append(f"{relative}: falta <{tag}>")
    if not parser.html_language:
        errors.append(f"{relative}: falta lang en <html>")
    if not parser.title_text.strip():
        errors.append(f"{relative}: <title> está vacío")

    for url in parser.local_urls:
        parts = urlsplit(url)
        if parts.scheme or url.startswith("//") or not parts.path:
            continue
        candidate = (example_file.parent / unquote(parts.path)).resolve()
        try:
            candidate.relative_to(ROOT.resolve())
        except ValueError:
            errors.append(f"{relative}: enlace local sale del paquete: {url}")
            continue
        if not candidate.exists():
            errors.append(f"{relative}: enlace local roto: {url}")

    if node_path:
        for index, script in enumerate(parser.inline_scripts, start=1):
            if not script.strip():
                continue
            with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8") as temp:
                temp.write(script)
                temp.flush()
                result = subprocess.run(
                    [node_path, "--check", temp.name],
                    capture_output=True,
                    text=True,
                    check=False,
                )
            if result.returncode:
                detail = result.stderr.strip().splitlines()
                message = detail[-1] if detail else "error de sintaxis"
                errors.append(f"{relative}: script inline {index}: {message}")
    return errors


def check_dependencies(
    root: Path, jsx_examples: list[Path], html_examples: list[Path]
) -> tuple[list[str], int, int, int]:
    errors: list[str] = []
    runtime_imports = 0
    external_scripts = 0
    package_manifests = 0

    requirements_file = root / "requirements-dev.txt"
    if not requirements_file.is_file():
        errors.append("requirements-dev.txt: falta inventario de dependencias de validación")
    else:
        requirements = [
            line.strip()
            for line in requirements_file.read_text(encoding="utf-8").splitlines()
            if line.strip() and not line.lstrip().startswith("#")
        ]
        if len(requirements) != 1 or not re.fullmatch(r"PyYAML[<>=!~].*", requirements[0], re.IGNORECASE):
            errors.append("requirements-dev.txt: la validación debe declarar solo PyYAML como dependencia de desarrollo")

    for manifest in root.rglob("package.json"):
        package_manifests += 1
        try:
            json.loads(manifest.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError) as exc:
            errors.append(f"{manifest.relative_to(root)}: package.json inválido: {exc}")

    for example_file in jsx_examples:
        source = example_file.read_text(encoding="utf-8")
        for module in IMPORT_FROM.findall(source):
            runtime_imports += 1
            if module not in ALLOWED_JS_IMPORTS:
                errors.append(
                    f"{example_file.relative_to(root)}: dependencia no documentada: {module}"
                )

    for example_file in html_examples:
        source = example_file.read_text(encoding="utf-8")
        for script_url in SCRIPT_SOURCE.findall(source):
            parts = urlsplit(script_url)
            if parts.scheme:
                external_scripts += 1
                package_path = re.match(r"^/npm/(gsap|lottie-web)@[^/]+/", parts.path)
                if (
                    parts.scheme != "https"
                    or parts.hostname != "cdn.jsdelivr.net"
                    or not package_path
                ):
                    errors.append(
                        f"{example_file.relative_to(root)}: script externo no permitido/documentado: {script_url}"
                    )
            else:
                local_script = (example_file.parent / unquote(parts.path)).resolve()
                if not local_script.is_file():
                    errors.append(
                        f"{example_file.relative_to(root)}: script local no encontrado: {script_url}"
                    )

    return errors, runtime_imports, external_scripts, package_manifests


def validate_project(root: Path = ROOT) -> tuple[list[str], dict[str, int]]:
    global ROOT, SKILLS_DIR, EXAMPLES_DIR
    ROOT = root.resolve()
    SKILLS_DIR = ROOT / "skills"
    EXAMPLES_DIR = ROOT / "examples"
    errors: list[str] = []

    skill_dirs = sorted(path for path in SKILLS_DIR.iterdir() if path.is_dir()) if SKILLS_DIR.is_dir() else []
    if not skill_dirs:
        errors.append("skills/: no se encontraron skills")
    for skill_dir in skill_dirs:
        errors.extend(check_skill(skill_dir))

    markdown_files = sorted(ROOT.rglob("*.md"))
    for markdown_file in markdown_files:
        errors.extend(check_markdown_links(markdown_file))

    node_path = shutil.which("node")
    html_examples = sorted(EXAMPLES_DIR.rglob("*.html")) if EXAMPLES_DIR.is_dir() else []
    jsx_examples = sorted(EXAMPLES_DIR.rglob("*.jsx")) if EXAMPLES_DIR.is_dir() else []
    if len(html_examples) + len(jsx_examples) < 12:
        errors.append("examples/: se requieren al menos 12 ejemplos HTML/JSX")

    index_file = EXAMPLES_DIR / "README.md"
    if not index_file.is_file():
        errors.append("examples/README.md: falta índice de ejemplos")
    else:
        index_content = index_file.read_text(encoding="utf-8")
        indexed = set()
        for target in MARKDOWN_LINK.findall(index_content):
            path = urlsplit(target.strip().split()[0].strip("<>")).path
            if path.endswith((".html", ".jsx")):
                indexed.add(path)
        for example_file in html_examples + jsx_examples:
            relative = example_file.relative_to(EXAMPLES_DIR).as_posix()
            if relative not in indexed:
                errors.append(f"examples/README.md: ejemplo no indexado: {relative}")

    for example_file in html_examples:
        errors.extend(check_html(example_file, node_path))

    dependency_errors, runtime_imports, external_scripts, package_manifests = check_dependencies(
        ROOT, jsx_examples, html_examples
    )
    errors.extend(dependency_errors)

    json_assets = sorted(EXAMPLES_DIR.rglob("*.json")) if EXAMPLES_DIR.is_dir() else []
    for asset in json_assets:
        try:
            json.loads(asset.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError) as exc:
            errors.append(f"{asset.relative_to(ROOT)}: JSON inválido: {exc}")

    summary = {
        "skills": len(skill_dirs),
        "markdown": len(markdown_files),
        "html_examples": len(html_examples),
        "jsx_examples": len(jsx_examples),
        "json_assets": len(json_assets),
        "runtime_imports": runtime_imports,
        "external_scripts": external_scripts,
        "package_manifests": package_manifests,
        "inline_scripts_checked": int(bool(node_path)),
    }
    return errors, summary


def main() -> int:
    errors, summary = validate_project()
    print(
        "Skills: {skills} | Markdown: {markdown} | HTML: {html_examples} | JSX: {jsx_examples} | JSON: {json_assets} | Imports: {runtime_imports} | CDN scripts: {external_scripts}".format(
            **summary
        )
    )
    if not summary["inline_scripts_checked"]:
        print("Aviso: Node.js no está disponible; se omitió la comprobación sintáctica de scripts inline.")
    if errors:
        for error in errors:
            print("ERROR: " + error)
        print("Validación fallida: {0} problema(s).".format(len(errors)))
        return 1
    print("Validación correcta.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

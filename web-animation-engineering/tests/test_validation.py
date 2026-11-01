import sys
import tempfile
import unittest
from pathlib import Path

PACKAGE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PACKAGE_ROOT / "scripts"))
import validate_project


class ProjectValidationTests(unittest.TestCase):
    def test_complete_package_passes_static_validation(self):
        errors, summary = validate_project.validate_project(PACKAGE_ROOT)
        self.assertEqual(errors, [])
        self.assertEqual(summary["skills"], 7)
        self.assertGreaterEqual(summary["html_examples"] + summary["jsx_examples"], 12)

    def test_skill_frontmatter_rejects_invalid_yaml(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            skill_file = Path(temp_dir) / "SKILL.md"
            skill_file.write_text("---\nname: [broken\n---\nBody\n", encoding="utf-8")
            with self.assertRaises(ValueError):
                validate_project.read_frontmatter(skill_file)

    def test_examples_cover_requested_technology_groups(self):
        expected = [
            "css/hero-reveal/index.html",
            "css/stagger-list/index.html",
            "css/scroll-reveal/index.html",
            "css/view-transition/index.html",
            "css/image-transition/index.html",
            "css/fixed-background/index.html",
            "gsap/parallax/index.html",
            "gsap/pinned-horizontal/index.html",
            "gsap/animated-navigation/index.html",
            "gsap/text-reveal/index.html",
            "gsap-react/usegsap-component.jsx",
            "motion/stagger-list.jsx",
            "motion/interactive-button.jsx",
            "motion/card-layout.jsx",
            "motion/scroll-reveal.jsx",
            "motion/page-transition.jsx",
            "svg/path-draw/index.html",
            "canvas/particle-field/index.html",
            "lottie/pulse/index.html",
        ]
        for example in expected:
            with self.subTest(example=example):
                self.assertTrue((PACKAGE_ROOT / "examples" / example).is_file())

    def test_react_examples_use_reduced_motion_handling(self):
        paths = [
            PACKAGE_ROOT / "examples/gsap-react/usegsap-component.jsx",
            *sorted((PACKAGE_ROOT / "examples/motion").glob("*.jsx")),
        ]
        for path in paths:
            with self.subTest(path=path.name):
                source = path.read_text(encoding="utf-8")
                self.assertTrue(
                    "prefers-reduced-motion" in source or "useReducedMotion" in source
                )

    def test_core_routes_without_forcing_gsap(self):
        core = (PACKAGE_ROOT / "skills/animation-core/SKILL.md").read_text(encoding="utf-8")
        matrix = (PACKAGE_ROOT / "skills/animation-core/references/technology-selection.md").read_text(encoding="utf-8")
        self.assertIn("Never default to GSAP", core)
        self.assertIn("First choice", matrix)
        self.assertIn("CSS", matrix)
        self.assertIn("Motion", matrix)

    def test_dependency_inventory_is_small_and_explicit(self):
        errors, summary = validate_project.validate_project(PACKAGE_ROOT)
        self.assertEqual(errors, [])
        self.assertEqual(summary["runtime_imports"], 12)
        self.assertEqual(summary["external_scripts"], 7)
        self.assertEqual(summary["package_manifests"], 0)

    def test_dependency_check_rejects_unapproved_script_host(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "requirements-dev.txt").write_text("PyYAML>=6.0,<7\n", encoding="utf-8")
            page = root / "demo.html"
            page.write_text(
                '<script src="https://paid-animation.example/player.js"></script>',
                encoding="utf-8",
            )
            errors, _, _, _ = validate_project.check_dependencies(root, [], [page])
            self.assertTrue(any("script externo no permitido" in error for error in errors))


if __name__ == "__main__":
    unittest.main()

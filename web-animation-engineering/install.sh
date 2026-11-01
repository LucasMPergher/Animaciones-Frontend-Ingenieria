#!/usr/bin/env bash
set -euo pipefail

package_root="$(cd "$(dirname "$0")" && pwd)"
skills_source="$package_root/skills"
install_target="$HOME/.agents/skills"
if [[ $# -ge 1 ]]; then
  install_target="$1"
fi

if [[ ! -d "$skills_source" ]]; then
  echo "No se encontró el directorio skills/ del paquete." >&2
  exit 1
fi

mkdir -p "$install_target"
for skill_dir in "$skills_source"/*; do
  [[ -d "$skill_dir" ]] || continue
  skill_name="$(basename "$skill_dir")"
  destination="$install_target/$skill_name"
  if [[ -e "$destination" ]]; then
    echo "Ya existe $destination; no se sobrescribió." >&2
    exit 1
  fi
done

for skill_dir in "$skills_source"/*; do
  [[ -d "$skill_dir" ]] || continue
  cp -R "$skill_dir" "$install_target/"
  echo "Instalada: $(basename "$skill_dir")"
done

echo "Skills copiadas a: $install_target"

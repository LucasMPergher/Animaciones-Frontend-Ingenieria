# Guía para agentes

Este repositorio distribuye Agent Skills para implementar animación web en proyectos existentes.

## Límites de trabajo

- Mantén cada skill portable: sus referencias deben residir dentro de su propia carpeta.
- Conserva la selección tecnológica en **skills/animation-core/references/technology-selection.md** y los criterios transversales en **skills/animation-quality/**.
- No conviertas GSAP, React ni Motion en requisitos por defecto.
- No añadas dependencias de runtime a los ejemplos sin una razón concreta.
- Actualiza **CHANGELOG.md** cuando cambien el enrutamiento, una API recomendada o la instalación.
- Ejecuta **python scripts/validate_project.py** y **python -m unittest discover -s tests -v** tras modificar las skills o los ejemplos.

## Estructura

- **skills/**: skills instalables; cada una tiene su propio **SKILL.md**.
- **examples/**: demos agrupadas por tecnología, con instrucciones y notas de uso.
- **docs/**: arquitectura, instalación y validación del paquete.
- **scripts/** y **tests/**: validación determinista con Python.

Para APIs que puedan cambiar, comprueba la documentación oficial enlazada en las referencias de cada skill. No reproduzcas snippets antiguos solo porque aparezcan en un ejemplo existente.

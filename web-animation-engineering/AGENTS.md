# Guía para agentes

Este repositorio distribuye Agent Skills para implementar animación web en proyectos existentes.

## Límites de trabajo

- Mantén cada skill portable: sus referencias deben residir dentro de su propia carpeta.
- Conserva la selección tecnológica en **skills/animation-core/references/technology-selection.md** y los criterios transversales en **skills/animation-quality/**.
- No conviertas GSAP, React ni Motion en requisitos por defecto.
- No añadas dependencias de runtime a los ejemplos sin una razón concreta.
- Actualiza **CHANGELOG.md** cuando cambien el enrutamiento, una API recomendada o la instalación.
- Ejecuta **python scripts/validate_project.py** y **python -m unittest discover -s tests -v** tras modificar las skills o los ejemplos.

## Patrones que cubre este paquete

Los ejemplos y las skills pueden guiar implementaciones de:

- Fondos fijos con contenido en primer plano, parallax, secciones horizontales fijadas e historias de varios capítulos ligadas al scroll.
- Morphs y máscaras SVG, dibujo de paths, Canvas y animaciones Lottie.
- Transiciones de elemento compartido, cambios de layout, gestos de arrastre con inercia y ajuste a puntos.
- Presentaciones de producto en 3D con Three.js/WebGL, geometría procedural, materiales, iluminación y cámara ligada al scroll.

Estas demos muestran patrones de partida; antes de implementar, adapta tecnología, dependencias, accesibilidad y comportamiento responsive al proyecto anfitrión.

## Enrutamiento para agentes

- Empieza con **animation-core** para inspeccionar el proyecto y elegir la estrategia.
- Usa **animation-gsap** para timelines, ScrollTrigger y morphs SVG; **animation-motion** para gestos, layout y presencia en React.
- Usa **animation-visual-assets** para SVG, Canvas, WebGL/Three.js o Lottie, y **animation-quality** para revisar accesibilidad, movimiento reducido, rendimiento y limpieza.
- Consulta **examples/README.md** y **GUIA_DE_ANIMACIONES.md** para encontrar una demo de referencia y describir el patrón.

## Estructura

- **skills/**: skills instalables; cada una tiene su propio **SKILL.md**.
- **examples/**: demos agrupadas por tecnología, con instrucciones y notas de uso.
- **docs/**: arquitectura, instalación y validación del paquete.
- **scripts/** y **tests/**: validación determinista con Python.

Para APIs que puedan cambiar, comprueba la documentación oficial enlazada en las referencias de cada skill. No reproduzcas snippets antiguos solo porque aparezcan en un ejemplo existente.

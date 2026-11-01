# Web Animation Engineering

Sistema modular de Agent Skills para diseñar e implementar animaciones web mantenibles, accesibles y adecuadas a cada proyecto. Funciona en repositorios React, Next.js, Vite, Astro y sitios sin framework. CSS es la primera opción para efectos sencillos; Motion y GSAP se eligen cuando sus capacidades resuelven una necesidad real.

¿Buscás ideas para empezar? Lee [qué animaciones podés pedirme](GUIA_DE_ANIMACIONES.md), con patrones, demos y prompts listos para adaptar.

## El laboratorio visual: `animation-lab`

`animation-lab` es la app compañera para abrir y probar las animaciones del catálogo. Funciona como una galería interactiva: elegís una tarjeta, ves la demo en la misma página y podés volver a ejecutarla cuando quieras. No genera animaciones automáticamente; sirve para entender cómo se ve cada patrón, qué lo activa y qué tecnologías usa antes de pedirlo o adaptarlo a un proyecto.

Incluye 23 demos: 15 páginas HTML y 8 componentes React. Podés filtrarlas por CSS y APIs del navegador, GSAP, Motion, React + GSAP y Lottie. Según la demo, la animación comienza al abrirla, al desplazarte o al interactuar con un botón o control. El catálogo cubre, entre otros, revelados de texto, navegación animada, historias por scroll, paneles horizontales fijados, fondos fijos, carruseles con arrastre e inercia, transiciones de elemento compartido, morphs SVG, Canvas y microinteracciones.

El laboratorio ayuda a:

- Explorar visualmente los ejemplos de [`examples/`](examples/README.md) sin tener que abrir cada archivo a mano.
- Comparar enfoques y elegir un punto de partida para una animación.
- Comprobar el disparador y el comportamiento interactivo de cada demo.
- Usar los ejemplos como referencia al pedir una implementación con estas skills.

En el workspace completo, `animation-lab/` está junto a este directorio y toma de aquí los ejemplos. Para ejecutarlo, desde la carpeta `animation-lab/` corré `npm ci` y `npm run dev`. Si clonaste únicamente este repositorio, tené en cuenta que la app es una carpeta compañera y no está incluida aquí; el catálogo de ejemplos sí está disponible en [`examples/`](examples/README.md).

## Inicio rápido

1. Lee [la guía de instalación](docs/installation.md).
2. Instala el directorio **skills/** en las skills del proyecto o de tu usuario.
3. Pide la animación en lenguaje natural. **animation-core** evalúa el contexto del repositorio y deriva a las skills pertinentes.
4. Consulta [los ejemplos](examples/README.md) para adaptar una implementación funcional.
5. Valida cambios a este paquete con **python -m pip install -r requirements-dev.txt**, **python scripts/validate_project.py** y **python -m unittest discover -s tests -v**.

## Skills incluidas

| Skill | Uso |
| --- | --- |
| **animation-core** | Orquestar la solicitud, inspeccionar el proyecto, elegir estrategia y planear la implementación. |
| **animation-gsap** | GSAP independiente del framework: tweens, timelines, ScrollTrigger, SVG, texto y responsive. |
| **animation-gsap-react** | Ciclo de vida de GSAP en React y componentes derivados. |
| **animation-motion** | Animaciones declarativas de React con Motion: variants, gestos, layout, scroll y presencia. |
| **animation-css** | Transitions, keyframes, scroll-driven animations y View Transitions con mejoras progresivas. |
| **animation-visual-assets** | Elegir y conectar SVG, Canvas o Lottie sin sobrecargar la página. |
| **animation-quality** | Revisar accesibilidad, reduced motion, rendimiento, SSR, limpieza y compatibilidad. |

## Criterios del sistema

- No instala ni añade librerías hasta comprobar el gestor, las dependencias y la arquitectura existentes.
- No presupone React. Mantiene las animaciones en el framework que ya use la aplicación.
- Respeta **prefers-reduced-motion**, contenido semántico y la preferencia del usuario.
- Prefiere **transform** y **opacity** para movimiento frecuente; evita mediciones y escrituras de layout en bucles.
- Aísla y limpia animaciones, triggers, observadores y listeners según el ciclo de vida de la plataforma.
- Mantiene una sola fuente de verdad para cada propiedad animada y evita que dos librerías controlen el mismo elemento.
- Trata scroll-driven CSS, View Transitions y APIs de navegador como mejoras progresivas cuando haya diferencias de compatibilidad.
- Los ejemplos que usan CDN requieren red para cargar la librería; se pueden adaptar a dependencias locales.

## Validación

Consulta [docs/testing.md](docs/testing.md) para los controles, cobertura y limitaciones. El validador comprueba frontmatter YAML, referencias locales, dependencias, inventario de ejemplos, estructura HTML y sintaxis JavaScript inline. Las pruebas usan **unittest**.

## Fuentes técnicas

Las skills mantienen enlaces a documentación primaria y no copian manuales completos:

- [Especificación de Agent Skills](https://agentskills.io/specification)
- [Skills locales en Codex](https://developers.openai.com/codex/skills/)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [@gsap/react](https://github.com/greensock/react)
- [Motion para React](https://motion.dev/docs/react)
- [Animaciones CSS en MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations)
- [Scroll-driven animations en MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [View Transition API en MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [lottie-web](https://github.com/airbnb/lottie-web)

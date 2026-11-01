# Ejemplos funcionales

Las páginas HTML se ejecutan en un servidor estático. Desde esta carpeta ejecuta **python -m http.server 8000** y abre **http://localhost:8000/** para ver el [catálogo de demos](index.html). GSAP y Lottie se cargan desde jsDelivr en esas demos, así que requieren conexión.

Los componentes JSX necesitan una app React anfitriona. Crea esa app en un directorio separado, fuera de este paquete, y copia el componente a **src/App.jsx**. Si el ejemplo tiene un archivo CSS junto al JSX, cópialo también a **src/** y conserva o ajusta su import. Así el proyecto de skills conserva su estructura y sus validaciones:

~~~sh
# Ejecuta esto desde una carpeta donde guardes proyectos de prueba,
# no desde web-animation-engineering/
npm create vite@latest animation-lab -- --template react
cd animation-lab
npm install
npm install motion
npm run dev
~~~

Para probar **gsap-react/usegsap-component.jsx**, instala **npm install gsap @gsap/react** en esa app en vez de **motion**. No hace falta instalar las dos librerías si solo vas a ejecutar un ejemplo.

| Ruta | Tecnología | Qué muestra |
| --- | --- | --- |
| [css/hero-reveal](css/hero-reveal/index.html) | CSS | Entrada de hero con keyframes y reduced motion. |
| [css/stagger-list](css/stagger-list/index.html) | CSS | Secuencia escalonada de tarjetas con retrasos declarativos. |
| [css/scroll-reveal](css/scroll-reveal/index.html) | CSS | View progress timeline con fallback visible. |
| [css/view-transition](css/view-transition/index.html) | CSS + View Transition API | Cambio de contenido con detección de soporte y actualización de estado nativa. |
| [css/image-transition](css/image-transition/index.html) | CSS | Transición entre dos ilustraciones de muestra. |
| [css/fixed-background](css/fixed-background/index.html) | CSS | Fondo ilustrado fijo mientras el contenido del primer plano se desplaza. |
| [gsap/parallax](gsap/parallax/index.html) | GSAP + ScrollTrigger | Parallax atado a scroll, solo con movimiento permitido. |
| [gsap/pinned-horizontal](gsap/pinned-horizontal/index.html) | GSAP + ScrollTrigger | Sección horizontal amplia; contenido apilado en móvil/reduced motion. |
| [gsap/scroll-story](gsap/scroll-story/index.html) | GSAP + ScrollTrigger | Historia de tres capítulos con escena fijada, timeline scrub y snap; en móvil el contenido vuelve al flujo normal. |
| [gsap/text-reveal](gsap/text-reveal/index.html) | GSAP | Entrada de palabras con etiqueta accesible única. |
| [gsap/animated-navigation](gsap/animated-navigation/index.html) | GSAP | Menú desplegable con estado ARIA y controles semánticos. |
| [gsap/svg-morph-mask](gsap/svg-morph-mask/index.html) | GSAP + SVG | Morph de coordenadas compatibles que recorta y revela una ilustración; incluye repetición y estado reducido sin plugin adicional. |
| [gsap-react/usegsap-component.jsx](gsap-react/usegsap-component.jsx) | React + GSAP | Scope, limpieza, reduced motion y callback contextSafe. |
| [motion/stagger-list.jsx](motion/stagger-list.jsx) | React + Motion | Variants coordinadas de padre e hijos. |
| [motion/interactive-button.jsx](motion/interactive-button.jsx) | React + Motion | Estados de hover/tap y estado accesible del botón. |
| [motion/card-layout.jsx](motion/card-layout.jsx) | React + Motion | Reordenamiento con animación de layout. |
| [motion/drag-snap-carousel.jsx](motion/drag-snap-carousel.jsx) | React + Motion | Carrusel que se arrastra con inercia y se ajusta a la parada cercana; también admite teclado y botones. |
| [motion/shared-element.jsx](motion/shared-element.jsx) | React + Motion | Transición de tarjeta a detalle con imagen y título compartidos, retorno de foco y Escape. |
| [motion/scroll-reveal.jsx](motion/scroll-reveal.jsx) | React + Motion | Movimiento ligado a scroll con useScroll y reduced motion. |
| [motion/page-transition.jsx](motion/page-transition.jsx) | React + Motion | Entrada y salida visual con AnimatePresence. |
| [svg/path-draw](svg/path-draw/index.html) | SVG + CSS | Dibujo de path y representación final estática. |
| [canvas/particle-field](canvas/particle-field/index.html) | Canvas | requestAnimationFrame, DPR, visibilidad y alternativa estática. |
| [lottie/pulse](lottie/pulse/index.html) | Lottie | JSON local con control play/pause y reduced motion. |

## Adaptación

- Mantén el contenido visible sin JavaScript y al activar reduced motion.
- Sustituye colores, tipografía y geometría por los tokens y reglas del proyecto.
- En una app real, carga GSAP/Lottie desde el gestor de paquetes existente en lugar de añadir CDNs.
- Los ejemplos no sustituyen pruebas de teclado, lectores de pantalla, navegador objetivo ni breakpoints del producto.

## Cómo está implementado cada patrón

- **Hero reveal:** keyframes sobre transform/opacity; el HTML ya muestra el texto antes de que la animación se ejecute.
- **Stagger CSS:** el ritmo se expresa con nth-child y animation-delay; reduced motion retira la secuencia completa.
- **Scroll reveal CSS:** el bloque es visible por defecto; solo se vincula a una view timeline dentro de @supports.
- **View Transition:** el botón actualiza el contenido en todos los navegadores; la API solo añade la transición si está disponible.
- **Image transition:** el estado del botón cambia una clase y aria-pressed; CSS interpola opacity y scale entre dos composiciones.
- **GSAP parallax:** matchMedia crea los triggers solo con movimiento permitido; ScrollTrigger liga el progreso al scroll.
- **Pinned horizontal:** una sola sección y timeline usan pin/scrub en pantallas amplias; móvil y reduced motion conservan los paneles en flujo vertical.
- **Scroll story:** una timeline de tres capítulos fija la escena en escritorio, liga los cambios al scroll y hace snap a etiquetas; móvil conserva los textos en flujo y reduced motion no crea el pin.
- **Text reveal:** GSAP escalona palabras; aria-label proporciona una frase semántica mientras los fragmentos visuales se ocultan del árbol accesible.
- **Animated navigation:** un botón nativo controla aria-expanded, Escape cierra el menú y GSAP solo anima el estado visual.
- **GSAP React:** useGSAP limita los selectores al ref, revierte el contexto y contextSafe agrupa la animación del callback.
- **Motion stagger:** variants propagan el estado y delayChildren con stagger coordina los hijos; useReducedMotion elimina el desplazamiento.
- **Interactive button:** hover/tap son feedback adicional; el botón nativo mantiene aria-pressed y su estado funcional.
- **Card layout:** la lista de datos controla el orden, keys son estables y layout anima los cambios geométricos.
- **Drag + inertia + snap:** Motion arrastra una pista con constraints y momentum; `dragTransition.modifyTarget` ajusta el punto final a las paradas medidas al cambiar el tamaño. Flechas, Home/End y botones ofrecen navegación equivalente, y reduced motion elimina la inercia.
- **Shared element:** Motion conecta tarjeta y detalle con `layoutId`; Escape y el botón de regreso cierran la vista y devuelven el foco a la tarjeta inicial.
- **Motion scroll:** useScroll y useTransform producen un valor de movimiento sin almacenar frames en estado React; reduced motion mantiene el contenido quieto.
- **Page transition:** AnimatePresence conserva la salida del panel anterior; es una demo de estado local, no reemplaza un router.
- **SVG path:** stroke-dashoffset dibuja el vector y reduced motion deja el path completo.
- **SVG morph + máscara:** GSAP interpola coordenadas compatibles dentro de un `clipPath`; los botones permiten repetir y reiniciar, y reduced motion muestra una forma estática.
- **Canvas:** el loop usa delta de tiempo, limita DPR, se pausa cuando la pestaña queda oculta y no se inicia con reduced motion.
- **Lottie:** el JSON de muestra es local; el botón pausa/reanuda, el player se destruye al salir de la página y reduced motion empieza estático.

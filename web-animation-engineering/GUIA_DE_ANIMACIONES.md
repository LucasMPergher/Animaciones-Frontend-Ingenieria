# Qué animaciones podés pedirme

No hace falta que sepas si conviene CSS, Motion o GSAP. Contame qué querés que haga la página, cuándo debería moverse y qué sensación buscás. Puedo revisar el proyecto y elegir una solución que encaje con su framework y sus dependencias.

## Ideas para pedir

### Entradas y revelados

- Hacer que el título y el texto del hero aparezcan con un pequeño desplazamiento y en secuencia.
- Revelar tarjetas o bloques cuando entran en pantalla.
- Mostrar una lista elemento por elemento, con un ritmo breve y sin ocultar el contenido si JavaScript no carga.
- Animar palabras o líneas de un título para darle énfasis.

Podés ver ejemplos de [entrada de hero](examples/css/hero-reveal/index.html), [lista escalonada](examples/css/stagger-list/index.html), [reveal al hacer scroll](examples/css/scroll-reveal/index.html) y [texto con GSAP](examples/gsap/text-reveal/index.html).

### Interacciones de interfaz

- Dar respuesta al hover, al foco de teclado o al toque de un botón.
- Animar un menú desplegable y hacer que se cierre con Escape.
- Cambiar entre imágenes con un fundido.
- Reordenar tarjetas con una transición que acompañe el nuevo lugar.
- Crear un carrusel que se pueda arrastrar, continúe con inercia y se acomode en la tarjeta más cercana al soltar.
- Expandir una tarjeta a una vista de detalle haciendo que la imagen y el título mantengan su continuidad.
- Transicionar entre vistas o estados de una interfaz.

Ejemplos: [botón interactivo con Motion](examples/motion/interactive-button.jsx), [navegación animada con GSAP](examples/gsap/animated-navigation/index.html), [cambio entre imágenes](examples/css/image-transition/index.html), [layout de tarjetas](examples/motion/card-layout.jsx), [carrusel con arrastre e inercia](examples/motion/drag-snap-carousel.jsx), [transición de vistas](examples/motion/page-transition.jsx) y [elemento compartido entre tarjeta y detalle](examples/motion/shared-element.jsx).

### Movimiento ligado al scroll

- Hacer que un elemento aparezca cuando llega al viewport.
- Desplazar capas a distintas velocidades para crear parallax.
- Fijar una sección y recorrer sus paneles en horizontal mientras se hace scroll.
- Contar una historia en capítulos con una escena fijada, progreso ligado al scroll y puntos de ajuste entre secciones.
- Vincular el progreso visual de una barra o ilustración al avance de la página.

Ejemplos: [reveal CSS](examples/css/scroll-reveal/index.html), [parallax](examples/gsap/parallax/index.html), [sección horizontal fijada](examples/gsap/pinned-horizontal/index.html), [relato por capítulos](examples/gsap/scroll-story/index.html) y [scroll en React con Motion](examples/motion/scroll-reveal.jsx).

### Fondo fijo con contenido por delante

Podés dejar una imagen decorativa quieta contra la ventana mientras el contenido del primer plano sigue su recorrido normal al hacer scroll. Este patrón suele llamarse **fondo fijo** (*fixed background*); no hace falta convertirlo en parallax ni animar varias capas.

Mirá la demo de [fondo fijo](examples/css/fixed-background/index.html). Si querés que toda una sección quede retenida durante una parte del scroll, pedí una **sección fijada** (*pinned section*): es un patrón distinto.

> Dejá la imagen de fondo fija mientras las secciones de texto se desplazan por delante. En móvil mantené el texto legible y no agregues parallax.

### SVG, Canvas y Lottie

- Dibujar un trazo SVG como si se estuviera escribiendo, transformar una forma vectorial en otra o usarla como máscara para revelar una imagen.
- Crear una escena de partículas para un fondo decorativo.
- Reproducir una animación Lottie que ya tengas, con controles de pausa y reproducción.

Ejemplos: [dibujo de un path SVG](examples/svg/path-draw/index.html), [morph SVG con máscara de recorte](examples/gsap/svg-morph-mask/index.html), [campo de partículas](examples/canvas/particle-field/index.html) y [animación Lottie](examples/lottie/pulse/index.html).

### Escenas 3D y presentación de producto

- Presentar un producto procedural con geometría, materiales, iluminación y cámara en Three.js.
- Hacer que un objeto gire o cambie de luz al avanzar por una historia de scroll.
- Mantener el texto y los capítulos en HTML para que la escena WebGL no sea la única forma de entender el contenido.

Mirá la demo de [producto 3D con scroll](examples/three/product-scroll.jsx). Usa Three.js porque necesita volumen, materiales y cámara; para una profundidad decorativa sencilla alcanza con CSS 3D.

### React y secuencias más elaboradas

- Coordinar la entrada de varios componentes con variantes y stagger.
- Conectar una tarjeta de una colección con su vista de detalle usando un elemento compartido.
- Animar presencia, gestos, cambios de estado o reordenamiento de elementos.
- Crear una secuencia con tiempos y pasos coordinados.
- Integrar GSAP en React con limpieza al desmontar y respeto por movimiento reducido.

Ejemplos: [stagger con Motion](examples/motion/stagger-list.jsx), [elemento compartido con Motion](examples/motion/shared-element.jsx), [carrusel con gesto e inercia](examples/motion/drag-snap-carousel.jsx), [GSAP en React](examples/gsap-react/usegsap-component.jsx) y [botón interactivo con Motion](examples/motion/interactive-button.jsx).

## Cómo describir lo que querés

Si podés, incluí estos datos:

1. **Dónde:** qué página, componente o elemento querés animar.
2. **Cuándo:** al cargar, al entrar en pantalla, al pasar el cursor, al hacer clic o durante el scroll.
3. **Qué movimiento:** aparecer, deslizarse, escalar, dibujarse, cambiar de posición o recorrer una secuencia.
4. **Qué conservar:** contenido siempre visible, comportamiento móvil, controles de teclado, duración o una librería que el proyecto ya use.

Si no tenés preferencias técnicas, podés decir: **«Elegí la forma más simple que encaje con este proyecto»**. También podés pedirme una tecnología concreta, por ejemplo CSS, Motion o GSAP.

## Prompts listos para adaptar

> En el hero de inicio, hacé que el título aparezca primero y el texto después con un desplazamiento sutil. En móvil mantené la misma lectura y respeta la preferencia de movimiento reducido.

> Revelá las tarjetas cuando entren en pantalla. Quiero un ritmo escalonado corto, sin ocultarlas antes de que la animación empiece.

> En escritorio, fijá esta sección y recorré sus paneles en horizontal mientras hago scroll. En móvil, dejá los paneles apilados verticalmente.

> Animá este menú al abrirlo y cerrarlo. El botón debe anunciar el estado, Escape debe cerrarlo y la navegación tiene que seguir funcionando sin la animación.

> Al abrir el detalle de una tarjeta, hacé que su imagen y su título viajen hasta la nueva vista y vuelvan al cerrar. Mantené el foco, permití cerrar con Escape y respetá movimiento reducido.

> Hacé un carrusel horizontal que pueda arrastrar con mouse o tacto, conserve un poco de inercia y ajuste la tarjeta más cercana al soltar. Agregá controles de teclado y desactivá la inercia si está activo «Reducir movimiento».

> Armá un relato de tres capítulos controlado por el scroll: fijá la escena en escritorio, coordiná los cambios con una timeline y apilá el contenido en móvil.

> Transformá este path SVG en una segunda forma y usalo como máscara para revelar la ilustración de fondo. Conservá un estado estático útil para movimiento reducido.

> Armá una presentación 3D de producto en Three.js. Hacé que la cámara y el objeto acompañen tres capítulos del scroll, creá el modelo con geometría procedural y mantené una vista estática accesible en móvil o con movimiento reducido.

> Dibujá este SVG al entrar en pantalla. Mantené el gráfico completo como estado final y dejalo estático con movimiento reducido.

> Revisá por qué esta animación no se activa en móvil. Corregí el problema sin reemplazar el framework ni las convenciones que ya usa el proyecto.

## Criterios que voy a cuidar

- El contenido importante sigue disponible aunque una animación no se ejecute.
- La preferencia del sistema **Reducir movimiento** se respeta.
- Los controles siguen siendo utilizables con teclado y tacto.
- Se priorizan transiciones ligeras y se limpian listeners, timelines y triggers cuando corresponde.
- Se mantiene la tecnología y la estructura que ya encajan con el proyecto; no se agrega una librería solo por una animación sencilla.

## Probar las demos

La [página de ejemplos](examples/README.md) explica cómo servir las demos HTML y ejecutar los componentes React. La galería Motion Lab integra las 24 demos en tarjetas; está en el directorio hermano `animation-lab/`, con sus instrucciones en `animation-lab/README.md`.

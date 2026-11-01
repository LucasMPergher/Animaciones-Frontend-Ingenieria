# Motion Lab

Galería local para probar las 15 demos HTML y los 9 componentes React de `../web-animation-engineering/examples` (24 en total). Las páginas HTML se sirven dentro de la vista previa y también se pueden abrir en una pestaña aparte; los componentes React se ejecutan directamente en la galería.

La versión actual incorpora patrones más elaborados: una historia de tres capítulos ligada al scroll, una transición de tarjeta a detalle con elemento compartido, un morph SVG con máscara, un carrusel arrastrable con inercia y ajuste a tarjeta y una escena 3D de producto ligada al scroll.

## Ejecutar

Desde esta carpeta (`animation-lab`):

```sh
npm install
npm run dev
```

Abre la dirección local que muestre Vite en la terminal, normalmente <http://localhost:5173/>. Elige una tarjeta para cargar su demo y usa **Reiniciar** para volver a ejecutar la animación.

Las librerías GSAP y Lottie se sirven desde dependencias locales de esta app; no necesitan conexión a internet. Algunas animaciones empiezan al hacer scroll o al pulsar un control dentro de la vista previa. Si el sistema tiene activado **Reducir movimiento**, ciertos efectos se mantienen estáticos por accesibilidad.

Motion, GSAP React y Three.js se instalan como dependencias de esta app para que sus componentes `.jsx` también tengan vista previa ejecutable. Usa los filtros **Motion**, **React + GSAP** y **3D y WebGL** para encontrarlos.

## Compilar

```sh
npm run build
npm run preview
```

El build copia las páginas de ejemplo a `dist/examples` y las librerías locales a `dist/vendor`, así que la vista previa de producción conserva el catálogo y sus assets.

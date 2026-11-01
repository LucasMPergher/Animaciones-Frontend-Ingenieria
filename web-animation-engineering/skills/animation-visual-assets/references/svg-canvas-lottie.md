# SVG, Canvas, 3D scenes, and Lottie

## SVG

Use inline SVG for small, stylable vectors and path-level animation. Keep a **viewBox**; use **aria-hidden="true"** for decoration or an accessible name for meaningful standalone SVG. CSS/WAAPI can animate basic properties; use GSAP when coordinated path choreography materially benefits from timelines.

## Canvas

Canvas pixels are not exposed as semantic descendants. Describe meaningful output in adjacent DOM and avoid making essential controls part of the bitmap. Size the backing store for device pixel ratio while keeping CSS dimensions stable. Use **requestAnimationFrame**, compute from elapsed time rather than frame count, and cancel the outstanding frame when the component is removed or the page is hidden. Avoid continuous rendering when the scene is static.

## Three.js and WebGL

Use Three.js only when the scene needs real 3D geometry, materials, lighting, camera movement, or spatial interaction. For a small showcase, prefer procedural geometry to an unapproved external model; keep product names, chapter text, and controls in semantic DOM because WebGL pixels are not exposed to assistive technology.

Create the renderer inside the client lifecycle and size it from its container. Cap `renderer.setPixelRatio()` on high-density screens, update the camera aspect and projection on resize, and dispose geometries, materials, textures, observers, and `WebGLRenderer` on teardown. For scroll-scrubbed scenes, render from scroll/timeline updates instead of running an idle animation loop. Stop or suspend rendering when the scene is static, offscreen, hidden, or under reduced motion.

Provide a poster or static SVG/DOM alternative when WebGL cannot initialize. Reduced motion should retain a useful static scene and preserve the full narrative without large camera or object movement.

## Lottie

The **lottie-web** API commonly initializes with **loadAnimation({ container, renderer, loop, autoplay, path })** or **animationData**. Retain the returned instance and call **destroy()** when its owner is removed. Respect the user's motion preference by disabling autoplay or choosing a static poster/first frame. Provide meaningful text separately because the SVG/canvas renderer does not guarantee a semantic description of the animation.

Self-host assets when possible, constrain JSON size, validate animation data from a trusted source, and avoid loading a player for a static illustration. Confirm exact player options against the official repository for the version installed.

## Official references

- [SVG in HTML (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [requestAnimationFrame (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [lottie-web README](https://github.com/airbnb/lottie-web)
- [Three.js documentation](https://threejs.org/docs/)
- [Three.js responsive rendering](https://threejs.org/manual/en/responsive.html)
- [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

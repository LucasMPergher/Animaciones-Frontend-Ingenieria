# Animation quality checklist

Use the relevant items for the actual change; a decorative fade does not need every advanced review.

## Access and motion preference

- Content is visible and readable without JavaScript and before hydration.
- Non-essential movement is reduced or removed for **prefers-reduced-motion: reduce**; meaningful state changes remain perceivable.
- Parallax, large pans/zooms, rapid flashing, and continuous motion receive special scrutiny.
- Controls work with keyboard and touch, expose state with native semantics/ARIA where needed, and retain visible focus.
- Meaningful SVG/Canvas/Lottie content has an accessible text equivalent.

## Runtime and performance

- Animate **transform**/**opacity** where appropriate. Check whether dimensions, position, or paint-heavy properties cause repeated layout/paint.
- Batch measurements before writes; avoid querying layout in a per-frame callback.
- Do not store frame-level motion in React state. Prefer CSS, Motion values, GSAP, or Canvas drawing according to the selected stack.
- Add **will-change** only after profiling and remove it when the animation ends.
- Pause work while offscreen/hidden if it is not needed; cancel timers, frames, observers, listeners, and animations on teardown.
- For WebGL scenes, cap device pixel ratio, avoid an idle render loop for static/scroll-scrubbed content, dispose GPU resources, and keep a semantic/static fallback when WebGL is unavailable.
- Avoid duplicate libraries or multiple owners writing the same transform/opacity.

## Responsive and framework lifecycle

- Test narrow screens, reduced motion, resize, orientation, and content changes that affect measurements.
- Pinning/horizontal scroll has a small-screen/static alternative and does not trap scrolling or hide content.
- React work is scoped to its component and reverted on dependency update/unmount. Delayed/event callbacks are lifecycle-safe.
- SSR modules do not access browser globals during import; initial markup remains stable and useful.
- Framework/router transitions preserve focus, URL/state behavior, and cancellation/loading/error states.

## Validation evidence

Record which checks were run (lint/build/tests, browser and viewport checks) and distinguish them from checks not run. Do not infer frame rate, accessibility conformance, or cross-browser support from code inspection alone.

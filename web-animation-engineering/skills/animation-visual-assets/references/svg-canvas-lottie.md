# SVG, Canvas, and Lottie

## SVG

Use inline SVG for small, stylable vectors and path-level animation. Keep a **viewBox**; use **aria-hidden="true"** for decoration or an accessible name for meaningful standalone SVG. CSS/WAAPI can animate basic properties; use GSAP when coordinated path choreography materially benefits from timelines.

## Canvas

Canvas pixels are not exposed as semantic descendants. Describe meaningful output in adjacent DOM and avoid making essential controls part of the bitmap. Size the backing store for device pixel ratio while keeping CSS dimensions stable. Use **requestAnimationFrame**, compute from elapsed time rather than frame count, and cancel the outstanding frame when the component is removed or the page is hidden. Avoid continuous rendering when the scene is static.

## Lottie

The **lottie-web** API commonly initializes with **loadAnimation({ container, renderer, loop, autoplay, path })** or **animationData**. Retain the returned instance and call **destroy()** when its owner is removed. Respect the user's motion preference by disabling autoplay or choosing a static poster/first frame. Provide meaningful text separately because the SVG/canvas renderer does not guarantee a semantic description of the animation.

Self-host assets when possible, constrain JSON size, validate animation data from a trusted source, and avoid loading a player for a static illustration. Confirm exact player options against the official repository for the version installed.

## Official references

- [SVG in HTML (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [requestAnimationFrame (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [lottie-web README](https://github.com/airbnb/lottie-web)

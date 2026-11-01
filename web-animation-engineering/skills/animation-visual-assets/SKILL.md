---
name: animation-visual-assets
description: Choose and implement animation with SVG, Canvas, or Lottie when the visual asset and rendering model call for it.
---

# SVG, Canvas, and Lottie

Use when the requested motion is primarily an illustrated/vector asset, a dense graphics scene, or playback of supplied Lottie data.

- Read [references/svg-canvas-lottie.md](references/svg-canvas-lottie.md) and confirm the selected renderer supports the provided asset.
- Prefer SVG for modest vector scenes and DOM/CSS for interface elements. Keep meaningful vector content labeled or accompanied by semantic text.
- Choose Canvas only when scene density or drawing requirements justify an immediate-mode renderer. Provide equivalent DOM information for meaningful content, scale for device pixel ratio, and stop the render loop when inactive.
- Choose Lottie when supplied/exported animation needs faithful playback. Verify renderer compatibility, asset size, licensing/provenance, and whether its content needs accessible text outside the canvas.
- Pause or stop playback for reduced motion, hidden pages, teardown, and user controls where relevant.
- Avoid fetching or embedding third-party animation assets unless the user/project has approved the source.

Do not choose one of these formats just to add an effect that CSS, Motion, or GSAP can express more simply.

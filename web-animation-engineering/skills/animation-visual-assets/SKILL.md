---
name: animation-visual-assets
description: Choose and implement animation with SVG, Canvas, WebGL/Three.js, or Lottie when the visual asset and rendering model call for it.
---

# SVG, Canvas, 3D scenes, and Lottie

Use when the requested motion is primarily an illustrated/vector asset, a dense graphics scene, a true 3D composition, or playback of supplied Lottie data.

- Read [references/svg-canvas-lottie.md](references/svg-canvas-lottie.md) and confirm the selected renderer supports the provided asset.
- Prefer SVG for modest vector scenes and DOM/CSS for interface elements. Keep meaningful vector content labeled or accompanied by semantic text.
- For SVG morphs, use compatible path geometry or a verified normalizer; use clip paths or masks to reveal artwork while keeping its meaningful description outside the animated geometry.
- Choose Canvas only when scene density or drawing requirements justify an immediate-mode renderer. Provide equivalent DOM information for meaningful content, scale for device pixel ratio, and stop the render loop when inactive.
- Choose Three.js/WebGL only when the scene needs real geometry, materials, lighting, camera movement, or spatial interaction. Prefer existing CSS/SVG/Canvas approaches for flat decorative depth. Build small showcase objects from procedural geometry when a model asset is not available or approved.
- Create the renderer after the client component mounts. Size it from its container, cap the pixel ratio, and dispose geometries, materials, textures, renderer, and observers on teardown. Avoid a continuous render loop for static or scroll-scrubbed scenes; render when the scene changes, and pause work when offscreen or the document is hidden.
- Keep product names, chapter copy, controls, and other meaningful information in semantic DOM alongside the canvas. Provide a static illustration or poster when WebGL is unavailable; with reduced motion, use a stable scene and keep the narrative readable without scroll-driven camera moves.
- Choose Lottie when supplied/exported animation needs faithful playback. Verify renderer compatibility, asset size, licensing/provenance, and whether its content needs accessible text outside the canvas.
- Pause or stop playback for reduced motion, hidden pages, teardown, and user controls where relevant.
- Avoid fetching or embedding third-party animation assets unless the user/project has approved the source.

Do not choose one of these formats just to add an effect that CSS, Motion, or GSAP can express more simply.

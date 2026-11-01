---
name: animation-css
description: Build lightweight browser-native animation with CSS transitions, keyframes, fixed backgrounds, scroll-driven timelines, and View Transitions.
---

# CSS and browser-native animation

Use for self-contained effects, state changes represented by classes, and browser-native animation APIs.

- Read [references/platform-apis.md](references/platform-apis.md) when using scroll-driven animations, WAAPI, or View Transitions.
- Prefer transitions for state changes and keyframes for autonomous sequences. Animate only properties that need to change.
- For a **fixed background with scrolling foreground**, keep a decorative image layer fixed to the viewport using `background-attachment: fixed` or a fixed-position layer, and leave the foreground content in normal flow. Use `position: sticky` or GSAP pin only when the whole section needs to stay in view for a defined scroll range; treat that as a separate pattern from parallax.
- Provide a visible, complete default state. Avoid hiding content before script runs.
- Use **@media (prefers-reduced-motion: reduce)** to remove or substantially reduce non-essential movement.
- Add feature detection/fallbacks for scroll timelines and View Transitions. Never make core navigation/content depend on a transition API.
- Keep state changes in CSS classes or the framework's state model; do not run competing CSS and JS animations on the same property.
- Check focus, hover/touch equivalence, responsive behavior, and target browser support.

For scripted sequencing or advanced control, consult **animation-gsap**; for React state animation, consult **animation-motion**.

---
name: animation-quality
description: Review web animation for accessibility, reduced motion, performance, responsive behavior, lifecycle cleanup, SSR, and library conflicts.
---

# Animation quality

Consult this skill while implementing or reviewing motion that affects content, interaction, scrolling, React lifecycle, or render performance.

- Use [references/quality-checklist.md](references/quality-checklist.md) as a focused review; prioritize issues that affect this change.
- Preserve semantic content and operation when animation is unavailable, delayed, or reduced.
- Honor **prefers-reduced-motion** in CSS and runtime-driven animation, including scroll-linked and looping effects.
- Check keyboard/focus and touch behavior for controls. Visual feedback must not be the only interaction cue.
- Prefer compositor-friendly **transform**/**opacity** for frequent motion; measure before adding **will-change**.
- Prevent layout thrashing, unbounded work, unnecessary React renders, and offscreen loops.
- Clean up animations, timelines, ScrollTriggers, observers, listeners, timers, and animation frames with the owning lifecycle.
- For SSR, keep module evaluation browser-independent and keep the server-rendered content complete.
- Ensure one owner controls each animated property and that CSS, React layout, Motion, and GSAP do not overwrite one another.
- Check responsive breakpoints, short/tall viewports, and orientation changes when the composition depends on geometry.

Report concrete checks and remaining browser/runtime coverage rather than claiming universal compatibility from a static review.

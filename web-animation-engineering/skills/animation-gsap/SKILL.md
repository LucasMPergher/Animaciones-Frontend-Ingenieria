---
name: animation-gsap
description: Build framework-neutral GSAP animations with timelines, ScrollTrigger, SVG morphs, text, shared layout transitions, and responsive media-query handling.
---

# GSAP

Use when GSAP is already present or a request needs timeline orchestration, complex sequencing, ScrollTrigger pin/scrub behavior, compatible-path SVG motion, or a Flip transition between DOM layout states when the plugin is available.

## Workflow

- Read [references/patterns.md](references/patterns.md) for focused patterns and official API links.
- Confirm the installed GSAP version and plugin availability in the project before using an API or adding a dependency.
- Register required plugins once at the module boundary, then create scoped animation setup at the component/page lifecycle boundary.
- Use one timeline for related sequences and labels when they help make timing understandable. Keep scroll interactions in ScrollTrigger rather than hand-rolling scroll listeners.
- For chapter-based scroll stories, align timeline labels with meaningful chapters and provide a normal-flow alternative when pinning is disabled.
- For path morphs, confirm that paths have compatible command structures or use an approved path-normalization tool; never assume arbitrary SVG paths interpolate cleanly.
- Use **gsap.matchMedia()** for responsive animation variants and **prefers-reduced-motion**; revert/kill owned work when the setup ends.
- Keep animated content readable if scripts fail or reduced motion is active. Avoid transform ownership conflicts with CSS or another animation library.
- Use official docs for current plugin names, options, installation, and any APIs not covered by the reference.

## Limits

GSAP does not make React effects lifecycle-safe by itself. In React, load **animation-gsap-react**. Do not use pinning or scrub by default; test layout, touch input, reduced motion, and short viewports when they are part of the effect.

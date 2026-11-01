---
name: animation-core
description: Plan and implement web animations, including fixed backgrounds, scroll narratives, shared-element transitions, SVG morphs, and gesture-driven carousels, by inspecting the project and choosing CSS, Motion, GSAP, SVG, Canvas, or Lottie.
---

# Animation Core

Use this skill when a request adds, changes, reviews, or debugs animation in a website or web application.

## Workflow

1. Identify the requested pattern and trigger: reveal, stagger, gesture, fixed background with scrolling foreground, scroll-linked effect, multi-chapter scroll narrative, pinning, shared-element transition, text, SVG morph or mask, canvas, navigation, or page transition. Keep fixed backgrounds distinct from parallax and pinned sections.
2. Assess complexity and constraints: choreography, input type, browser targets, reduced motion, content importance, and whether a library is warranted.
3. Inspect the project before choosing APIs: framework/version, components/routes, styles, package manager, existing animation dependencies, SSR/build boundaries, and local conventions.
4. Select the smallest suitable technology. Read [references/technology-selection.md](references/technology-selection.md). Never default to GSAP or add a dependency before checking what is already available.
5. Consult only the relevant specialist: **animation-css**, **animation-gsap**, **animation-gsap-react**, **animation-motion**, or **animation-visual-assets**. Use **animation-gsap** for labeled scroll narratives and compatible-path SVG choreography; use **animation-motion** for React shared elements via layout transitions; use **animation-visual-assets** when the artwork or mask is the primary output. Read [references/framework-integration.md](references/framework-integration.md) for framework/SSR boundaries and consult **animation-quality** for motion/accessibility/lifecycle review.
6. State a short implementation plan when the change spans multiple files or has meaningful trade-offs. Keep simple changes direct.
7. Implement within the project's framework and conventions. Preserve semantic content and keep one system in control of any given animated property.
8. Review responsive behavior, reduced motion, keyboard/touch behavior, cleanup, SSR, and performance.
9. Run the project's existing checks and any directly relevant validation. Report what ran and what remains unverified.
10. Present the implementation, selected technology, validation results, and material limitations.

## Framework routing

- Framework-neutral HTML/CSS/JS: consider CSS or the Web Animations API first.
- React, including Next.js: consider Motion for state-driven UI; use GSAP only for timeline/plugin-heavy choreography or where the project already uses it. For GSAP lifecycle, load **animation-gsap-react**.
- Vite and Astro do not imply React. Inspect the selected integration/island before adding framework-specific code.
- SVG, Canvas, and Lottie are output/rendering choices, not a reason by themselves to add a second animation library.

## Scope

This skill helps implement animations in a project. For a request to create or edit this skills package, follow the repository's contributor guidance instead.

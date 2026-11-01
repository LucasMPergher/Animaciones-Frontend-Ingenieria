---
name: animation-motion
description: Implement declarative React animation with Motion, including variants, gestures, layout, scroll-linked effects, and presence transitions.
---

# Motion for React

Use when Motion already exists or a React UI needs declarative animation connected to state, gestures, layout changes, or component presence.

- Read [references/patterns.md](references/patterns.md) for selection guidance and current official API links.
- Confirm the package currently used by the repository. Current Motion for React examples use the **motion/react** entry point; do not change a project from **framer-motion** without checking its version and migration requirements.
- Keep component state and animation state coherent. Use variants for related parent/child states, **layout** for real layout changes, and **AnimatePresence** for exit behavior.
- Use scroll hooks/motion values for scroll-linked progress and **whileInView**/**useInView** for enter-viewport behavior; do not update React state on every scroll frame.
- Honor reduced motion via **MotionConfig** or **useReducedMotion**; make the static state complete and usable.
- Verify keys, event semantics, keyboard access, SSR/client boundaries, and layout behavior at narrow widths.

Do not add Motion to non-React projects. For CSS-sized effects, prefer CSS. For plugin-heavy timeline choreography, use **animation-gsap** only when justified.

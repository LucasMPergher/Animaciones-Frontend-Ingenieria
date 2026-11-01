# Motion patterns

Use syntax matching the installed Motion package. Current React documentation imports from **motion/react**; older projects may still use **framer-motion**.

## Variants and stagger

- Put shared visual states in named variants and pass variant labels down to children.
- Use a parent's **delayChildren** with Motion's **stagger()** utility for ordered entrances. Do not create unrelated timers for each child.
- Keep essential text visible before client animation and respect reduced motion.

## Gestures and buttons

- Use **whileHover**, **whileTap**, and focus-visible styling together. Motion gestures supplement semantic button/link behavior; they do not replace it.
- Preserve visible focus, disabled state, and touch behavior. Avoid hover-only information.

## Layout and presence

- Add **layout** when an element's actual layout changes and a transform-based transition clarifies that change. Avoid placing two libraries in control of the same transform.
- Use a stable **layoutId** to connect a shared visual element between separate UI states. Keep the transition within a shared layout boundary and preserve keyboard focus when returning to the source state.
- Give entering/leaving children stable, unique keys. Keep **AnimatePresence** mounted around the conditional child and read its current **mode** options before use.
- For route transitions, coordinate with the router and focus management; a visual transition alone does not implement navigation.

## Scroll and reduced motion

- Use **useScroll()** and transform motion values for progress/parallax without React re-renders each frame.
- Use **whileInView** or **useInView()** for reveal-once behavior. Consider whether a reveal should remain visible if JS is unavailable.
- Use **MotionConfig reducedMotion="user"** or **useReducedMotion()** when the individual effect needs an alternative. Replace large spatial motion with opacity or no motion.

## Bundle and official references

Motion is React-specific. Keep imports targeted and consult current documentation for APIs and bundle controls.

- [Motion for React overview](https://motion.dev/docs/react)
- [Variants](https://motion.dev/docs/react-animation)
- [Stagger](https://motion.dev/docs/stagger)
- [Scroll](https://motion.dev/docs/react-use-scroll)
- [Reduced motion](https://motion.dev/docs/react-use-reduced-motion)
- [AnimatePresence](https://motion.dev/docs/react-animate-presence)
- [Layout animations and shared elements](https://motion.dev/docs/react-layout-animations)
- [Accessibility](https://motion.dev/docs/react-accessibility)
- [Bundle size](https://motion.dev/docs/react-reduce-bundle-size)

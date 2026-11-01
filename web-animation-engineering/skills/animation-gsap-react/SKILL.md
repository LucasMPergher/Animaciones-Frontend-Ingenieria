---
name: animation-gsap-react
description: Integrate GSAP with React component lifecycles, including scoped selectors, cleanup, event callbacks, and SSR-aware setup.
---

# GSAP with React

Use this when implementing GSAP inside React, Next.js, or another React-rendered application.

- Read [references/integration.md](references/integration.md), then verify the exact **@gsap/react** API in its current official README.
- Prefer **useGSAP()** from **@gsap/react** for component-scoped setup. Supply a root ref as **scope** so selectors stay within the component.
- Register plugins at module scope, but do not read **window** or query the document at module evaluation time.
- Use the config form to express dependencies; set **revertOnUpdate: true** if a dependency change must tear down and rebuild the animation context.
- Use **contextSafe()** for event handlers or delayed callbacks that create GSAP work after the hook callback has completed.
- Clean up non-GSAP resources (listeners, observers, timeouts) in effect cleanup. Keep React state as the source of truth for application state.
- Keep SSR output visible and semantically complete. Treat animation as client-side enhancement.

## Scope boundary

For framework-neutral GSAP work, use **animation-gsap**. For Motion components, use **animation-motion**. For shared reduced-motion and performance review, use **animation-quality**.

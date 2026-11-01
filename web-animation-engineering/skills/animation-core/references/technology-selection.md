# Technology selection

Choose by the control model and output, not by trend or visual complexity alone.

| Need | First choice | Use a library when |
| --- | --- | --- |
| Hover/focus feedback, simple reveal, decorative loop | CSS transition/keyframes | Timing is coordinated with app state or many items need runtime orchestration. |
| Decorative background stays stationary while foreground content scrolls | CSS fixed background (`background-attachment: fixed`) or a fixed-position background layer | Use sticky positioning or GSAP ScrollTrigger pin when an entire section must stay in view for a defined scroll range or its progress must drive a timeline. |
| Declarative state-driven component animation in React | Motion if already installed or approved | The effect needs a timeline/plugin workflow better served by an existing GSAP integration. |
| Long sequence, precise timeline labels, SVG choreography, scroll pin/scrub, complex responsive choreography | Existing GSAP installation | Add GSAP only when its control or plugin capability materially reduces complexity. |
| Scroll-linked progress or reveal | CSS scroll/view timeline with feature detection, or existing Motion/GSAP scroll tooling | Use JS observers/tickers only if unsupported behavior must be equivalent or the effect needs richer runtime control. |
| Shared-element or route transition | Platform View Transition API with fallback, or Motion presence in React | Use a router/framework integration where route lifecycle, focus, or data loading requires it. |
| Animated vector artwork | Inline/external SVG with CSS or WAAPI | Use Lottie when the design is already authored/exported as a supported animation and needs faithful playback. |
| Dense particle/visualization workload | Canvas or WebGL only when profiling/design calls for it | Choose SVG/DOM for small accessible interfaces; keep a semantic DOM equivalent for Canvas content. |

## Selection checks

- Prefer the dependency already installed when its API fits; avoid mixing animation systems without a clear ownership boundary.
- Prefer CSS for a small number of self-contained decorative effects and WAAPI for imperative browser-native playback.
- Prefer Motion for React animations driven by props/state, gestures, presence, and layout. Its API is React-specific.
- Prefer GSAP for sequenced timelines, complex SVG, ScrollTrigger pin/scrub, or when a project already depends on it. GSAP itself is framework-agnostic.
- Select Lottie only for supplied/approved animation data. It adds a runtime and may not expose all content as semantic DOM.
- Treat CSS scroll-driven animations and View Transitions as progressively enhanced APIs unless the project's target matrix guarantees support.
- If the requirement is unclear, propose a minimal option and explain the effect of alternatives before adding dependencies.

## Product and dependency boundaries

Do not recommend paid-only add-ons or hosted design services as a prerequisite. Distinguish freely usable libraries from optional hosted tooling and account-bound products. Check current official licensing and package guidance before adding or publishing dependencies.

## Official references

- [GSAP documentation](https://gsap.com/docs/v3/)
- [GSAP React integration](https://github.com/greensock/react)
- [Motion for React](https://motion.dev/docs/react)
- [CSS animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations)
- [CSS background-attachment (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-attachment)
- [CSS scroll-driven animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [View Transition API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

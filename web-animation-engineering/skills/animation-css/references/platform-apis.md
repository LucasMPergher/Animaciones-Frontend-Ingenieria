# CSS and browser animation APIs

## Transitions and keyframes

Use transitions when an existing state change should animate between values. Use keyframes for autonomous motion or multiple named phases. Keep reduced-motion overrides after the animated declarations with sufficient specificity; the **animation** shorthand resets related longhand settings.

## Scroll-driven CSS

CSS scroll-driven animations bind animation progress to a scroll-progress or view-progress timeline. They are useful for simple progress/reveal effects that do not need pinning or complex orchestration.

- Check support with **@supports (animation-timeline: view())** or the specific feature used.
- Keep essential content visible when unsupported. Put the scroll animation in the enhanced branch rather than hiding all content by default.
- Respect **prefers-reduced-motion**; the user should not need to scroll through large spatial movement.
- Verify the target browser matrix. Browser support and timeline range behavior can change.

## View Transitions

**document.startViewTransition()** can animate a visual snapshot around a DOM update in supporting browsers. Feature-detect the method, perform the DOM/state update without it as a fallback, and honor reduced motion in the transition styles. Use framework/router integrations when available so navigation state, focus, and cleanup remain correct.

View Transitions do not replace route semantics, focus management, loading/error states, or framework reconciliation. Do not manually mutate DOM nodes owned by a framework.

## Web Animations API

Use **Element.animate()** for imperative playback of browser-native keyframes when CSS classes are insufficient. Retain the returned **Animation** if you need to cancel/finish it; cancel it on teardown and avoid creating one animation per frame.

## Official references

- [CSS animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations)
- [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [Scroll-driven animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [View Transition API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Web Animations API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

# GSAP patterns

These are decision notes, not a replacement for the API reference. Confirm exact signatures against the project's installed version.

## Core and timelines

- **gsap.to()**, **gsap.from()**, and **gsap.fromTo()** create tweens. Use a **gsap.timeline()** to coordinate related steps, overlaps, labels, and callbacks.
- Set only the animated properties needed. Prefer transform/opacity for frequent motion. Avoid layout reads interleaved with writes.
- Use stagger options for repeated targets instead of creating one independent timeline per item.

## ScrollTrigger

- Import/register **ScrollTrigger** explicitly when using module builds.
- Use **trigger**, **start**, and **end** to define the relationship to the page; use **scrub** only when progress should track scrolling, and **pin** only when the design requires holding content in place.
- For horizontal sections, compute travel from content/viewport measurements and refresh after relevant layout changes. Provide a non-pinned small-screen/reduced-motion path.
- Prefer **gsap.matchMedia()** for breakpoint conditions. Its matching contexts are reverted when conditions change or **revert()** is called.
- Do not add per-frame DOM scroll handlers to reproduce ScrollTrigger.

## SVG and text

- Inline SVG is convenient when animating its path/shape properties. Check **viewBox**, preserve aspect ratio, and provide a semantic label if the SVG carries meaning.
- Text splitting changes DOM structure. Preserve one accessible text representation, restore/scope generated nodes during cleanup, and handle punctuation, line wrapping, and localization.
- Avoid relying on paid or account-bound add-ons; verify current plugin availability/licensing against GSAP's official site.

## Responsive and reduced motion

Use a single **gsap.matchMedia()** owner for the component's variants. A useful condition set includes a breakpoint and **(prefers-reduced-motion: reduce)**. Use a restrained static or opacity-only state for reduced motion; do not merely shorten a large continuous pan or zoom.

## Cleanup

**gsap.context()** groups animations and ScrollTriggers so **.revert()** can restore prior styles. Revert owned work on teardown. For setup outside a context, explicitly kill/revert the animations and triggers you create. For React hooks and callbacks, use **animation-gsap-react**.

## Official references

- [GSAP core and fundamentals](https://gsap.com/docs/v3/)
- [Timeline](https://gsap.com/docs/v3/GSAP/Timeline/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [gsap.matchMedia()](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)
- [gsap.context()](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/)
- [GSAP accessibility and responsive patterns](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)

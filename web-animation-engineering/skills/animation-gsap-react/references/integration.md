# @gsap/react integration

**@gsap/react** provides **useGSAP()** and integrates GSAP context cleanup with React. Check its README and the installed package version before relying on optional arguments.

## Component shape

1. Import **gsap** and **useGSAP**; register **useGSAP** and any plugins used.
2. Create a **useRef(null)** for the component root.
3. Call **useGSAP(callback, { scope: rootRef })**.
4. Query descendants with scoped selectors or refs; avoid global selectors that can target another component instance.
5. If setup depends on values, provide **dependencies**. **revertOnUpdate: true** reverts the context when those dependencies change; without it, the hook's default cleanup behavior is tied to teardown.

## Event handlers and delayed work

Animations created after the callback (for example, in a click handler or timeout) are outside the initial context unless wrapped with **contextSafe()**. Use the returned helper or **self.contextSafe()** as documented. Remove the handler/timer on teardown if it is not owned by the hook.

## SSR

The hook is designed to choose a safe effect behavior where browser layout effects are unavailable. Still keep DOM access inside the hook callback, render all essential content on the server, and avoid assuming the initial animated styles have run. Verify the actual framework's client boundary rules (especially in Next.js).

## Official references

- [@gsap/react README](https://github.com/greensock/react)
- [gsap.context()](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/)
- [GSAP React guide](https://gsap.com/resources/React/)

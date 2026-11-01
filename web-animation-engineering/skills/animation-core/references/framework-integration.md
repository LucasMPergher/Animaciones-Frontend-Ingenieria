# Framework and rendering integration

Inspect the actual app and follow its existing boundary. A tool name alone does not imply React or client-side rendering.

## React and Next.js

- In a plain React app, keep animation inside components and hooks that already own the relevant UI state.
- In Next.js App Router, pages/layouts are Server Components by default. Put event handlers, Motion components, and browser APIs in the smallest required Client Component boundary; keep surrounding content server-rendered when possible.
- Never read **window**, **document**, or layout measurements at module evaluation. Render meaningful content before hydration; treat animation as enhancement.
- For GSAP, read **animation-gsap-react**. For Motion, read **animation-motion** and check the installed package entry point.
- For Three.js, create the renderer and inspect browser capabilities inside a client effect; keep the canvas decorative and the product description in DOM. Dispose geometry, materials, textures, renderer, observers, and listeners on teardown. In Next.js, isolate this code in the smallest client component.

## Vite

Vite is a build tool, not a framework selector. Inspect the template, plugins, and source layout. A Vite app may be vanilla, React, Vue, or another integration. Keep imports compatible with the project's selected template and run its existing build command after changes.

## Astro

- Prefer static HTML and CSS for motion that does not require interaction.
- Add a hydrated island only when the effect needs client state, gestures, or a client-side animation runtime. Keep the island boundary as small as practical and use the project's existing framework integration.
- Keep essential content in the server-rendered page; do not make it depend on client hydration.

## SSR and hydration

Animation setup should not change the semantic structure or essential text between server render and hydration. Delay browser-only work until the component lifecycle runs. Avoid injecting markup before hydration when the framework owns that subtree. Verify build and hydration behavior in the target project rather than assuming a general React pattern covers every router/version.

## Official framework references

- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [Vite guide](https://vite.dev/guide/)

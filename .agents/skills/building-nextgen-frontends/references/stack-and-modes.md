# Stack and mode selection

## Default stack

- Product shell: React and Next.js App Router.
- Creative lab: React and Vite.
- Styling: Tailwind CSS or scoped CSS with semantic tokens.
- Accessible primitives: choose one of Base UI, Radix or React Aria.
- UI motion: Motion for React.
- Pinned or scrubbed narrative: GSAP ScrollTrigger.
- Native-first enhancements: CSS scroll-driven animations and View
  Transitions.
- 3D: Three.js through React Three Fiber and Drei.
- Physics: Rapier.
- Timelines: Theatre.js.
- Interactive vector characters: Rive state machines.

## Rules

- Use Lenis only when native scrolling cannot meet the experience.
- Load 3D and audio after the core content.
- Pause offscreen animation and release graphics resources on unmount.
- Provide `low`, `balanced` and `ultra` quality profiles.
- Avoid hover-only navigation.
- Keep pricing, consent and critical actions outside canvas-only UI.

## Reference discovery

Use current official docs first. Treat 21st.dev, Cult UI, Skiper UI, Ali Imam,
Watermelon UI, Codrops and Behance as discovery sources. Audit licenses and
implementation quality before adopting code.

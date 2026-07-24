# Stack routing

## Default choices

- Product shell: React with Next.js App Router.
- Isolated creative lab: React with Vite.
- Styling: semantic CSS tokens, CSS Modules, or Tailwind with a documented token
  layer.
- Accessible primitives: React Aria, Radix, Base UI, or native HTML. Choose one.
- Component motion: Motion for React.
- Complex pinned narrative: GSAP ScrollTrigger.
- Native-first enhancements: CSS scroll-driven animations and View Transitions.
- 3D: Three.js through React Three Fiber and Drei.
- Physics: Rapier.
- Directed timelines: Theatre.js.
- Interactive vector characters: Rive state machines.

## Escalation ladder

1. Static HTML and CSS.
2. CSS transitions, transforms, masks, gradients, and scroll timelines.
3. Motion for shared layout, gesture, and component state.
4. GSAP for precisely choreographed narrative sequences.
5. Canvas/WebGL/Three.js for real spatial or shader behavior.
6. WebGPU only behind capability detection and a proven fallback.

Stop at the lowest level that delivers the intended experience.

## Rendering boundaries

- Keep navigation, headings, body content, forms, pricing, consent, and CTAs in
  the DOM.
- Lazy-load 3D, audio, large video, and shader layers.
- Suspend offscreen animation and release graphics resources on unmount.
- Cap device pixel ratio and expose `calm`, `boost`, and `ultra` profiles.
- Prefer responsive image formats and reserve layout space.
- Avoid combining Lenis, scroll pinning, and nested overflow unless there is a
  tested reason.

## Reference and component intake

Use live libraries and galleries for discovery, then audit:

1. license and attribution;
2. framework and dependency fit;
3. semantic HTML and keyboard behavior;
4. touch and reduced-motion equivalents;
5. performance and teardown;
6. design-token integration;
7. maintenance and upstream activity.

Treat galleries such as Skiper UI, 21st.dev, Cult UI, Watermelon UI, Ali Imam,
StyleUI, Codrops, Behance, and Figma Community as inspiration or component
sources, not as a design system by accumulation.

### AI Forge mandatory premium registry

For this monorepo and any AI Forge hub / agent factory work, the **canonical
premium line** is locked in `premium-21st-registry.md` (Abraham 2026-07-25):

- Shader feature cards, futuristic hero, spotlight cards
- Sphere / swirl for live AI process & audit states
- Fluid particles + interactive dots for handoff graphs (Obsidian-vault feel)
- Celestial orrey / cosmos orbit for agent system map
- Circular & portfolio galleries for UX references
- Vertical bars for heatmap/metrics; background circles for production phases
- Boxes / wavy backgrounds for depth atmosphere

`npx shadcn@latest add "https://21st.dev/r/..."` is an **evaluation path** for
React+shadcn apps only. Vanilla `hub/` must reimplement the same grammar with
forge tokens. Do not ship flat admin UI and claim hyper-boost compliance.

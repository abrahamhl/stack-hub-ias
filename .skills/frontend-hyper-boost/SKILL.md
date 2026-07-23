---
name: frontend-hyper-boost
description: Architect, build, refactor, or audit distinctive production frontends with motion, parallax, layered storytelling, WebGL/3D, ASCII or pixel aesthetics, reactive hover/focus/touch states, simulator-like interfaces, and strong responsive accessibility. Use for React, Next.js, Vite, portfolios, product sites, dashboards, creative labs, cyberpunk or retro-futurist art direction, Google Stitch handoff, component-library evaluation, and any request that cites Skiper UI, 21st.dev, Cult UI, Watermelon UI, Ali Imam, StyleUI, sci-fi, Y2K techno posters, dystopia, Fallout, Claude Code, or Cyberpunk 2077. Also use when spectacular visual behavior must remain usable on phones, tablets, desktop, TV, keyboard, touch, reduced-motion, and lower-power devices.
---

# Frontend Hyper Boost

Treat visual ambition and product quality as one system. Create original work;
use references to learn interaction grammar, never to clone code or branding.

## Operating contract

1. Inspect the real repository, existing design system, routes, framework,
   dependencies, deploy target, and local instructions before proposing changes.
2. State the user journey and the single intended emotional effect.
3. Select one experience profile: `calm`, `boost`, or `ultra`.
4. Select at most three hero interactions. Keep ordinary controls ordinary.
5. Define keyboard, touch, reduced-motion, low-power, and TV equivalents before
   implementing pointer motion.
6. Build the semantic content and critical conversion path first.
7. Add motion, 3D, audio, and shaders as progressively enhanced layers.
8. Test responsive states, accessibility, performance, pricing/consent clarity,
   and failure fallbacks.
9. Record evidence, remaining risks, and the exact next physical action.

## Route the work

Read only the references needed for the current request:

- Interaction or visual behavior: `references/interaction-patterns.md`
- Stack and rendering choice: `references/stack-routing.md`
- Responsive, accessibility, performance, commerce, or NSFW gates:
  `references/responsive-accessibility.md`
- Art direction and visual-system prompts: `references/design-directions.md`
- Google Stitch setup or design-to-code loop: `references/stitch-loop.md`
- End-to-end execution and audit flow: `references/workflows.md`

Use `assets/templates/react-motion-lab/` when a repository needs a lightweight
React starter for a focus/touch-safe motion scene. Do not copy it over a more
mature existing component.

Run `scripts/audit-frontend.ps1` after implementation when PowerShell is
available. Treat its results as fast static signals, not proof of compliance.

## Experience profiles

### Calm

Use for settings, checkout, pricing, consent, legal, account, admin, and long
reading. Motion explains state with short transitions. No custom cursor,
scroll hijacking, continuous shader, or surprise takeover.

### Boost

Default for portfolios, product storytelling, agency sites, AI tools, and
creative commerce. Use one strong scene plus restrained microinteractions.
Lazy-load expensive layers and retain a calm core.

### Ultra

Use only for deliberate immersive scenes, simulations, launch experiences,
installations, performances, and experimental case studies. Require an explicit
quality selector, pause control, audio consent, static fallback, and a direct
exit to the core content.

## Non-negotiable UX rules

- Never make hover the only way to understand, open, or operate something.
- A full-screen hover takeover must also support focus, activation, escape, and
  a nonmodal reading path.
- Never hide price, billing period, renewal, scope, consent, or the primary CTA
  inside canvas, animation, tooltip, cursor trail, or transient text.
- Do not autoplay sound. Do not force smooth scrolling.
- Preserve native scrolling, text selection, zoom, and back navigation.
- Use semantic HTML behind or beside visual canvases.
- Provide visible focus and logical focus order.
- Honor `prefers-reduced-motion`; expose a quality/pause control for persistent
  movement.
- Keep personal, adult, legal, financial, and account data out of screenshots,
  public demos, design prompts, analytics payloads, and generated assets.
- For adult experiences, include age/jurisdiction gates, privacy-first analytics,
  discreet mode, content warnings, and an immediate safe exit where applicable.

## Stack decision rule

Start with CSS and the platform. Add Motion when components need shared state or
gesture animation. Add GSAP ScrollTrigger for pinned narrative choreography.
Add React Three Fiber only when real 3D materially improves the story or task.
Add a shader only when its visual behavior cannot be achieved with a cheaper
layer. Every added library must earn its bundle, maintenance, and accessibility
cost.

## Deliverable standard

Return or create:

- a brief experience profile and interaction map;
- the responsive and accessibility equivalents;
- production code with semantic fallbacks;
- a verification record for phone, tablet, desktop, large display, keyboard,
  reduced motion, and lower-power mode;
- explicit performance risks and lazy-loading boundaries;
- source and license notes for any adopted third-party code;
- a short changelog and the next physical action.

Do not create extra documentation inside this Skill package. `SKILL.md` is the
entrypoint; reusable knowledge belongs in `references/`, deterministic tools in
`scripts/`, and copyable starters in `assets/`.

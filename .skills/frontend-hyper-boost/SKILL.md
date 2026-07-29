---
name: frontend-hyper-boost
description: Architect, build, refactor, or audit distinctive production frontends with motion, parallax, layered storytelling, WebGL/3D, ASCII or pixel aesthetics, reactive hover/focus/touch states, simulator-like interfaces, and strong responsive accessibility. Use for React, Next.js, Vite, portfolios, product sites, dashboards, creative labs, cyberpunk or retro-futurist art direction, Google Stitch handoff, component-library evaluation, and any request that cites Skiper UI, 21st.dev, Cult UI, Watermelon UI, Ali Imam, StyleUI, sci-fi, Y2K techno posters, dystopia, Fallout, Claude Code, or Cyberpunk 2077. Also use when spectacular visual behavior must remain usable on phones, tablets, desktop, TV, keyboard, touch, reduced-motion, and lower-power devices.
---

# Frontend Hyper Boost

Treat visual ambition and product quality as one system. Create original work;
use references to learn interaction grammar, never to clone code or branding.

## REQUIRED — Premium orientation (AI Forge / hyper-boost surfaces)

**Nivel de entrega: PREMIUM.** No es opcional en hub, Operator Arena, factory
floor, agent dossiers, heatmaps de actividad, flujos entre IAs, estados
“IA trabajando/auditando”, heroes ni galerías de referencia.

1. **Leer y aplicar** `references/premium-21st-registry.md` **antes de codificar**.
   Ahí están los 17 anclajes 21st.dev mandados por Abraham (shader cards, hero
   futuristic, sphere/swirl de proceso, partículas de handoff, orrey, galerías,
   barras, círculos de fase, etc.).
2. **Mapear** cada zona de UI a ≥1 ref del registro y documentarlo en el handoff
   (`ref # → zona`). Sin mapeo = trabajo incompleto.
3. **Rechazar** salidas tipo admin panel / lista gris / cards planas cuando el
   brief pida fábrica de agentes, simulador o hyper-boost. El listón es
   Behance mockup del repo + gramática 21st.dev, no un CRUD bonito.
4. **No instalar a ciegas** los `npx shadcn@latest add "https://21st.dev/..."`.
   Usar las URLs como gramática; en vanilla reimplementar con tokens forge; en
   React/shadcn solo tras audit de licencia, a11y, bundle y re-tokenizado.
5. **Estados vivos obligatorios:** si una IA audita, procesa o corre un job
   (aunque el usuario no tenga la app del proveedor abierta), el hub debe
   mostrarlo con orbe/sphere/swirl/circles/bars — nunca solo “loading…”.
6. **Flujos entre IAs** se representan como grafo/partículas/carriles (estilo
   vault Obsidian), no como bullet list de strings.

Si el perfil es `calm` (settings/legal), se puede bajar motion; el **craft
visual** sigue siendo premium (tipografía, profundidad, foco).

## Operating contract

1. Inspect the real repository, existing design system, routes, framework,
   dependencies, deploy target, and local instructions before proposing changes.
2. Read `references/premium-21st-registry.md` when the surface is AI Forge,
   hub, agents, or any boost/ultra creative product UI.
3. State the user journey and the single intended emotional effect.
4. Select one experience profile: `calm`, `boost`, or `ultra`.
5. Select at most three hero interactions. Keep ordinary controls ordinary.
6. Define keyboard, touch, reduced-motion, low-power, and TV equivalents before
   implementing pointer motion.
7. Build the semantic content and critical conversion path first.
8. Add motion, 3D, audio, and shaders as progressively enhanced layers at the
   premium grammar level (not decorative fluff on a flat layout).
9. Test responsive states, accessibility, performance, pricing/consent clarity,
   and failure fallbacks.
10. Record evidence, ref mapping, remaining risks, and the exact next physical
    action.

## Route the work

Read only the references needed for the current request:

- **Premium 21st.dev line (REQUIRED for AI Forge / boost+):**  
  `references/premium-21st-registry.md`
- Color, type, spacing, or theming decisions: `references/design-tokens.md`
- React 19 / Next 15 / Tailwind v4 implementation code: `references/react-patterns.md`
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

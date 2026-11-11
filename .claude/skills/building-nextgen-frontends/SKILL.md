---
name: building-nextgen-frontends
description: Implement production React 19 / Next 15 / Tailwind v4 interfaces for AI Forge and client projects — app-shell cockpit layouts, server-first data flow, client islands, panel primitives, scroll-driven motion, and view transitions. Use when the request is about building, refactoring, or extending frontend code (components, layouts, routing, data fetching, theming) rather than art direction. For visual direction, tokens, and audits defer to frontend-hyper-boost.
---

# Building Nextgen Frontends

Implementation arm of the frontend stack. `frontend-hyper-boost` decides *what it
should feel like*; this skill builds it correctly.

## REQUIRED — Premium bar (do not skip)

AI Forge UIs (hub, Operator Arena, agent rooms, live job states, handoff graphs)
must implement at **PREMIUM** craft level defined in:

`../../../.skills/frontend-hyper-boost/references/premium-21st-registry.md`

- Map zones → 21st.dev refs before coding.
- Live AI process = sphere / swirl / circles / bars (not bare spinners).
- Inter-agent flow = particles / interactive dots / lanes (Obsidian-vault feel).
- shadcn `npx shadcn@latest add "https://21st.dev/r/..."` only after license,
  a11y, bundle audit + re-token to forge tokens. Vanilla hub reimplements
  grammar without requiring shadcn.
- Reject flat admin panels as “done”.

## Operating contract

1. Inspect the repo first: framework version, styling system, existing primitives,
   deploy target. Reuse existing components before writing new ones.
2. For AI Forge / hyper-boost surfaces: read
   `../../../.skills/frontend-hyper-boost/references/premium-21st-registry.md`
   and write the zone→ref map.
3. Apply the canonical token system from
   `../../../.skills/frontend-hyper-boost/references/design-tokens.md`.
4. Follow the executable patterns in
   `../../../.skills/frontend-hyper-boost/references/react-patterns.md`
   (app shell, server-first data, Panel primitive, motion recipes).
5. Server components by default; `"use client"` only at interactive leaves.
6. Mutations through server actions + `useActionState`; optimistic UI with
   `useOptimistic` where latency is visible.
7. Every motion layer ships with reduced-motion, keyboard, and touch equivalents.
8. Verify before claiming done: typecheck, lint, render, and premium ref map.

## Reference layout

The AI Forge cockpit (see `references/app-shell.md`): top command bar, 276px left
rail, fluid center canvas, 358px right inspector, bottom dock. Rails collapse
below `lg`; inspector becomes a sheet. The working example lives in
`app/forge-dashboard.tsx` + `app/globals.css` of this repository.

## Quality gates

- LCP < 2.5s mobile; hero interactive island < 60 kB gzip (lazy-load 3D/particles).
- No horizontal page scroll at any breakpoint; wide content scrolls in its own container.
- Accent discipline: one hero accent per view; contrast ≥ 4.5:1 on `--panel`.
- Premium registry compliance on AI Forge routes (see REQUIRED section).
- Handoff includes `ref # → zone` mapping from `premium-21st-registry.md`.

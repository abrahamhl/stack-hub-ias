---
name: building-nextgen-frontends
description: Implement production React 19 / Next 15 / Tailwind v4 interfaces for AI Forge and client projects — app-shell cockpit layouts, server-first data flow, client islands, panel primitives, scroll-driven motion, and view transitions. Use when the request is about building, refactoring, or extending frontend code (components, layouts, routing, data fetching, theming) rather than art direction. For visual direction, tokens, and audits defer to frontend-hyper-boost.
---

# Building Nextgen Frontends

Implementation arm of the frontend stack. `frontend-hyper-boost` decides *what it
should feel like*; this skill builds it correctly.

## Operating contract

1. Inspect the repo first: framework version, styling system, existing primitives,
   deploy target. Reuse existing components before writing new ones.
2. Apply the canonical token system from
   `../../../.skills/frontend-hyper-boost/references/design-tokens.md`.
3. Follow the executable patterns in
   `../../../.skills/frontend-hyper-boost/references/react-patterns.md`
   (app shell, server-first data, Panel primitive, motion recipes).
4. Server components by default; `"use client"` only at interactive leaves.
5. Mutations through server actions + `useActionState`; optimistic UI with
   `useOptimistic` where latency is visible.
6. Every motion layer ships with reduced-motion, keyboard, and touch equivalents.
7. Verify before claiming done: typecheck, lint, and render the changed route.

## Reference layout

The AI Forge cockpit (see `references/app-shell.md`): top command bar, 276px left
rail, fluid center canvas, 358px right inspector, bottom dock. Rails collapse
below `lg`; inspector becomes a sheet. The working example lives in
`app/forge-dashboard.tsx` + `app/globals.css` of this repository.

## Quality gates

- LCP < 2.5s mobile; hero interactive island < 60 kB gzip.
- No horizontal page scroll at any breakpoint; wide content scrolls in its own container.
- Accent discipline: one hero accent per view; contrast ≥ 4.5:1 on `--panel`.

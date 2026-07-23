---
name: building-nextgen-frontends
description: Build expressive React and Next.js interfaces with motion, scroll narratives, layered 2D or 3D scenes, simulators, cyberpunk or editorial art direction and robust mobile, tablet, desktop and TV behavior. Use for motion-rich, parallax, WebGL, Rive, GSAP, React Three Fiber, interactive portfolios, dashboards, product sites, sci-fi interfaces, pricing or consent flows, and frontend UX audits.
---

# Build next-generation frontends

## Choose an experience tier

- `calm`: semantic DOM, CSS, no required motion.
- `expressive`: Motion or native scroll timelines, selective depth.
- `immersive`: WebGL, audio, shaders or physics behind a quality gate.

Every immersive experience must keep a calm route to the same content and
actions.

## Build around a narrative state

Define:

1. user goal;
2. current act or scene;
3. available action;
4. feedback;
5. exit or recovery.

Do not add effects that communicate none of these.

## Use one engine per responsibility

Read [stack-and-modes.md](references/stack-and-modes.md) before selecting motion
or 3D dependencies. Avoid competing scroll or animation controllers.

## Preserve interaction equivalence

Provide alternatives for:

- hover: focus, click, touch and D-pad;
- parallax: reduced-motion static composition;
- canvas controls: semantic DOM controls;
- audio: captions or visible state;
- drag: buttons or keyboard movement.

Never change page context on focus alone.

## Validate

Read [ux-gates.md](references/ux-gates.md). Test real breakpoints, keyboard,
touch, reduced motion and low-fidelity mode before raising visual complexity.

## Audit imported components

For every external component record:

`source_url`, `license`, `dependencies`, `accessibility`, `performance`,
`last_checked_at`, `changes_made`.

Normalize components to one token system and one primitive foundation.

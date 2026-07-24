---
name: operating-google-stitch
description: Run the Google Stitch design-to-code loop — generate UI explorations in Stitch, evaluate them against the AI Forge design system, and translate the chosen direction into production React/Tailwind code. Use when the user mentions Stitch, design-to-code handoff, generating UI mockups with Google tools, or converting Stitch output into components.
---

# Operating Google Stitch

Adapter skill. The canonical loop lives in
`../../../.skills/frontend-hyper-boost/references/stitch-loop.md` — read it
completely and follow it. Setup runbook: `../../../docs/runbooks/STITCH_SETUP.md`.

## Guardrails specific to this stack

1. Stitch output is an *exploration artifact*, never shipped code. Re-implement
   with the token system (`design-tokens.md`) and patterns (`react-patterns.md`)
   of frontend-hyper-boost.
2. Prompt Stitch with one design direction at a time (see `design-directions.md`);
   record the prompt + chosen variant in the project's docs before implementing.
3. Verify licensing/attribution of any asset Stitch embeds before committing it.
4. After translation, run the frontend audit script
   (`.skills/frontend-hyper-boost/scripts/audit-frontend.ps1`) and record the
   result as an audit note.

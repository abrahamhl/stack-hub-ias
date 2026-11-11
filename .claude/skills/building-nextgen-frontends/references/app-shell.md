# AI Forge app shell — window catalog

Fixed cockpit regions (from AI_FORGE_CODEX_DESIGN_BRIEF.md):

- **Top command bar**: global search, sync state, alerts, model/router selector.
- **Left rail (276px)**: navigation + modes.
- **Center canvas**: the active window.
- **Right inspector (358px)**: details of the selected element.
- **Bottom dock**: Git, tokens, logs, quick commands (mono, uppercase micro-labels).

## Mandatory windows

1. Daily Command Center
2. Operator Arena
3. Operator Dossier Detail
4. Skill Registry Matrix
5. Universal Skill Studio
6. Credit & Subscription Monitor
7. Git Auditor
8. Workflow Router
9. Project Dashboard
10. Data Sources / Sync Center
11. Interface Builder / Design Lab

Each window = one route segment under `app/(shell)/`; the shell layout renders
bars/rails once. Window state that must survive navigation lives in the URL
(searchParams), not in client state.

## Interface Builder requirements

Edit mode toggle; movable blocks; resizable side panels; double-click text edit;
theme/token switching; save/export/import layout presets as JSON; widgets linkable
to operators, skills, routes, sources; notes/tags/local paths/links/docs on any block.

Implementation guidance: keep layout presets as a serializable JSON schema
(`{version, columns, blocks[]}`) persisted via a server action; render blocks from
the schema, never from hardcoded JSX order.

## Truth model (applies to every window)

Never invent data. Every changing datum carries: `source_url`, `source_type`
(official/user_manual/imported/review/inferred), `verification_status`
(verified/needs_review/stale/subjective), `last_checked_at`, `confidence`.
Estimations are never displayed as real usage.

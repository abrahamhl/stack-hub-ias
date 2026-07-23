---
name: operating-google-stitch
description: Route UI ideation, DESIGN.md extraction, screen generation, design variants, and React handoff through Google Stitch. Use when a project explicitly requests Stitch, needs code-to-design or design-to-code work, or must preserve a portable design contract across Codex, Claude, Gemini, or Cursor.
---

# Operating Google Stitch

## Objective

Use Stitch as a bounded design workspace inside AI Forge. Keep `.stitch/DESIGN.md` as the portable contract, preserve source provenance, and validate every generated result in the real frontend.

## Preflight

1. Read `references/setup-and-loop.md`.
2. Check whether Stitch MCP tools are actually present.
3. If absent, report `not connected`; never simulate tool results.
4. Confirm the target project, sensitivity, viewport set, framework, and desired output.
5. Do not upload private, NSFW, client, identity, or credential-bearing assets without explicit approval.

## Routing

- Use `extract-design-md` or `code-to-design` when working from existing frontend code.
- Use `generate-design` for new screens or bounded variants.
- Use `manage-design-system` to apply an approved `.stitch/DESIGN.md`.
- Use `react-components` for the implementation handoff.
- Use `stitch-loop` only after acceptance criteria and a maximum iteration count exist.
- Use `remotion` only for an explicitly requested walkthrough.

Tool names can vary by client. Discover the installed Stitch namespace rather than inventing a prefix.

## Workflow

1. Create or update `.stitch/DESIGN.md` from verified tokens and interaction rules.
2. Define one screen objective, content hierarchy, states, breakpoints, reduced-motion behavior, and acceptance checks.
3. Generate at most three comparable variants.
4. Record the selected direction and rejected tradeoffs.
5. Convert the chosen screen into components without copying placeholder data into production.
6. Run responsive, keyboard, contrast, overflow, performance, and reduced-motion checks.
7. Register the output, source project/screen IDs, verification status, and next action in AI Forge.

## Quality Gates

- A visual change never removes focus visibility, labels, semantic order, or mobile reachability.
- Motion communicates state or hierarchy and has a reduced-motion fallback.
- Generated output uses project tokens; it does not introduce a parallel design system.
- Stitch is a design producer, not the source of operational truth. Git remains authoritative for accepted code.
- A screenshot is evidence of appearance, not evidence of working behavior.

## Examples

```text
Use operating-google-stitch to extract a DESIGN.md from this dashboard,
generate three mobile-first project-card variants, and stop for selection.
```

```text
Use operating-google-stitch to convert the approved Stitch screen to React,
then validate keyboard navigation, 390 px, 768 px, 1440 px and reduced motion.
```

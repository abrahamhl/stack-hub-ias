# AI Forge Command Center — Product Design Specification

## 1. Product promise

AI Forge is a local-first operational desktop for coordinating AI operators, reusable skills, credits, workflows, code changes, and sources of truth without losing context. It is not a landing page, model directory, or generic analytics dashboard.

Its defensible character comes from four correlated systems:

1. **Dual operator identity:** every AI has a human working role and a technical provider identity.
2. **Truth envelope:** changing data always carries origin, verification state, review date, and confidence.
3. **Focus continuity:** the active mission, next action, selected context, risks, and unfinished work remain visible across windows.
4. **Handoff graph:** skills, operators, workflows, files, costs, and reviews are connected instead of living in isolated tools.

## 2. Scope of the first stable product

The first stable version includes:

1. Daily Command Center.
2. Operator Arena with contextual dossier.
3. Skill Registry Matrix.
4. Universal Skill Studio.
5. Credit Monitor.
6. Git Auditor.
7. Interface Builder.

It also includes the fixed application shell, command palette, local persistence, JSON seed data, source-truth indicators, responsive layouts, accessibility states, tests, and handoff documentation.

Excluded until this model is stable:

- real provider APIs;
- credentials or secrets;
- remote databases;
- automatic GitHub actions;
- unrestricted filesystem access;
- terminal process execution from the browser;
- free-form drag-and-drop layout composition.

## 3. Architecture

Use Next.js App Router with TypeScript and static export. The app must work from generated static assets and require no server. React components consume typed repositories rather than importing raw JSON directly.

```text
app routes and shell
        ↓
feature view-models
        ↓
typed repositories
        ↓
validated seed JSON + browser-local overrides
```

Feature boundaries:

- `features/command-center`: prioritization and focus session.
- `features/operators`: roster, selection, capability and dossier.
- `features/skills`: matrix, editor, compatibility and exports.
- `features/credits`: balances, renewals and routing fallbacks.
- `features/git-auditor`: seeded change evidence and review preparation.
- `features/interface-builder`: safe layout presets and token controls.
- `features/command-palette`: global navigation and actions.
- `lib/data`: schemas, repositories and local persistence.
- `components/shell`: topbar, rail, canvas boundary, inspector and dock.
- `components/ui`: small accessible primitives.

No feature may depend on another feature's React components. Cross-feature relationships are expressed through shared IDs and selectors in the data layer.

## 4. Data truth model

Every entity includes provenance. Every volatile value uses a `SourcedValue<T>` wrapper.

```ts
type SourceType =
  | "official"
  | "user_manual"
  | "imported"
  | "review"
  | "inferred";

type VerificationStatus =
  | "verified"
  | "needs_review"
  | "stale"
  | "subjective";

interface SourceMeta {
  source_url: string;
  source_type: SourceType;
  verification_status: VerificationStatus;
  last_checked_at: string;
  confidence: number;
}

interface SourcedValue<T> extends SourceMeta {
  value: T;
}
```

Confidence is constrained to `0..1`. Dates use ISO 8601. Manual and inferred values must never be rendered as verified. Estimates must never be aggregated as actual spend.

Seed collections:

- `operators.json`;
- `skills.json`;
- `credits.json`;
- `workflows.json`;
- `layout-presets.json`;
- `git-changes.json`.

All records use stable IDs. Relations use IDs rather than duplicated text.

## 5. Visual system

The Behance mockup supplies the dark palette and semantic accents, while the references in `src` supply information density, split views, inspector behavior, tables, and restrained operational chrome.

The implemented product deliberately removes the mockup's presentation-layer traits: giant editorial headlines, ornamental gradients, emoji navigation, oversized pills, excessive glow, and repeated rounded cards.

### Tokens

- Background: `#08090C`.
- Raised canvas: `#0D0F14`.
- Panel: `#12151B`.
- Panel raised: `#171B23`.
- Border: `rgba(255,255,255,.08)`.
- Primary text: `#F2F4F8`.
- Secondary text: `#9AA3B2`.
- Forge action: `#FF8A4C`.
- System cyan: `#47D7E8`.
- Intelligence violet: `#9277F4`.
- Verified green: `#65C889`.
- Review amber: `#E5B85C`.
- Risk red: `#E66565`.
- Radius scale: `6, 10, 14px`.
- Focus ring: two pixels with adequate contrast and two-pixel offset.

Typography uses Inter for interface copy, Space Grotesk only for high-level titles, and JetBrains Mono for paths, commands, identifiers, timestamps, and logs. Fonts are bundled or use robust local fallbacks; the app must not require a network request to render.

## 6. App shell

Desktop geometry:

- topbar: 52 px fixed;
- left rail: 228 px expanded, 64 px compact;
- inspector: 320 px resizable between 280 and 420 px;
- bottom dock: 40 px;
- center canvas: fluid and independently scrollable.

The current location, selected entity, active mission, and global status remain visible. `Ctrl/Cmd + K` opens the command palette. The shell remembers rail mode, inspector width, active window, selected record, density, and motion preference.

Responsive behavior:

- below 1180 px the inspector becomes an overlay drawer;
- below 840 px the left rail becomes a compact bottom navigation;
- dense tables use controlled horizontal scrolling and sticky identity columns;
- primary actions remain reachable without hiding context;
- reduced-motion preference disables decorative transitions.

## 7. Window behavior

### Daily Command Center

Shows one primary mission, the next three executable steps, current blocker, expiring resources, and a compact system pulse. Completing a step advances focus. Deferring requires a reason. Secondary telemetry remains subordinate.

### Operator Arena

Provides roster and comparison modes. Selecting an operator updates the right inspector with technical identity, role, best uses, avoid cases, compatible skills, connected workflows, cost surfaces, evidence, and review freshness.

### Skill Registry Matrix

Uses a dense table, not cards. It supports text filtering, platform filtering, status filtering, row selection, and a contextual source inspector. Compatibility cells have accessible text alternatives.

### Universal Skill Studio

Uses a file tree, editor surface, metadata panel, validation results, and export targets. The first version edits local UI state and exports JSON/text through browser downloads; it does not write arbitrary filesystem paths.

### Credit Monitor

Separates subscription, API billing, cloud credits, agent credits, manual counters, and estimates. It shows renewals, freshness, confidence, and fallback workflows. Unknown values display as unknown, never zero.

### Git Auditor

The first version visualizes seeded/imported change records. It filters by authoring agent, risk, role, and test status and generates a review summary locally. Real Git process access is a later desktop bridge.

### Interface Builder

The stable first version edits safe layout properties: preset, density, rail mode, inspector width, visible widgets, widget order, and theme accent. It can import and export validated layout JSON. Arbitrary content editing and free positioning remain excluded.

## 8. Interaction and accessibility

- All actions are keyboard reachable.
- Focus order follows the visible shell.
- Icon-only actions have accessible names and tooltips.
- Selected, stale, risky, and verified states are not communicated by color alone.
- Loading, empty, error, and no-results states are designed explicitly.
- Tap targets are at least 40 px in the compact interface.
- The app supports reduced motion and two density levels.
- Destructive-looking actions require confirmation even when they only affect local state.

## 9. Testing strategy

Use Vitest and Testing Library for schemas, selectors, repositories, persistence, filters, focus flow, command palette, layout import validation, and source rendering. Use Playwright for the primary workflow and responsive shell.

Required gates:

1. TypeScript passes without suppressed errors.
2. ESLint passes.
3. Unit and component tests pass.
4. Production build and static export pass.
5. Desktop and mobile Playwright journeys pass.
6. Keyboard navigation and visible focus are manually checked.
7. Final browser screenshots are compared against the accepted visual direction.
8. No `.env`, credentials, remote URLs, or Git remotes are introduced.

## 10. Legacy and project safety

Move existing HTML files to `data/imports/legacy-html/` without changing their contents. Preserve the research report, design brief, and visual references. Record all migrations in Markdown.

Work remains inside `C:\Users\2fabr\Desktop\stack-hub-IAs`. The local Git repository must have no remote. No GitHub commands, network deployments, or external file mutations are permitted.

## 11. Delivery phases

1. Safety baseline, local Git, legacy relocation and documentation.
2. Next.js foundation, design tokens, schemas and seed repositories.
3. Fixed AppShell, responsive rules and command palette.
4. Daily Command Center and focus continuity.
5. Operator Arena and Skill Registry.
6. Skill Studio and Credit Monitor.
7. Git Auditor and Interface Builder.
8. Cross-feature correlations, accessibility, performance and visual QA.
9. Obsidian-compatible audit, handoff notes and final verification report.

## 12. Acceptance criteria

The product is accepted when all seven windows are reachable and meaningfully interactive; live-looking values are sourced; state survives reloads; primary workflows work by keyboard; the shell responds professionally at desktop and mobile widths; legacy files remain intact; automated gates pass; and another engineer can continue from the documentation without guessing architectural intent.

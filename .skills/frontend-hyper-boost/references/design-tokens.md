# AI Forge design tokens — dark premium system

Canonical token source: extracted from `ai-forge-behance-mockup.html` (Behance/Chromia
dark-premium direction). Use these exact values unless the project already has its own
design system. Never invent parallel palettes.

## Core palette

| Token | Value | Role |
|---|---|---|
| `--bg` | `#07080b` | Page background (near-black, blue-tinted) |
| `--panel` | `#11141b` | Elevated surfaces, cards, rails |
| `--text` | `#eef2ff` | Primary text (cool white) |
| `--muted` | `#99a2b7` | Secondary text |
| `--dim` | `#687187` | Tertiary/disabled text |
| `--line` | `rgba(255,255,255,.10)` | Hairline borders |
| `--soft` | `rgba(255,255,255,.055)` | Subtle fills, hover washes |

## Accent spectrum (one hero accent per view, others as data semantics)

| Token | Value | Semantic |
|---|---|---|
| `--forge` | `#ff8a4c` | Brand hero — CTAs, active nav, brand moments |
| `--cyan` | `#37e8ff` | Live/streaming state, links |
| `--purple` | `#9b7cff` | AI/agents, model identity |
| `--blue` | `#6aa8ff` | Info, neutral data series |
| `--green` | `#74e089` | Success, healthy status |
| `--yellow` | `#ffd166` | Warning, credits low |
| `--red` | `#ff5b5b` | Error, destructive |
| `--pink` | `#ff5ca7` | Highlight, secondary hero only in `ultra` profile |

## Shape, depth, layout

- `--radius: 28px` — large friendly radius on panels; use `radius/2` for inner controls.
- `--shadow: 0 30px 100px rgba(0,0,0,.55)` — single dramatic shadow tier; do not stack.
- App shell columns: left rail `276px`, right inspector `358px`, fluid center canvas.

## Typography

- Display: `'Space Grotesk', Inter, sans-serif` — headings, hero numerals.
- Body/UI: `Inter, system-ui, sans-serif`.
- Data/code: `'JetBrains Mono', ui-monospace, monospace` — metrics, ids, terminal blocks.
- Editorial rhythm: oversized display headings, tight tracking, generous panel padding;
  dense mono micro-labels in uppercase for system state.

## Tailwind v4 mapping

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #07080b;
  --color-panel: #11141b;
  --color-ink: #eef2ff;
  --color-muted: #99a2b7;
  --color-dim: #687187;
  --color-forge: #ff8a4c;
  --color-cyan: #37e8ff;
  --color-purple: #9b7cff;
  --color-blue: #6aa8ff;
  --color-green: #74e089;
  --color-yellow: #ffd166;
  --color-red: #ff5b5b;
  --color-pink: #ff5ca7;
  --radius-panel: 28px;
  --font-display: "Space Grotesk", "Inter", sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --shadow-forge: 0 30px 100px rgb(0 0 0 / 0.55);
}
```

Usage: `bg-bg text-ink`, `bg-panel rounded-panel shadow-forge`,
`border border-white/10` (maps `--line`), `bg-white/[.055]` (maps `--soft`).

## Rules

1. One hero accent per view (`--forge` by default). Other accents only carry meaning.
2. Hairlines over fills: separate regions with `--line`, not solid dividers.
3. Glow is earned: reserve glows/gradients for live state and hero interactions.
4. Light theme is a deliberate counterpoint (warm paper `#f6f2ea`, ink `#141414`),
   not an automatic inversion. Ship dark-first.
5. Every accent pairs with text `--text` at ≥4.5:1 on `--panel`; verify before shipping.

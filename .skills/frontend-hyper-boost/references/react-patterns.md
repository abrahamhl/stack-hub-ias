# React 19 / Next 15 / Tailwind v4 executable patterns

Concrete code, not prose. Pair with `design-tokens.md` for values and
`interaction-patterns.md` for behavior rules.

## App shell (the AI Forge cockpit layout)

Fixed cockpit: top command bar, left rail (276px), center canvas, right inspector
(358px), bottom dock. Collapse rails below `lg`; inspector becomes a sheet.

```tsx
// app/(shell)/layout.tsx — server component
export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-dvh grid-rows-[56px_1fr_44px] bg-bg text-ink">
      <CommandBar className="border-b border-white/10" />
      <div className="grid min-h-0 grid-cols-[276px_1fr] xl:grid-cols-[276px_1fr_358px]">
        <LeftRail className="border-r border-white/10 max-lg:hidden" />
        <main className="min-w-0 overflow-y-auto p-6">{children}</main>
        <Inspector className="border-l border-white/10 max-xl:hidden" />
      </div>
      <BottomDock className="border-t border-white/10 font-mono text-xs" />
    </div>
  );
}
```

Key details: `min-h-0`/`min-w-0` on grid children so inner scroll works;
`h-dvh` not `h-screen` (mobile URL bar).

## Server-first data, client islands

```tsx
// Server component fetches; client island animates.
export default async function OperatorArena() {
  const operators = await getOperators(); // direct DB/fs call, no API hop
  return <ArenaGrid operators={operators} />; // "use client" leaf
}
```

- Default to server components. `"use client"` only at interactive leaves.
- Mutations: server actions + `useActionState` (React 19), not hand-rolled fetch.
- Optimistic UI: `useOptimistic` for instant feedback on slow mutations.

```tsx
"use client";
const [state, submit, pending] = useActionState(saveSkillAction, initial);
```

## Panel primitive (single card system)

```tsx
export function Panel({ accent = "forge", children, ...rest }: PanelProps) {
  return (
    <section
      data-accent={accent}
      className="rounded-panel border border-white/10 bg-panel p-5 shadow-forge
                 data-[accent=cyan]:[--hero:var(--color-cyan)]
                 [--hero:var(--color-forge)]"
      {...rest}
    >
      {children}
    </section>
  );
}
```

One primitive, accent via data attribute — never N nearly-identical card components.

## Scroll-driven motion (CSS-first, JS fallback-free)

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: rise linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 60%;
  }
}
@keyframes rise { from { opacity: 0; translate: 0 24px; } }
@media (prefers-reduced-motion: reduce) { .reveal { animation: none; } }
```

No IntersectionObserver boilerplate when `animation-timeline` covers it; content
must be fully readable with the animation removed.

## View transitions between routes

```tsx
// next.config.ts → experimental: { viewTransition: true }
// Shared element: give both pages the same style
<h1 style={{ viewTransitionName: `skill-${id}` }}>{name}</h1>
```

Guard: transitions are decoration; navigation must work identically without them.

## Hover/pointer reactive states (touch-safe)

```tsx
"use client";
function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="transition-transform duration-200 will-change-transform
                 motion-reduce:!transform-none"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return; // touch: no tilt
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current!.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      }}
      onPointerLeave={() => (ref.current!.style.transform = "")}
    >
      {children}
    </div>
  );
}
```

## Performance gates (enforced, not aspirational)

- `next/font` for Space Grotesk/Inter/JetBrains Mono — zero layout shift.
- Dynamic-import WebGL/3D scenes (`next/dynamic`, `ssr: false`) behind
  `matchMedia("(prefers-reduced-motion: no-preference)")` + `navigator.hardwareConcurrency > 4`.
- Budget: LCP < 2.5s on mid-range mobile, hero JS island < 60 kB gzip.
- Every shader/canvas has a static poster fallback rendered server-side.

# AI Forge — registro premium 21st.dev (ORIENTACIÓN REQUERIDA)

**Fuente de mandato:** Abraham, 2026-07-25.  
**Nivel mínimo de entrega visual:** **PREMIUM** (Behance / 21st.dev / simulador).  
**Prohibido entregar** paneles admin planos, listas grises o “dashboards de plantilla”
cuando el trabajo sea AI Forge hub, Operator Arena, factory floor, o cualquier
superficie marcada hyper-boost / boost / ultra.

## Cómo usar este archivo (contrato)

1. **No es un catálogo para instalar a ciegas.** Es gramática visual y de
   interacción. Clonar marca/código tal cual está prohibido por el skill padre.
2. **Sí es obligatorio** mapear cada superficie del producto a ≥1 referencia de
   este registro y declarar el mapeo en el handoff (`refs usadas → zona UI`).
3. En repos **React/Next + shadcn**, se puede *evaluar* instalación con:
   `npx shadcn@latest add "<url>"` — solo tras audit de licencia, a11y, bundle y
   tokens AI Forge (`design-tokens.md`).
4. En repos **estáticos (hub/ vanilla)** o sin shadcn: **reimplementar la
   gramática** con CSS/SVG/Canvas/WebGL progresivo + tokens del forge. No
   abandonar el nivel premium por “no hay shadcn”.
5. Siempre: `prefers-reduced-motion`, teclado/touch equivalentes, lazy-load de
   capas caras, un acento héroe por vista.

## Línea estética canónica (AI Forge)

| Capa | Qué debe sentirse | Refs ancla |
|---|---|---|
| Hero / entrada | Futurista, espacial, inmersivo sin esconder CTA | #2 hero-futuristic, #6 globe-hero, #16 wavy-background |
| Superficies / cards | Shader depth, spotlight, material field | #1 feature-shader-cards, #3 spotlight-card, #7 background-boxes |
| Agente activo / audit / process | Esfera, swirl, órbitas — **estado vivo visible** | #4 sphere, #5 swirl, #17 background-circles |
| Flujos entre IAs / handoffs | Partículas, dots, grafo tipo vault Obsidian | #8 fluid-particles-bg, #9 fluid-particle, #10 interactive-dots |
| Sistema / mapa de agentes | Orrey, cosmos orbit, galería orbital | #11 celestial-orrery, #12 cosmos-3d-orbit-gallery |
| Galerías / referencias UX | Circular / portfolio gallery | #13 circular-gallery-2, #14 portfolio-gallery |
| Métricas / heatmap / fases | Barras verticales + círculos de fase | #15 vertical-bars, #4 sphere, #17 background-circles |

**Dirección primaria del producto:** *Fallout shelter factory* + *cyberpunk
layered city* ejecutadas al **nivel 21st.dev premium**, no al nivel “admin CRUD”.

**Counterpoint calm:** *Claude-code editorial* solo en settings, config, legal y
lectura larga — nunca como look del Factory Floor.

---

## Registro numerado (instaladores de referencia)

> Prefijo de comando (solo proyectos shadcn-ready):  
> `npx shadcn@latest add "<URL>"`

| # | URL 21st.dev | Rol en AI Forge (REQUERIDO mapear) |
|---|---|---|
| 1 | `https://21st.dev/r/moazamtrade/feature-shader-cards` | **Feature / agent cards** con profundidad shader. Salas del floor, skill cards, feature blocks. No cards planas. |
| 2 | `https://21st.dev/r/larsen66/hero-futuristic` | **Hero de producto / entrada al nodo.** Primera impresión premium. Landing del hub y overview. |
| 3 | `https://21st.dev/r/easemize/spotlight-card` | **Focus / selección.** Card con spotlight al hover/focus. Inspector items, skill activa, issue seleccionada. |
| 4 | `https://21st.dev/r/designali-in/sphere` | **Estado de trabajo de una IA** (auditando, procesando, heatmap vivo, “busy”). Esfera / orbe de actividad por agente. |
| 5 | `https://21st.dev/r/designali-in/swirl` | **Procesamiento continuo** (stream, reasoning loop visual). Transición entre fases de un job. |
| 6 | `https://21st.dev/r/chowlol202/globe-hero` | **Nodo global / multi-surface.** Hero o mapa “todas las IAs conectadas al repo”. |
| 7 | `https://21st.dev/r/manuarora700/background-boxes` | **Fondo de profundidad** en canvas principal. Grid/boxes que dan volumen sin robar foco al contenido. |
| 8 | `https://21st.dev/r/bundui/fluid-particles-background` | **Flujos entre IAs** (handoffs, pipeline). Fondo de partículas para grafo de trabajo activo estilo vault Obsidian. |
| 9 | `https://21st.dev/r/designali-in/fluid-particle` | Variante de #8 a escala de panel: **carril de handoff** o mini-grafo entre 2–3 agentes. |
| 10 | `https://21st.dev/r/designali-in/interactive-dots` | **Mapa de nodos interactivo** (agentes, skills, issues). Clic = entrar en sala / dossier. |
| 11 | `https://21st.dev/r/dhileepkumargm/celestial-orrery` | **Sistema solar de agentes** — vista “fábrica” premium: cada cuerpo = operador, órbita = relación. |
| 12 | `https://21st.dev/r/vaib215/cosmos-3d-orbit-gallery` | **Galería orbital 3D** de referencias, skills o artefactos del vault. |
| 13 | `https://21st.dev/r/ravikatiyar162/circular-gallery-2` | **Galería circular** de capturas UX / referencias de diseño (`src/`). |
| 14 | `https://21st.dev/r/isaiahbjork/portfolio-gallery` | Alternativa portfolio-grade para **showcase de referencias** y entregables. |
| 15 | `https://21st.dev/r/uilayout.contact/vertical-bars` | **Heatmap / métricas / actividad** (commits, carga, créditos relativos). Barras animadas, no tablas grises. |
| 16 | `https://21st.dev/r/manuarora700/wavy-background` | **Fondos de atmósfera** en heroes y rooms; motion calmado si reduced-motion. |
| 17 | `https://21st.dev/r/kokonutd/background-circles` | **Fases de producción y jobs independientes.** Cuando una IA ejecuta un proceso (tenga o no la app abierta en el cliente), el estado de fase se ve en el hub: círculos/anillos de fase, no un spinner genérico. |

---

## Mapa producto → refs (AI Forge hub / Operator Arena)

| Zona del producto | Refs mínimas | Efecto emocional |
|---|---|---|
| Factory Floor (mapa agentes) | 10, 11, 8 | “Estoy dentro de un sistema vivo” |
| Sala / dossier de un agente | 1, 3, 4 | “Esta IA tiene presencia y stack” |
| IA auditando / procesando / busy | 4, 5, 17 | “Hay trabajo real en curso” |
| Handoffs / flujos entre IAs | 8, 9, 10 | “Obsidian vault de trabajo, no chat suelto” |
| Heatmap / commits / métricas | 15, 4 | “Pulso del nodo” |
| Galería de referencias UX | 13, 14, 12 | “Dirección visual, no carpetazo” |
| Hero / onboarding / bootstrap | 2, 6, 16 | “Premium desde el primer frame” |
| Créditos / fases de producción | 17, 15, 3 | “Estado de fábrica legible” |
| Fondo global del canvas | 7, 16 | Profundidad sin ruido |

---

## Gates de rechazo (fallar = trabajo no aceptable)

Un entregable se **rechaza** si:

1. El Factory Floor o Operator Arena se ve como **tabla + cards planas** sin capa
   espacial / partículas / orbes / profundidad shader (aunque sea CSS-only).
2. Un estado “IA trabajando / auditando” se reduce a texto “loading…” sin
   representación visual (sphere / swirl / circles / bars).
3. Los flujos entre agentes son solo una lista de strings sin grafo, carril o
   partículas de conexión.
4. No hay mapeo escrito `ref # → zona` en el handoff.
5. Se copió un bloque 21st.dev sin re-tokenizar a `design-tokens.md` o sin
   fallback reduced-motion.
6. Nivel visual por debajo de Behance mockup (`ai-forge-behance-mockup.html`)
   del repo.

## Intake checklist (antes de `npx shadcn add`)

1. Abrir URL en navegador: default / hover / focus / touch / reduced-motion.
2. Licencia y dependencias (Three, R3F, shaders, framer…).
3. ¿Cabe en el presupuesto de bundle de la ruta?
4. Reescribir colores a tokens forge (`#07080b`, `#11141b`, `#ff8a4c`, …).
5. Equivalentes teclado + pause/quality si hay motion persistente.
6. Registrar provenance en handoff: URL, fecha, modificaciones.

## Comandos de evaluación (copiar/pegar)

Solo en proyectos con shadcn configurado. **No** ejecutar en masa en el hub
estático sin plan de React.

```bash
npx shadcn@latest add "https://21st.dev/r/moazamtrade/feature-shader-cards"
npx shadcn@latest add "https://21st.dev/r/larsen66/hero-futuristic"
npx shadcn@latest add "https://21st.dev/r/easemize/spotlight-card"
npx shadcn@latest add "https://21st.dev/r/designali-in/sphere"
npx shadcn@latest add "https://21st.dev/r/designali-in/swirl"
npx shadcn@latest add "https://21st.dev/r/chowlol202/globe-hero"
npx shadcn@latest add "https://21st.dev/r/manuarora700/background-boxes"
npx shadcn@latest add "https://21st.dev/r/bundui/fluid-particles-background"
npx shadcn@latest add "https://21st.dev/r/designali-in/fluid-particle"
npx shadcn@latest add "https://21st.dev/r/designali-in/interactive-dots"
npx shadcn@latest add "https://21st.dev/r/dhileepkumargm/celestial-orrery"
npx shadcn@latest add "https://21st.dev/r/vaib215/cosmos-3d-orbit-gallery"
npx shadcn@latest add "https://21st.dev/r/ravikatiyar162/circular-gallery-2"
npx shadcn@latest add "https://21st.dev/r/isaiahbjork/portfolio-gallery"
npx shadcn@latest add "https://21st.dev/r/uilayout.contact/vertical-bars"
npx shadcn@latest add "https://21st.dev/r/manuarora700/wavy-background"
npx shadcn@latest add "https://21st.dev/r/kokonutd/background-circles"
```

## Relación con otras refs del skill

- Tokens exactos: `design-tokens.md`
- Direcciones narrativas: `design-directions.md` (este registro **fija el listón**)
- Patrones de interacción: `interaction-patterns.md`
- Código React: `react-patterns.md`
- Stack: `stack-routing.md`
- A11y/perf: `responsive-accessibility.md`

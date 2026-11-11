# WORK ORDER — Hub v2 frontend (para el agente ejecutor)

- Task ID: HUB-V2-001
- Emisor: claude-fable (arquitecto/director) · Fecha: 2026-07-25
- Ejecutor previsto: Grok CLI / Antigravity / Composer (cualquiera que abra este repo en local)
- Rama de trabajo: crear `feat/hub-v2` desde `hyper-boost`. PROHIBIDO tocar `master` y `public` directamente.
- Presupuesto: el de tu plataforma. Reporta tokens/coste en el handoff final.

## Contrato previo (obligatorio, en este orden)

1. Lee `AGENTS.md` (protocolo del nodo) y `SOUL.md` (identidad). Los cumples enteros.
2. Lee las skills que gobiernan este trabajo — son archivos, no necesitas "instalar" nada:
   - `.skills/frontend-hyper-boost/SKILL.md` → y de sus references, como mínimo:
     `design-tokens.md` (paleta/tipografía/reglas EXACTAS), `react-patterns.md`,
     `interaction-patterns.md`, `responsive-accessibility.md`, `design-directions.md`.
   - `.agents/skills/building-nextgen-frontends/SKILL.md` + `references/app-shell.md`.
3. Contexto de producto: `docs/architecture/HUB_ROADMAP.md` (construyes la **Fase 1**,
   con la dirección visual preparada para Fase 3) y `docs/architecture/CENTRAL_NODE_DECISION.md`.
4. Punto de partida: `hub/index.html`, `hub/catalog.json`, `hub/bootstrap.txt` (v1 funcional).

## Encargo (alcance Fase 1 — cerrado)

Evolucionar `hub/` manteniendo la arquitectura **estática sin build y GitHub como
único backend** (API pública sin token; token PAT opcional solo desde localStorage):

1. **Heatmap de actividad**: calendario tipo contribution-graph generado desde
   commits (GitHub API, últimos 90 días), por día y por autor/agente.
2. **Panel de créditos/usos**: tarjetas por proveedor (Claude, ChatGPT, Gemini,
   Grok, Manus, Vertex) con truth model visible — cada dato lleva
   `verified|manual|estimated` + `last_checked_at`. Datos manuales se editan
   in-page y se exportan como JSON listo para commit (`hub/credits.json`).
   NUNCA presentar estimación como uso real.
3. **Feed de novedades oficiales**: sección que lee `hub/sources.json` (créalo)
   con canales oficiales por IA (changelog/blog/status URL) y muestra
   último-check manual. Sin scraping automático en v2.
4. **Galería de referencias**: grid con las capturas de `src/` (webp/png ya
   existentes) con lightbox accesible, para vincular decisiones visuales.
5. **Pulido cockpit**: mantener las 5 ventanas actuales; navegación por teclado
   completa; estados de error visibles (nada de paneles vacíos silenciosos).

## Restricciones duras (violarlas = trabajo rechazado)

- Tokens EXACTOS de `design-tokens.md`: bg #07080b, panel #11141b, forge #ff8a4c
  como único acento héroe, radius 28px, Space Grotesk/Inter/JetBrains Mono.
  Un acento héroe por vista; el resto de colores solo como semántica de datos.
- `prefers-reduced-motion` respetado en todo; touch/teclado equivalentes al hover.
- Sin frameworks ni bundlers: HTML+CSS+JS vanilla en archivos dentro de `hub/`.
  Sin dependencias CDN salvo Google Fonts ya presente.
- Sin analítica, sin cookies, sin llamadas a servicios que no sean api.github.com.
- Privacidad: nada de rutas locales absolutas, nombres personales ni datos de
  facturación reales hardcodeados. `hub/credits.json` nace con placeholders
  `estimated`.
- La metáfora visual (dirección "Fallout shelter factory" de design-directions.md
  puede insinuarse en Fase 1) JAMÁS oculta navegación ni estado.

## Definición de hecho (verifícalo tú antes de entregar)

- [ ] Abre `hub/index.html` como archivo local y todo renderiza sin consola roja.
- [ ] Con red: commits/issues/heatmap cargan contra el repo público o con PAT.
- [ ] Sin red: la página degrada con mensajes claros, no en blanco.
- [ ] 375px, 768px, 1280px sin scroll horizontal del body.
- [ ] Lighthouse (o equivalente) accesibilidad ≥ 95.
- [ ] `git log` muestra commits atómicos `feat(hub): …` en `feat/hub-v2`.

## Entrega (obligatoria)

1. Commits en `feat/hub-v2` + push a origin si tienes credenciales; si no,
   deja la rama local y decláralo.
2. Rellena un HANDOFF_PACKET (plantilla en `docs/workflows/templates/`) como
   `docs/workflows/handoffs/2026-07-25-hub-v2-RESULT.md`, incluyendo
   tokens/coste reales y riesgos pendientes.
3. Nota de auditoría: si tienes el MCP abraham-os, `write_audit_note`
   (actor: tu nombre); si no, añade la nota como archivo en el handoff y
   márcala "pendiente de registro MCP".
4. NO toques: `mcp/`, `docs/` (salvo tu handoff), `.skills/`, `.agents/`,
   `app/`, ramas `master`/`public`.

## Siguiente acción única del ejecutor

Crear `feat/hub-v2`, leer los 8 archivos del contrato previo, y empezar por el
heatmap (es la pieza con más valor/esfuerzo).

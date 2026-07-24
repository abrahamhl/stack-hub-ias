# Handoff

- Task ID: HUB-V2-001
- Agente/modelo/versión: grok-4.5 (Grok Build CLI) · actor `grok-cli`
- Rama/worktree: `feat/hub-v2` (desde `hyper-boost`)
- Commit: ver `git log feat/hub-v2 --oneline` tras merge de esta entrega
- Tiempo: sesión 2026-07-25
- Tokens/coste: no expuesto por la superficie Grok Build en esta sesión (no inventado). Coste de plataforma del operador = el de la suscripción/CLI en uso.

## Resultado

Hub v2 Fase 1 entregado como cockpit **estático** (HTML+CSS+JS vanilla, sin bundler):

1. **Heatmap 90d** — contribution-graph desde GitHub API (paginación hasta 8×100 commits), intensidad por día, desglose por autor/agente (mapeo heurístico Claude/Codex/Gemini/Grok/Manus/SAH).
2. **Panel créditos** — `hub/credits.json` con truth model (`verified|manual|estimated` + `last_checked_at` + `source`). Edición in-page + export JSON para commit. Placeholders `estimated` sin datos de facturación reales.
3. **Novedades** — `hub/sources.json` con canales oficiales; check manual (localStorage); sin scraping.
4. **Galería** — `hub/gallery.json` → 13 capturas de `../src/` + lightbox accesible (Esc, flechas, focus, diálogo modal).
5. **Pulido** — ventanas v1 conservadas; rail + nav móvil; skip link; `prefers-reduced-motion`; errores visibles (no paneles en blanco); reintento online/offline.

## Archivos cambiados

| Archivo | Acción |
|---|---|
| `hub/index.html` | reescrito (estructura v2) |
| `hub/hub.css` | nuevo (tokens hyper-boost) |
| `hub/hub.js` | nuevo (GitHub + datos locales) |
| `hub/credits.json` | nuevo |
| `hub/sources.json` | nuevo |
| `hub/gallery.json` | nuevo |
| `docs/workflows/handoffs/2026-07-25-hub-v2-RESULT.md` | este handoff |
| `.ai-forge/audit/*hub-v2*` | nota de auditoría |

Sin tocar: `mcp/`, `.skills/`, `.agents/`, `app/`, `master`, `public`.

## Verificación ejecutada

| Check | Estado |
|---|---|
| JSON válidos (credits/sources/gallery) | OK (node parse) |
| Rutas gallery → `src/` existen | OK (0 missing) |
| `node --check hub/hub.js` | OK |
| Abrir `hub/index.html` local | **pendiente humano** (doble clic o `npx serve` desde raíz del repo) |
| Con red: commits/heatmap | **pendiente humano** (PAT si solo privado) |
| Sin red: mensajes de error | implementado en código; no re-probado en browser aquí |
| 375 / 768 / 1280 sin scroll-x body | CSS con clamp + overflow-x solo en heatmap wrap; **pendiente visual humano** |
| Lighthouse a11y ≥ 95 | **no ejecutado** en esta sesión (sin Chrome headless garantizado) |

## Decisiones y supuestos

- Profile **boost** calmado: un acento héroe (`--forge`); heatmap monócromo forge; autores con color semántico en leyenda.
- Galería apunta a `../src/…` (sin copiar binarios a `hub/`) para no duplicar assets. Deploy Hostinger de solo `hub/` requiere también `src/` o re-copiar capturas.
- Repo leído: PAT → privado `stack-hub-ias`; sin PAT → público `stack-hub-ias-public`.
- Checks de novedades en localStorage (no se pueden commitear solos); créditos sí exportan archivo commiteable.
- No se copió material de `src/avatar/` (posible personal).

## Riesgos pendientes

1. Repo público vacío/inexistente → heatmap/KPIs fallan hasta PAT o publicación del catálogo.
2. Rate limit GitHub API sin token (60/h) en heatmap con muchas páginas.
3. Lighthouse a11y no medido aquí.
4. Nombres de archivo en `src/` con espacios y tildes: OK en paths relativos; algunos hosts viejos pueden fallar con encoding.
5. Push a `origin` depende de credenciales del operador.

## Score

- Alcance Fase 1 work order: **cubierto en código**
- Evidencia browser/Lighthouse: **parcial** (estática sí, runtime humano no)
- Cumplimiento restricciones tokens/vanilla/privacidad: **sí**

## Siguiente acción única

Abrir `C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\hub\index.html` en el navegador (idealmente sirviendo la raíz del repo), pegar PAT de solo lectura en Config si hace falta, y validar heatmap + lightbox a 375px.

# Hub Roadmap — de vista estática a fábrica visual (Fallout Shelter)

Registro completo de la visión de Abraham (2026-07-24) para que ninguna idea se
pierda, faseado por coste/valor. Objetivo final declarado: **superar a Manus —
romper la barrera de necesitar computación masiva para ser competente con IAs.**

## NORTE (2026-07-25) — leer primero

**Orientación canónica:** `PRODUCT_ORIENTATION.md`

- UI del hub = puesto de mando (donde Abraham opera).
- GitHub privado = backend / infra (skills, issues, commits).
- Chats de proveedores = brazos; cada chat nuevo **va al stack**, no a la memoria
  del proveedor.
- Editar skills en la UI = editar el repo (todas las IAs lo ven).
- Réplica de menús tipo config/plugins/skills de IDE/GitHub donde encaje.
- **No** es “usar PowerShell como producto”; la consola solo arranca la vista local.

## Fase 0 — HECHA (hub v1, estático)

Cockpit dark-premium (tokens frontend-hyper-boost): estado del nodo en vivo
(GitHub API), Skill Registry Matrix (catalog.json), tableros (Issues), protocolo
copiable (bootstrap.txt), auditoría (commits), modo privado con PAT en
localStorage. Cero backend, desplegable en Hostinger.

## Fase 1 — Operativa diaria (barato, siguiente)

- Heatmap de actividad real desde commits + notas de auditoría (GitHub API, sin backend).
- Panel de créditos/usos por proveedor con truth model (`verified/manual/estimated`)
  — datos manuales asistidos donde no haya API (modelo del deep-research).
- Fuentes de actualización: feed de changelogs oficiales de cada IA (RSS/JSON
  público) con estado `last_checked_at`.
- Selector/captura: galería de capturas de interfaces (src/ ya tiene referencias)
  enlazables a issues.

## Fase 2 — Editor y tiempo real (requiere backend mínimo) — **PRIORIDAD PRODUCTO**

Alineado a `PRODUCT_ORIENTATION.md`:

- **Skill/Plugin Config UI** (réplica de menú de skills/plugins): listar, abrir,
  editar SKILL.md canónico, owners por agente; **Guardar = commit en el repo**
  (GitHub Contents API + PAT write acotado, o patch descargable).
- Modo editor tipo WordPress del hub in-place → commit (sin servidor propio).
- Tablero “quién hace qué / ideas nuevas / skills a coger” (Issues + audit + job_state).
- Sincronización: webhook GitHub → rebuild o polling ligero.
- Documentos enlazados: índice en repo + Drive para artefactos pesados.
- Terminal de sala: contexto de carga del nodo + deep-link al brazo (no sustituir
  aún al chat del proveedor; sí forzar que el brazo arranque desde el stack).

## Fase 3 — Fallout Shelter (la fábrica como videojuego)

Dirección artística ya codificada en
`.skills/frontend-hyper-boost/references/design-directions.md` ("Fallout shelter
factory": salas, habitantes, carriles de producción, medidores, interruptores).

- Cada **guarida/sala = un agente** (Claude, Codex, Gemini, Grok, SAH, Manus):
  dentro se ve su rol, skills cargadas, tareas activas, créditos, consola API,
  canal oficial de novedades y sus registros.
- Vista de producción: tareas fluyendo entre salas (handoffs), pipeline visible,
  versiones y heatmaps por sala.
- Comunicación directa: cada sala tiene su "terminal" (deep-link a la superficie
  real + bloque bootstrap) y su buzón (issues asignadas).
- Regla del canon: la metáfora nunca oculta navegación ni estado (ya es gate de
  la skill). Motor: HTML/CSS/SVG primero; WebGL solo si aporta (progressive).

## Fase 4 — SAH / Vertex (romper la barrera de cómputo)

- Integrar el SAH engine (investigación Gemini): AST local + Tree-sitter +
  bucle linter/compilador, consumiendo los €1.066 de Vertex como backend puntual.
- RAG/graph frugal: grafo de dependencias local + índice del repo (sin vector DB
  cloud); loops deterministas antes de tokens.
- VS Code hyper-boosteado (estilo Cursor a tu manera): extensión que lee este
  nodo (skills, protocolo, tools.json) — investigaciones ya en curso.

## Regla de inversión

Gratis primero (GitHub API/Actions/Pages, Hostinger ya pagado, Drive ya pagado,
Vertex ya pagado). Pago nuevo solo con justificación escrita en el changelog.

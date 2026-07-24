# AI Forge changelog

## 2026-07-24 — Nodo GitHub activo, hub v1, protocolo universal

### Added

- Nodo GitHub privado conectado y pusheado (`kinkydisorder/stack-hub-ias`).
- `CLAUDE.md`, `AGENTS.md`, `SOUL.md`, `forge.config.yaml`, `.agents/tools.json`:
  protocolo, identidad y config central machine-readable.
- `docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md` + `hub/bootstrap.txt`: bloque
  único para cualquier IA, con reset de memoria ("RESET FORGE").
- `hub/`: cockpit estático (tokens hyper-boost) que lee GitHub como backend —
  estado, Skill Registry (catalog.json), tableros (Issues), auditoría.
- `.claude/skills/` espejo (7 skills autocargadas) y
  `.skills/00_CLAUDE_LIVE/REGISTRY.md` (inventario Claude).
- `docs/architecture/CENTRAL_NODE_DECISION.md` y `HUB_ROADMAP.md` (fases hasta
  Fallout-Shelter view y SAH/Vertex).

### Coste de tokens (transparencia, sesión 2026-07-24)

- Workflow de 3 subagentes: ~207k tokens; solo `catalog-extract` terminó.
  `privacy-sweep` y `repo-health` murieron al alcanzarse el límite mensual de
  gasto de la cuenta. Lección aplicada: prohibido fan-out de agentes salvo
  justificación escrita; trabajo inline por defecto (regla en SOUL.md).

### Not yet connected

- Repo público `stack-hub-ias-public` (comandos listos, los ejecuta Abraham).
- Deploy del hub en Hostinger (subir `hub/` por hPanel).
- Fases 1–4 del roadmap del hub.

## 2026-07-23 — Workflow multi-IA y onboarding MCP

- Añadida `docs/workflows` con workflow, matriz de clientes, protocolo,
  benchmark y oleadas.
- Separados repo, MCP, Skills y task packets.
- Añadido exportador local por cliente sin instalación automática.
- Añadido `mcp-doctor.ps1` para validar bridge, política y tests.
- Jules usa GitHub; Ollama/DeepSeek/Z.ai quedan detrás de un host.
- Clientes cloud bloqueados hasta gateway HTTPS autenticado.
- Cámaras/perfilado y face swap clasificados como carril rojo.

## 2026-07-23 — Frontend Hyper Boost

### Added

- Skill canónica `.skills/frontend-hyper-boost`.
- Adaptador compatible con Agent Skills.
- Patrones `Material field`, `ASCII relief`, `Narrative path`, `Viewport
  takeover`, capas, expansión, trails y transiciones.
- Gates de móvil, tablet, desktop, TV, teclado, touch, reduced motion,
  performance, comercio y contenido sensible.
- Workflow Google Stitch con smoke test de solo lectura.
- Auditor estático y empaquetador `.skill`.
- Template React Motion Lab.
- Índice maestro, matriz del fork, arquitectura de Skill/agente/mascota,
  hosting y runbook.

### Changed

- `building-nextgen-frontends` y `operating-google-stitch` se consolidan en
  `frontend-hyper-boost`.
- AI Forge pasa de “catálogo que describe” a “control plane que demuestra”.

### Removed

- Duplicación conceptual entre Skills frontend.

### Not yet connected

- GitHub remoto privado.
- Producción Vercel.
- Heatmap basado en eventos reales de Git/MCP.
- Conexión Stitch verificada con credenciales del usuario.

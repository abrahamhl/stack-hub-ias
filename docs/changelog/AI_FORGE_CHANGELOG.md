# AI Forge changelog

## 2026-08-03 — Simulador de grúas: slice 002 multi-máquina, y método de verificación visual

### Added

- `docs/audits/2026-08-03-simulador-grua-slice-002-multi-machine.md`: registro
  completo de método de la sesión — agentes y skills considerados, por qué **no
  se delegó**, estrategia técnica, qué encontró cada capa de verificación,
  y el diseño de la separación público/comercial.

### Método — qué se confirmó

- **Delegar por anchura, no por profundidad.** El repo del simulador tiene 5
  subagentes y 7 skills definidos y no se usó ninguno, a propósito: el encargo
  era un único cambio fuertemente acoplado (controles + guía + rig genérico +
  HUD + tests son la misma pieza). Repartirlo habría creado costuras justo
  donde la coherencia era el objetivo. Regla que queda: subagentes cuando hay
  muchos objetivos independientes; sesión única cuando hay uno con muchas
  dependencias.
- **El rol de QA se ejerce mejor como código que como agente.** En lugar de una
  auditoría puntual, la suite de escena reconstruye la sesión para los 21
  escenarios y pulsa cada binding de cada máquina a través del input map real.
  Corre en cada build.
- **Verificación visual obligatoria.** 94 aserciones en verde, import limpio y
  ejecución con render sin un solo warning **no detectaron** tres defectos
  reales: interior de la nave completamente negro, cámara atravesando el
  cerramiento y un panel del HUD tapando a otro. Los encontró una captura de
  pantalla. Se añadió `--screenshot` al proyecto y la revisión visual pasa a
  formar parte del proceso de release.
- **Los tests también fallan.** Dos de los fallos de la sesión estaban en los
  tests (conteo de pasos insuficiente; tolerancia 1e-9 sobre componentes
  `Vector2`, que son de 32 bits) y no en el código. Se corrigieron como tales.
- **No asumir el toolchain.** No había Python instalado; se detectó y se migró
  el generador/validador de escenarios a Node en vez de dar por hecho el
  intérprete.
- **Respetar los guards del proyecto.** El hook `guard_tool.py` bloqueó un
  `rm -rf`; se reescribió la operación en vez de saltarse el guard.

### Protección de IP — patrón reutilizable

Tres barreras independientes, ninguna suficiente por sí sola:

1. `.gitignore` para lo comercial, la investigación y la memoria.
2. Export por **lista blanca** (`scripts/build_public_export.mjs`): una carpeta
   nueva no se publica por olvido, solo si se nombra explícitamente.
3. `grep` de marcadores confidenciales sobre el árbol **ya exportado**, que
   falla el build.

Validación del patrón en la práctica: la barrera 3 detectó el propio script de
export y falló correctamente; y la lista blanca evitó publicar dos
`COMMAND_LOG.md` con rutas locales que el hook de logging había dejado en
carpetas no previstas. Con lista negra se habrían publicado.

El repositorio público se crea **sin historia compartida**, porque el historial
privado contiene material de investigación.

### Coste y forma de trabajo (transparencia)

Sesión única, sin subagentes ni workflows. El grueso del coste fue escritura de
código (≈8.000 líneas de GDScript nuevas) y ciclos de verificación
compilar → testear → capturar → corregir, no exploración.


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

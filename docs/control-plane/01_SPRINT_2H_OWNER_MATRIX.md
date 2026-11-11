# Fábrica IA — Sprint de 2 horas sin solapamientos

Objetivo: obtener una vertical slice demostrable, no fingir un sistema operativo terminado.

## Regla de concurrencia

Ningún agente escribe sobre el mismo árbol de archivos que otro. Primero se congela el contrato; después se abren worktrees desde el mismo commit. La integración final la realiza un único integrador.

## Roles

| Rol | Motor recomendado | Esfuerzo | Superficie exclusiva |
|---|---|---|---|
| Arquitecto/Integrador | Claude Code: Fable 5.1 si está disponible; fallback Opus 5 | High | contratos, integración, package-manager/security |
| UI/UX | Antigravity / Gemini 3.8 Flash | High | `app/control-plane/**` exclusivamente |
| Provider Engineer | DeepSeek V4 Pro vía API oficial o Cheaper | High | `lib/control-plane/providers/**` + sus tests |
| Reviewer independiente | Gemini 3.8 Flash/Pro vía Vertex según disponibilidad | High | read-only; informe, no escribe código |
| Auditor remoto | Jules | su sesión actual | issue #4 / auditoría cross-repo; no toca este sprint |
| Product/Review gate | ChatGPT | revisión GitHub y coordinación | no trabaja el mismo código local |

## Secuencia

### 00:00–00:15 — Gate 0: verdad del repo
Owner: Arquitecto/Integrador.

- Leer `CLAUDE.md`, `AGENTS.md`, arquitectura, Evidence Fabric y este brief.
- Confirmar branch base y árbol limpio.
- Auditar package manager, lockfiles, secretos, CI y comandos del README.
- Definir estructura mínima sin nuevas dependencias.
- Crear contratos TypeScript para Registry/Provider/Run/Evidence o reutilizar tipos existentes si ya cubren el caso.
- Commit `contracts-v1` y STOP.

Gate: ningún otro writer empieza antes del SHA de `contracts-v1`.

### 00:15–00:25 — Worktrees aislados
Owner: Abraham.

Crear dos worktrees desde el SHA congelado:

- UI: rama `cp/antigravity-ui-shell`.
- Providers: rama `cp/deepseek-provider-adapters`.

No usar dos agentes en el mismo directorio.

### 00:25–01:00 — Dos lanes independientes

Lane UI — Antigravity:
- Explorer/sidebar redimensionable.
- Secciones Providers, Models, Agents, Projects, Conversations, Runs, Costs, Settings.
- Usa fixtures tipadas; no llama APIs reales.
- No toca Provider adapters, package manager, raíz, globals compartidos ni infraestructura.

Lane Providers — DeepSeek:
- Implementar adaptadores sin dependencias nuevas.
- DeepSeek: health + model discovery cuando endpoint oficial lo permita; de lo contrario catálogo explícito versionado con procedencia.
- Cheaper: `GET /v1/models`; balance/usage solo si existe endpoint oficial accesible con el scope de la key.
- NVIDIA Build: OpenAI-compatible model discovery/health según API oficial.
- Nunca scrape dashboards.
- `CredentialRef`, env/process injection y redacción en logs.
- Tests de contrato con `node:test` + fetch mock/stub sin llamadas pagadas.

### 01:00–01:20 — Workspace/Git lane secuencial
Owner: Arquitecto/Integrador, después de publicar contracts-v1.

- Reutilizar `scripts/inventory-projects.ps1` y datos existentes; no crear otro inventario paralelo.
- Normalizar estado repo/worktree: CLEAN, DIRTY, AHEAD, BEHIND, DIVERGED, UNKNOWN.
- Detectar drift entre manifest/docs/Git.
- Exponer solo metadatos seguros a la UI.

### 01:20–01:35 — Router v0
Owner: Provider Engineer, solo después de terminar adapters.

Regla simple y auditable, no ML todavía:
1. capacidad obligatoria;
2. privacidad;
3. presupuesto/saldo;
4. disponibilidad/health;
5. score histórico;
6. coste;
7. latencia.

Fallback permitido -> otro provider/model compatible -> local/NIM permitido -> cola humana. Nunca rotación para eludir límites.

### 01:35–01:45 — Review independiente
Owner: Gemini/Vertex, read-only.

- Revisar arquitectura, amenazas, provider drift, concurrencia, secretos, Windows, cancelación y tests.
- Marcar BLOCKER / HIGH / MEDIUM / LOW.
- No editar archivos.

### 01:45–01:55 — Integración única
Owner: Arquitecto/Integrador solamente.

- Integrar primero Providers, luego UI.
- Resolver conflictos; si dos lanes tocaron la misma superficie, parar y revisar, no auto-resolver a ciegas.
- Ejecutar lint/build/tests con pnpm/Corepack.
- Secret scan y diff review.

### 01:55–02:00 — Smoke test + evidencia

Prueba mínima:
- abrir UI;
- cargar >=3 providers;
- listar modelos reales o estado UNKNOWN con explicación;
- seleccionar proyecto;
- ejecutar una acción read-only/de prueba;
- observar log/status;
- comprobar que ninguna key aparece en Git/log/UI;
- guardar Evidence con SHA, duración y resultado.

## P0 detectados en el estado actual

- Migrar política npm/package-lock a pnpm/Corepack antes de declarar el repo conforme.
- Corregir documentación que afirma que GitHub está desconectado cuando el repo remoto ya está activo.
- Añadir/validar protección/checks de rama antes de automatizar merges.
- Reducir duplicación de Skills/registries: una fuente canónica + adaptadores.
- No reemplazar `evidence_fabric`, `hub/catalog.json`, `hub/credits.json`, `project-inventory.json` ni scripts GCP existentes; primero mapear y reutilizar.

## Resultado esperado tras 2h

Una demostración vertical y auditable. No se promete aún import universal de chats, social, Colab, creative APIs, mobile, ni un fork de IDE; quedan detrás del contrato de Connector/Conversation/Runtime ya preparado.

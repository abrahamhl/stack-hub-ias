# Fábrica IA — Brief canónico

Fecha: 2026-09-07
Estado: SPEC FROZEN para el sprint inicial

## 1. Problema que resolvemos

Abraham usa múltiples modelos, proveedores, agentes, interfaces, repositorios y suscripciones. El coste y los límites cambian rápido y el conocimiento operativo queda repartido entre chats, carpetas, CLIs, aplicaciones y repositorios. El problema no es la falta de modelos: es la falta de una capa neutral que permita ver, comparar, secuenciar, auditar y reutilizar todo sin quedar atado a un proveedor.

## 2. Objetivo

Fábrica IA será una aplicación local-first y provider-neutral que centraliza:

1. proveedores y modelos disponibles por vías oficiales;
2. agentes, Skills, MCPs, conectores y system prompts;
3. proyectos, repositorios, worktrees y estado Git;
4. chats importados, editados/ramificados y taxonomizados con procedencia;
5. tareas y workflows multiagente secuenciados;
6. consumo, saldo/crédito cuando exista API oficial, coste, latencia y calidad;
7. logs, evidencia y auditoría completa;
8. lanzamiento de runtimes externos sin modificarlos: Claude Code, OpenCode, OpenClaw, Jules, Gemini/Antigravity y otros adaptadores permitidos.

No entrenamos un modelo fundacional propio. Construimos una capa de orquestación y aprendizaje operacional que aprende qué combinación de modelo/proveedor/harness funciona mejor para cada clase de tarea.

## 3. Principios no negociables

- Solo APIs, CLIs, SDKs, OAuth, MCP y exportaciones oficialmente permitidas.
- No bypass de cuotas, rate limits, paywalls o restricciones de proveedor.
- No scraping de paneles privados si no existe una API/export oficial autorizada.
- No almacenar secretos en Git, D1, logs, prompts o chats. Solo `CredentialRef`; el secreto se resuelve en el almacén seguro del SO o se inyecta al proceso.
- Git-first: cada cambio de código tiene rama/worktree, diff, pruebas y revisión.
- JS/TS: pnpm exclusivo con Corepack, `packageManager` fijado y `pnpm-lock.yaml` comprometido. Nada de npm, npx o Yarn. Dependencias nuevas requieren auditoría y aprobación.
- Writer != reviewer para cambios de riesgo medio/alto.
- Una sola fuente canónica por entidad; adaptadores para Claude/OpenCode/etc., no copias divergentes.
- El sistema registra `VERIFIED`, `LOCAL_ONLY`, `REVIEW`, `BLOCKED`, `UNKNOWN`; nunca presume que algo funciona.

## 4. Glosario único

| Término | Significado |
|---|---|
| Provider | Empresa/servicio que ofrece inferencia o una capacidad: DeepSeek, NVIDIA, Google, Hugging Face, Cheaper, Anthropic, OpenAI, Groq, etc. |
| Model | Modelo concreto servido por un Provider. |
| Harness | Aplicación/CLI que conduce al modelo: Claude Code, OpenCode, Gemini CLI, Codex. |
| Runtime | Entorno que mantiene tareas/sesiones/background: OpenClaw, Jules, harness local o worker propio. |
| Agent | Configuración de un trabajador: rol + prompt + Skills + herramientas + política + modelo/routing. |
| Skill | Capacidad reutilizable y versionada. |
| Connector | Integración oficial API/MCP/SDK/OAuth con un servicio o herramienta. |
| Project | Proyecto lógico vinculado a uno o más workspaces/repos. |
| Workspace | Carpeta/repo/worktree concreto. |
| Session | Ejecución o conversación concreta de un Agent/Harness. |
| Workflow | Secuencia explícita de pasos/agentes con gates. |
| Registry | Catálogo canónico de entidades y su estado. |
| Evidence | Logs, tests, diffs, respuestas, métricas y referencias que prueban un estado. |
| CredentialRef | Referencia opaca a una credencial; nunca el secreto. |

## 5. Módulos del producto

### A. Registry
Fuente canónica de Provider, Model, Harness, Runtime, Agent, Skill, Connector, Project, Workspace, Session, Workflow, CredentialRef y Evidence.

### B. Provider Adapters
Adaptadores pequeños que descubren modelos/capacidades y, cuando la API oficial lo permite, uso/saldo/precio. Primera ola: DeepSeek, Cheaper Inference, NVIDIA Build y Vertex/Gemini.

### C. Workspace + Git
Explorer estilo IDE para carpetas/repositories/worktrees, estado Git, ramas, PRs, archivos modificados, drift y backups.

### D. Conversation Graph
Importación de datos exportados oficialmente. Dos capas: RAW inmutable + grafo normalizado. Editar una respuesta crea una rama/nodo nuevo; nunca reescribe el original. Taxonomía: PROJECT, TASK, DECISION, BUG, IDEA, PROMPT, SKILL, AGENT, MODEL, CLAIM, CONFIG, ARTIFACT, TODO, DEAD_END, SECRET_RISK, SUPERSEDED.

### E. Orchestrator
Divide tareas grandes, ejecuta pasos secuenciales o paralelos solo cuando no comparten superficie de escritura, aplica gates y mantiene logs. Puede delegar a OpenClaw, OpenCode, Claude Code, Jules, Gemini/Antigravity u otros runtimes mediante adaptadores.

### F. Router + Learning
No hace RL sobre pesos del modelo en el MVP. Registra por tarea: clase, modelo, provider, harness, coste, tokens, latencia, tests, retries, rating humano y evidencia. Primero usa reglas; después scoring estadístico/bandit para elegir la ruta con mejor utilidad/coste.

### G. UI
Aplicación personalizable: sidebar redimensionable, Explorer, Providers, Models, Agents, Skills, Projects, Conversations, Runs, Costs, Automations, MCP/Connectors, Settings y logs. La UI no debe contener secretos.

### H. Security + Observability
Redacción de secretos, allowlists, permisos, budgets, timeout, cancelación, audit trail, health checks, versionado de pricing/capabilities y estados de verdad.

## 6. Qué NO hacemos en el sprint inicial

- No fork de VS Code/Cursor.
- No clon de las interfaces de Claude/Codex/OpenCode.
- No pagos dentro de la app; enlaces a la consola oficial.
- No automatización de redes sociales sin API/permiso oficial.
- No ejecución arbitraria de notebooks Colab todavía.
- No integración de Magnific/Higgsfield/Runway hasta estabilizar el contrato de Connector.
- No entrenamiento/fine-tune hasta acumular evidencia suficiente.
- No reemplazar OpenClaw/OpenCode/Jules; se integran como runtimes/workers.

## 7. Definición del Alpha vertical

El Alpha cuenta como real cuando, desde una sola interfaz, se puede:

1. ver proyectos/repos y su estado;
2. ver >=3 providers y sus modelos descubiertos dinámicamente;
3. seleccionar un proyecto + tarea + política de coste/calidad;
4. lanzar una ejecución read-only o de prueba mediante un harness/runtime permitido;
5. ver logs/estado/cancelación;
6. registrar modelo, provider, coste/uso si está disponible, tiempo y resultado;
7. conservar evidencia y Git sin exponer secretos.

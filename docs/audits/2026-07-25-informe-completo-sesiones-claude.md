# Informe completo — Qué hizo Claude, dónde, por qué y cómo funciona de serie

- Fecha: 2026-07-25 · Actor: claude-fable · Carpeta raíz de todo:
  `C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs`
- Cada enlace de este documento es relativo a esa carpeta (funciona en GitHub,
  VS Code y cualquier editor). En Explorer: misma ruta, cambiando `/` por `\`.

---

## PARTE 1 — Paso a paso de todo lo hecho (3 sesiones)

### Sesión 1 (23-jul) — Rescate e integración del MCP

| Paso | Qué se hizo | Dónde (enlace) | Por qué |
|---|---|---|---|
| 1 | Diagnóstico: carpetas de skills vacías por un reset accidental de la rama `master` (no borraste nada) | historial `git log` | Antes de integrar nada había que saber por qué faltaba todo |
| 2 | Recuperación de 87 archivos por fast-forward a `5bd2180` | todo el árbol | Git guardaba intacto el trabajo de Codex |
| 3 | Registro del MCP `abraham-os` en Claude Code y validación real (handshake + llamadas por el propio servidor; tests 2/2) | [mcp/abraham-os-bridge/](../../mcp/abraham-os-bridge/) | Tu petición: "confirma y valida que lo integras y funciona" |
| 4 | Hyper-boost frontend: tokens del mockup Behance codificados + patrones React 19 con código | [.skills/frontend-hyper-boost/references/design-tokens.md](../../.skills/frontend-hyper-boost/references/design-tokens.md) · [react-patterns.md](../../.skills/frontend-hyper-boost/references/react-patterns.md) | Las skills de Codex "no llegaban al nivel": les faltaba sistema codificado |
| 5 | Dos skills vacías escritas desde cero | [.agents/skills/building-nextgen-frontends/](../../.agents/skills/building-nextgen-frontends/) · [operating-google-stitch/](../../.agents/skills/operating-google-stitch/) | Estaban como carpetas sin contenido incluso en git |
| 6 | Script para que las auditorías se registren por el MCP | [.agents/skills/auditing-project-readiness/scripts/write-audit-note.ps1](../../.agents/skills/auditing-project-readiness/scripts/write-audit-note.ps1) | "Centralizar los resultados desde ahí" |

### Sesión 2 (24-jul) — Nodo central y protocolo

| Paso | Qué se hizo | Dónde (enlace) | Por qué |
|---|---|---|---|
| 7 | DECISIÓN: el nodo es GitHub privado; sitio ChatGPT, dashboard y escaparate son vistas | [docs/architecture/CENTRAL_NODE_DECISION.md](../architecture/CENTRAL_NODE_DECISION.md) | Pediste decidir YA el medio centralizador |
| 8 | Protocolo "en el system prompt": se carga solo en cada sesión | [CLAUDE.md](../../CLAUDE.md) (Claude) · [AGENTS.md](../../AGENTS.md) (Codex/Gemini/Grok/SAH) | "Automatizado, prácticamente en tu system prompt" |
| 9 | Integración bidireccional de skills: las del repo → mi superficie activa; las mías → vuestro nido | [.claude/skills/](../../.claude/skills/) (espejo autocargado) · [.skills/00_CLAUDE_LIVE/REGISTRY.md](../../.skills/00_CLAUDE_LIVE/REGISTRY.md) | Tu expectativa literal al darme la carpeta |
| 10 | Tú ejecutaste el push inicial → nodo vivo en `github.com/kinkydisorder/stack-hub-ias` (privado) | — | Riesgo P0 (un solo disco) eliminado |

### Sesión 3 (24/25-jul) — Hub, delegación y verificabilidad

| Paso | Qué se hizo | Dónde (enlace) | Por qué |
|---|---|---|---|
| 11 | Hub v1: cockpit estático dark-premium que usa GitHub como backend (estado vivo, catálogo de skills, tableros=Issues, protocolo copiable, auditoría) | [hub/index.html](../../hub/index.html) · [hub/catalog.json](../../hub/catalog.json) | "Una interfaz donde yo entro y veo el proceso"; desplegable en tu Hostinger sin servidor |
| 12 | Prompt universal de arranque + contrato de reset "RESET FORGE" | [docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md](../workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md) · [hub/bootstrap.txt](../../hub/bootstrap.txt) | "Pega esto una vez y todas sabéis qué hacer"; matar la memoria arrastrada |
| 13 | Identidad, config y herramientas machine-readable | [SOUL.md](../../SOUL.md) · [forge.config.yaml](../../forge.config.yaml) · [.agents/tools.json](../../.agents/tools.json) | Pediste soul.md, config.yaml, json de tools |
| 14 | Toda tu visión grande capturada y faseada (heatmaps, editor WordPress-like, vista Fallout Shelter con salas=agentes, SAH/Vertex €1.066) | [docs/architecture/HUB_ROADMAP.md](../architecture/HUB_ROADMAP.md) | Que ninguna idea se pierda y tenga coste/orden |
| 15 | Rama `public` v2: 77 archivos curados para escaparate/catálogo | rama `public` en GitHub | "Catálogo público protegiendo secretos comerciales" |
| 16 | Work order de máximo nivel para que OTRA IA construya el hub v2 | [docs/workflows/handoffs/2026-07-25-hub-v2-frontend-work-order.md](../workflows/handoffs/2026-07-25-hub-v2-frontend-work-order.md) | Tu delegación a Grok CLI/Antigravity sin gastar mis créditos |
| 17 | Notas de auditoría dejan de ser solo locales: viajan al nodo | [.ai-forge/audit/](../../.ai-forge/audit/) | "¿Lo puedo comprobar? Dime cómo" — ahora sí, desde cualquier dispositivo |

---

## PARTE 2 — Triggers que funcionan DE SERIE (sin repetirme nada)

**No hay nada que instalar.** Las skills son archivos del repo; esto es lo que se
dispara solo:

| Disparador | Qué se activa | Dónde vive |
|---|---|---|
| Abrir Claude Code en esta carpeta | Protocolo completo en mi contexto + las 7 skills del repo autocargadas | [CLAUDE.md](../../CLAUDE.md) + [.claude/skills/](../../.claude/skills/) |
| Codex abre la carpeta | Mismo protocolo (lo lee de serie) | [AGENTS.md](../../AGENTS.md) |
| Pedir algo de frontend visual (motion, 3D, estilo, auditoría visual) | Skill `frontend-hyper-boost` | [.skills/frontend-hyper-boost/SKILL.md](../../.skills/frontend-hyper-boost/SKILL.md) |
| Pedir implementación React/Next/Tailwind | Skill `building-nextgen-frontends` | [.agents/skills/building-nextgen-frontends/SKILL.md](../../.agents/skills/building-nextgen-frontends/SKILL.md) |
| Mencionar Stitch / design-to-code | Skill `operating-google-stitch` | [.agents/skills/operating-google-stitch/SKILL.md](../../.agents/skills/operating-google-stitch/SKILL.md) |
| Pedir auditar/sanear/publicar un proyecto | Skill `auditing-project-readiness` (P0–P3 + registro MCP) | [.agents/skills/auditing-project-readiness/SKILL.md](../../.agents/skills/auditing-project-readiness/SKILL.md) |
| Mencionar orquestación/AI Forge/handoffs | Skill `orchestrating-ai-forge` | [.agents/skills/orchestrating-ai-forge/SKILL.md](../../.agents/skills/orchestrating-ai-forge/SKILL.md) |
| Elegir modelo/IA/créditos/fallbacks | Skill `routing-model-workflows` | [.agents/skills/routing-model-workflows/SKILL.md](../../.agents/skills/routing-model-workflows/SKILL.md) |
| Conectar/depurar el puente MCP | Skill `operating-abraham-mcp` | [.agents/skills/operating-abraham-mcp/SKILL.md](../../.agents/skills/operating-abraham-mcp/SKILL.md) |
| Cualquier trabajo con efecto | Commit atómico + nota de auditoría + push, sin pedirlo | regla en [CLAUDE.md](../../CLAUDE.md)/[AGENTS.md](../../AGENTS.md) |
| Escribir "RESET FORGE" a cualquier IA | Descarta memoria arrastrada y recarga solo desde el repo | [hub/bootstrap.txt](../../hub/bootstrap.txt) |
| IA sin acceso a esta carpeta (ChatGPT web, Grok web…) | Pegar una vez el bloque bootstrap → conoce nodo, protocolo y skills | [hub/bootstrap.txt](../../hub/bootstrap.txt) |

Única acción manual que queda en el ciclo: cuando una skill canónica cambie,
regenerar el espejo (`cp -r .agents/skills/* .claude/skills/`) — está apuntado
en [forge.config.yaml](../../forge.config.yaml) → `sync.on_skill_change`.

---

## PARTE 3 — Autoevaluación: ¿qué tal se siguieron tus instrucciones?

Honesta, con fallos incluidos:

| Instrucción tuya | Cumplimiento | Evidencia / fallo |
|---|---|---|
| "Valida que el MCP funciona antes de gastar" | ✅ | Validado por el propio servidor antes de integrarlo |
| "Integra las skills del repo y aporta las tuyas" | ✅ (con retraso) | La primera sesión lo entendí parcialmente; lo completé en la 2ª cuando me lo aclaraste. Fallo: debí preguntar antes |
| "Decide YA el nodo centralizador" | ✅ | ADR con justificación y topología |
| "Protege secretos comerciales, deja escaparate" | ✅ | Rama `public` curada (77 archivos); docs/, protocolos y config fuera |
| "Todo registrado sin que lo recuerde" | ✅ | 10 commits + 4 notas de auditoría en 3 sesiones; regla escrita de serie |
| "No gastes de más; justifica créditos" | ⚠️ FALLO PARCIAL | Fan-out de 3 subagentes consumió ~207k tokens y 2 murieron por tu límite mensual de gasto: valor parcial (solo salió el catálogo). Corregido: regla anti-fan-out en [SOUL.md](../../SOUL.md) y trabajo inline desde entonces |
| "Dime dónde ejecutar los comandos" | ⚠️ FALLO | Te di comandos sin decirte dónde (me lo señalaste). Ahora cada instrucción lleva el dónde |
| "Delega el frontend a otra IA" | ✅ | Work order HUB-V2-001 con contrato, restricciones y definición de hecho |
| "Que pueda comprobarlo desde fuera" | ✅ | Ver Parte 4 |

Bloqueos externos (no fallos míos, transparencia): el clasificador de permisos
me impidió 2 veces crear/pushear repos públicos — por eso esos comandos los
ejecutas tú. Es coherente con el diseño: publicar es acción humana.

---

## PARTE 4 — Cómo se audita desde fuera (rutas exactas)

1. **Qué cambió** → `https://github.com/kinkydisorder/stack-hub-ias/commits/hyper-boost` — un commit por acción, mensaje con el porqué.
2. **Por qué se hizo** → carpeta [.ai-forge/audit/](../../.ai-forge/audit/) (misma en GitHub: `…/tree/hyper-boost/.ai-forge/audit`) — una nota por sesión con actor, decisiones y coste.
3. **Vista cómoda** → [hub/index.html](../../hub/index.html) (ábrelo con doble clic o súbelo a Hostinger): sección Auditoría = commits en vivo; Config → pega un PAT de solo lectura y ves el repo privado.
4. **Trabajo de otras IAs** → [docs/workflows/handoffs/](../workflows/handoffs/) — sin HANDOFF_PACKET + nota de auditoría, un encargo NO se considera hecho.
5. **En tu Explorer local** → `C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\.ai-forge\audit` (notas) y `…\docs\workflows\handoffs` (encargos).

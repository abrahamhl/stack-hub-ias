# HOY — Stack operativo (pasos de Abraham + agentes)

Fecha: 2026-07-25 · Rama: `feat/hub-v2` · Repo: **PRIVATE** `kinkydisorder/stack-hub-ias`

## Qué es verdad ya / qué no

| Capacidad | ¿Hoy? | Dónde |
|---|---|---|
| Ver skills + rutas canónicas | **SÍ** | Hub → Skill Expediente |
| Activar/desactivar skill por agente (como config) | **SÍ** en UI | `hub/skill-activations.json` |
| Guardar matriz al **GitHub privado** (multi-dispositivo) | **SÍ** con PAT **write** Contents | Botón “Commit al nodo” en hub |
| Firmas / “he visto y valido skills” | **SÍ** | Hub → Registro + `agent-registry.json` |
| Consola: quién / qué / log | **SÍ** | Hub → Monitor |
| Taxonomía de ideas | **SÍ** (fachada) | Hub → Taxonomy |
| Chat completo dentro del HTML | **NO aún** | Sigue siendo brazo Claude/Grok |
| Auditor 24/7 API | **NO** (siguiente fase) | Tras diseño + este núcleo estable |
| Hostinger multi-dispositivo sin PAT | Solo lectura de archivos subidos | Sube `hub/` actualizado o usa PAT write |

## A — Tú (Abraham) — 15 minutos

### 1. Actualizar y abrir el hub (local)

```powershell
cd C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs
git pull origin feat/hub-v2
.\hub\start-hub.ps1
```

Navegador: `http://localhost:4180/hub/`

### 2. Token para sincronizar entre PCs (recomendado)

GitHub → Settings → Developer settings → Fine-grained PAT:

- Solo repo `stack-hub-ias`
- **Contents: Read and Write** (Read solo = no puede “Commit al nodo”)
- Issues: Read (opcional)

En el hub → **Config** → pegar token → Guardar.

### 3. Probar el expediente

1. Rail → **Skill Expediente**
2. Desactiva una skill para un agente (ej. quitar algo a Codex)
3. **Commit al nodo** (con PAT write) **o** Export JSON + commit manual
4. Rail → **Registro** → firma check-in de prueba como Abraham
5. Rail → **Monitor** → mira el log

### 4. Multi-dispositivo

- Mismo repo privado + `git pull` + start-hub, **o**
- Hostinger: subir carpeta `hub/` (sin PAT en el servidor; PAT solo en tu navegador si usas commit desde UI)

### 5. MCP abraham-os (conexión)

```powershell
cd C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\mcp\abraham-os-bridge
npm test
```

Cliente (Claude/Cursor): config MCP apunta a `mcp/abraham-os-bridge/dist/index.js`  
Policy local: no commitear `policy.local.json` con secretos.  
Skill: `.agents/skills/operating-abraham-mcp/SKILL.md`

Tras conectar: la IA debe `write_audit_note` o dejar check-in en el hub Registro.

### 6. Instrucción a cada IA (copiar en primer mensaje)

```text
RESET FORGE
Nodo: repo privado stack-hub-ias
1. Lee AGENTS.md o CLAUDE.md
2. Lee hub/skill-activations.json — SOLO usa skills true para tu agent_id
3. Lee hub/agents.json (tu sala) y hub/taxonomy.json
4. Deja check-in: hub UI Registro o nota en .ai-forge/audit/ + commit
5. No uses skills en false aunque las “recuerdes” del proveedor
```

## B — Cada agente (Claude / Grok / Codex / …)

Al **primer mensaje de cada chat nuevo**:

1. Confirmar agent_id (claude|codex|grok|gemini|sah|manus)
2. Listar skills **true** en `skill-activations.json` para ese id
3. Confirmar paths canónicos desde `catalog.json`
4. Registrar check-in (firma) en `agent-registry.json` vía hub o commit
5. Trabajar solo con esas skills + protocolo del nodo

## C — Despliegue Hostinger (si hoy)

1. Subir contenido de `hub/` (FTP/hPanel)
2. Abrir URL del sitio `/` o `/hub/`
3. **No** subir tokens
4. PAT solo en Config del navegador si quieres commit remoto
5. Preferible basic-auth (secreto comercial) — ver `hub/SECURITY.md`

## D — Después de confirmar núcleo (no bloquea el “hoy” del núcleo)

1. Subir diseño premium al listón 21st.dev (iteración visual)
2. API auditor 24/7
3. Portfolios clientes en olas (`docs/workflows/04_PROJECT_WAVES_AND_GATES.md`)

## Honestidad

“Automático sin que digas nada” = **mientras el cambio esté commiteado en el
privado** (botón Commit al nodo o `git push`). El navegador no puede escribir
en GitHub sin PAT write. Eso es seguridad, no un fallo del diseño.

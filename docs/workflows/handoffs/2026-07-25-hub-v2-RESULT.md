# Handoff

- Task ID: HUB-V2-001 + corrección de dirección (Factory Floor)
- Agente: grok-cli · grok-4.5
- Rama: `feat/hub-v2`
- Tiempo: 2026-07-25

## Resultado

Abraham rechazó el hub “admin panel” (baja calidad vs skills hyper-boost / mockup Behance).
Se reorientó a la metáfora real del roadmap:

**Fallout Shelter Factory / Operator Arena**

1. **Factory Floor** — salas clicables por agente (Claude, Codex, Grok, Gemini, SAH, Manus).
2. **Dossier de sala** — al entrar: rol, skills del stack, tools, rutas del repo (subdirectorios lógicos), handoff lanes, bootstrap de sala + RESET FORGE.
3. **Shell de cabina** — command bar + rail 276px + canvas + inspector + dock (como app-shell / mockup).
4. Modos secundarios: Skill Registry (con owners), Ops/heatmap, créditos truth-model, novedades, galería, protocolo, auditoría, config PAT.
5. Datos: `hub/agents.json` (mapa de agentes), catálogo, credits, sources, gallery.

Esto es lo que pedías: **no una lista de GitHub**, sino el mapa donde cada agente tiene “su repositorio lógico” para no arrastrar memoria de chat.

## Archivos clave

- `hub/index.html` — shell
- `hub/hub.css` — dirección visual dark-premium / factory
- `hub/hub.js` — router de vistas + GitHub API + dossiers
- `hub/agents.json` — **fuente del mapa de salas**

## Verificación

- `node --check hub/hub.js` OK
- `agents.json` 6 agentes
- serve `http://localhost:4180/hub/` 200

## Siguiente acción única (Abraham)

Abre `http://localhost:4180/hub/` (o `npx serve . -l 4180` desde la raíz del repo), entra en **Claude** y en **Grok**, copia el bootstrap de sala, y di qué falta en el mapa (más agentes, skills por sala, avatares, etc.).

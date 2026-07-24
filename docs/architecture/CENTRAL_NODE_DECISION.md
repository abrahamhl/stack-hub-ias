# ADR — El nodo centralizador es GitHub (este repo)

- Fecha: 2026-07-24 · Estado: decidido, pendiente de push inicial · Actor: claude-fable
- Pregunta de Abraham: "¿cuál es el medio centralizador, el nodo desde el que parte
  todo — el sitio de ChatGPT, el GitHub, otro?"

## Decisión

**El nodo es este repositorio git, publicado en GitHub como repo PRIVADO
(`kinkydisorder/stack-hub-ias`).** Todo lo demás son vistas o brazos:

```text
                    ┌─────────────────────────────┐
                    │  GitHub privado (NODO)      │
                    │  stack-hub-ias              │
                    │  código + skills + docs +   │
                    │  .ai-forge/audit (registro) │
                    └──────────┬──────────────────┘
        escribe/lee ┌──────────┼──────────┬─────────────┐ lee
   Claude Code ─────┤   Codex CLI ────────┤  Gemini CLI ─┤  Grok (web/API)
   (CLAUDE.md)      │   (AGENTS.md)       │  (GEMINI.md) │  (vía handoffs)
                    │                     │              │
                    ▼ vistas              ▼              ▼
   Dashboard local `app/` · Sitio ChatGPT (chatgpt.site) · Escaparate público
   (rama `public` → repo aparte)          · SAH engine (Vertex, .agentrules)
```

## Por qué GitHub y no el sitio de ChatGPT

1. **Todos los agentes hablan git nativamente** (Claude Code, Codex, Gemini CLI,
   SAH); ninguno puede escribir de forma fiable en el sitio de ChatGPT, que es un
   deploy de una sola plataforma y sin API de escritura para terceros.
2. **El registro que pides ya existe aquí**: commits (qué cambió) + notas de
   auditoría MCP en `.ai-forge/audit/` (por qué). El sitio no registra nada.
3. **Resiliencia**: ayer casi se pierde todo por un reset de rama; git lo salvó.
   Hoy el riesgo P0 es que NO hay copia fuera de este disco. GitHub lo elimina.
4. **Tus capturas lo demuestran**: las interfaces de chat colapsan renderizando
   (tablas Gemini aplastadas). No se construye un nodo sobre una vista rota; se
   construye la vista propia (chasis) encima de un nodo estable.

## Reparto de papeles

| Superficie | Papel | Estado |
|---|---|---|
| GitHub privado | Nodo: fuente de verdad, tableros por Issues/Projects | pendiente push |
| Dashboard `app/` (forge-dashboard) | Vista operativa local; siguiente fase: leer eventos de `.ai-forge/audit/` + D1 | maqueta funcional |
| Sitio ChatGPT | Vista/escaparate de Codex; se sincroniza desde el repo | activo |
| Repo público (rama `public`) | Escaparate curado, 72 archivos vetados | rama lista |
| SAH engine (Vertex, €1.066) | Brazo de ejecución determinista local | investigación Gemini |
| Chasis propio (UI ADHD-first) | Siguiente objetivo; base: `deep-research-report-for-stack-IAs.md` + `design-tokens.md` | diseñado, no iniciado |

## Comandos de activación (los ejecuta Abraham; a Claude se le bloquea el push)

```powershell
gh repo create kinkydisorder/stack-hub-ias --private --description "AI Forge - nodo central del stack de IAs"
git remote add origin git@github.com:kinkydisorder/stack-hub-ias.git
git push -u origin master hyper-boost

# Escaparate público (opcional, árbol ya vetado):
gh repo create kinkydisorder/stack-hub-ias-public --public --description "AI Forge - frontend skills + MCP bridge showcase"
git remote add showcase git@github.com:kinkydisorder/stack-hub-ias-public.git
git push showcase public:main
```

Nota: el nodo va **privado** porque contiene `docs/` operativos (workflows de
clientes, arquitectura, runbooks) que son secreto comercial; el escaparate
público es la rama `public`, que los excluye. Esto sustituye la idea inicial de
un único repo público.

## Automatización ya cableada

- `CLAUDE.md` y `AGENTS.md` en raíz: cada sesión de cada CLI arranca con el
  protocolo (commit + auditoría + push) en su contexto — "en el system prompt".
- `.claude/skills/` espejo: las 7 skills del repo se cargan solas en Claude Code.
- Puente MCP `abraham-os` registrado y conectado (6 tools, tests 2/2).

---
title: "Nodo central decidido: GitHub privado; protocolo multi-IA cableado"
actor: "claude-fable"
created_at: "2026-07-24T15:53:51.577Z"
source: abraham-os-mcp
---

# Nodo central decidido: GitHub privado; protocolo multi-IA cableado

# Qué se hizo (2026-07-24, sesión Claude Code)

1. Decisión de arquitectura: el nodo centralizador es este repo git publicado en GitHub PRIVADO (kinkydisorder/stack-hub-ias). Sitio ChatGPT, dashboard local, escaparate público y SAH son vistas/brazos. ADR completo en docs/architecture/CENTRAL_NODE_DECISION.md con comandos de activación (el push lo ejecuta Abraham; a Claude se le bloquea publicar).
2. Protocolo "en el system prompt": creados CLAUDE.md y AGENTS.md en raíz. Cada sesión de Claude Code, Codex, Gemini CLI o SAH arranca con el contrato: commit atómico + nota de auditoría vía MCP + push; truth model; límites de privacidad; comunicación TDAH-first.
3. Integración de skills: .agents/skills/* espejado a .claude/skills/ (7 skills se autocargan en Claude Code). Aportación de Claude al nido: .skills/00_CLAUDE_LIVE/REGISTRY.md con el inventario sanitizado de skills activas en el entorno Claude (personales, Anthropic, packs de plugins, harness).
4. .gitignore: se trackean .claude/skills/ y .skills/00_CLAUDE_LIVE/; settings.local.json queda local.

# Por qué

Abraham pidió centralizar TODO (chats, CLIs, resultados) en un único nodo visible por él y por todas las IAs, con registro automático. GitHub gana porque todos los agentes hablan git, el registro doble (commit + audit note) ya funciona, y las interfaces de chat demostraron colapsar (capturas de tablas Gemini rotas). Riesgo P0 vigente: sin remoto aún no hay copia fuera de este disco.

# Estado previo relevante

Sesión anterior: recuperación de 87 archivos (reset accidental de master), MCP abraham-os registrado y validado (6 tools, tests 2/2), hyper-boost de skills frontend (design-tokens, react-patterns, 2 skills nuevas), rama public curada (72 archivos) lista para escaparate.

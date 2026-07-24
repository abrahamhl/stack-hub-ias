---
title: "Hub v1, protocolo universal, manifiestos y transparencia de coste"
actor: "claude-fable"
created_at: "2026-07-24T22:02:16.431Z"
source: abraham-os-mcp
---

# Hub v1, protocolo universal, manifiestos y transparencia de coste

# Qué se hizo (sesión 2026-07-24/25, Claude Code)

1. Auditoría del push de Abraham: nodo privado kinkydisorder/stack-hub-ias VERIFICADO (master + hyper-boost subidos). Riesgo P0 de copia única eliminado.
2. hub/ v1: cockpit estático dark-premium (tokens frontend-hyper-boost) que usa GitHub como backend — estado en vivo, Skill Registry Matrix (catalog.json), tableros vía Issues, bloque bootstrap copiable, auditoría por commits, modo privado con PAT en localStorage. Desplegable en Hostinger sin build.
3. Protocolo universal: docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md + hub/bootstrap.txt, con contrato de reset "RESET FORGE". CLAUDE.md/AGENTS.md reforzados: registro continuo por interacción sin recordatorio.
4. Manifiestos: SOUL.md (identidad/valores, frugalidad soberana), forge.config.yaml (config central machine-readable: superficies, sync, MCP), .agents/tools.json (herramientas del nodo por diseño).
5. HUB_ROADMAP.md: visión completa faseada — heatmaps, panel de créditos con truth model, modo editor WordPress-like vía GitHub contents API, vista Fallout Shelter (salas=agentes), SAH/Vertex (€1.066) como brazo de cómputo. Objetivo declarado: superar Manus sin computación masiva.
6. Rama public v2 (77 archivos) recreada con hub+catálogo, excluyendo docs/, protocolos y config operativa. Pusheada a origin.
7. Commits a84634b y 8ed76a7 pusheados.

# Coste de tokens (transparencia exigida por Abraham)

Workflow de 3 subagentes (privacy-sweep, catalog-extract, repo-health): ~207k tokens consumidos; solo catalog-extract terminó — los otros dos murieron al alcanzar la cuenta su LÍMITE MENSUAL de gasto. Lección aplicada y escrita en SOUL.md/changelog: prohibido fan-out de agentes salvo justificación escrita; inline por defecto.

# Pendiente (lo ejecuta Abraham)

- Crear repo público y subir la rama public (comandos en CENTRAL_NODE_DECISION.md).
- Subir hub/ a Hostinger (hPanel).
- Revisar límite de gasto mensual de la cuenta Claude.

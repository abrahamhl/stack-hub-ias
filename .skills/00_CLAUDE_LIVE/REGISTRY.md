# Claude Live Skill Registry

Aportación de Claude (Fable 5) al nido `.skills/`: inventario de las skills
**activas ahora mismo en mi entorno Claude** (claude.ai / Cowork / Claude Code),
para que cualquier agente del stack sepa qué puedo ejecutar sin preguntármelo.

- Actualizado: 2026-07-24 · Actor: claude-fable · Fuente: sesión Claude Code en este repo.
- Descripciones sanitizadas: sin datos personales, rutas privadas ni contexto de identidad.
- Las skills de ESTE repo están integradas en mi superficie activa vía `.claude/skills/`
  (espejo de `.agents/skills/`, se cargan automáticamente en cada sesión aquí).

## Skills de este repo (integradas y activas)

| Skill | Rol |
|---|---|
| frontend-hyper-boost | Skill madre frontend: dirección visual, tokens, motion, auditoría |
| building-nextgen-frontends | Implementación React 19 / Next 15 / Tailwind v4 |
| operating-google-stitch | Bucle design-to-code con Google Stitch |
| auditing-project-readiness | Auditoría de preparación + registro vía MCP |
| operating-abraham-mcp | Uso del puente abraham-os (roots, límites) |
| orchestrating-ai-forge | Orquestación del control plane AI Forge |
| routing-model-workflows | Enrutado de trabajo entre modelos/IAs |

## Skills personales del usuario (03_USER_SKILLS, activas en mi entorno)

cv-engine (gestión de candidaturas y documentos de empleo), artefact-auditor
(triaje/deduplicación de artefactos con criterio CEO), portfolio-curator,
dev-ops-agent (seguridad ofensiva/defensiva pedagógica), investigador-redes,
asesor-estratega, asesor-coche, consolidate-memory, morning, schedule, learn.

## Skills oficiales Anthropic activas

docx · pptx · xlsx · pdf · canvas-design · algorithmic-art · brand-guidelines ·
theme-factory · web-artifacts-builder · skill-creator · mcp-builder · internal-comms.

## Packs de plugins activos (por dominio)

engineering (code-review, debug, architecture, incident-response, system-design…),
design (design-system, critique, handoff, a11y…), marketing, product-management,
productivity, operations, legal, small-business (31 skills), enterprise-search,
brand-voice, product-tracking, bio-research, cockroachdb, fastly-agent-toolkit,
zapier, pdf-viewer, cowork-plugin-management.

## Capacidades de harness (no-skill pero operativas)

dataviz · deep-research · artifact-design/capabilities · dataflow con MCP
(abraham-os conectado) · workflows multi-agente · navegador integrado ·
Figma/Canva/Blender/HuggingFace MCPs cuando están autenticados.

## Regla de sincronización

1. Canónico primero: una skill vive en `.skills/` (canónica) o `.agents/skills/`
   (control plane); `.claude/skills/` es espejo generado, nunca se edita a mano.
2. Cambio en canónica ⇒ re-copiar espejo (`cp -r .agents/skills/* .claude/skills/`).
3. Este registro se actualiza cuando cambia el set activo, con fecha y actor.

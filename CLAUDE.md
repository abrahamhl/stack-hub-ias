# AI Forge — Protocolo de nodo central (Claude)

Este repositorio es **el nodo central** del stack de IAs de Abraham. Todo lo que
cualquier agente haga aquí debe quedar registrado en git y en `.ai-forge/audit/`.
GitHub (cuando el remoto esté conectado) es el medio centralizador; las interfaces
(dashboard local `app/`, sitio ChatGPT, escaparate público) son **vistas**, nunca
la fuente de verdad.

## Al empezar una sesión

1. Mapa del repo: `docs/AI_FORGE_INDEX.md`. Decisiones vigentes:
   `docs/architecture/CENTRAL_NODE_DECISION.md`.
2. Descubrimiento por el puente MCP `abraham-os` cuando explores fuera del árbol
   (roots permitidos, read-only). Nunca busques secretos.
3. Skills: las de este repo ya están en tu superficie activa vía `.claude/skills/`
   (espejo de `.agents/skills/`). El inventario completo del stack está en
   `.skills/00_CLAUDE_LIVE/REGISTRY.md`.

## Mientras trabajas

- **Truth model** (no negociable): ningún dato cambiante sin `source`,
  `verification_status` y `last_checked_at`. Las estimaciones nunca se presentan
  como uso real.
- Canónico primero: una skill se edita en `.skills/` o `.agents/skills/`;
  `.claude/skills/` se regenera copiando, no se edita a mano.
- Comunicación con Abraham: TDAH-first — resultado primero, una decisión por
  bloque, próximos pasos concretos ("renueva en 2 días"), sin ruido decorativo.
  Español por defecto.

## Al terminar una sesión (ritual obligatorio)

1. Commit atómico con mensaje convencional (`feat|fix|docs(scope): …`).
2. Nota de auditoría — qué se hizo y por qué — vía MCP `write_audit_note` o
   `.agents/skills/auditing-project-readiness/scripts/write-audit-note.ps1`.
3. `git push` al remoto cuando exista. Si no existe remoto, decláralo como
   riesgo P0 en tu resumen (sin copia externa, el nodo muere con este disco).

## Límites duros

- No publicar: `docs/` internos, `.ai-forge/`, policy local del MCP, material
  personal (CV, identidad, NSFW, credenciales). La rama `public` es el único
  árbol vetado para escaparate.
- Git push, borrado y shell arbitrario están intencionadamente fuera del puente
  MCP; esas acciones pasan por el humano o por esta sesión con permisos.

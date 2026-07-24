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

## Registro continuo (sin que Abraham lo recuerde)

**Toda interacción con efecto — aunque sea pequeña — termina registrada**, en
cualquier superficie (escritorio, web, móvil, CLI):

1. Commit atómico con mensaje convencional (`feat|fix|docs(scope): …`) en cuanto
   un cambio queda estable; nunca acumular trabajo sin commitear entre turnos.
2. Nota de auditoría por sesión — qué se hizo y por qué — vía MCP
   `write_audit_note` (actor: `claude-<superficie>`).
3. `git push origin` al terminar cada tanda de commits (el remoto ya existe).
4. No se guardan conversaciones completas: se registra la taxonomía del trabajo
   (qué archivos, qué decisión, qué queda pendiente).

Arranque en superficies sin este archivo: pegar el bloque de
`docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md`.

## Límites duros

- No publicar: `docs/` internos, `.ai-forge/`, policy local del MCP, material
  personal (CV, identidad, NSFW, credenciales). La rama `public` es el único
  árbol vetado para escaparate.
- Git push, borrado y shell arbitrario están intencionadamente fuera del puente
  MCP; esas acciones pasan por el humano o por esta sesión con permisos.

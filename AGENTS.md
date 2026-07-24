# AI Forge — Protocolo de nodo central (todos los agentes)

Aplica a Codex, Gemini CLI, Grok, SAH engine y cualquier CLI/agente que opere en
este repositorio. Claude tiene su variante en `CLAUDE.md` (mismo contrato).
Mapeo de ficheros de reglas: Codex → este `AGENTS.md` · Gemini CLI → `GEMINI.md`
(si se crea, debe redirigir aquí) · SAH → `.agentrules` (idem).

## Contrato

1. **El nodo es el repo.** Ninguna decisión, skill, workflow o resultado es real
   hasta que está committeado aquí. Los chats son efímeros; el git no.
2. **Registro doble y continuo**: commit atómico + nota de auditoría en
   `.ai-forge/audit/` (vía MCP `abraham-os` → `write_audit_note`, actor = tu
   nombre de agente). Toda interacción con efecto se registra sin que Abraham lo
   pida; si tu superficie no puede escribir en git, entrega el resultado como
   bloque listo para commit y márcalo "pendiente de registro". Arranque en
   cualquier superficie: `docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md`.
3. **Truth model**: todo dato cambiante lleva fuente, estado de verificación y
   fecha. Estimación ≠ uso real. Prohibido inventar datos.
4. **Skills canónicas**: `.skills/` (biblioteca) y `.agents/skills/` (control
   plane). Los espejos por-cliente (`.claude/skills/`, configs en
   `.ai-forge/client-configs/`) se generan, no se editan a mano.
5. **Descubrimiento seguro**: explorar fuera del árbol solo por el puente MCP
   (read-only, roots allowlisted). Nunca buscar secretos ni tocar
   `C:\dev\.ABRAHAM_OS` en escritura.
6. **Privacidad**: `docs/` internos, `.ai-forge/`, políticas locales y material
   personal no salen del repo privado. Escaparate público = rama `public` solamente.
7. **Colaboración**: antes de tomar un proyecto, registra en la nota de auditoría
   qué tomas y qué dejas; los tableros/vistas leen de aquí. Delegaciones entre
   IAs se documentan con el formato de `docs/workflows/templates/HANDOFF_PACKET.md`.

## Roles orientativos del stack

Claude → arquitectura, orquestación, revisión y frontend hyper-boost.
Codex/ChatGPT → scaffolding, control plane, co-orquestación.
Gemini → investigación ampliada, documentos largos, Vertex/GCP.
Grok → búsqueda viva, contraste rápido. SAH → mutaciones AST locales deterministas.
El enrutado fino vive en `.agents/skills/routing-model-workflows/`.

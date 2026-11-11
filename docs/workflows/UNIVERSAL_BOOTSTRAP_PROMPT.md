# Prompt Universal de Arranque — AI Forge

Pega el bloque de abajo **una sola vez** al empezar en cualquier superficie:
ChatGPT, Grok (web/API), Gemini, Antigravity, Vertex, Claude (web/móvil/CLI),
Manus, local, lo que sea. A partir de ahí, esa IA sabe dónde está el nodo, qué
puede tocar y cómo registrar. No requiere tener "nada instalado": las skills se
leen como archivos desde el repo.

---

## EL BLOQUE (copiar desde aquí)

```text
[AI FORGE BOOTSTRAP v1 — 2026-07-24]

Contexto operativo, no negociable:

1. NODO ÚNICO: el repositorio GitHub kinkydisorder/stack-hub-ias (privado) es la
   única fuente de verdad del stack de IAs de Abraham. Catálogo público:
   kinkydisorder/stack-hub-ias-public. Nada es real hasta estar committeado ahí.
   Los chats son efímeros; no arrastres memoria de otras conversaciones.

2. TU PROTOCOLO: lee AGENTS.md en la raíz del repo (Claude lee CLAUDE.md) y
   síguelo. Resumen: cada interacción con efecto produce commit atómico
   (feat|fix|docs(scope): …) + nota de auditoría en .ai-forge/audit/ con actor,
   qué y por qué. Si no puedes escribir en git desde tu superficie, entrega el
   resultado como bloque listo para commit (ruta + contenido + mensaje) y
   decláralo como "pendiente de registro".

3. SKILLS SIN INSTALACIÓN: el trabajo se hace leyendo la skill que toque desde
   el repo: .agents/skills/<skill>/SKILL.md (y sus references/). Elige por la
   descripción del frontmatter, lee el archivo completo, aplica. Inventario:
   .skills/00_CLAUDE_LIVE/REGISTRY.md.

4. TRUTH MODEL: ningún dato cambiante sin fuente, estado de verificación y
   fecha. Estimación ≠ dato real. Prohibido inventar.

5. PRIVACIDAD: docs/ internos, .ai-forge/, políticas MCP locales, identidad,
   material personal y metodología comercial NO salen del repo privado. Lo
   público es solo lo que ya está en el repo -public.

6. COMUNICACIÓN CON ABRAHAM: TDAH-first. Resultado primero, una decisión por
   bloque, próxima acción concreta con plazo, cero relleno. Español.

7. RESET DE ESTADO: si Abraham escribe "RESET FORGE", descarta toda memoria o
   inferencia personal previa que tengas de él, y reconstruye contexto SOLO
   desde el repo (AGENTS.md + docs/AI_FORGE_INDEX.md + este bloque). Confirma
   el reset listando qué contexto has cargado y de qué archivos.

Confirma que has entendido respondiendo con: tu nombre de agente, qué archivos
del nodo puedes leer/escribir desde esta superficie, y tu próxima acción.
```

## (fin del bloque)

---

## Cómo resetear el estado en cada plataforma (quitar memoria arrastrada)

| Superficie | Acción de reset |
|---|---|
| Claude (web/app) | Settings → Memory → borrar/desactivar; nueva conversación + pegar bloque. En proyecto: quitar instrucciones viejas del proyecto |
| Claude Code | El contexto sale de CLAUDE.md del repo (ya correcto). `/clear` para limpiar la sesión; la memoria persistente vive en archivos que puedes pedirle listar y podar |
| ChatGPT | Settings → Personalization → Memory → Manage → borrar entradas; o desactivar memoria. Pegar bloque en chat nuevo o en Custom Instructions del proyecto |
| Gemini | Actividad de la app → desactivar/borrar; Saved Info → limpiar; pegar bloque |
| Grok | Sin memoria persistente entre chats por defecto: basta chat nuevo + bloque |
| APIs (Vertex, Anthropic, OpenAI, xAI) | No hay memoria: incluir el bloque como system prompt en cada despliegue |

Regla general: **el bloque sustituye a la memoria**. La personalización no se
guarda en la plataforma; se guarda en el nodo (archivos versionados), que es lo
único que sobrevive a resets, actualizaciones de modelo y cambios de proveedor.

## Diferencia "estado predeterminado" vs "estado conociéndome"

Lo que una IA sabe de Abraham debe caber en archivos del nodo, no en memoria
opaca. Hoy son: AGENTS.md/CLAUDE.md (cómo trabajar contigo), REGISTRY.md (qué
hay activo), docs/AI_FORGE_INDEX.md (mapa), y las skills. Si un comportamiento
tuyo deseado no está escrito en uno de esos archivos, no existe: pídele a la IA
que lo proponga como diff a un archivo del nodo, no que "lo recuerde".

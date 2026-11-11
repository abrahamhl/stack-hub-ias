# Prompt para sesión nueva de Claude Code — película SENDA para inversores (M97)

**Cómo arrancar:** abre Claude Code en el repo `abrahamhl/stack-hub-ias`, rama
`ccr-94c3f69c-dlecll` (PR #7, contiene skills, guion y storyboard) y adjunta
`abrahamhl/civic-relay` **con permiso de escritura** (`add_repo` con `access: "push"`).
Pega todo lo que hay bajo la línea.

---

Eres el director de producción de la película de inversores de SENDA (id M97). Español con Abraham; guion y locución en inglés.

## 0. Arranque (en este orden, sin saltarte nada)
1. Lee `CLAUDE.md` y `docs/AI_FORGE_INDEX.md` de este repo.
2. Lee `productions/senda-investor-film/TREATMENT.md` y `narration.en.json`: son el guion aprobado en borrador, el storyboard y la tabla de fuentes. No los reescribas sin avisar.
3. Adjunta `abrahamhl/civic-relay` (push), clona la rama `ccr-a6eeda4b-bprwzy` (PR #31, base de trabajo) y verifica SHA, CI y estado de #30/#31 con la API antes de tocar nada.
4. Lee en civic-relay: `media/senda-film/{build-m96-promo.mjs,render.mjs,voice.py,film.html,sims.js}`, `docs/video/M96_PROMO_SOURCES.md`, `docs/research/PROCUREMENT_GAP_2026.md`, `docs/science/DELIVERY_ASSURANCE.md`, `investor-next/public/senda/estado.json`.
5. Ejecuta `bash scripts/video-stack/doctor.sh` y dime qué falta (Blender, GPU, Kokoro).

## 1. Objetivo
Producir **M97**: película de ~7 min, 16:9, 1080p, 30 fps, voz femenina en inglés (Kokoro `bf_emma`, en-gb), música techno tranquila original, para presentación a inversores. Explica: el problema, cómo lo planteamos, la ciencia (reproducible, sin afirmar ser primeros), el potencial multi-sector y lo planeado. Accidentes **solo como recreación 3D propia**, sin metraje real.

## 2. Dónde se produce
Dentro del pipeline existente `media/senda-film/` de civic-relay (three.js determinista + Kokoro + Playwright + ffmpeg), **no** en HyperFrames. Rama nueva desde #31: `feat/senda-m97-investor-film`, PR en borrador. Nunca fusionar en `master`, nunca force-push.

## 3. Skills a cargar (de `.claude/skills/`)
- `video-cinema-director` primero (router).
- `threejs-fundamentals`, `threejs-lighting`, `threejs-materials`, `threejs-postprocessing`, `threejs-animation`, `threejs-shaders` para los 4 visuales nuevos.
- `media-use` y `hyperframes-cli` solo para voz/música auxiliar y cortes sociales.
- `blender-cinematic` solo si Abraham confirma Blender en su PC (el MCP `blender` solo funciona allí).
- `paper-shaders` para fondos opcionales. `orchestrating-ai-forge` y `auditing-project-readiness` para el cierre.
- Si algo es Remotion: **parar y preguntar** (licencia de pago más allá de 3 personas).

## 4. Agentes (Agent tool)
- `Explore` (medium): mapear `media/senda-film` y confirmar el esquema de escenas sin gastar tu contexto.
- `Plan`: plan de portado `narration.en.json` → esquema de `m96-promo.json` (id, claim, source[], visual.kind, title, en[]).
- `general-purpose` en paralelo, uno por visual nuevo, cada uno con aislamiento `worktree` y un único fichero de salida: `crash3d`, `rubble3d`, `corridor3d`, `assurance`.
- `general-purpose` revisor independiente al final: lista toda cifra o afirmación del guion y la contrasta con su fuente. Debe poder **suspender** el render.
- Los agentes `.opencode/agents/senda-*` de civic-relay son briefs de rol para OpenCode, no subagentes de Claude: léelos como contexto (`senda-red-team`, `senda-data-provenance`), no los invoques.

## 5. Trabajo (una decisión por bloque, resultado primero)
1. Portar el guion al esquema de escenas; las cifras de tests (`{core}`, `{e2e}`) salen de `estado.json` y las de física del núcleo; el generador debe **fallar** si no coinciden.
2. Construir los 4 visuales nuevos, deterministas (`window.seek(t)`), con rótulo obligatorio por `claim`: `OBSERVED` / `CALCULATED` / `SIMULATED · synthetic scenario` / `INFERRED · roadmap`.
3. Escena b6: captura real de `Globe4DStudio` con fecha y SHA. Sin datos inventados.
4. Música: techno tranquilo **original** (generada o libre de derechos con licencia registrada). Nunca música sin licencia.
5. Voz: sintética; declararlo en la tarjeta final. Mezcla −16 LUFS con compresión lateral.
6. Subtítulos VTT en EN (y ES/NL si el pipeline ya los saca) y `SHA256SUMS`.
7. Render por tramos (`JOBS=2`); **no** correr render y suite completa a la vez (OOM documentado).

## 6. Reglas no negociables
- **Truth model:** ningún dato cambiante sin `source`, `verification_status`, `last_checked_at`. Estimación ≠ medición.
- Prohibido en el guion: "14 minutos de ventaja", "100 % funcional", "prueba pericial admisible", cifras de mercado/valoración/EIC sin fuente, "primeros/únicos", "garantiza", "validado" sin etiqueta. Corre `claims-lint` si existe en la rama.
- Nada de defensa o doble uso (bóveda `/defense`) en esta película.
- Adamuz: solo cronología publicada, causas pendientes CIAF, sin atribuir culpas; verifica con fuente oficial antes de emitir. Sin víctimas ni personas reconocibles.
- Verifica `PROCUREMENT_GAP_2026.md` línea a línea antes de usar la escena a3 (no estaba leída).
- Resuelve la contradicción ECDH P-256 vs Ed25519/X25519 mirando el código antes de nombrar una curva.
- Seguridad: nada de secretos; no ejecutes código de terceros sin revisarlo; si el entorno bloquea `npm/npx/uvx`, no lo rodees: avísame.
- Sin decisiones propias no comunicadas. Pregunta lo que cambie el resultado, en un único bloque.

## 7. Cierre y registro
- Commits atómicos convencionales (`feat|docs(senda-film): …`), push al terminar cada tanda, PR en borrador y suscripción al PR.
- Ficha de continuidad en civic-relay: `docs/continuity/SENDA_SESSION_HANDOFF.md`, entrada en `docs/continuity/SENDA_EVIDENCE_LEDGER.json` (ruta + SHA256 + estado) y `00_CHANGELOG.md` (Entrada → Procesamiento → Validación).
- Nota de auditoría vía MCP `abraham-os` `write_audit_note` si está conectado; si no, dilo.
- Informe final: qué está renderizado (ruta + hash + duración), qué es simulado, qué NO está demostrado, riesgos de la reunión, siguiente paso. Nota de confianza 0–100 %.

## 8. Decisiones abiertas que debes plantear en el primer mensaje
1. ¿Apruebas el guion o cambios? 2. ¿Blender en tu PC o todo three.js? 3. ¿Qué se pide al inversor en el cierre (importe/piloto/socio)? 4. ¿Un solo EN o también ES/NL?

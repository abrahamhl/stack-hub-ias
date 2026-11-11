# Orientación de producto — AI Forge (canónica)

- Fecha: 2026-07-25 · Actor: Abraham (mandato) · Registro: grok-cli  
- Estado: **VIGENTE — no negociable**  
- Complementa: `CENTRAL_NODE_DECISION.md`, `HUB_ROADMAP.md`, `hub/SECURITY.md`

## En una frase

**La interfaz del hub es el puesto de mando; GitHub privado es el backend/infra;
los chats de Claude/Grok/Codex son brazos desechables que SIEMPRE arrancan
leyendo el stack, no la memoria del proveedor.**

## Lo que Abraham quiere (intención real)

1. **Hablar y operar desde la UI del stack** (HTML/app), no desde la consola del
   proveedor como sitio “oficial” de trabajo.
2. **Réplica de UX de configuración tipo IDE/GitHub** donde tienen sentido:
   menú de plugins / skills, listados, edición, estado, PRs/issues como
   infraestructura — no reinventar un backend inventado si GitHub ya lo cubre.
3. **Editar skills/plugins en el nodo**: si Abraham edita una skill en el hub,
   el cambio va al **repo** (commit). La próxima vez que cualquier IA abra un
   chat nuevo, **carga del stack**, no de “su” carpeta mágica del proveedor.
4. **Visibilidad de fábrica**: quién hace qué, ideas nuevas, skills a coger,
   handoffs, jobs vivos — optimización del trabajo multi-IA **desde el nodo**.
5. **Privado por diseño**: secreto comercial y autoría de método en el repo
   PRIVATE; el hub es vista del nodo, no un chat público suelto.

## Arquitectura lógica

```text
                    Abraham
                       │
                       ▼
              ┌─────────────────┐
              │  HUB (UI HTML)  │  ← puesto de mando gráfico
              │  skills, salas, │
              │  jobs, edit…    │
              └────────┬────────┘
                       │ lee/escribe vía GitHub API (PAT)
                       ▼
              ┌─────────────────┐
              │ GitHub PRIVATE  │  ← backend / fuente de verdad
              │ código, skills, │
              │ issues, commits │
              │ audit notes     │
              └────────┬────────┘
           ┌───────────┼───────────┐
           ▼           ▼           ▼
        Claude      Grok/Codex   Gemini…
        (brazo)     (brazo)      (brazo)
        Siempre: RESET/bootstrap → leer repo → trabajar → commit
```

## Qué NO es este proyecto

| Malentendido | Corrección |
|---|---|
| “La consola PowerShell es el producto” | Solo es un arranque local para ver el hub |
| “Cada IA guarda skills en su app” | Las skills canónicas viven en el **repo**; las apps solo espejo |
| “Un chat nuevo ya se acuerda del proyecto” | No. Debe **ir al stack** (bootstrap + skills del repo) |
| “Hay que hacer el repo público para que funcione” | **No.** Privado es el diseño correcto |
| “El hub estático ya es el editor de skills en vivo” | Aún **parcial**: mapa y lectura sí; edición→commit es el siguiente tramo |

## Estado actual vs destino

| Capacidad | Ahora | Destino |
|---|---|---|
| Ver mapa de agentes / skills / jobs | Parcial (hub vault) | Completo + premium |
| Backend = GitHub (commits, issues) | Lectura vía PAT/snapshot | Lectura + **escritura** (contents API) |
| Editar skill en UI → todas las IAs la ven | No (solo editar en GitHub/editor) | Sí: UI → commit en `.skills/` / `.agents/skills/` |
| Menú config tipo plugins/skills (réplica) | No | Sí: Skill Registry editable |
| Hablar al agente desde el hub | No (aún sales a Claude/Grok) | Terminal por sala + handoff al brazo con contexto del nodo |
| Chat nuevo = leer stack | Por protocolo AGENTS/CLAUDE | Automático + UI que muestra “carga este contexto” |

## Regla de trabajo para toda IA

1. El nodo es el repo privado.
2. Skills se editan en rutas canónicas del repo (o vía hub que escribe ahí).
3. Nunca trates la memoria del chat del proveedor como fuente de verdad.
4. Toda interacción con efecto: commit + audit en el nodo.
5. UI del hub = lo que Abraham usa para **ver y dirigir**; GitHub = almacén y API.

## Siguiente tramo de implementación (orden)

1. **Skill Studio en el hub**: lista = menú plugins/skills; click = editor;
   Guardar = commit GitHub Contents API (PAT write acotado) o descarga de
   patch listo para commit si no hay write.
2. **Tablero vivo**: issues + commits + job_state por agente (quién hace qué).
3. **Terminal de sala**: no chat completo al inicio; sí bootstrap + deep-link
   + “contexto a cargar” generado desde el nodo.
4. **Réplica UX** de superficies de config (skills on/off, paths, owners)
   con tokens hyper-boost / Fallout shelter — no admin genérico.

## Lectura obligatoria relacionada

- Nodo: `CENTRAL_NODE_DECISION.md`
- Fases: `HUB_ROADMAP.md`
- Premium UI: `.skills/frontend-hyper-boost/references/premium-21st-registry.md`
- Secreto: `hub/SECURITY.md`

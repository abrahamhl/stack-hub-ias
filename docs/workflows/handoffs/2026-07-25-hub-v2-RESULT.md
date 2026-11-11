# Handoff — Hub Vault Factory (premium apply)

- Task: aplicar premium-21st-registry al hub real (no solo docs de skills)
- Actor: grok-cli · rama `feat/hub-v2`
- Nivel: **PREMIUM** · metáfora **Fallout Shelter Factory**

## Resultado

`hub/index.html` reescrito como **Vault Factory**:

| Zona | Gramática 21st (reimplementada vanilla) |
|---|---|
| Hero | #2 futuristic + #16 wavy + #6 core |
| Factory map | #11 orrey + #10 interactive nodes |
| Room cards | #1 shader depth + #3 spotlight pointer |
| Jobs vivos | #4 sphere + #5 swirl + #17 phase rings |
| Handoffs / atmósfera | #8 particle field + lanes live |
| Pulse | #15 vertical bars (no tabla gris) |
| Gallery | #13 circular orbit + #14 grid |
| Taxonomy view | conversación → nodo contado |

## Taxonomía

- `hub/taxonomy.json` — registry map + conversation_taxonomy (esta charla cuenta)
- `hub/agents.json` — `job_state` / `job_label` / `phase` / `intensity` por sala
- `hub/catalog.json` — apunta taxonomy + metaphor

## Cómo abrir

```powershell
cd C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs
npx --yes serve . -l 4180
```

→ http://localhost:4180/hub/

PAT en Config si el repo público 404.

## Confirmación Abraham

Sí: lo hablado (skills premium, fallout, jobs vivos, no admin plano, stacks por agente, RESET) está en **git + taxonomy + audit**, no solo en el chat.

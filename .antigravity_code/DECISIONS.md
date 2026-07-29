# ARCHITECTURAL DECISION RECORDS (.antigravity_code/DECISIONS.md)

## ADR-001: Separación de Skills Generales vs. Skills de Agente
- **Decisión**: Las skills generales compartidas residen en `.skills/`. Las skills específicas de cada motor o proveedor residen en su propio contenedor (ej. `.antigravity_code/skills/` para Antigravity, `.claude/skills/` para Claude).
- **Razón**: Permite al usuario revisar y aprobar las skills nativas de cada IA antes de integrarlas al catálogo global.

## ADR-002: Matriz de Activación ON/OFF en Tiempo Real
- **Decisión**: El estado ON/OFF de cada skill por agente se controla en `hub/skill-activations.json`.
- **Razón**: Permite activar o desactivar habilidades desde la web del Hub sin modificar el código fuente ni depender de la memoria del chat.

## ADR-003: Sincronización Automática con GitHub
- **Decisión**: Todo cambio relevante ejecuta un commit atómico y push a la rama `feat/hub-v2`.
- **Razón**: Garantiza persistencia total de datos y evita pérdida de trabajo.

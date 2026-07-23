# Matriz del fork tuneado

Esta matriz traduce funciones observadas en Codex, Claude y Manus a módulos
propios. No promete conectividad que aún no esté verificada.

| Módulo AI Forge | Codex | Claude | Manus | Implementación propia |
|---|---|---|---|---|
| Identidad | perfil y mascota | instrucciones y memoria | perfil y conocimiento | identidad separada del contrato técnico |
| Skills | plugins/Skills locales | Skills personales y oficiales | habilidades activables | `.skills` canónica + adaptadores |
| Agentes | tareas, subagentes y worktrees | Claude Code/Cowork | agente desplegable | roster con objetivo, runtime y auditoría |
| Conectores | complementos y MCP | conectores, plugins y MCP local | apps, API y MCP personalizado | catálogo con estado real y permisos |
| PC local | workspace y terminal | MCP local/Cowork | My Computer | MCP allowlisted sin shell general |
| Navegador | navegador controlado | Chrome integrado | navegador local/nube | herramienta separada y auditable |
| Memoria | memoria experimental y archivos | conversaciones/memoria | perfil/conocimiento | vault como fuente, resúmenes direccionables |
| Git | branch, worktrees, hooks | Claude Code | conector GitHub | diff, pruebas, commit y sync gated |
| Uso/créditos | límites y créditos | uso por modelo | nube/IA/integraciones | eventos normalizados, coste y valor |
| Programación | automatizaciones | Cowork/skills | programado/mensajería | colas durables y notificaciones |
| Datos/permisos | sandbox/config | capacidades/privacidad | controles de datos | policy gateway visible |
| Deploy | Sites y conectores | código/integraciones | Sites/Cloud Computer | staging privado + producción Git/Vercel |

## Navegación propuesta

```text
01 Daily Command          foco y siguiente acción
02 Project Corkboard      proyectos, fase, dueño y salida
03 Operator Shelter       agentes, mascotas y contrato técnico
04 Skill Registry         una Skill canónica y sus adaptadores
05 Frontend Lab           patrones, calidad y escenas
06 Fork Blueprint         matriz de capacidades y estado
07 Git Auditor            diff, heatmap y contrato de cambio
08 MCP Bridge             permisos, herramientas y auditoría local
```

## Estados de verdad

- `VERIFIED`: evidencia observada o prueba ejecutada.
- `LOCAL ONLY`: existe localmente y no está sincronizado.
- `REVIEW`: diseño o integración pendiente de prueba completa.
- `BLOCKED`: no existe autorización, credencial o dependencia requerida.

Nunca usar `READY` solo porque una tarjeta se vea completa.

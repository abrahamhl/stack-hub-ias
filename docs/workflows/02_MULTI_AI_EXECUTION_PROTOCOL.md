# Protocolo multi-IA sin pisarse

## Roles

- **Orchestrator**: prioriza, abre task packets y autoriza gates.
- **Writer**: único agente con escritura sobre una rama/worktree.
- **Architecture reviewer**: límites, dependencias y deuda.
- **UX reviewer**: accesibilidad, responsive y flujo.
- **Security reviewer**: secretos, permisos, datos y supply chain.
- **Release owner**: humano que aprueba PR, deploy y rollback.

Una “mascota” es identidad visual/estado del rol. No añade permisos ni es un
agente autónomo.

## Algoritmo

1. Clasificar riesgo: verde, ámbar o rojo.
2. Congelar commit base.
3. Crear task packet y rama por writer.
4. Entregar la Skill necesaria, no toda la biblioteca.
5. Dar MCP read-only por defecto.
6. Implementar máximo tres iteraciones.
7. Ejecutar tests deterministas.
8. Auditar el diff con perspectivas independientes.
9. Comparar scores, coste y tiempo.
10. El humano acepta, rechaza o pide una corrección.

## Contrato Git

- Nunca dos writers en la misma rama.
- No direct push a `main`, force push ni secrets.
- Un commit expresa una unidad verificable.
- Sincronizar significa eventos y commits trazables, no escritura continua de
  todas las IAs en el vault.
- El vault recibe resúmenes aprobados; Git guarda código/evidencia.

## Contexto mínimo

Cada agente recibe `AGENTS.md`, task packet, rutas, Skill exacta, commit base,
DoD, presupuesto y formato de handoff. No recibe chats completos ni todas las
Skills “por si acaso”.

## Heatmap

Registrar proyecto/fase, agente/modelo/versión, minutos, tokens, coste, archivos,
tests, reintentos, hallazgos, aceptación y valor observado. Cantidad de commits
o tokens no equivale a productividad.


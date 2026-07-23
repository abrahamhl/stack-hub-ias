# Benchmark Claude + Fable 5

## Objetivo

Aprovechar el uso y créditos disponibles para mejorar arquitectura/frontend con
evidencia, no para generar variantes inconexas.

“Fable 5” queda como nombre declarado. Antes de ejecutar se anota proveedor,
producto y modelo exactos mostrados por la aplicación.

## Prueba A/B/C

Codex, Claude/Fable 5 y Gemini reciben el mismo commit, task packet,
`frontend-hyper-boost`, máximo tres iteraciones, worktrees independientes y
tests idénticos.

| Área | Puntos |
|---|---:|
| Correctitud y tests | 25 |
| Arquitectura y mantenibilidad | 20 |
| UX, responsive y accesibilidad | 20 |
| Rendimiento y motion budget | 10 |
| Seguridad y privacidad | 10 |
| Originalidad alineada | 10 |
| Coste, tiempo y tamaño del diff | 5 |

## Flujo Claude

1. Conectar MCP local en scope local.
2. Verificar tools allowlisted.
3. Importar la Skill por separado.
4. Primera pasada read-only.
5. Congelar propuesta.
6. Implementar en worktree propio.
7. Tercera pasada solo por criterio fallido.
8. Revisión ciega cruzada.

## Créditos

- Sin recarga automática ni rotación para eludir cuotas.
- Presupuesto por task packet.
- Parar al cumplir DoD aunque queden créditos.
- Registrar moneda, coste, modelo y tokens.
- Saldos/capturas de cuenta siempre fuera de Git.

Usar [la scorecard común](templates/BENCHMARK_SCORECARD.md) para no cambiar los
criterios después de ver los resultados.

# Auditoría de saneamiento — Stack AI Forge

Fecha: 2026-07-23

## Evidencia local

El inventario reproducible detectó 22 carpetas de primer nivel bajo `C:\dev\02_PROJECTS`:

- 4 son repositorios Git;
- 4 tienen remoto configurado;
- 2 repositorios contienen cambios sin consolidar;
- 6 carpetas tienen un manifiesto técnico visible en la raíz;
- 2 requieren revisión privada por su clasificación nominal.

El detalle con rutas y nombres sensibles se conserva solo en `.ai-forge/audit/project-inventory.json`.

## Problemas principales

1. La estructura de carpetas no equivale todavía a un catálogo de proyectos: faltan manifiestos, estados y responsables.
2. Mezclar vault, repositorios y frontend convertiría una sincronización en una fuga de privacidad.
3. El repositorio maestro no tenía remoto, por lo que “sincronizado con GitHub” no era un estado verificable.
4. La librería histórica de Skills mezcla artefactos reutilizables con contexto personal y material de alto riesgo.
5. Algunos despliegues existentes apuntan a flujos o destinos que deben validarse proyecto por proyecto.

## Acciones ejecutadas

- Se excluyeron del repositorio las Skills históricas, referencias privadas, ZIP, rutas locales y evidencias operativas.
- Se promovieron cinco Skills limpias y mantenibles a `.agents/skills`.
- Se construyó un MCP de mínimo privilegio sin borrado, shell, commit ni push.
- Se creó un frontend independiente del vault con persistencia de metadatos.
- Se automatizó el inventario local sin mutar los proyectos inspeccionados.

## Cola priorizada

| Prioridad | Grupo | Decisión |
|---|---|---|
| P0 | AI Forge | validar, commit local, despliegue privado y elegir remoto privado |
| P0 | repos con cambios | auditar diffs y evitar mezclar trabajo no relacionado |
| P1 | proyectos con manifiesto sin Git | decidir si son producto, experimento o archivo |
| P1 | despliegues existentes | comprobar destino, credenciales, build y rollback |
| P2 | resto de carpetas | clasificar antes de crear repositorios |

## Riesgo residual

La auditoría de dependencias de producción queda en cero avisos tras fijar versiones seguras de `sharp` y `postcss`. La cadena de desarrollo conserva 12 avisos transitivos (1 bajo, 4 moderados y 7 altos); no forman parte del bundle de producción, pero deben revisarse con cada actualización. No se aplicó `npm audit fix --force` porque proponía cambios mayores no evaluados.

## Regla de limpieza

No borrar ni mover un archivo solo porque parezca duplicado. Primero se registra origen, consumidor, sensibilidad, reemplazo y rollback; después se archiva de forma recuperable y solo con aprobación.

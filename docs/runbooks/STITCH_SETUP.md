# Google Stitch — conexión segura

## Estado

Preparado, no conectado. El ejecutable de Codex instalado por Windows no permite invocar la gestión de plugins desde esta sesión, y la conexión MCP todavía necesita autenticación del usuario.

## Instalación recomendada

El upstream de Google Labs Code recomienda añadir `https://github.com/google-labs-code/stitch-skills` como marketplace de Codex, usando checkout disperso:

```text
.agents/plugins
plugins/stitch-design
plugins/stitch-build
plugins/stitch-utilities
```

Instalar después:

- `stitch-design`
- `stitch-build`
- `stitch-utilities`

No usar una copia completa ni instalar Skills individuales al azar: tienen dependencias internas y aumentarían el ruido.

## Conectar el MCP

1. Abrir la gestión de plugins de Codex desde una sesión con permisos.
2. Añadir el marketplace y los tres plugins anteriores.
3. Seguir el setup MCP enlazado por el repositorio.
4. Guardar credenciales en el gestor seguro del cliente.
5. Reiniciar el cliente si lo exige.
6. Ejecutar el smoke test de `.agents/skills/operating-google-stitch/references/setup-and-loop.md`.

## Uso obligatorio en AI Forge

Stitch se activa cuando el trabajo pide ideación visual, variantes, `DESIGN.md`, code-to-design o design-to-code. La salida no entra en producción hasta pasar validación responsive, accesibilidad, reduced motion y revisión Git.

## Nota de confianza

El repositorio vive bajo `google-labs-code`, pero declara que no es un producto Google oficialmente soportado. Debe fijarse una revisión auditada antes de automatizar actualizaciones.

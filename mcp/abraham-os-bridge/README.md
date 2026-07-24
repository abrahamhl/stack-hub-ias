# Abraham OS MCP Bridge

Puente local y auditable para que clientes MCP consulten proyectos seleccionados
sin recibir acceso irrestricto al equipo.

## Alcance del MVP

- Lista raíces permitidas.
- Lista directorios saneados.
- Lee archivos de texto limitados.
- Busca texto mediante `rg`.
- Consulta `git status` y remotos.
- Escribe únicamente notas Markdown en `.ai-forge/audit/`.
- Registra escrituras y denegaciones en `.ai-forge/logs/events.ndjson`.

No expone borrado, shell arbitraria, secretos, staging, commits ni push.

## Uso local

```powershell
npm install
npm run build
npm test
node dist/index.js
```

El cliente MCP debe ejecutar `node` con la ruta absoluta a `dist/index.js`.
Para cambiar raíces, copia `config/policy.example.json` como
`config/policy.local.json`. Este archivo local no debe publicarse.

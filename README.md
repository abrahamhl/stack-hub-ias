# AI Forge — Abraham OS Command Center

Centro de control Git-first para proyectos, agentes, Skills, auditorías y costes de IA. La interfaz visual funciona como una fábrica de IAs; el acceso al PC permanece detrás de un puente MCP local con permisos explícitos.

## Estado actual

- Frontend responsive construido con React, Vinext y Sites.
- Persistencia preparada con D1 + Drizzle para metadatos y eventos de auditoría.
- MCP local con raíces permitidas, lectura segura y escritura limitada a notas de auditoría.
- Seis Skills canónicas en `.agents/skills`, incluida la ruta segura de Stitch.
- Inventario local reproducible de `C:\dev\02_PROJECTS`.
- GitHub desconectado intencionadamente hasta configurar un repositorio privado y su remoto.

## Ejecutar el frontend

```powershell
npm install
npm run dev
```

Validación completa:

```powershell
npm run lint
npm test
```

## Ejecutar el MCP local

```powershell
cd mcp\abraham-os-bridge
npm install
npm run build
npm test
.\..\..\.agents\skills\operating-abraham-mcp\scripts\emit-client-config.ps1
```

El archivo `config/policy.local.json` define exactamente qué carpetas puede ver el servidor. Está excluido de Git porque contiene rutas privadas.

## Inventariar proyectos

```powershell
.\scripts\inventory-projects.ps1
```

El resultado se guarda en `.ai-forge/audit/project-inventory.json`, fuera de Git. Sirve como entrada para clasificar proyectos sin publicar nombres, rutas o repositorios sensibles.

## Arquitectura y operación

- [Arquitectura de ejecución](docs/architecture/2026-07-23-ai-forge-runtime.md)
- [Auditoría de saneamiento](docs/audits/2026-07-23-stack-sanitization.md)
- [Política Git y sincronización](docs/runbooks/GITHUB_SYNC_POLICY.md)
- [Runbook de despliegue](docs/runbooks/DEPLOY_RECOVERY.md)
- [Conexión segura de Google Stitch](docs/runbooks/STITCH_SETUP.md)

## Límites de seguridad

El frontend desplegado nunca accede directamente al sistema de archivos. D1 almacena metadatos operativos, no secretos ni contenido completo del vault. El MCP no puede borrar, ejecutar shell, hacer commits o publicar. Esas capacidades deben añadirse después como acciones separadas, auditadas y con aprobación humana.

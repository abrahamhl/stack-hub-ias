# Política Git y sincronización

## Estado seguro por defecto

AI Forge trabaja en local. Nada se publica porque:

- el repositorio maestro no tiene remoto GitHub;
- el frontend no contiene credenciales Git;
- el MCP no expone herramientas de commit o push;
- `config/policy.local.json`, `.ai-forge`, `.skills`, `src` y referencias privadas están ignorados.

## Flujo autorizado

1. Inventariar el proyecto y asignar sensibilidad.
2. Crear una rama `agent/<scope>` o un worktree dedicado.
3. Registrar objetivo, archivos permitidos y definición de terminado.
4. Ejecutar cambios mínimos.
5. Pasar checks y auditoría cruzada.
6. Mostrar diff y commit propuesto.
7. Commit local.
8. Push solo a un remoto privado previamente validado.
9. PR con rollback, evidencia y responsable.
10. Promover a producción únicamente desde un commit revisado.

## Reglas multi-IA

- Una tarea tiene un único propietario de escritura.
- Los auditores trabajan en lectura o ramas separadas.
- Ningún agente modifica `main`/`master` directamente.
- Un evento de orquestación incluye `project`, `scope`, `agent`, `model`, `branch`, `commit`, `checks`, `cost_source` y `approval`.
- Los desacuerdos se registran; no se resuelven sobreescribiendo archivos.

## Activar GitHub

Requisitos antes del primer push:

1. Crear o seleccionar un repositorio privado.
2. Instalar y autenticar GitHub CLI o configurar un remoto mediante credencial segura.
3. Verificar propietario y URL con `git remote -v`.
4. Revisar `git status`, secretos y archivos ignorados.
5. Hacer el primer push desde una rama de trabajo, no desde una mutación improvisada de `master`.

## Prohibiciones

- No usar tokens en URLs persistidas.
- No copiar el vault completo a Git.
- No rotar cuentas para eludir cuotas.
- No ejecutar `push --force` ni borrar remotos desde la orquestación.
- No publicar proyectos NSFW o privados sin un límite de repositorio y acceso explícitos.

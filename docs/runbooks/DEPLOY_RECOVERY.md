# Runbook de despliegue y recuperación

## Preflight

```powershell
npm ci
npm run lint
npm test
git status --short
git rev-parse HEAD
```

El commit validado debe ser exactamente el mismo que se envía al origen de despliegue.

## Despliegue

- AI Forge se despliega primero como sitio privado.
- Las migraciones D1 viven en `drizzle/`.
- Los secretos se configuran en el proveedor, nunca en `.env` versionados.
- El inventario local no se incluye en el artefacto.

## Verificación

Comprobar:

1. carga inicial sin errores;
2. navegación con teclado y foco visible;
3. móvil, tableta, escritorio y pantalla grande;
4. `prefers-reduced-motion`;
5. lectura de proyectos y eventos;
6. rechazo de escrituras no autenticadas;
7. ausencia de rutas, nombres privados o claves en el bundle.

## Recuperación

1. Identificar el último versionado estable.
2. Reasignar el despliegue a esa versión.
3. No borrar el despliegue fallido hasta exportar logs.
4. Abrir incidencia con commit, runtime, migración y síntoma.
5. Corregir en una rama y repetir el preflight.

GitHub y Sites son canales distintos: un despliegue privado puede existir sin publicar el código en GitHub.

# AI Forge Runtime Architecture

Actualizado: 2026-07-23

## Decisión principal

AI Forge sustituye a Obsidian como interfaz operativa inmediata, pero no elimina el conocimiento de `ABRAHAM_OS`. Git y los Markdown siguen siendo la fuente legible; el panel actúa como índice, orquestador y capa de estado.

## Capas

```text
AI / CLI / IDE
      |
      v
MCP Abraham OS (local, policy-gated)
      |
      +--> C:\dev\02_PROJECTS\...       [audit-write por raíz]
      +--> C:\dev\.ABRAHAM_OS           [solo lectura]
      +--> .ai-forge/logs/events.ndjson [traza local]

Frontend AI Forge (Sites)
      |
      +--> D1: proyectos, estados y eventos sanitizados
      +--> UI: Command, Corkboard, Shelter, Skills, Git, MCP
      |
      X--> Nunca monta el sistema de archivos local

Git por proyecto
      |
      +--> rama por agente o trabajo
      +--> checks
      +--> revisión humana
      +--> commit y push privado
```

## Backend mínimo realista

### Ahora

- D1 + Drizzle para el registro de proyectos y el ledger de auditoría.
- Rutas `/api/projects` y `/api/audit-events`.
- Escritura web protegida por identidad de ChatGPT/Sites.
- MCP por `stdio` para acceso local compatible con clientes que soporten el protocolo.
- NDJSON local como evidencia recuperable cuando no existe conexión.

### Después del primer uso real

1. Webhook GitHub App para PR, checks y commits.
2. Worker de sincronización que promueve a D1 solo campos sanitizados.
3. Telegram Bot para avisos; WhatsApp Business se evalúa después por coste y fricción de plantillas.
4. Postgres únicamente cuando D1 deje de cubrir consultas, retención o concurrencia. No antes.

## Registro de consumo

Cada evento de coste debe distinguir:

- `actual`: entregado por API o proveedor.
- `manual`: introducido desde una factura o panel.
- `estimated`: cálculo con precio versionado.
- `unknown`: no existe evidencia suficiente.

Campos mínimos: proveedor, modelo, cuenta opaca, proyecto, agente, tokens de entrada/salida, coste, crédito restante, procedencia, fecha y `pricing_version`. Nunca se almacenan API keys en D1 o Git.

## Loop de modelos

El router selecciona modelo por riesgo, privacidad, coste, capacidad y disponibilidad. No rota cuentas para eludir límites ni automatiza autorizaciones. Una degradación correcta va de modelo preferido a alternativo permitido, luego local/NIM y finalmente cola humana.

## Definición de “ready”

Un proyecto está preparado cuando tiene:

1. alcance y siguiente resultado verificable;
2. manifiesto o instrucciones reproducibles;
3. política de privacidad;
4. repositorio y remoto correctos, si procede;
5. árbol limpio o cambios intencionalmente registrados;
6. build, lint y pruebas pertinentes;
7. despliegue recuperable y propietario claro.

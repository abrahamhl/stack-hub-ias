# Workflow maestro de AI Forge

Actualizado: 2026-07-23

## La respuesta corta

No se entrega el mismo ZIP, repositorio o comando a todas las IAs.

1. **Repositorio**: código, documentación, tareas y ramas.
2. **MCP**: acceso limitado y auditable a carpetas y herramientas.
3. **Skill**: método de trabajo especializado, instalado aparte.
4. **Task packet**: encargo concreto, alcance, criterios y presupuesto.

El puente local usa `stdio`. Los clientes cloud necesitarán más adelante un
gateway HTTPS autenticado. Hasta que exista, no se exponen carpetas locales con
túneles improvisados.

## Flujo obligatorio

```text
IDEA
  ↓
INTAKE → riesgo, ROI, dependencia y Definition of Done
  ↓
BACKLOG PRIORIZADO
  ↓
UN SOLO "SHIP NOW"
  ↓
SCOPE → máximo tres intentos o iteraciones financiadas
  ↓
TASK PACKETS → un propietario escritor; auditores en solo lectura
  ↓
WORKTREE/RAMA AISLADA
  ↓
IMPLEMENTACIÓN → tests → auditoría cruzada
  ↓
APROBACIÓN HUMANA
  ↓
COMMIT LOCAL → PR → deploy controlado
  ↓
EVIDENCIA, COSTE, RESULTADO Y RETROSPECTIVA
```

## Sesión de principio a fin

### 0. Preflight

- Ejecutar `scripts\mcp-doctor.ps1`.
- Confirmar repo, rama, árbol limpio o cambios conocidos.
- Elegir el único proyecto `SHIP NOW`.
- Definir límite de tiempo, tokens y euros.
- Prohibido pegar claves, memorias privadas o `.env` en chats.

### 1. Scope

Crear un `TASK_PACKET.md` con resultado verificable, rutas permitidas,
exclusiones, writer, reviewers, máximo tres iteraciones, tests, coste y
condición de parada.

### 2. Asignación

- Una IA es **writer** de una rama/worktree.
- Las demás son **reviewers** read-only o trabajan en ramas diferentes.
- Nadie publica, mezcla o despliega sin aprobación.
- No se rotan cuentas o proveedores para eludir límites.

### 3. Ejecución

- El writer lee `AGENTS.md`, el task packet y la Skill necesaria.
- Usa el MCP solo si su cliente está registrado y verificado.
- Registra decisiones y supuestos; no vuelca chats enteros al vault.
- Los reviewers puntúan el mismo resultado con la misma rúbrica.

### 4. Gate de calidad

- lint, tipos, tests y build;
- responsive móvil, tableta, escritorio y TV;
- teclado, foco, reduced motion y contraste;
- revisión de secretos y dependencias;
- diff comprensible y rollback;
- coste real frente al presupuesto.

### 5. Publicación y cierre

Primero commit local. Después PR. El deploy sale de una versión aprobada y
reproducible. Se conservan hash, pruebas, URLs, coste, tiempo, modelo exacto,
score, riesgos y siguiente acción única.

## Estados del corcho

`INBOX → SCOPED → READY → SHIP NOW → REVIEW → BLOCKED | SHIPPED → MEASURE`

Solo puede existir un `SHIP NOW` por flujo personal.

## Puertas con aprobación explícita

- Gastar créditos o activar APIs.
- Crear claves, OAuth, túneles o endpoints públicos.
- Escribir fuera del repo/área permitida.
- Commit, push, PR, merge, dominio o deploy.
- Datos personales, cámaras, biometría o inferencias de conducta.
- Face swap o contenido sintético con personas reales.

## Orden inmediato

1. Control plane, MCP local y configs reproducibles.
2. Triaje + catálogo Marktplaats como primer ROI.
3. Web DJ + laboratorio de renders.
4. Agencia NL + web Hostinger.
5. SaaS demo de auditoría competitiva.
6. Investigación de render/open source.
7. Cámaras y face swap: carril rojo hasta revisión legal y ética.


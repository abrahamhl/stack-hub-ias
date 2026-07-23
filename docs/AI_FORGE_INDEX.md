# AI Forge — índice maestro

Actualizado: 2026-07-23

Este índice separa fuente canónica, adaptadores, aplicación, puente local,
documentación y artefactos generados. El objetivo es máximo valor con una única
fuente de verdad por concepto.

## Mapa rápido

```text
stack-hub-IAs/
├── .skills/
│   ├── frontend-hyper-boost/          # única Skill frontend canónica
│   └── _packages/                     # artefactos locales ignorados por Git
├── .agents/skills/
│   ├── frontend-hyper-boost/          # adaptador de descubrimiento
│   ├── orchestrating-ai-forge/
│   ├── auditing-project-readiness/
│   ├── routing-model-workflows/
│   └── operating-abraham-mcp/
├── app/                               # AI Forge web
├── db/                                # acceso a D1 y esquema Drizzle
├── mcp/abraham-os-bridge/             # puente local con allowlist
├── drizzle/                           # esquema y migraciones
├── scripts/                           # auditoría e inventario del proyecto
├── docs/
│   ├── architecture/
│   ├── audits/
│   ├── changelog/
│   ├── runbooks/
│   └── workflows/                     # operación multi-IA reproducible
└── .openai/hosting.json               # identidad del proyecto Sites
```

## Skill frontend

- [Entrada canónica](../.skills/frontend-hyper-boost/SKILL.md)
- [Patrones de interacción](../.skills/frontend-hyper-boost/references/interaction-patterns.md)
- [Selección de stack](../.skills/frontend-hyper-boost/references/stack-routing.md)
- [Responsive, accesibilidad y confianza](../.skills/frontend-hyper-boost/references/responsive-accessibility.md)
- [Direcciones visuales](../.skills/frontend-hyper-boost/references/design-directions.md)
- [Google Stitch](../.skills/frontend-hyper-boost/references/stitch-loop.md)
- [Workflows](../.skills/frontend-hyper-boost/references/workflows.md)
- [Auditor estático](../.skills/frontend-hyper-boost/scripts/audit-frontend.ps1)
- [Empaquetador `.skill`](../.skills/frontend-hyper-boost/scripts/package-skill.ps1)
- [Template React Motion Lab](../.skills/frontend-hyper-boost/assets/templates/react-motion-lab/MotionScene.tsx)
- [Adaptador Agent Skills](../.agents/skills/frontend-hyper-boost/SKILL.md)

El paquete generado vive en
`.skills/_packages/frontend-hyper-boost.skill`. Es un contenedor ZIP con otra
extensión y no se versiona para evitar duplicar peso.

## Arquitectura y decisiones

- [Skill, agente, perfil y mascota](architecture/SKILL_AGENT_MASCOT_MODEL.md)
- [Matriz del fork tuneado](architecture/FORK_CAPABILITY_MATRIX.md)
- [Estrategia Sites, Vercel y GitHub](architecture/HOSTING_STRATEGY.md)
- [Auditoría de referencias y capturas](audits/2026-07-23-frontend-hyper-boost-audit.md)
- [Pasos que no debemos perder](runbooks/NEVER_LOSE_THE_PATH.md)
- [Workflow maestro](workflows/00_MASTER_WORKFLOW.md)
- [Matriz de conexión por cliente](workflows/01_CLIENT_ONBOARDING_MATRIX.md)
- [Protocolo multi-IA](workflows/02_MULTI_AI_EXECUTION_PROTOCOL.md)
- [Benchmark Claude + Fable 5](workflows/03_CLAUDE_FABLE_BENCHMARK.md)
- [Oleadas, créditos y carriles rojos](workflows/04_PROJECT_WAVES_AND_GATES.md)
- [Changelog](changelog/AI_FORGE_CHANGELOG.md)

## Aplicación

- [Dashboard principal](../app/forge-dashboard.tsx)
- [Sistema visual y responsive](../app/globals.css)
- [Layout](../app/layout.tsx)
- [API de proyectos](../app/api/projects/route.ts)
- [API de auditoría](../app/api/audit-events/route.ts)
- [Acceso a D1](../db/index.ts)
- [Esquema de datos](../db/schema.ts)

Las APIs de Skills, agentes, consumo e ingesta MCP pertenecen a la siguiente
fase. No se enlazan como capacidad disponible hasta que existan, tengan
autorización, validación de entrada, auditoría y pruebas.

## Puente local

- [MCP ABRAHAM OS](../mcp/abraham-os-bridge/README.md)
- [Servidor](../mcp/abraham-os-bridge/src/index.ts)
- [Política de ejemplo](../mcp/abraham-os-bridge/config/policy.example.json)

La política local real permanece ignorada por Git porque contiene rutas exactas.

## Verificación

```powershell
npm run lint
npm run test
npm run build

& ".skills\frontend-hyper-boost\scripts\audit-frontend.ps1" -Path "."
& ".skills\frontend-hyper-boost\scripts\package-skill.ps1"
& ".\scripts\mcp-doctor.ps1"
& ".\scripts\export-mcp-client-configs.ps1"
```

## Regla de publicación

GitHub recibe código y documentación saneados. No recibe secretos, credenciales,
rutas privadas, memorias de chats, capturas de cuenta, biblioteca histórica
sensible ni archivos de política local.

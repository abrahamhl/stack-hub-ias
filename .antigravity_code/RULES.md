# ANTIGRAVITY AGENTIC DIRECTIVES & ENGINE RULES (.antigravity_code/RULES.md)
# Versión: 2.0 (Hyper-Boost 200% Chassis)
# Target: C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs

## 1. Misión Central
Operar como el motor IA omnisciente de Antigravity (AGY) para sincronizar, auditar y desplegar el Hub Central de IAs (`stack-hub-IAs`) conectado a GitHub (`git@github.com:kinkydisorder/stack-hub-ias.git`).

## 2. Protocolo de Sincronización Automática con GitHub y Hub
1. **Atomic Commit & Sync**: Todo cambio en el código, skills, reglas o expediente debe ir acompañado de un commit claro y push a GitHub (`feat/hub-v2` / `main`).
2. **Snapshot Update**: Tras cada edición relevante de skills o agentes, ejecutar actualización de `hub/catalog.json`, `hub/live-snapshot.json` y `hub/skill-activations.json`.
3. **Secreto Comercial & Seguridad**: Nunca hacer commit de claves PAT, tokens, datos de facturación ni contraseñas. Respetar `.gitignore` y exclusiones de la rama pública.

## 3. Arquitectura del Motor Antigravity 200%
- **Subagentes Paralelos**: Delegar investigaciones extensas o refactorizaciones pesadas a subagentes independientes (`research`, `self`, `sync-agent`).
- **Nivel Estético Premium**: Todo componente UI generado debe cumplir con estándares visuales de vanguardia (Dark mode, glassmorphism, tipografía moderna, paletas HSL, micro-animaciones).
- **Verificación Empírica**: No declarar victoria sin ejecutar pruebas (`npm run build`, `npm run test`, `git status`) y verificar el correcto compilado.

## 4. Matriz de Superficies Registradas
- **Antigravity (AGY)**: `.antigravity_code/` (Rules, Skills, Config, Hooks)
- **Claude Code**: `CLAUDE.md`, `.claude/skills/`
- **Codex / Generic**: `AGENTS.md`, `.ai-forge/client-configs/codex-config.toml`
- **Gemini CLI**: `GEMINI.md`, `.ai-forge/client-configs/gemini-settings.json`
- **Hub Frontend**: `hub/index.html`, `hub/hub.js`, `hub/hub.css`

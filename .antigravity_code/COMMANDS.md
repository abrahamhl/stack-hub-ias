# LISTA DE COMANDOS Y DIRECTIVAS DE ANTIGRAVITY (.antigravity_code/COMMANDS.md)

## ⚡ Comandos Principales de Antigravity (Slash Commands)

| Comando | Función Principal | Cuándo Utilizarlo |
| :--- | :--- | :--- |
| **`/goal`** | **Orquestación Autónoma de Larga Duración** | Ejete tareas complejas, refactorizaciones o builds sin detenerse hasta validar y verificar al 100%. |
| **`/plan`** | **Diseño de Arquitectura Paso a Paso** | Traza la estrategia y desglose técnico antes de escribir código. |
| **`/grill-me`** | **Entrevista Interactiva de Diseño** | Entrevista al usuario con preguntas clave para resolver ambigüedades de diseño antes de codificar. |
| **`/schedule`** | **Tareas Programadas y Cron Jobs** | Programa monitores recurrentes o timers autónomos en segundo plano. |
| **`/learn`** | **Memoria Persistente y Evolución de Reglas** | Guarda preferencias o lecciones aprendidas en el repositorio. |
| **`/teamwork-preview`** | **Orquestación Multagente** | Visualización de trabajo concurrente entre múltiples agentes autónomos. |

---

## 🛠️ Modos Operativos de Ejecución

- **Modo Autónomo**: Ejecuta pruebas de consola (`npm run test`, `git status`, `node server.mjs`) y valida los resultados sin preguntar.
- **Modo Multi-Agente**: Invoca subagentes concurrentes (`invoke_subagent`) asignando roles específicos (`research`, `architect`, `auditor`).
- **Modo Sync GitHub & Hub**: Cada commit genera un snapshot en `hub/live-snapshot.json` e impulsa los cambios a la rama activa (`feat/hub-v2`).

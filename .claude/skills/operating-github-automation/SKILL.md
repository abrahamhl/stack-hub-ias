---
name: operating-github-automation
description: "Adaptador de descubrimiento para operacion remota de GitHub en AnomlyaOS (gh CLI, PRs, issues, actions)."
---

# Operating GitHub Automation (Control Plane)

Adaptador de control plane para la ejecución segura de comandos GitHub en AnomlyaOS.

## Instrucciones de Ejecución
- Utilizar siempre `gh api` o `gh` CLI en entornos donde la autenticación esté activa.
- Para cambios locales sin autenticación web, utilizar el snapshot offline `hub/live-snapshot.json`.
- Cumplir la regla de privacidad: Jamás cambiar visibilidad de repositorios privados a públicos sin autorización explícita.

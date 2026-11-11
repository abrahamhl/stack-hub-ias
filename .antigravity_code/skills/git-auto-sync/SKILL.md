---
name: git-auto-sync
description: Sincronización atómica con GitHub y actualización de metadatos en tiempo real del Vault Factory Hub.
---

# Git Auto-Sync Skill

## Directivas Operativas
1. **Commit Atómico**: Todo cambio relevante en código, reglas o documentación debe incluir un mensaje de commit semántico.
2. **Snapshot Update**: Refrescar `live-snapshot.json`, `catalog.json` y `skill-activations.json` tras cada ciclo de desarrollo.
3. **Push a GitHub**: Sincronizar automáticamente con `origin/feat/hub-v2`.

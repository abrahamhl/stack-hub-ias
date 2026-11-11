# TAXONOMÍA VIVA Y MAPA DE INFRAESTRUCTURA ANTIGRAVITY

**Ubicación**: `.antigravity_code/docs/TAXONOMIA_STACK_IAs.md`  
**Última actualización**: 2026-07-29  
**Chasis**: Antigravity AGY 2.0 (200% Hyper-Boost)  

---

## 🧭 1. ESTÁNDAR DE UBICACIÓN DE ARCHIVOS

Para evitar que los documentos se pierdan o queden desorganizados, se establece el siguiente estándar de rutas:

| Tipo de Recurso | Ruta Oficial dentro del Repo | Propósito |
| :--- | :--- | :--- |
| **Reglas del Motor** | `.antigravity_code/RULES.md` | Directivas operativas de Antigravity |
| **Configuración** | `.antigravity_code/config.yaml` | Especificación técnica de superficies y hooks |
| **Protocolo de Sync** | `.antigravity_code/SYNC_PROTOCOL.md` | Protocolo de commits y pushes automáticos |
| **Documentación** | `.antigravity_code/docs/` | Planes de ingeniería, arquitectura y taxonomía |
| **Skills Antigravity** | `.antigravity_code/skills/` | Habilidades propias pendientes de revisión |
| **Hooks / Scripts** | `.antigravity_code/hooks/` | Scripts de PowerShell para auto-sync y utilidades |

---

## 📚 2. TAXONOMÍA DE SKILLS PROPIAS DE ANTIGRAVITY (`.antigravity_code/skills/`)

Las siguientes habilidades han sido desarrolladas por Antigravity y se mantienen aisladas en `.antigravity_code/skills/` para tu revisión antes de decidir si las mueves al directorio general `.skills/`:

1. [`antigravity-chassis-200`](file:///C:/dev/02_PROJECTS/SKILLS-FRONTEND/stack-hub-IAs/.antigravity_code/skills/antigravity-chassis-200/SKILL.md): Motor de aceleración al 200%, control empírico de builds y refactorización atómica.
2. [`reseller-clothing-triage`](file:///C:/dev/02_PROJECTS/SKILLS-FRONTEND/stack-hub-IAs/.antigravity_code/skills/reseller-clothing-triage/SKILL.md): Triaje inteligente de prendas, detección de manchas/arrugas y optimización de lotes.
3. [`multi-marketplace-scorer`](file:///C:/dev/02_PROJECTS/SKILLS-FRONTEND/stack-hub-IAs/.antigravity_code/skills/multi-marketplace-scorer/SKILL.md): Evaluación de precios y competencia en Marktplaats NL, Vinted y Facebook Marketplace.
4. [`git-auto-sync`](file:///C:/dev/02_PROJECTS/SKILLS-FRONTEND/stack-hub-IAs/.antigravity_code/skills/git-auto-sync/SKILL.md): Sincronización automática atómica con GitHub y actualización de snapshots del Hub.

---

## 🗺️ 3. MAPA DE SUPERFICIES Y REPOSITORIOS

- **Repositorio Privado**: `git@github.com:kinkydisorder/stack-hub-ias.git`
- **Rama Activa**: `feat/hub-v2`
- **Hub Frontend Central**: `hub/index.html` (Vista Vault Factory en tiempo real)
- **App de Triaje Ropa**: `C:\dev\02_PROJECTS\triaje-ropa-gemini` (Servidor backend local en `http://localhost:4000`)

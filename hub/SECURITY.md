# Hub / Vault — seguridad y secreto comercial

## Estado del blindaje (verificado)

| Capa | Estado | Qué implica |
|---|---|---|
| Repo `stack-hub-ias` en GitHub | **PRIVATE** | Solo cuentas con acceso ven código, docs, audit, hub, skills. |
| Repo `stack-hub-ias-public` | **No existe** | No hay escaparate público abierto por error. |
| Rama `public` (dentro del privado) | Curada / vetada | Excluye `docs/`, `CLAUDE.md`, `AGENTS.md`, `SOUL.md`, `forge.config.yaml`, protocolos operativos. Sigue estando **dentro del repo privado** hasta que *tú* la empujes a un repo público. |
| PAT / tokens en el hub | **No van al git** | Solo `localStorage` del navegador si tú lo pegas en Config. |
| Secretos de API / facturación real | **No hardcodeados** | `credits.json` usa placeholders `estimated`. |

## Qué es secreto comercial (NO publicar)

- `docs/` (arquitectura, workflows de cliente, runbooks, handoffs internos)
- `.ai-forge/audit/` (registro de decisiones y sesiones)
- `CLAUDE.md` / `AGENTS.md` / `SOUL.md` / `forge.config.yaml` (protocolo y config operativa)
- Material personal, CV, NSFW, credenciales, rutas de disco con identidad
- Metodología de orquestación detallada si el hosting es **público sin acceso controlado**

La rama de trabajo `feat/hub-v2` y `hyper-boost` viven en el **nodo privado**. Un
**Pull Request dentro de ese repo privado** (Compare & pull request) **no hace
público** el secreto: solo lo ven colaboradores del privado.

## Qué NO es lo mismo

| Acción | ¿Hace público el secreto? | Para qué sirve |
|---|---|---|
| `.\hub\start-hub.ps1` + localhost | **No** | Ver el vault en tu PC |
| Push a `origin/feat/hub-v2` (repo private) | **No** | Copia de seguridad y trabajo multi-IA |
| Compare & pull request **en el repo privado** | **No** (sigue privado) | Fusionar ramas entre colaboradores |
| Crear repo **público** o cambiar visibility a Public | **SÍ — peligro** | Solo si curas la rama `public` |
| Subir `hub/` entero a Hostinger **sin password** | **Riesgo medio** | Expone UI + bootstrap + mapa de agentes (metodología visible) |
| Pegar PAT en un chat o en un commit | **SÍ — peligro** | Nunca |

## Reglas que los agentes deben respetar (y se han respetado)

1. No commitear tokens, contraseñas ni facturas reales.
2. No empujar a `master`/`public` sin pedido explícito y curación.
3. No crear el repo público de escaparate sin que Abraham lo ejecute.
4. Truth model: no inventar saldos ni datos de facturación.
5. Hosting público del hub = solo “escaparate” curado, o acceso restringido;
   el nodo completo se queda privado.

## Autoría e idea

El registro de autoría operativa del stack es el **git privado** (commits +
notas de auditoría). Eso protege trazabilidad interna. No sustituye registro
formal de propiedad intelectual externa (patentes, contratos); es el blindaje
del **método y el material de trabajo**.

## Si vas a desplegar el hub

- Preferible: solo en local o en hosting con **acceso privado / basic auth**.
- Si debe ser público: no subas `live-snapshot.json` con historial sensible,
  ni `taxonomy.json` de conversaciones, ni bootstrap completo; deja un
  escaparate mínimo (landing) y el nodo completo en el privado.

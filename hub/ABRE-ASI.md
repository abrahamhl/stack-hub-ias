# Cómo abrir el Vault (sin errores) + seguridad

Lee también `SECURITY.md` (secreto comercial).

## Por qué veías HTTP 404

1. El repo público de catálogo **no existe**. El nodo es el **privado**.
2. El navegador **no usa** tu `gh auth` de consola: sin PAT en Config no lee el privado en vivo.
3. Abrir `index.html` a doble clic (`file://`) **rompe** taxonomy/bootstrap/JSON.

## Forma correcta (local) — NO es un Pull Request

```powershell
# Desde la raíz del repositorio clonado (ruta local tuya)
.\hub\start-hub.ps1
```

Navegador: **http://localhost:4180/hub/**

| Acción | ¿Es lo mismo? |
|---|---|
| `start-hub.ps1` / localhost | Ver la web en tu máquina |
| GitHub → Compare & pull request | Propuesta de **fusionar ramas** en git |
| | **No son lo mismo.** El PR no “abre” el hub. El hub no “publica” el PR. |

Un PR **dentro del repo privado** sigue siendo privado (solo colaboradores).

### Datos GitHub en vivo (opcional)

1. Fine-grained PAT: solo este repo, **Contents: Read** (Issues Read opcional).
2. Hub → Config → pegar → Guardar.
3. El token **no se sube a git** (solo tu navegador).

Sin PAT: `live-snapshot.json` (generado con `.\hub\refresh-snapshot.ps1` + tu `gh`).

## Hostinger

Si subes `hub/` a un sitio **público**, cualquiera ve la UI y el protocolo del vault.
Para secreto comercial: hosting **privado**, basic auth, o no desplegar el hub completo.
El nodo de verdad permanece en el GitHub **PRIVATE**.

## Interiorizar el chat

Solo cuenta si acaba en commits / `taxonomy.json` / `.ai-forge/audit/` del **privado**.

# Cómo abrir el Vault (sin errores)

## Por qué ves HTTP 404 y “todo error”

1. **El repo `stack-hub-ias-public` NO existe** (GitHub devuelve 404).  
   El nodo real es el **privado** `kinkydisorder/stack-hub-ias`.
2. **El navegador no puede leer el privado sin un PAT** pegado en Config.
3. Si abres `index.html` con **doble clic** (`file://`), el navegador **bloquea**
   cargar `taxonomy.json`, `bootstrap.txt`, `agents.json`… → errores en **todo**.

No es que “GitHub no esté activado”. Es **cómo se abre** + **público inexistente**.

## Forma correcta (local)

Desde PowerShell:

```powershell
cd C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs
.\hub\start-hub.ps1
```

O:

```powershell
cd C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs
npx --yes serve . -l 4180
```

Luego en el navegador: **http://localhost:4180/hub/**

### Datos de GitHub en vivo (opcional)

1. En GitHub → Settings → Developer settings → Personal access tokens  
   (fine-grained, solo este repo, permiso **Contents: Read**).
2. En el hub → **Config** → pega el token → Guardar.  
3. El token **solo** vive en localStorage de tu navegador, no en el repo.

Sin PAT, el hub usa **`live-snapshot.json`** (generado con `gh` en tu PC):
commits/issues locales, sin 404 rojo.

## Hostinger / deploy

Sube la carpeta **`hub/`** (y si quieres galería, también **`src/`** al lado).  
Abre la URL del hosting que apunte a `index.html`.  
Para GitHub en vivo en Hostinger: mismo PAT en Config (solo en tu PC/navegador).

## Qué es “interiorizar” el chat

Lo que hablas en Grok/Claude **solo cuenta** si acaba en:

- commits en git, y/o  
- `hub/taxonomy.json`, y/o  
- `.ai-forge/audit/`

El chat solo **no** es el nodo. Este vault es una **vista** del nodo.

## 21st.dev / shadcn

Son **gramática visual + piezas** para conectar a funciones vivas cuando el
stack sea React. El hub actual es **estático** y reimplementa esa gramática;
no instala los 17 paquetes en el navegador.

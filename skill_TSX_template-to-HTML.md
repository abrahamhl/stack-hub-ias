# TSX → HTML: Guía rápida, plantillas y snippets

Resumen corto

- Objetivo: convertir archivos `.tsx` en artefactos visualizables (HTML/JS) de la forma más simple y reproducible posible, sin depender de servicios de pago.
- Alcance: soluciones desde "sin build" (CDN) hasta pipelines locales (Vite, esbuild, prerender estático). Snippets listos para copiar/pegar.

**Por qué `.tsx`**

- `.tsx` es TypeScript + JSX: permite escribir componentes React con tipado.
- Es el formato estándar para UIs React modernas; fácil de compilar a JS y empaquetar.
- Claude y otros asistentes lo usan como "mini-artifacts" por ser un formato de componente que expresa estructura + UI de forma compacta (puede renderizarse en entornos que soporten HTML/JS y facilita revisión/preview).

Cuando usar cada método (resumen)

- Rápido, sin instalar nada (demo pequeña): usar CDN React + HTML estático.
- Desarrollo y recarga rápida (edición frecuente): `npm create vite` + `npm run dev`.
- Build para compartir o deploy (archivo HTML+JS estático listo): `vite build` o `create-react-app` build.
- Generar snapshots estáticos (SEO o compartir HTML plano): prerender con `react-dom/server` → `renderToStaticMarkup`.
- Lote de muchos `.tsx`: script Node que crea proyectos temporales o que prerenderiza directamente.

---

## 1) Opción más simple: HTML + CDN (sin build)

Funciona para componentes simples que no usan TypeScript avanzado ni imports locales.

Copia y pega en `preview.html` y abre en el navegador.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Preview TSX (CDN)</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- React + ReactDOM desde CDN -->
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    <!-- Tu componente convertido manualmente a JS (sustituir TSX por JSX simple) -->
    <script>
      const e = React.createElement;
      function App() {
        return e("div", null, "Preview rápido para componentes simples");
      }
      ReactDOM.createRoot(document.getElementById("root")).render(e(App));
    </script>
  </body>
</html>
```

Por qué usarlo: ideal para compartir demos aisladas sin instalar Node. Límite: no acepta TypeScript ni imports locales.

---

## 2) Rápido y recomendado para desarrollo: Vite (2 comandos)

- Ventajas: setup mínimo, recarga HMR, build muy rápido.

PowerShell (ejecutar una vez):

```powershell
cd $HOME\Downloads
npm create vite@latest mi-proyecto -- --template react-ts
cd mi-proyecto
npm install
```

Copiar tu `.tsx` como `src/App.tsx`:

```powershell
copy ..\dossier_maestro.tsx src\App.tsx
npm run dev   # abre http://localhost:5173
# o para producción:
npm run build
start dist\index.html
```

Por qué usarlo: ideal si editas y pruebas con frecuencia; build listo para distribuir.

---

## 3) Build ligero por archivo (prerender a HTML estático)

Usa Node + `esbuild` o `react-dom/server` para generar HTML estático por archivo.

Ejemplo mínimo con `node` + `esbuild` + prerender usando `ts-node` o compilación previa:

Archivo `prerender.js` (Node):

```javascript
// prerender.js - requiere node 18+ o instalación de dependencias
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import("react").then((React) => {
  import("react-dom/server").then((RDS) => {
    const App = require("./dossier_maestro.tsx").default; // si compilas antes
    const html = RDS.renderToStaticMarkup(React.createElement(App));
    const out = `<!doctype html><html><body>${html}</body></html>`;
    fs.writeFileSync("dossier_maestro.preview.html", out);
    console.log("✅ generado dossier_maestro.preview.html");
  });
});
```

Nota: lo anterior asume que `dossier_maestro.tsx` está compilado o que usas `esbuild/register` o `ts-node` para soportar TSX en tiempo de ejecución.

Por qué usarlo: obtienes HTML plano (sin runtime React) ideal para snapshots, documentación estática o previsualizaciones ligeras.

---

## 4) Batch: convertir múltiples `.tsx` en cadena (script)

Guarda en `convert-tsx-batch.js` en la carpeta que contiene los `.tsx` y ejecuta `node convert-tsx-batch.js`.

```javascript
const { execSync } = require("child_process");
const fs = require("fs");
const files = fs.readdirSync(".").filter((f) => f.endsWith(".tsx"));
for (const f of files) {
  const name = f.replace(".tsx", "");
  console.log("Procesando", f);
  // crea proyecto vite temporal (opcional) o prerender directo
  execSync(`npx create-react-app ${name} --template typescript`, {
    stdio: "inherit",
  });
  fs.copyFileSync(f, `${name}/src/App.tsx`);
  execSync("npm run build", { cwd: name, stdio: "inherit" });
  console.log(`Listo: ${name}/build/index.html`);
}
```

Aviso: este método crea carpetas por cada archivo; es simple y robusto, pero consume espacio.

---

## 5) Snippets Windows PowerShell (rápido)

Copiar y pegar según caso de uso:

- Quick preview con Vite (en Downloads):

```powershell
cd $HOME\Downloads
npm create vite@latest quick-preview -- --template react-ts
cd quick-preview
npm install
copy ..\dossier_maestro.tsx src\App.tsx
npm run dev
```

- Generar build y abrir:

```powershell
npm run build
start dist\index.html
```

---

## 6) Integración en tu wiki (nodo de aprendizaje)

- Guarda este archivo `TSX_conversion_reference.md` en la carpeta raíz de tu wiki o nota.
- Crea plantillas: `template-vite.md`, `template-prerender.md` con los comandos mostrados.
- Snippets: registra los bloques PowerShell/Node como snippets (copiar/pegar) en tu wiki para acceso rápido.
- Flujo sugerido: `Preview rápido (CDN)` → `Dev con Vite` → `Build y Prerender` → `Deploy`.

---

## 7) ¿Por qué Claude u otros usan `TSX` como "mini artifacts"?

- TSX representa estructura + lógica UI en un único archivo, haciendo sencillo transportar la interfaz de un chat a un preview.
- Los asistentes lo usan porque puede convertirse automáticamente a HTML/JS para mostrar interfaces interactivas en entornos que soporten componentes.
- Además, TSX sirve como "single source of truth" para la UI: contiene markup, estilos inline, y lógica mínima.

---

## 8) Casos de uso reales

- Documentación de componentes (mostrar previews en docs).
- Prototipos rápidos de UI para validar flow de producto.
- Generación de landing pages simples desde componentes React.
- Pruebas visuales o snapshots para revisión sin desplegar app completa.

---

## 9) Ideas adicionales y optimizaciones

- Usar `esbuild` para compilar TSX a un bundle único ultrarrápido.
- Añadir `react-refresh` para cambios instantáneos (Vite ya lo incluye).
- Crear un repo plantilla (`react-tsx-preview`) con scripts `npm run preview` y `npm run snapshot`.
- Automatizar con un archivo PowerShell que detecte nuevos `.tsx` y lance el flujo elegido (watch).

---

## 10) Quick reference — comandos

PowerShell: crear preview Vite

```powershell
cd $HOME\Downloads
npm create vite@latest mi-proyecto -- --template react-ts
cd mi-proyecto
npm install
copy ..\dossier_maestro.tsx src\App.tsx
npm run dev
```

Prerender Node (esbozo):

```bash
# instalar deps
npm init -y
npm i react react-dom esbuild
# build y prerender (ejemplo rápido)
npx esbuild dossier_maestro.tsx --bundle --outfile=out.js --platform=browser
node -e "const App=require('./out.js').default; const r=require('react'); const s=require('react-dom/server'); console.log(s.renderToStaticMarkup(r.createElement(App)));"
```

---

## Archivos creados/ubicación

- `TSX_conversion_reference.md` (esta guía) — guardado en tu carpeta Downloads.
- Para ejecutar los ejemplos, trabaja desde `C:\Users\2fabr\Downloads`.

---

Si quieres, ahora:

- Puedo generar los scripts `convert-tsx-batch.js` y `build-tsx.ps1` en `Downloads` (lo dejo listo para ejecutar).
- O crear una plantilla de repo (Git) con `package.json` y scripts listos.

Dime cuál prefieres y lo genero inmediatamente.

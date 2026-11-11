# GUÍA DE ACTIVACIÓN URGENTE Y APROVECHAMIENTO DE CRÉDITOS GOOGLE CLOUD

## 📊 Estado Actual de tu Cuenta de Facturación (Extraído del CSV oficial)

| Nombre del Crédito | Estado | Valor Restante | Valor Original | Caducidad | Acción Requerida |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Free Trial Upgrade** | 🚨 **Vence en 2 días** | **208,77 €** | 238,82 € | **31 / 07 / 2026** | **¡Gastar prioritariamente en 48h!** |
| **GenAI App Builder** | 🟢 Disponible | **855,05 €** | 855,05 € | 13 / 05 / 2027 | Disponible durante todo el año |
| **Google Developer Monthly** | 🟢 Disponible | **~43,24 €** | ~43,24 € | 2027 | Créditos mensuales recurrentes |

---

## ⚡ Plan de Acción para Gastar/Aprovechar los 208,77 € en 48 Horas

Para evitar que Google cancele los **208,77 €** el 31 de Julio, estos son los mejores usos de alto rendimiento para tus proyectos:

### 1. Indexación y Embeddings Vectoriales Masivos (Text Embedding 004)
- **¿En qué consiste?**: Convierte todo el código, documentación, prompts y notas de tus proyectos activos en vectores semánticos para búsquedas instantáneas y RAG.
- **Costo aproximado**: Cientos de miles de documentos por solo 5-10 €. Puedes indexar todos tus repositorios completos.

### 2. Fine-Tuning de Modelos Gemini en Vertex AI
- **¿En qué consiste?**: Entrenar o adaptar un modelo Gemini (Flash/Pro) en Vertex AI Studio con el estilo, reglas y taxonomía de tus proyectos.
- **Costo**: El entrenamiento de un adaptador en Vertex AI consume entre 20 € y 100 € de créditos rápidamente.

### 3. Ejecución y Procesamiento Masivo con Gemini 1.5 Pro / 2.0 Flash
- **¿En qué consiste?**: Utilizar las APIs multimodales para auditar repositorios enteros, analizar vídeos, audios o miles de imágenes de maquetas UI.
- **Ventaja**: Carga de contexto gigante (1 a 2 millones de tokens por llamada).

### 4. Vertex AI Search & Conversation (GenAI App Builder - 855,05 €)
- Conecta tus fuentes de datos (Google Drive, repositorios, PDFs) directamente a Vertex AI Search para crear motores de búsqueda inteligentes.

---

## 🛠️ Cómo Conectar tu API Key / Credenciales a tus Proyectos (Paso a Paso)

### Paso 1: Obtener la Clave API de Google AI Studio / GCP
1. Ve a [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/) o a la consola de [Google Cloud Console (console.cloud.google.com)](https://console.cloud.google.com/).
2. Asegúrate de seleccionar el Proyecto vinculado a la **Cuenta de Facturación donde están los 208,77 €**.
3. Haz clic en **Get API Key** -> **Create API key in project**.
4. Copia la clave (empieza por `AIzaSy...`).

### Paso 2: Conectar la Clave en este Repositorio (`stack-hub-IAs`)
Crea o edita el archivo `.env` en la raíz de `C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\` y añade:

```env
GEMINI_API_KEY=AIzaSyTuClaveObtenidaDeGoogleConsole...
GCP_PROJECT_ID=tu-id-de-proyecto-gcp
```

### Paso 3: Probar la Conexión Ejecutando el Diagnóstico
Ejecuta en la terminal de PowerShell:
```powershell
node scripts/gcp-credits-connector.mjs
```

---

## 🔒 Garantía de Sincronización
Esta guía y los scripts asociados se han integrado en el nodo `stack-hub-IAs` para que cualquier IA o agente pueda consultar y utilizar tus créditos de Google Cloud.

import fs from 'fs';
import path from 'path';

console.log("=================================================");
console.log("   AI FORGE — CONECTOR Y DIAGNÓSTICO GOOGLE CLOUD");
console.log("=================================================");

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const projectId = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;

if (!apiKey && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.log("\n⚠️ [AVISO]: No se ha detectado GEMINI_API_KEY ni GOOGLE_APPLICATION_CREDENTIALS en el entorno.");
  console.log("📌 Para conectar tu cuenta de Google Cloud con créditos:");
  console.log("   1. Entra en Google AI Studio (https://aistudio.google.com/) o Google Cloud Console (https://console.cloud.google.com/).");
  console.log("   2. Crea una API Key vinculada a tu Proyecto con Facturación (Billing Account con los €208.77 restantes).");
  console.log("   3. Copia el archivo .env.gcp.example a .env y pega tu GEMINI_API_KEY.");
  console.log("   4. Re-ejecuta: node scripts/gcp-credits-connector.mjs\n");
} else {
  console.log("\n✅ Credenciales detectadas en variables de entorno.");
  if (apiKey) console.log("   • API Key:", apiKey.substring(0, 8) + "...");
  if (projectId) console.log("   • Proyecto GCP:", projectId);
}

const csvPath = path.resolve(process.cwd(), "docs/Créditos_ Mi cuenta de facturación (2).csv");

if (fs.existsSync(csvPath)) {
  console.log("\n📊 [RESUMEN DE CRÉDITOS DISPONIBLES EN TU CUENTA]");
  console.log("-------------------------------------------------");
  console.log("🚨 URGENTE (Vence en 2 DÍAS - 31/07/2026):");
  console.log("   • Crédito Prueba Gratuita GCP: 208,77 € (Restante)");
  console.log("\n🟢 CRÉDITOS A LARGO PLAZO:");
  console.log("   • GenAI App Builder (Vertex AI Search): 855,05 € (Válido hasta Mayo 2027)");
  console.log("   • Google Developer Program: ~43,24 € mensuales acumulados");
  console.log("-------------------------------------------------");
}

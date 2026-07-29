const key = "AQ.Ab8RN6JoIr6Yp6D5_8fXc6hN2J-cqrOD1fQ3NK4Fpu9RBH8lkg";
const projectId = "574215598216";

console.log("=================================================");
console.log("  EXHAUSTIVE TESTING FOR KEY: " + key.substring(0, 15) + "...");
console.log("=================================================");

const endpoints = [
  {
    name: "GenerativeLanguage v1beta gemini-2.0-flash",
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`
  },
  {
    name: "GenerativeLanguage v1 gemini-1.5-flash",
    url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`
  },
  {
    name: "Vertex AI us-central1 express endpoint",
    url: `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/gemini-1.5-flash:generateContent?key=${key}`
  },
  {
    name: "Vertex AI global express endpoint",
    url: `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/gemini-1.5-flash:generateContent?key=${key}`
  }
];

async function runTests() {
  for (const ep of endpoints) {
    console.log(`\n📡 Probando: ${ep.name}...`);
    try {
      const res = await fetch(ep.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Responde: CONEXIÓN EXITOSA" }] }]
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`🎉 ¡ÉXITO ROTUNDO! (${ep.name})`);
        console.log("Respuesta:", JSON.stringify(data, null, 2));
        return;
      } else {
        console.log(`❌ Error HTTP ${res.status}:`, data.error?.message || JSON.stringify(data));
      }
    } catch(e) {
      console.log(`❌ Error de red: ${e.message}`);
    }
  }
}

runTests();

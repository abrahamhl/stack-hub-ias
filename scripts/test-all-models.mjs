const key = "AQ.Ab8RN6JoIr6Yp6D5_8fXc6hN2J-cqrOD1fQ3NK4Fpu9RBH8lkg";

console.log("=================================================");
console.log("  PROBANDO MODELOS DISPONIBLES CON CLAVE VALIDAD ");
console.log("=================================================");

const models = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash-exp",
  "gemini-1.5-flash-8b",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest"
];

async function testModels() {
  for (const model of models) {
    console.log(`\n📡 Probando: ${model}...`);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Responde solo: OK CONECTADO" }] }]
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`🎉 ¡ÉXITO ROTUNDO! Modelo ${model} respondió:`);
        console.log(data.candidates[0].content.parts[0].text);
        return;
      } else {
        console.log(`❌ Error ${res.status} en ${model}:`, data.error?.message);
      }
    } catch(e) {
      console.log(`❌ Excepción: ${e.message}`);
    }
  }
}

testModels();

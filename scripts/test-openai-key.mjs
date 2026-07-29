const openAiKey = "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";

console.log("=================================================");
console.log("  PROBANDO CLAVE OPENAI ENCONTRADA EN ANOMALYOS ");
console.log("=================================================");

async function testOpenAI() {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Responde brevemente: OK CONEXION OPENAI" }]
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log("🎉 ¡ÉXITO TOTAL! OpenAI GPT-4o-mini respondió:");
      console.log(data.choices[0].message.content);
      return true;
    } else {
      console.log("❌ Error OpenAI:", data.error?.message);
    }
  } catch(e) {
    console.log("❌ Excepción:", e.message);
  }
}

testOpenAI();

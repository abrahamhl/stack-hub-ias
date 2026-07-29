const apiKey = "AQ.Ab8RN6Jolr6Yp6D5_8fXc6hN2J-cqrOD1fQ3NK4Fpu9RBH8lkg";

console.log("=================================================");
console.log("  PROBANDO CLAVE CON HEADER x-goog-api-key & Bearer");
console.log("=================================================");

async function testHeader() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
  
  // Test 1: x-goog-api-key header
  try {
    console.log("📡 Test 1: Header x-goog-api-key...");
    const res1 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Responde: OK HEADER" }] }]
      })
    });
    const d1 = await res1.json();
    if (res1.ok) {
      console.log("🎉 ¡ÉXITO CON HEADER x-goog-api-key!", d1.candidates[0].content.parts[0].text);
      return;
    } else {
      console.log("❌ Test 1 falló:", d1.error?.message);
    }
  } catch(e) { console.log(e.message); }

  // Test 2: Bearer token
  try {
    console.log("\n📡 Test 2: Authorization Bearer...");
    const res2 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Responde: OK BEARER" }] }]
      })
    });
    const d2 = await res2.json();
    if (res2.ok) {
      console.log("🎉 ¡ÉXITO CON BEARER TOKEN!", d2.candidates[0].content.parts[0].text);
      return;
    } else {
      console.log("❌ Test 2 falló:", d2.error?.message);
    }
  } catch(e) { console.log(e.message); }
}

testHeader();

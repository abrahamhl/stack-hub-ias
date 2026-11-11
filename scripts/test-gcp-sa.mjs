import fs from 'fs';
import crypto from 'crypto';

const saPath = "C:/dev/02_PROJECTS/own-gemini-API-project/anomalyos/secrets/gcp-sa.json";
const sa = JSON.parse(fs.readFileSync(saPath, 'utf8'));

function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/generative-language",
    aud: sa.token_uri,
    exp: now + 3600,
    iat: now
  };
  const header = { alg: "RS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claim));
  const signInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const signature = signer.sign(sa.private_key, 'base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const jwt = `${signInput}.${signature}`;

  const resp = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  const data = await resp.json();
  return data.access_token;
}

async function testGenerativeLanguageApi() {
  try {
    const token = await getAccessToken();
    console.log("📡 Probando Generative Language API con Bearer token del Service Account...");
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Responde: OK FUNCIONANDO CON SERVICE ACCOUNT PROYECTO " + sa.project_id }]
        }]
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log("🎉 ¡ÉXITO TOTAL Y ABSOLUTO! Conexión validada:");
      console.log(data.candidates[0].content.parts[0].text);
    } else {
      console.log("❌ Error en Generative Language API:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.log("❌ Excepción:", err.message);
  }
}

testGenerativeLanguageApi();

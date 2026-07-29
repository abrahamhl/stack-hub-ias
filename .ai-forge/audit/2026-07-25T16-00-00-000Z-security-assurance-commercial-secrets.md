---
title: "Aseguramiento secreto comercial — private repo, PR ≠ deploy, SECURITY.md"
actor: "grok-cli"
created_at: "2026-07-25T16:00:00.000Z"
source: session-file
---

# Seguridad / secreto comercial

Verificado con `gh repo view`: **stack-hub-ias = PRIVATE**.

- No existe repo público stack-hub-ias-public (no hay fuga por escaparate abierto).
- No hay PR abierto de feat/hub-v2 (Abraham no ha fusionado aún).
- PAT no está en el código; solo localStorage opcional en el navegador.
- docs/, audit, protocolos viven en el privado.
- Añadido hub/SECURITY.md: matriz de qué publica y qué no; PR privado ≠ público.
- Aviso: Hostinger público del hub completo = riesgo de metodología visible.

Abraham preguntó si Compare/PR = consola start-hub: **NO**. Documentado en ABRE-ASI.md.

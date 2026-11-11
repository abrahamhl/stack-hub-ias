# SENDA — Investor film (id de trabajo M97) · tratamiento, storyboard y fuentes

Actualizado: 2026-11-11 · Actor: claude-code-web · Estado: **GUION + STORYBOARD, pendiente de aprobación. Nada renderizado.**
Fuente leída: `abrahamhl/civic-relay` rama `ccr-a6eeda4b-bprwzy` @ `14dee87` (PR #31) y
`feat/senda-master-integration-20261109` @ `62d2b74` (PR #30), más el brief
`09_ANTIGRAVITY_MISION_FINANCIACION_2026-11-10.md`. `verification_status`: leído, **no ejecutado**
(no he corrido tests ni builds de civic-relay). `last_checked_at`: 2026-11-11.

## 1. Brief

| Campo | Valor |
|---|---|
| Objetivo | Película oficial para inversores: problema, planteamiento, ciencia, potencial multi-campo |
| Duración / formato | ~7 min (923 palabras), 16:9, 1080p, 30 fps |
| Audio | Inglés, voz femenina sintética Kokoro `bf_emma` (en-gb), música techno tranquila original |
| Accidentes | **Recreación 3D propia**, sin metraje real ni personas reconocibles |
| Guion | `narration.en.json` (16 escenas, cues por frase) |

## 2. Hallazgo que cambia el plan

SENDA **ya tiene** película y pipeline propios: `media/senda-film/` (three.js determinista + Kokoro +
Playwright + ffmpeg), con M96 publicada (EN 11:49, ES 12:07) y guardas que hacen fallar el build si
la narración no coincide con `estado.json`. **Recomendación:** producir M97 dentro de ese pipeline,
no en HyperFrames/Remotion: reutiliza 12 visuales verificados y hereda las guardas de verdad.
HyperFrames queda como opción solo para piezas cortas sociales.

## 3. Storyboard

`*` = visual nuevo a construir. Rótulo obligatorio en pantalla según `claim`
(`OBSERVED` / `CALCULATED` / `SIMULATED · synthetic scenario` / `INFERRED · roadmap`).

| # | Escena | Visual (kind) | En pantalla | Claim |
|---|---|---|---|---|
| a1 | Cold open | `blackout`: ciudad 3D, antenas que se apagan una a una | "When the network fails" | OBSERVED |
| a2 | Dos trenes | `crash3d*`: recreación nocturna abstracta, dos trenes, móviles como puntos de luz sin enlazar; corte a `spainmap` (apagón 2025, DANA 2024, Adamuz 2026) | "≈45 min · published timeline · causes pending CIAF" | OBSERVED |
| a3 | El hueco | `kpis`: 4 tarjetas (alertas, radio profesional, navegación, previsión) | fuente `PROCUREMENT_GAP_2026.md` | OBSERVED |
| a4 | Título | `hub` + logotipo | "If a path exists, SENDA finds it" | — |
| b1 | Enrutador | globo + `fragments`: grafo de contactos en el tiempo, rutas en paralelo | "4 min vs 480 min · simulated scenario S01" | SIMULATED |
| b1b | Garantía de entrega | `assurance*`: mapa H3 coloreado por P(entrega) + barras 99,49 → 96,09 → 98,98 | "simulation · DELIVERY_ASSURANCE.md" | SIMULATED |
| b2 | Zonas y consentimiento | `trust`: sobre firmado, relé ciego | "consent given at install" | CALCULATED |
| b3 | Fusión ferroviaria | `railtime`: informes que convergen, segundo tren aparece | "second train: {rail_seconds} s · simulation" | SIMULATED |
| b4 | Escombros | `rubble3d*` edificio colapsado + `floors` + `fusion` | "synthetic signals · field calibration pending" | SIMULATED |
| b5 | Fuego y corredor | `fire` + `corridor3d*`: frente Rothermel, humo, onda de choque de tráfico | "physics model · not a forecast service" | SIMULATED |
| b6 | Vista de mando | captura real de `Globe4DStudio` (USGS, EONET, EFFIS, MET Norway, DEM) | fecha + SHA de la captura | OBSERVED |
| c1 | Por qué es ciencia | `verify`: contadores desde `estado.json` | `{core}` tests, `{e2e}` e2e | OBSERVED |
| c2 | Dónde estamos | `kpis`: límites explícitos | "Research stage · not for real emergencies" | OBSERVED |
| c3 | Multi-campo | `arch3d`: un núcleo, seis sectores | "potential applications" | INFERRED |
| c4 | Siguiente paso | `stack`: piloto, pasarela 112, apps nativas, auditoría | "roadmap" | INFERRED |
| c5 | Cierre | `cta` | URL oficial + "synthetic voice" | — |

Visuales nuevos (4): `crash3d`, `rubble3d`, `corridor3d`, `assurance`. Opcional: planos héroe
fotorrealistas en Blender (Cycles) en tu PC para a2, b4 y b5; el resto corre en three.js.

## 4. Fuentes por afirmación (civic-relay)

| Afirmación del guion | Fuente | Estado |
|---|---|---|
| Adamuz: ~1 min primera llamada, ~45 min segundo tren | `docs/video/M96_PROMO_SOURCES.md` p1, `packages/senda/src/rail-incident.mjs` | Cronología publicada; causas pendientes CIAF. **Verificar con fuente oficial antes de emitir** |
| Hueco estructural (alertas, TETRA, sin previsión) | `docs/research/PROCUREMENT_GAP_2026.md` | No leído por mí en esta sesión: revisar redacción |
| S01: ~4 min vs 480 min | `docs/product/SENDA_VISION_2026-11-04.md` §2 | Simulado |
| Segundo tren en 30–41 s, también con 5 % de adopción | misma, §2 ter (M96 usa 34 s) | Simulado, 8 semillas |
| 99,49 % prometido → 96,09 % entregado → 98,98 % a 0 € | `docs/science/DELIVERY_ASSURANCE.md` | Simulado |
| Respiración tras muro, puente bajo escombros | Visión §2 (`through-wall.mjs`, `rubble.mjs`) | Señales sintéticas |
| Rothermel + humo + tráfico LWR, antenas alcanzadas | `docs/architecture/SENDA_UNIFIED_PLATFORM.md` | Modelo |
| USGS, NASA EONET, EFFIS, MET Norway, DEM | `docs/engineering/SENDA_CURRENT_STATE.md` | Datos reales externos |
| `{core}`, `{e2e}` | `investor-next/public/senda/estado.json` (hoy 350/350 y 49/49 @ `5e5ad54`) | Se rellena en build |
| "No afirmamos ser los primeros" | `docs/research/SENDA_NOVELTY_AND_PRIOR_ART.md` | Coherente |
| Piloto: tren parado, 50–100 voluntarios | Visión §6 | Hoja de ruta |

## 5. Lo que he dejado fuera a propósito

- "14 minutos de ventaja", "100 % funcional", "prueba pericial admisible", cifras EIC: están en
  `SENDA_INVESTOR_READINESS.md` pero no he visto evidencia que las respalde.
- Cualquier contenido de defensa/doble uso (regla de la bóveda `/defense`).
- Cifras de mercado y valoración (el brief las prohíbe sin fuente).
- Curva criptográfica concreta: la visión dice ECDH P-256, la arquitectura unificada dice Ed25519/X25519.

## 6. Decisiones de Abraham

1. ¿Apruebas el guion (`narration.en.json`) o cambias tono/escenas?
2. ¿M97 dentro de `media/senda-film` de civic-relay (recomendado) o pieza aparte?
3. ¿Planos Blender en tu PC o todo three.js?
4. Cierre: ¿qué pides exactamente al inversor (importe, piloto, socio)? Hoy c4 no lleva cifra.

## 7. Siguiente paso tras aprobar

Portar el guion al esquema de escenas de `media/senda-film`, construir los 4 visuales, generar voz y
música, render por tramos y entrega MP4 + VTT + SHA256. Requiere acceso de escritura a civic-relay.

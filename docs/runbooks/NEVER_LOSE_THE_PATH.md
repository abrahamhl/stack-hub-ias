# Pasos que no debemos perder

## Cuello de botella activo

Solo pasa una pieza a `SHIP NOW`. El resto permanece en `NEXT`, `MERGE`,
`ARCHIVE` o `QUARANTINE`.

## Secuencia mínima obligatoria

```text
1. SCOPE
2. PRIVACY
3. BRANCH
4. PATCH
5. STATIC AUDIT
6. TEST
7. RESPONSIVE + KEYBOARD + REDUCED MOTION
8. DIFF
9. COMMIT
10. PREVIEW
11. HUMAN REVIEW
12. PRODUCTION SYNC
13. CHANGELOG + NEXT ACTION
```

## Trigger final de frontend

Usar `frontend-hyper-boost` cuando una petición incluya cualquiera de estas
señales:

- motion, parallax, scroll narrative, hover takeover;
- 3D, WebGL, ASCII, pixel, simulador, audio-reactive;
- Skiper UI, 21st.dev, Cult UI, Watermelon, StyleUI, Behance;
- cyberpunk, retrohacker, Y2K, distopía, Fallout, sci-fi, psytrance;
- responsive móvil/tablet/TV, accesibilidad o reduced motion;
- Google Stitch, design-to-code o extracción de sistema visual.

## Definition of done

- El camino principal funciona sin animación.
- Hover tiene equivalente de foco y toque.
- Se verifican 360×800, 768×1024, 1440×900 y 1920×1080.
- No hay datos privados o credenciales en código, docs o capturas.
- `lint`, tests y build pasan.
- El deploy se inspecciona visualmente y sin errores de consola relevantes.
- Changelog, evidencia, riesgos y siguiente acción quedan registrados.

## Si aparece una idea nueva

1. Guardarla en `NEXT`, no interrumpir `SHIP NOW`.
2. Escribir una frase de valor y una condición de descarte.
3. No crear carpeta, Skill, agente ni dependencia hasta que pase el triage.

## Si otra IA toma el trabajo

Entregar:

- objetivo y no-objetivos;
- rama y estado Git;
- archivos autorizados;
- Skill y referencias exactas;
- pruebas ejecutadas;
- riesgos y siguiente acción;
- prohibición explícita de push si no está autorizado.

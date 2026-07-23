# Auditoría Frontend Hyper Boost — 2026-07-23

## 1. Problemas principales

1. **Modelo mental mezclado.** Skill, agente, perfil, plugin, conector y mascota
   aparecían como si fueran equivalentes.
2. **Frontend fragmentado.** La capacidad visual estaba separada entre
   `building-nextgen-frontends` y `operating-google-stitch`, diluyendo triggers
   y dificultando saber qué instalar.
3. **Esfuerzo visual poco visible.** El dashboard describía motion y 3D, pero no
   demostraba la gramática de interacción aprendida.
4. **Hosting sin mapa final.** Sites funcionaba, pero no se explicaba como
   staging privado frente a GitHub/Vercel.
5. **Heatmap y cifras de catálogo.** Parte de la interfaz seguía siendo una
   previsualización; debía etiquetarse sin ambigüedad.

## 2. Recomendaciones concretas

1. Una sola Skill canónica: `frontend-hyper-boost`.
2. `.skills` como fuente y paquete; `.agents/skills` solo como adaptador.
3. Convertir referencias visuales en patrones con equivalentes de input y
   fallbacks, no acumular componentes.
4. Añadir `Frontend Lab` y `Fork Blueprint` a AI Forge.
5. Mantener Sites como staging privado y preparar GitHub privado + Vercel como
   ruta de producción.

## 3. Observaciones de referencias

### Skiper 12 — liquid simulation

Valor: materia reactiva y objeto central de marca.

Adopción: patrón `Material field`, lazy-loaded, con poster estático y control de
calidad. No usar como fondo permanente de un flujo transaccional.

### Skiper 14 — ASCII simulation

Valor: convierte volumen 3D en una identidad retroterminal clara.

Adopción: patrón `ASCII relief` con rotación por drag, teclado, touch y D-pad;
modelo y render diferidos.

### Skiper 19 — SVG follow scroll

Valor: la página se convierte en un camino visible.

Adopción: patrón `Narrative path` ligado a secciones reales, no a una altura
artificial; ruta completa en reduced motion.

### Capturas Codex, Claude y Manus

- Codex aporta claridad de configuración, Git/worktrees y mascotas.
- Claude aporta catálogo de Skills, memoria y capacidades locales.
- Manus aporta biblioteca, conectores, MCP personalizado, mensajería y agente
  desplegable.

La oportunidad de AI Forge no es copiar sus menús: es unificar estado, permisos,
coste, evidencia y siguiente acción sin esconder la capa creativa.

## 4. Puntuación de usabilidad

- Antes de esta revisión: **7.1/10**.
- Objetivo de la revisión: **8.7/10**.

La puntuación final requiere verificación visual del despliegue actualizado en
teléfono, tablet, desktop, pantalla grande, teclado y reduced motion.

## 5. Alineación

La consolidación reduce entropía, mantiene una única capacidad frontend,
protege la biblioteca privada y crea una ruta explícita de staging a producción.

## Fuentes visuales

- https://skiper-ui.com/v1/skiper12
- https://skiper-ui.com/v1/skiper14
- https://skiper-ui.com/v1/skiper19

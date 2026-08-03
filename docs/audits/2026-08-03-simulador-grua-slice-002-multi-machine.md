# Sesión 2026-08-03 — Simulador de grúas, Slice 002 "multi-machine"

Registro de método: qué se usó, qué se decidió, qué se verificó y por qué.
Proyecto: `C:\dev\02_PROJECTS\simulador-grua\GELDERLAND_CRANE_ACADEMY_V2_STARTER`.

---

## 1. Punto de partida y encargo

El usuario valoró el estado previo en **1/10** y pidió llegar a **8/10**, con un
diagnóstico muy concreto:

- «no funciona literalmente coger el mando y usar la grúa»
- «no me sé los controles»
- «no hay variedad de situaciones, no hay guía»
- más texturas realistas, más grúas, menús estilo videojuego, entornos y climas
- preparar prácticas reales de cara al carnet de grúa
- subir a GitHub **protegiendo la idea comercial**

Los tres primeros puntos son un fallo de producto, no de contenido: un
simulador que no se puede operar no se arregla añadiendo grúas. Por eso el orden
de trabajo fue **controles → guía → arquitectura → contenido → visuales → IP**,
no al revés.

---

## 2. Agentes y skills

### Lo que estaba disponible
El repo del simulador define cinco subagentes propios
(`implementation-engineer`, `independent-qa-auditor`,
`simulation-physics-architect`, `licence-safety-researcher`,
`vacancy-evidence-researcher`) y siete skills
(`build-godot-slice`, `validate-physics`, `forge-scenario`, `audit-release`,
`map-licences`, `verify-vacancies`, `handoff`).

### Lo que se usó realmente: **ninguno**

Decisión explícita y contraria a la tentación de "usar todo lo que hay":

- **El encargo era una sola pieza de ingeniería fuertemente acoplada.** Los
  controles, la guía, el rig genérico, el HUD y los tests son el mismo cambio.
  Repartirlo entre agentes habría creado costuras justo donde la coherencia era
  el objetivo (el fallo original fue precisamente que las teclas vivían en
  cuatro sitios distintos).
- **Un subagente arranca en frío.** Cada uno habría tenido que reconstruir el
  contexto que ya estaba en la sesión: coste alto, beneficio nulo.
- **`licence-safety-researcher` y `vacancy-evidence-researcher` habrían violado
  las reglas del proyecto.** Sin evidencia citada y con fecha de acceso no se
  puede afirmar nada sobre licencias, vacantes o financiación. Se dejó el mapeo
  de competencias **vacío a propósito** en lugar de rellenarlo con filas
  plausibles inventadas.
- **El rol de QA sí se ejerció, pero como código**, no como agente: la suite de
  escena reconstruye la sesión para los 21 escenarios y pulsa cada binding de
  cada máquina. Un test que corre en cada build vale más que una auditoría que
  corre una vez.

**Regla que queda:** delegar cuando el trabajo es *ancho* (muchos objetivos
independientes), no cuando es *profundo* (un objetivo con muchas dependencias).

### Herramientas realmente empleadas
- Godot 4.6.3 portable en modo `--headless` como *compilador y test runner*.
- Node 22 para el generador/validador de escenarios (no había Python instalado;
  se detectó y se migró el script en lugar de asumirlo).
- Captura de viewport propia (`--screenshot`) como herramienta de QA visual.
- Hook `guard_tool.py` del propio proyecto bloqueó un `rm -rf`; se reescribió la
  operación en vez de saltarse el guard.

---

## 3. Estrategia técnica

### 3.1 Una máquina es *dato*, no *código*
Vocabulario único de seis ejes (`travel`, `trolley`, `slew`, `luff`,
`telescope`, `hoist`). Una entrada de catálogo + un constructor visual = una
grúa nueva. `session.gd` no se tocó para pasar de una máquina a siete.

Alternativa descartada: una clase por tipo de grúa. Habría duplicado siete veces
la lógica de límites, aceleración e interlocks.

### 3.2 Los controles se especifican una sola vez
`control_scheme.gd` es la fuente única de la que leen el input map, el overlay
de teclas, la tarjeta F1, la pausa, el menú y el texto de guía. El mismo gesto
significa lo mismo en todas las máquinas (**R/F siempre iza/baja**).

Esto es la respuesta directa a «no me sé los controles»: el fallo no era que
faltara documentación, era que había cuatro documentaciones que no coincidían.

### 3.3 La guía es una función pura del estado
Nada de tutorial lineal. `guidance.gd` devuelve el primer paso incompleto dado
el estado actual, sin temporizadores ni secuencia. Se recupera de cualquier
orden, incluido deshacer un paso — hay un test de regresión para eso.

### 3.4 Cero dependencias de autoload en los módulos puros
Los tests de lógica corren con `--script`, donde los autoloads no existen. Se
hizo `Loc` estático y se rompieron las dependencias (`Loc` ya no escribe en
`GameState`; emite señal). Beneficio real: los módulos son testeables y el log
de tests dejó de estar sepultado bajo errores en cascada.

### 3.5 Visuales sin un solo asset binario
30 materiales PBR generados en runtime desde ruido a mapas de albedo, rugosidad
y normales, con triplanar en espacio de mundo. Offline, sin problemas de
licencia, repositorio de 0,5 MB — y aun así con grano, desgaste y relieve.

---

## 4. Verificación: qué encontró cada capa

| Capa | Encontró |
|---|---|
| Tests de lógica (22) | Modelo de estabilidad **al revés** (una esquina salía menos estable que un lateral); el eje de giro de la grúa ferroviaria no se movía con su traslación, lo que hacía imposible el escenario SC-504 |
| Tests de escena (94) | Nada nuevo tras las correcciones, pero cubre 7 máquinas × 5 emplazamientos × 21 escenarios |
| Ejecución con render | Nada — 0 errores, 0 warnings |
| **Captura de pantalla** | **Tres defectos que no producían ninguna línea de log**: nave interior completamente negra (el sol con sombras detrás del techo), cámara orbital atravesando el cerramiento, y el panel de tabla de cargas tapando el panel de objetivo |

**La lección más importante de la sesión.** 94 aserciones en verde y un log
limpio no dicen nada sobre si la pantalla se ve. La verificación visual pasó de
ser una limitación conocida (KI-008) a ser parte del proceso.

También hubo dos fallos **en los tests, no en el código** (un conteo de pasos
insuficiente y una tolerancia de 1e-9 sobre componentes `Vector2` que son de 32
bits). Se corrigieron como lo que eran, sin tocar el código correcto.

---

## 5. Protección de la propiedad comercial

Línea de corte: **el motor es público, la capa de evaluación no.**

Lo público es un simulador completo y funcional. Lo privado es lo que lo
convierte en un producto vendible a una academia: modelo de competencias,
umbrales validados, mapeo a licencias, informes de cohorte y el procedimiento
para cargar la tabla de cargas real de un cliente.

Razonamiento: **el motor no es el foso**. Cualquiera puede clonarlo y tener un
buen entrenador; lo difícil de reproducir es el acceso al dominio y el trabajo
de validación. Publicar el motor compra credibilidad, que es justo lo que le
falta a una operación pequeña que vende a proveedores de formación
conservadores.

**Tres barreras independientes** (ninguna suficiente por sí sola):
1. `.gitignore` excluye `COMMERCIAL/`, `research/` y `memory/`.
2. `scripts/build_public_export.mjs` copia por **lista blanca**, no negra — una
   carpeta nueva no se publica por olvido, se publica solo si se nombra.
3. El script hace `grep` de marcadores `GOA-CONFIDENTIAL` sobre el árbol ya
   exportado y **falla el build** si aparece alguno.

Detalle que valida el enfoque: la barrera 3 detectó el propio script de export
(contenía los marcadores como literales de regex) y falló correctamente. Se
reescribieron los marcadores por concatenación.

Detalle que valida la lista blanca: el hook de logging del proyecto escribía
`COMMAND_LOG.md` con rutas locales completas en cualquier carpeta desde la que
se ejecutara un comando; aparecieron dos copias en sitios no previstos. Con una
lista negra se habrían publicado.

El repositorio público se crea **sin historia compartida**, porque el historial
privado contiene material de investigación y el prompt maestro.

Licencia: **PolyForm Noncommercial 1.0.0** (antes Apache-2.0). Se puede leer,
aprender y usar personalmente; no se puede vender ni usar para operar formación
comercial.

---

## 6. Decisiones registradas (DEC-019 … DEC-027)

En `DECISIONS.md` del proyecto, formato append-only con contexto, decisión,
consecuencia y alternativa descartada:

| ID | Decisión |
|---|---|
| DEC-019 | Una máquina es dato, no código |
| DEC-020 | El mismo gesto significa lo mismo en todas las máquinas |
| DEC-021 | La guía es función pura del estado, no un tutorial guionizado |
| DEC-022 | Las tablas de carga son envolventes de práctica, nunca datos de fabricante |
| DEC-023 | Las zonas de peligro llevan banda de altura |
| DEC-024 | La estabilidad se toma respecto a la **arista** de vuelco |
| DEC-025 | `Loc` estático; los módulos de datos sin dependencia de autoload |
| DEC-026 | Verificar visualmente, no solo por log |
| DEC-027 | Publicar el motor, retener la capa de evaluación |

---

## 7. Reglas que se respetaron sin excepción

Del `CLAUDE.md` del proyecto:

- Nunca inventar vacantes, licencias, salarios, aceptación de idioma ni
  certificaciones → **0 afirmaciones de ese tipo en toda la build**, y el mapeo
  de competencias se dejó vacío en lugar de rellenarlo.
- El rendimiento en simulador nunca equivale a certificación legal → aparece en
  el arranque, en el menú, en el debrief, en el `.bat`, en el README y en la
  licencia.
- Separar volúmenes de colisión física y de seguridad → mantenido.
- Fallar visiblemente ante NaN/Infinity → mantenido y testeado bajo estrés.
- Preferir scripts, tests y diagnósticos de motor a inspección repetida del
  modelo → toda la verificación es automatizable y reproducible.

---

## 8. Lo que queda abierto (declarado, no oculto)

- Recogidas y depósitos solo a nivel de suelo: falta un resolutor de obstáculos
  en el eje vertical.
- Estabilidad estática: sin efectos dinámicos ni fallo de terreno.
- Puntuación plana y publicada, **no** una evaluación validada.
- Investigación de licencias y vacantes sin reanudar → el mapeo de competencias
  sigue vacío a propósito.

# Skill, agente, perfil y mascota

## Definición corta

| Pieza | Qué es | Qué no es |
|---|---|---|
| Skill | Capacidad reusable: instrucciones, conocimiento, scripts y templates | Un trabajador autónomo o una identidad |
| Agente | Runtime con objetivo, modelo, herramientas, permisos, memoria y ciclo de vida | Un paquete de documentación |
| Perfil | Modo de ejecución dentro de una Skill o agente | Otro agente salvo que tenga responsabilidad propia |
| Mascota | Identidad visual y señal de presencia/estado | Permiso, modelo, memoria, seguridad o capacidad |
| Conector | Acceso a una aplicación o API concreta | Inteligencia o workflow |
| MCP | Protocolo y servidor de herramientas/contexto | Memoria universal ni autorización automática |
| Plugin | Bundle instalable que puede aportar Skills, MCP y conectores | Sinónimo de Skill |

## Por qué existe `.agents/skills`

`.agents/skills` es una convención de descubrimiento de Agent Skills. El nombre
de la carpeta indica quién consume las Skills; no transforma una Skill en agente.

La fuente elegida para este proyecto es:

```text
.skills/frontend-hyper-boost/          # se edita aquí
└── SKILL.md + references + scripts + assets

.agents/skills/frontend-hyper-boost/   # adaptador mínimo
└── SKILL.md -> apunta a la fuente canónica
```

Otros clientes pueden instalar el paquete generado o usar un adaptador propio.
No se mantiene una copia completa por plataforma.

## Cuándo una mega-Skill sigue siendo una Skill

`frontend-hyper-boost` puede abarcar arquitectura visual, motion, 3D, responsive,
Stitch y auditoría porque todo sirve a una misma capacidad: diseñar y entregar
frontends extraordinarios y utilizables.

Solo debe dividirse en agentes cuando una parte necesite:

- trabajar en paralelo con su propia misión;
- permisos diferentes;
- presupuesto o modelo diferente;
- una cola y estado de ejecución propios;
- revisión o responsabilidad independiente.

Ejemplo: `Motion Auditor` puede ser un agente que usa `frontend-hyper-boost`.
No hace falta crear una Skill duplicada llamada `motion-auditor`.

## Qué son las mascotas

Las mascotas de Codex son una capa de presencia: ayudan a reconocer tono o modo
de trabajo y hacen el sistema más habitable. Pueden representar estados como:

- `Seedy`: exploración y brotes;
- `Stacky`: trabajo profundo y composición;
- `Hoots`: auditoría;
- `Fireball`: iteración rápida;
- `BSOD`: error o incidente.

La aplicación nunca debe inferir permisos, modelo, calidad o estado real a partir
de la mascota. El dossier técnico debe mostrarlo por separado:

```text
mascota visual
agente/runtime
modelo
Skills instaladas
herramientas y conectores
memoria
permisos
presupuesto
estado y última evidencia
```

## Regla de interfaz

Cada ficha de habitante de AI Forge mostrará dos capas:

1. identidad visible: nombre, avatar/mascota, color y estado;
2. contrato técnico: rol, modelo, Skills, herramientas, memoria, permisos,
   presupuesto, alcance y ruta de auditoría.

Así conservamos el encanto Fallout Shelter sin convertir la metáfora en ruido.

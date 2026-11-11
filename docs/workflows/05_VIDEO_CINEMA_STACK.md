# Workflow 05 — Vídeo, animación, 3D y cine

Entrada: brief de Abraham. Router: skill `video-cinema-director`.

## Qué hay instalado

| Capa | Piezas | Dónde |
|---|---|---|
| Vídeo HTML→MP4 | HyperFrames (7 skills, ~450 bloques) | `.agents/skills/hyperframes*` |
| Vídeo React | Remotion (9 skills) | `.agents/skills/remotion-*` |
| Estilos de película | Lemo-Opuscar (66 estilos) | skill + `.video-stack/` |
| Dibujo animado a mano | Claude Animation Base | skill + `.video-stack/` |
| Fondos shader | Paper Shaders 0.0.82 | skill, npm por proyecto |
| Render 3D cine | Blender vía MCP | `.mcp.json` + `blender-cinematic` |
| 3D web tiempo real | Three.js (13 skills) | `.agents/skills/threejs-*` |
| Conectores ya activos | Canva (`create-video`), Figma (`export_video`, `create_shader`) | sesión Claude |

## Primer arranque (máquina local de Abraham)

```bash
bash scripts/video-stack/doctor.sh               # qué falta
bash scripts/video-stack/bootstrap.sh all        # engines pinneados en .video-stack/
uvx mcp-for-blender==2.2.7 install-addon         # addon dentro de Blender (opcional: 3D)
```

Reinicia el cliente Claude para que cargue `.mcp.json`; en Blender pulsa
*Start MCP Server* (panel `N`). Prueba rápida: "haz un vídeo de 6 s con HyperFrames".

## Verificado vs pendiente

- Verificado (estático): contenido, licencias, ausencia de patrones peligrosos, existencia en npm/PyPI.
- **No ejecutado aún**: `npm ci` de Animation Base, `npx hyperframes`, `uvx mcp-for-blender`
  (bloqueado en la sesión cloud). Primer render real = prueba de humo pendiente.
- Cloud sin GPU ni Blender: los renders 3D pesados corren en tu PC.

Procedencia y licencias: `docs/video-stack/UPSTREAM.md`.

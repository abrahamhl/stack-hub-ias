# Video & cinema stack — procedencia y licencias

Actualizado: 2026-11-11 · Actor: claude-code-web · Fuente: clones `--depth 1` en sesión,
revisados a mano (sin patrones `curl|sh`, `eval` ni instrucciones de inyección en lo vendorizado).
`verification_status`: **verified-static** (código leído y licencias comprobadas; **no ejecutado**).
`last_checked_at`: 2026-11-11.

| Componente | Origen (commit pinneado) | Licencia | Cómo entra |
|---|---|---|---|
| HyperFrames: `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, `remotion-to-hyperframes`, `reverse-any-video`, `style-sampling` | heygen-com/hyperframes `3ad7611f9fd36c1cef589c59b116ad7043c3b041` (skills v0.9.33) | Apache-2.0 | vendorizado en `.agents/skills/` |
| Lemo-Opuscar (skill lanzadera) | lemomo-ai/lemo-opuscar `9eb7739a0fca4c6990fe966cb8b87b1930f7193a` | MIT | skill vendorizada; librería (77 MB de estilos) vía `bootstrap.sh lemo` |
| Claude Animation Base | JohnHeibel/ClaudeAnimationBase `0ac8bf2b31942376cb6b8c4074715595d512acd2` | MIT | skill propia; código vía `bootstrap.sh animation-base` |
| Paper Shaders | paper-design/shaders `e7003a2d4e6e932e30b8fa11ec1239e6ea48e16a`; npm `@paper-design/shaders(-react)@0.0.82` | Apache-2.0 | skill propia; paquete npm pinneado por proyecto |
| Remotion skills (9 de 13) | remotion-dev/skills `1af7e69a2a613437d46095924057970a6a7df40d` (v4.0.542) | **Remotion License** (ver gate) | vendorizado; omitidas `saas`, `maps`, `markup`, `upgrade` |
| Three.js skills (13) | CloudAI-X/threejs-skills `0e181866f095b5f06d005133876e926515390d95` | MIT | vendorizado |
| Blender MCP | ahujasid/blender-mcp `2e4b0bc294694b1570d76ed01be657c22e6d02a0`; PyPI `mcp-for-blender==2.2.7` | MIT | `.mcp.json` (telemetría OFF, safe-mode ON) |
| Skills propias | `video-cinema-director`, `claude-animation-base`, `paper-shaders`, `blender-cinematic` | del repo | `.agents/skills/` |

Licencias copiadas en `docs/video-stack/licenses/`. No se vendoriza `skills/figma` ni
`skills/slideshow` de HyperFrames (solapan con el conector Figma y con otras skills).

## Gate de licencia Remotion

Remotion no es MIT: uso gratuito para particulares y empresas de hasta 3 personas;
más allá requiere licencia de pago (<https://www.remotion.pro/license>). Por defecto
se prefiere HyperFrames; Remotion solo con confirmación de Abraham.

## Actualizar

1. Clonar el upstream, comparar contra el SHA de arriba, leer el diff.
2. Re-copiar la skill a `.agents/skills/`, regenerar espejo (`cp -r .agents/skills/* .claude/skills/`).
3. Actualizar SHA/fecha aquí y en `scripts/video-stack/bootstrap.sh`.
4. No ejecutar `hyperframes skills update` ni `npx skills add`: el repo es el dueño de la versión.

## Notas conocidas

- Skills de HyperFrames v0.9.33; npm `hyperframes` publicaba 0.9.32 el 2026-11-11 (desfase menor, upstream).
- Blender MCP: el paquete PyPI se renombró de `blender-mcp` a `mcp-for-blender`.
- Lemo-Opuscar `setup.sh` sigue `main` solo en clones con `lemo.managed`; el nuestro (bootstrap) no lo lleva.

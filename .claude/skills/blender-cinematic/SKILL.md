---
name: blender-cinematic
description: Photoreal and cinematic 3D renders with Blender driven through the Blender MCP server (scene inspection, Python scripting, viewport capture, asset search/import, 3D generation). Use for product shots, turntables, cinematic camera moves, lighting setups, Cycles/EEVEE stills and animation passes.
---

# Blender Cinematic (via MCP)

Server: `mcp-for-blender` (formerly `blender-mcp`, MIT), pinned in `.mcp.json`
with telemetry off and `BLENDER_MCP_SAFE_MODE=1` (AST allowlist for model-written
scripts, a guard against prompt injection from asset text; it is not a sandbox).

## Requirements (Abraham's machine, not the cloud container)

1. Blender installed. 2. `uvx mcp-for-blender install-addon`, then in Blender
`N` panel → **MCP for Blender** → *Start MCP Server*. 3. Restart the Claude client
so `.mcp.json` is loaded. Remote Blender: set `BLENDER_HOST` / `BLENDER_PORT`.

## Tools (from upstream `server.py`)

`get_addon_status`, `get_scene_info`, `execute_blender_code`, `look`,
`viewport_capture` / `viewport_latest` / `viewport_pick` / `open_viewport`,
`search_assets` / `import_asset` (Poly Haven, Sketchfab), `generate_3d`.
Check each tool's live schema before use.

## Cinematic recipe

1. `get_scene_info`; save the `.blend` first (never work on the only copy).
2. Blocking: scale, camera (focal length 35-85 mm, shallow DoF), 3-point or HDRI light.
3. Materials: PBR; import HDRI/textures via `search_assets` rather than inventing files.
4. Look dev with EEVEE for speed; `look`/`viewport_capture` after every major change.
5. Animate: keyframes on camera/objects, ease curves (no linear), 24 fps cinema or 30/60 web.
6. Final: Cycles with denoise; render stills first, then image sequence (EXR/PNG),
   encode with ffmpeg or composite in HyperFrames/Remotion.
7. Output to `outputs/` (gitignored). Report render time as **measured**, never guessed.

## Safety

- Review every `execute_blender_code` script that touches the filesystem or network.
- The addon socket accepts local connections: do not expose its port beyond localhost.
- Long Cycles jobs belong on a GPU machine; confirm with Abraham before starting them.

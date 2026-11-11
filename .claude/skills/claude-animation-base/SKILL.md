---
name: claude-animation-base
description: Make hand-painted, boiling-line 2D cartoon animations of the character Clawd (or a new character) with p5.js and p5.brush, rendered headless to MP4 through Chrome. Use when the user wants a painted, hand-drawn, character-driven short, storyboard-first, or mentions Claude Animation Base or Clawd.
---

# Claude Animation Base

Upstream: `JohnHeibel/ClaudeAnimationBase` (MIT), pinned in
`docs/video-stack/UPSTREAM.md`. The code is **not vendored**; it is cloned
into the gitignored `.video-stack/` folder.

## Setup

```bash
bash scripts/video-stack/bootstrap.sh animation-base   # clone at pinned SHA + npm install
```

Needs Node, Google Chrome/Chromium and ffmpeg (`doctor.sh` checks them).
No GPU: add `--soft-gl` (slow on watercolour fills) or ask for fills to be
replaced by cheaper washes.

## Workflow

1. Read `.video-stack/ClaudeAnimationBase/ANIMATION_GUIDE.md` **entirely** before drawing.
   It holds the rules (handmade, alive, one piece, no text, transitions always,
   something happens in every scene) and the API.
2. Storyboard first; confirm with Abraham. The user decides **what**, the guide decides **how**.
3. Put scenes in `src/scenes/`; preview in `studio.html` (Chrome) and check with
   `node render.mjs --sheet=0,1,2,3 --out=out/sheet.jpg` contact sheets.
4. Render: `node render.mjs --clip --out=out/video.mp4`. Linux flags:
   `--soft-gl` (no GPU) or `--gpu-angle=gl-egl` (NVIDIA). `node gpu_probe.mjs <chrome>` to diagnose.
5. Copy the final MP4 to this project's `outputs/`; do not commit it.

## Notes

- Higher reasoning effort gives more detailed, extravagant scenes (upstream finding).
- Flat 2D only: no 3D projection. For 3D use `blender-cinematic` or `threejs-*`.
- Clawd is a character designed for Claude; fine for personal/creative use, check brand
  rules before commercial use.

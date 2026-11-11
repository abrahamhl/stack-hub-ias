#!/usr/bin/env bash
# Read-only environment check for the video/cinema stack. Never installs anything.
ok=0; warn=0
chk() { # name, command, hint
  if v=$(eval "$2" 2>/dev/null | head -1) && [ -n "$v" ]; then printf '  [OK]   %-12s %s\n' "$1" "$v"; ok=$((ok+1))
  else printf '  [MISS] %-12s %s\n' "$1" "$3"; warn=$((warn+1)); fi
}
echo "Video stack doctor ($(date -u +%F))"
chk node     "node -v"                                   "install Node 22+"
chk npm      "npm -v"                                    "comes with Node"
chk ffmpeg   "ffmpeg -version | head -1"                 "install ffmpeg (required to encode MP4)"
chk python3  "python3 -V"                                "needed by Lemo-Opuscar tools (3.11+)"
chk uvx      "uvx --version"                             "install uv (needed for Blender MCP)"
chk chrome   "command -v google-chrome chromium chromium-browser /opt/pw-browsers/chromium 2>/dev/null | head -1" "needed to render HTML/p5 (HyperFrames, Animation Base)"
chk blender  "blender --version | head -1"               "only on the machine that renders 3D (Cycles/EEVEE)"
chk nvidia   "nvidia-smi -L"                             "optional; without GPU use soft-GL and expect slow renders"
echo "ok=$ok missing=$warn  (MISS is fine if the engine is unused on this machine)"

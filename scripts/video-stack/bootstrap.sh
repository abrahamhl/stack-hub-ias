#!/usr/bin/env bash
# Fetch heavy upstream engines at PINNED commits into .video-stack/ (gitignored).
# Usage: bootstrap.sh [animation-base|lemo|all]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEST="$ROOT/.video-stack"
# Keep in sync with docs/video-stack/UPSTREAM.md
ANIM_REPO=https://github.com/JohnHeibel/ClaudeAnimationBase.git
ANIM_SHA=0ac8bf2b31942376cb6b8c4074715595d512acd2
LEMO_REPO=https://github.com/lemomo-ai/lemo-opuscar.git
LEMO_SHA=9eb7739a0fca4c6990fe966cb8b87b1930f7193a

pin() { # repo sha dir
  local repo="$1" sha="$2" dir="$3"
  if [ -d "$dir/.git" ]; then echo "= $dir exists"; else
    mkdir -p "$dir"; git -C "$dir" init -q; git -C "$dir" remote add origin "$repo"
  fi
  git -C "$dir" fetch -q --depth 1 origin "$sha"
  git -C "$dir" checkout -q --detach "$sha"
  echo "> $(basename "$dir") @ $(git -C "$dir" rev-parse --short HEAD)"
}

case "${1:-all}" in
  animation-base|all)
    pin "$ANIM_REPO" "$ANIM_SHA" "$DEST/ClaudeAnimationBase"
    (cd "$DEST/ClaudeAnimationBase" && npm ci --no-audit --no-fund --silent) ;;
esac
case "${1:-all}" in
  lemo|all)
    # Cloned by us (no lemo.managed flag), so the skill's setup.sh will NOT auto-update it to main.
    pin "$LEMO_REPO" "$LEMO_SHA" "$DEST/lemo-opuscar"
    echo "Use: export LEMO_OPUSCAR_HOME=$DEST/lemo-opuscar ; sh .agents/skills/lemo-opuscar/scripts/setup.sh deps" ;;
esac
echo "Done. Next: bash scripts/video-stack/doctor.sh"

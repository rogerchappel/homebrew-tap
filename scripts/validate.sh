#!/usr/bin/env bash
set -euo pipefail
npm run release:check
if command -v brew >/dev/null 2>&1; then
  formulae=(
    rogerchappel/tap/branchbrief
    rogerchappel/tap/envprobe
    rogerchappel/tap/proofdock
    rogerchappel/tap/stackforge
    rogerchappel/tap/taskbrief
    rogerchappel/tap/worktreeguard
  )
  brew audit --strict --online --new "${formulae[@]}"
  brew style --formula "${formulae[@]}"
fi

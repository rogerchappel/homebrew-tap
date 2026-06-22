#!/usr/bin/env bash
set -euo pipefail
npm run release:check
if command -v brew >/dev/null 2>&1; then
  brew audit --strict --online --new Formula/*.rb || true
  brew style Formula/*.rb || true
fi

#!/usr/bin/env bash
set -euo pipefail
npm test
npm run validate
ruby -c Formula/*.rb
if command -v brew >/dev/null 2>&1; then
  brew style Formula/*.rb || true
fi

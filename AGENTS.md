# Agent Instructions

This repository is a generated Homebrew tap catalog.

## Rules

- Work in isolated git worktrees.
- Treat `catalog/tools.json` as the source of truth.
- Regenerate formulas with `npm run generate` after catalog edits.
- Never invent release artifacts, checksums, bottles, or casks.
- Run `npm test`, `npm run validate`, and `ruby -c Formula/*.rb` before handoff.
- Future review work should link a PR before landing.

## Tone

Keep docs professional, friendly, and practical. A little emoji personality is welcome; supply-chain claims must stay exact.

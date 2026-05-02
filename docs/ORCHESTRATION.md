# Orchestration

## Delivery shape

This tap is delivered as a small generated system:

- `catalog/tools.json` owns product metadata.
- `src/formula.mjs` renders Homebrew formula files.
- `src/validate.mjs` rejects drift and unsafe release claims.
- `README.md` is the public install surface.
- GitHub Actions runs validation on every push/PR.

## Agent workflow

1. Work in an isolated git worktree.
2. Make small commits tied to one concern each.
3. Do not edit generated formulas by hand unless also updating the generator.
4. Before publishing, run local gates and inspect `git status`.
5. Publish direct to `main` only after validation is green.

## Ownership

- Product owner: Roger Chappel.
- Maintainer workflow: PR-linked changes for future updates.
- Formula safety owner: validator and release checklist.

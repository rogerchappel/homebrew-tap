# Changelog

## Unreleased

- Added a single `npm run release:check` command for tests, catalog validation, README checks, and formula syntax checks.
- Updated CI and local validation docs to use the release-readiness command.
- Added a consistency gate that keeps `docs/tool-catalog.md` entrypoints and build modes in sync with `catalog/tools.json`; corrected the build-mode column for the five npm-built tools.

## 0.1.0 - 2026-05-02

- Created Roger's public Homebrew tap foundation.
- Added generated HEAD-only formulas for six CLI tools.
- Added catalog, generator, validator, tests, and CI.
- Documented release workflow and safety policy for future formulas.

# PRD: Roger's Homebrew Tap

## Purpose

Create a public, professional Homebrew tap for Roger Chappel's open-source CLI ecosystem. The tap should make the ecosystem feel cohesive while staying honest about release maturity.

## Goals

- Publish a conventional `rogerchappel/homebrew-tap` repository.
- Provide a curated catalog of safe initial CLI formulas.
- Support source-based `--HEAD` installs without claiming nonexistent release artifacts.
- Validate catalog, formula, and README consistency locally and in CI.
- Document how future tools graduate from draft/HEAD formulas to released formulas.

## Non-goals

- No fabricated binary bottles, archives, or SHA256 checksums.
- No copied implementation or wording from existing taps.
- No casks or notarized app workflows in V1.

## Users

- Roger, when dogfooding his OSS tools.
- Contributors and agents that need a consistent install surface.
- Curious GitHub visitors looking for a one-command install path.

## V1 Requirements

1. `Formula/` structure with generated HEAD formulas for a safe subset of Node CLIs.
2. `catalog/tools.json` as the source of truth.
3. `tapring` validator CLI for catalog, formula, and README checks.
4. README catalog with installation snippets and caveats.
5. Release/update workflow docs.
6. CI running tests, validation, and Ruby syntax checks.

## Success Criteria

- `npm test` passes.
- `npm run validate` passes.
- `ruby -c Formula/*.rb` passes.
- GitHub repo is public and protected on `main` where permissions allow.

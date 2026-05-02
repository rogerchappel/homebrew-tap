# tapring

Status: in-progress

## Scorecard

Total: 86/100
Band: strong
Last scored: 2026-05-02
Scored by: Neo

| Criterion | Points | Notes |
|---|---:|---|
| Problem pain | 18/20 | Roger's growing OSS set needs a professional install surface. |
| Demand signal | 18/20 | Successful developers often maintain Homebrew taps; steipete/homebrew-tap is a clear example. |
| V1 buildability | 18/20 | Formula/cask templates and validation for existing Roger repos are buildable today. |
| Differentiation | 13/15 | A curated tap generator/catalog with personality and safety checks. |
| Agentic workflow leverage | 12/15 | Helps every future agent-built CLI become installable. |
| Distribution potential | 7/10 | Homebrew install snippets are highly shareable. |

## Pitch

A public Homebrew tap companion for Roger's OSS tools: formula/cask drafts, install docs, validation, and a cheerful catalog of tools.

## Why It Matters

A polished tap makes the GitHub profile feel like a cohesive developer ecosystem instead of scattered repos.

## Attribution / Inspiration

Inspired by the common Homebrew tap pattern and steipete/homebrew-tap. `homebrew-tap` is a conventional repo type, but do not copy formulas or README text.

## V1 Scope

- Create a tap-ready repo with `Formula/` and optional `Casks/` structure.
- Include formulas or draft formulas for a safe subset of Roger tools where source install is feasible.
- Add validator CLI/script for formula shape, URLs, names, caveats, and install snippets.
- Generate README catalog with install examples and emoji/personality.
- Document release/update workflow.

## Out of Scope

- Claiming published binary releases that do not exist.
- Notarized casks.
- Auto-publishing without explicit release metadata.

## Verification

- Shell/Ruby validation where possible.
- Fixture tests for formula generation/validation.
- README install commands checked for consistency.

## Agent Prompt

Build `tapring` or a conventional `homebrew-tap` repo for Roger's OSS ecosystem. Make it original, safe, and useful today; do not copy steipete's tap. Publish to GitHub and protect main.

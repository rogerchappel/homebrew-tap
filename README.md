# 🧭 Roger's Homebrew Tap

A polished Homebrew tap for the Roger Chappel OSS ecosystem: curated formulas, cautious source-install defaults, validation scripts, and just enough sparkle to make every CLI feel invited to the party.

> Inspired by the common Homebrew tap pattern and by seeing professional developer taps in the wild. This repository is original and intentionally avoids copying another tap's formulas or docs.

## Quick start

```bash
brew tap rogerchappel/tap
```

All formulas in this first cut are **HEAD-only source installs**. That is deliberate: the projects do not yet publish Homebrew-ready release archives and checksums, so this tap does not pretend they exist.

## Catalog

| Tool | What it does | Install |
| --- | --- | --- |
| 🏗️ `stackforge` | Agent-friendly project scaffolding for OSS apps, APIs, and CLIs | `brew install --HEAD rogerchappel/tap/stackforge` |
| 🌿 `branchbrief` | Turn branch changes into crisp review briefings | `brew install --HEAD rogerchappel/tap/branchbrief` |
| 🧾 `taskbrief` | Parse product prompts into reviewable engineering task briefs | `brew install --HEAD rogerchappel/tap/taskbrief` |
| 🧪 `proofdock` | Collect and check proof for agent-built software releases | `brew install --HEAD rogerchappel/tap/proofdock` |
| 🛰️ `envprobe` | Probe local development environments before agents make assumptions | `brew install --HEAD rogerchappel/tap/envprobe` |
| 🛡️ `worktreeguard` | Keep agent work inside safe isolated Git worktrees | `brew install --HEAD rogerchappel/tap/worktreeguard` |

## Validation

```bash
npm run release:check
```

The release check runs the node test suite, catalog/formula validation, README
snippet validation, and Ruby syntax checks for every formula.

If Homebrew is available locally, you can also run:

```bash
brew audit --strict --online --new Formula/*.rb
brew style Formula/*.rb
```

Some audit warnings are expected until versioned source archives exist; the important safety line is that formulas remain source-only and never include invented checksums.

## Updating formulas

1. Update `catalog/tools.json`.
2. Run `npm run generate`.
3. Run `npm test && npm run validate`.
4. Only add a stable `url` and `sha256` after the upstream repo publishes an immutable release archive.
5. Open a PR that links the upstream release or explains why the formula remains HEAD-only.

## Repo naming

This repo uses the conventional GitHub name `homebrew-tap`, so Homebrew users can install formulas through the short tap name `rogerchappel/tap`.

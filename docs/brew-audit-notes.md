# Homebrew Audit Notes

Homebrew audits local tap formulae by name. Run `./scripts/validate.sh` after
tapping this checkout to audit and style all six formulae with their fully
qualified `rogerchappel/tap/<name>` names.

Audit and style findings fail validation. HEAD-only formulae remain valid
without invented stable URLs, checksums, or livecheck metadata.

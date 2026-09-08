# Maintainer Checklist

Before merging a tap change:

- [ ] PR links the upstream tool or release.
- [ ] Catalog and generated formula are committed together.
- [ ] Every `Formula/*.rb` basename appears exactly once in `catalog/tools.json`; remove orphaned generated formulae.
- [ ] README snippet exists for each formula.
- [ ] `npm test` passes.
- [ ] `npm run validate` passes.
- [ ] Automation uses a documented `tapring` command; unknown commands fail nonzero after printing help.
- [ ] `ruby -c Formula/*.rb` passes.
- [ ] After `brew tap rogerchappel/tap "$PWD"`, `brew install --HEAD rogerchappel/tap/<name>` and `brew test rogerchappel/tap/<name>` pass for each changed formula.
- [ ] The CI `formula-smoke` matrix lists every formula in `catalog/tools.json`.
- [ ] Any stable `url` has a real SHA256 from the published archive.

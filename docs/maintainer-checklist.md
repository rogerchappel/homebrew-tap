# Maintainer Checklist

Before merging a tap change:

- [ ] PR links the upstream tool or release.
- [ ] Catalog and generated formula are committed together.
- [ ] README snippet exists for each formula.
- [ ] `npm test` passes.
- [ ] `npm run validate` passes.
- [ ] `ruby -c Formula/*.rb` passes.
- [ ] Any stable `url` has a real SHA256 from the published archive.

# Contributing

Thanks for helping keep Roger's tap crisp and honest.

## Golden rules

- Open a PR for future changes and link the upstream project or release.
- Keep `catalog/tools.json` and generated `Formula/*.rb` files in sync.
- Do not add release URLs, checksums, bottles, or casks unless the artifacts really exist.
- Prefer small, reviewable commits.

## Local checks

```bash
npm test
npm run validate
ruby -c Formula/*.rb
```

If Homebrew is installed, `brew style Formula/*.rb` is welcome too.

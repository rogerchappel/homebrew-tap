# Release and Update Workflow

## HEAD-only update

Use this for unreleased tools or active dogfooding.

```bash
npm run catalog
npm run generate
npm test
npm run validate
```

Commit the catalog and generated formula together.

## Graduating to released formula

Only add a stable release formula when the upstream project has:

1. A tagged release.
2. An immutable source archive.
3. A verified SHA256 from that exact archive.
4. A repeatable build/install path.

Then update the formula and include the release URL in the PR body.

## Caveats

Homebrew bottles and casks are out of scope for V1. Add them only with explicit release infrastructure.

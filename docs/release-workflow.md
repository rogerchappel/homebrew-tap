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

Before opening the PR, confirm each changed catalog entry has:

- At least one lowercase CLI command in `bin`.
- The build commands needed for a source checkout.
- Every runtime path the generated formula must copy into `libexec`.
- A package-relative `binPath` when the command is not at `dist/<command>`.

`npm run validate` checks these fields so malformed formula metadata fails before
it reaches Homebrew users.

## Graduating to released formula

Only add a stable release formula when the upstream project has:

1. A tagged release.
2. An immutable source archive.
3. A verified SHA256 from that exact archive.
4. A repeatable build/install path.

Then update the formula and include the release URL in the PR body.

## Caveats

Homebrew bottles and casks are out of scope for V1. Add them only with explicit release infrastructure.

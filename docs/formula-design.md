# Formula Design

## Current mode: HEAD-only

The first formulas install from `head` because the upstream projects are source repositories without Homebrew-specific release archives. This keeps the tap immediately useful without inventing artifact URLs or checksums.

## Node CLI pattern

Each formula:

- declares `node` at runtime;
- uses `pnpm` only as a build dependency;
- runs the upstream build commands from the catalog;
- installs the built project under `libexec`;
- symlinks declared commands into Homebrew `bin`.

## Generated files

`Formula/*.rb` files are generated from `catalog/tools.json`. If a formula needs a new shape, update the generator and add a test instead of hand-editing one formula.

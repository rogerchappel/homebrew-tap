# Tool Catalog Details

| Tool | Entrypoint | Build mode |
| --- | --- | --- |
| stackforge | `dist/index.js` | pnpm build |
| branchbrief | `dist/cli.js` | npm ci + npm run build |
| taskbrief | `dist/cli.js` | npm ci + npm run build |
| proofdock | `dist/cli.js` | npm ci + npm run build |
| envprobe | `src/cli.js` | npm ci + npm run build |
| worktreeguard | `src/index.js` | npm ci + npm run build |

The table is intentionally small for V1. New tools should be added after their local build and help output have been checked.
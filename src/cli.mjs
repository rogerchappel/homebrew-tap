#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog, rootDir } from './catalog.mjs';
import { renderFormula } from './formula.mjs';
import { validateAll } from './validate.mjs';

const command = process.argv[2] || 'help';
const catalog = loadCatalog();

function help() {
  console.log(`tapring — Roger's Homebrew tap helper\n\nCommands:\n  catalog       Print catalog entries\n  generate      Regenerate Formula/*.rb from catalog/tools.json\n  validate      Validate catalog, formulae, and README snippets\n  readme-check  Validate README install snippets`);
}

if (command === 'catalog') {
  for (const tool of catalog.tools) console.log(`${tool.emoji} ${tool.name}: ${tool.summary}`);
} else if (command === 'generate') {
  const dir = path.join(rootDir, 'Formula');
  fs.mkdirSync(dir, { recursive: true });
  for (const tool of catalog.tools) fs.writeFileSync(path.join(dir, `${tool.name}.rb`), renderFormula(tool));
  console.log(`generated ${catalog.tools.length} formulae`);
} else if (command === 'validate' || command === 'readme-check') {
  const errors = validateAll(catalog, rootDir).filter((error) => command === 'validate' || error.includes('README'));
  if (errors.length) {
    console.error(errors.map((error) => `✗ ${error}`).join('\n'));
    process.exit(1);
  }
  console.log(`✓ ${command === 'validate' ? 'tap catalog is valid' : 'README snippets are valid'}`);
} else {
  help();
}

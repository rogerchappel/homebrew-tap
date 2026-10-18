import fs from 'node:fs';
import path from 'node:path';
import { commandFor, formulaClassName, formulaPath } from './catalog.mjs';
import { renderFormula } from './formula.mjs';

const namePattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

export function validateCatalog(catalog) {
  const errors = [];
  if (catalog.tap !== 'rogerchappel/homebrew-tap') errors.push('catalog.tap must be rogerchappel/homebrew-tap');
  const seen = new Set();
  for (const [index, tool] of (catalog.tools || []).entries()) {
    const label = tool?.name || `tool[${index}]`;
    if (!namePattern.test(tool.name || '')) errors.push(`${label}: formula name must be lowercase kebab-case`);
    if (seen.has(tool.name)) errors.push(`${label}: duplicate tool name`);
    seen.add(tool.name);
    if (!tool.repo?.startsWith('https://github.com/rogerchappel/')) errors.push(`${label}: repo must be a public rogerchappel GitHub HTTPS URL`);
    if (!Array.isArray(tool.bin) || tool.bin.length === 0) errors.push(`${label}: at least one bin command is required`);
    if (!tool.bin?.every((name) => namePattern.test(name))) errors.push(`${label}: bin commands must be lowercase kebab-case`);
    if (!Array.isArray(tool.build) || tool.build.length === 0) errors.push(`${label}: at least one build command is required`);
    if (!Array.isArray(tool.install) || tool.install.length === 0) errors.push(`${label}: at least one install path is required`);
    if (tool.binPath && path.isAbsolute(tool.binPath)) errors.push(`${label}: binPath must be package-relative`);
    if (tool.binPath?.includes('..')) errors.push(`${label}: binPath must not escape the package root`);
    if (tool.status !== 'head-only') errors.push(`${label}: only head-only formulae are allowed until releases and checksums exist`);
    if ('sha256' in tool || 'bottle' in tool || 'url' in tool) errors.push(`${label}: catalog must not claim release URLs, checksums, or bottles`);
    if (!tool.caveat?.includes('HEAD')) errors.push(`${label}: caveat must clearly say HEAD/source install`);
  }
  return errors;
}

export function validateFormula(tool, root = process.cwd()) {
  const errors = [];
  const file = path.join(root, 'Formula', `${tool.name}.rb`);
  if (!fs.existsSync(file)) return [`${tool.name}: missing Formula/${tool.name}.rb`];
  const text = fs.readFileSync(file, 'utf8');
  const expected = renderFormula(tool).trim();
  if (text.trim() !== expected) errors.push(`${tool.name}: formula is not in sync with catalog generator`);
  if (!text.includes(`class ${formulaClassName(tool.name)} < Formula`)) errors.push(`${tool.name}: formula class name mismatch`);
  if (!text.includes(`head "${tool.repo}.git", branch: "main"`)) errors.push(`${tool.name}: formula must use safe HEAD source URL`);
  if (/sha256|bottle do|url "/i.test(text)) errors.push(`${tool.name}: formula must not claim release URLs, checksums, or bottles yet`);
  if (!text.includes('depends_on "node"')) errors.push(`${tool.name}: node dependency missing`);
  return errors;
}

export function validateFormulaInventory(catalog, root = process.cwd()) {
  const formulaDirectory = path.join(root, 'Formula');
  const catalogNames = new Set((catalog.tools || []).map((tool) => tool.name));
  return fs
    .readdirSync(formulaDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.rb'))
    .map((entry) => entry.name.slice(0, -3))
    .filter((name) => !catalogNames.has(name))
    .sort()
    .map((name) => `Formula/${name}.rb: no matching entry in catalog/tools.json`);
}

export function validateReadme(catalog, root = process.cwd()) {
  const errors = [];
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  for (const tool of catalog.tools) {
    if (!readme.includes(commandFor(tool))) errors.push(`${tool.name}: README missing install snippet`);
    if (!readme.includes(tool.summary)) errors.push(`${tool.name}: README missing summary`);
  }
  if (!readme.includes('brew tap rogerchappel/tap')) errors.push('README missing tap command');
  if (/sha256:\s*[a-f0-9]{20,}|bottle do/i.test(readme)) errors.push('README must not claim concrete checksums or bottles');
  return errors;
}

export function buildModeLabel(build) {
  if (!Array.isArray(build)) return '';
  if (build.some((command) => command.startsWith('pnpm'))) return 'pnpm build';
  if (build.includes('npm run build')) return 'npm ci + npm run build';
  return build.join('; ');
}

export function validateToolCatalog(catalog, root = process.cwd()) {
  const errors = [];
  const file = path.join(root, 'docs', 'tool-catalog.md');
  if (!fs.existsSync(file)) return ['docs/tool-catalog.md is missing'];
  const rows = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.startsWith('| ---') && !line.startsWith('| Tool'))
    .map((line) => line.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim().replace(/^`|`$/g, '')));
  for (const tool of catalog.tools || []) {
    const row = rows.find((cells) => cells[0] === tool.name);
    if (!row) {
      errors.push(`${tool.name}: docs/tool-catalog.md missing row`);
      continue;
    }
    if (row[1] !== tool.binPath) errors.push(`${tool.name}: docs/tool-catalog.md entrypoint "${row[1]}" does not match catalog binPath "${tool.binPath}"`);
    const expected = buildModeLabel(tool.build);
    if (row[2] !== expected) errors.push(`${tool.name}: docs/tool-catalog.md build mode "${row[2]}" does not match catalog build "${expected}"`);
  }
  return errors;
}

export function validateAll(catalog, root = process.cwd()) {
  return [
    ...validateCatalog(catalog),
    ...validateFormulaInventory(catalog, root),
    ...catalog.tools.flatMap((tool) => validateFormula(tool, root)),
    ...validateReadme(catalog, root),
    ...validateToolCatalog(catalog, root)
  ];
}

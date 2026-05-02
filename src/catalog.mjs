import fs from 'node:fs';
import path from 'node:path';

export const rootDir = path.resolve(new URL('..', import.meta.url).pathname);
export const catalogPath = path.join(rootDir, 'catalog', 'tools.json');

export function loadCatalog(file = catalogPath) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function formulaClassName(name) {
  return name.split(/[-_]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

export function formulaPath(name) {
  return path.join(rootDir, 'Formula', `${name}.rb`);
}

export function commandFor(tool) {
  return `brew install --HEAD rogerchappel/tap/${tool.name}`;
}

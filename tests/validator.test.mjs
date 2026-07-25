import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../src/catalog.mjs';
import { renderFormula } from '../src/formula.mjs';
import { validateCatalog, validateReadme, validateAll } from '../src/validate.mjs';

const catalog = loadCatalog();

test('catalog contains curated HEAD-only tools', () => {
  assert.equal(catalog.tap, 'rogerchappel/homebrew-tap');
  assert.ok(catalog.tools.length >= 6);
  assert.ok(catalog.tools.every((tool) => tool.status === 'head-only'));
});

test('catalog validator rejects invented release claims', () => {
  const broken = structuredClone(catalog);
  broken.tools[0].status = 'released';
  broken.tools[0].sha256 = 'not-real';
  const errors = validateCatalog(broken);
  assert.ok(errors.some((error) => error.includes('only head-only')));
  assert.ok(errors.some((error) => error.includes('checksums')));
});

test('catalog validator requires formula build and install metadata', () => {
  const broken = structuredClone(catalog);
  broken.tools[0].build = [];
  broken.tools[0].install = [];
  const errors = validateCatalog(broken);
  assert.ok(errors.some((error) => error.includes('at least one build command')));
  assert.ok(errors.some((error) => error.includes('at least one install path')));
});

test('catalog validator rejects unsafe bin path metadata', () => {
  const broken = structuredClone(catalog);
  broken.tools[0].bin = ['StackForge'];
  broken.tools[0].binPath = '../dist/index.js';
  const errors = validateCatalog(broken);
  assert.ok(errors.some((error) => error.includes('bin commands must be lowercase kebab-case')));
  assert.ok(errors.some((error) => error.includes('binPath must not escape')));
});

test('formula renderer emits safe source formula', () => {
  const text = renderFormula(catalog.tools[0]);
  assert.match(text, /head "https:\/\/github.com\/rogerchappel\//);
  assert.doesNotMatch(text, /sha256|bottle do|url "/i);
  assert.match(text, /depends_on "node"/);
});

test('formula renderer only adds pnpm when the build uses it', () => {
  assert.match(renderFormula(catalog.tools.find((tool) => tool.name === 'stackforge')), /depends_on "pnpm" => :build/);
  assert.doesNotMatch(renderFormula(catalog.tools.find((tool) => tool.name === 'branchbrief')), /depends_on "pnpm"/);
});

test('formula renderer expects --help to exit successfully', () => {
  const text = renderFormula(catalog.tools[0]);
  assert.match(text, /chmod 0755, libexec\/"dist\/index\.js"/);
  assert.match(text, /shell_output\("#\{bin\}\/stackforge --help 2>&1"\)/);
  assert.doesNotMatch(text, /shell_output\([^)]*,\s*2\)/);
});

test('repository validates cleanly', () => {
  assert.deepEqual(validateAll(catalog), []);
});

test('README validator enforces every formula install snippet', () => {
  const broken = structuredClone(catalog);
  broken.tools[0].name = 'missing-tool';
  const errors = validateReadme(broken);
  assert.ok(errors.some((error) => error.includes('missing-tool: README missing install snippet')));
});

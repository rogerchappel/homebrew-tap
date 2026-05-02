import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../src/catalog.mjs';
import { renderFormula } from '../src/formula.mjs';
import { validateCatalog, validateAll } from '../src/validate.mjs';

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

test('formula renderer emits safe source formula', () => {
  const text = renderFormula(catalog.tools[0]);
  assert.match(text, /head "https:\/\/github.com\/rogerchappel\//);
  assert.doesNotMatch(text, /sha256|bottle do|url "/i);
  assert.match(text, /depends_on "node"/);
});

test('repository validates cleanly', () => {
  assert.deepEqual(validateAll(catalog), []);
});

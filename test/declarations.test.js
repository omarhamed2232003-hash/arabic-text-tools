import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as api from '../src/index.js';

const read = async (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('every exported function is declared in index.d.ts', async () => {
  const declarations = await read('../src/index.d.ts');
  const declared = new Set([...declarations.matchAll(/export function (\w+)/g)].map((m) => m[1]));
  const exported = Object.keys(api).filter((name) => typeof api[name] === 'function');

  assert.ok(exported.length > 0, 'the entry point exports nothing');
  for (const name of exported) {
    assert.ok(declared.has(name), `${name} is exported but not declared in index.d.ts`);
  }
  for (const name of declared) {
    assert.ok(name in api, `${name} is declared but not exported`);
  }
});

test('package.json points at the declarations', async () => {
  const pkg = JSON.parse(await read('../package.json'));
  assert.equal(pkg.types, './src/index.d.ts');
});

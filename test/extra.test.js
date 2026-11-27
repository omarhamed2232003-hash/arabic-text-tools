import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { normalizeArabic, sameArabicWord } from '../src/normalize.js';
import { formatWithSeparators, parseArabicNumber } from '../src/format.js';

const cli = fileURLToPath(new URL('../bin/tafqeet.js', import.meta.url));

test('normalizeArabic unifies alef, yeh and teh marbuta forms', () => {
  assert.equal(normalizeArabic('أحمد'), 'احمد');
  assert.equal(normalizeArabic('إبراهيم'), 'ابراهيم');
  assert.equal(normalizeArabic('مدرسة'), 'مدرسه');
  assert.equal(normalizeArabic('مُصطفى'), 'مصطفي');
});

test('sameArabicWord compares after normalisation', () => {
  assert.equal(sameArabicWord('أحمد', 'احمد'), true);
  assert.equal(sameArabicWord('كتاب', 'قلم'), false);
});

test('formatWithSeparators groups thousands', () => {
  assert.equal(formatWithSeparators(1234567), '1,234,567');
  assert.equal(formatWithSeparators(-9876.5), '-9,876.5');
  assert.equal(formatWithSeparators(999), '999');
  assert.equal(formatWithSeparators(1234, '.'), '1.234');
});

test('parseArabicNumber reads Arabic-Indic digits and separators', () => {
  assert.equal(parseArabicNumber('١٢٣٤'), 1234);
  assert.equal(parseArabicNumber('١٢٣٤٫٥'), 1234.5);
  assert.equal(parseArabicNumber('١٬٢٣٤'), 1234);
  assert.ok(Number.isNaN(parseArabicNumber('')));
  assert.ok(Number.isNaN(parseArabicNumber('نص')));
});

test('the CLI prints tafqeet and plain words', () => {
  assert.equal(execFileSync('node', [cli, '1250.5'], { encoding: 'utf8' }).trim(),
    'ألف ومئتان وخمسون جنيهًا وخمسون قرشًا فقط');
  assert.equal(execFileSync('node', [cli, '--words', '1234'], { encoding: 'utf8' }).trim(),
    'ألف ومئتان وأربعة وثلاثون');
});

test('the CLI rejects a missing or non-numeric argument', () => {
  assert.throws(() => execFileSync('node', [cli], { encoding: 'utf8', stdio: 'pipe' }), /Command failed/);
  assert.throws(() => execFileSync('node', [cli, 'abc'], { encoding: 'utf8', stdio: 'pipe' }), /Command failed/);
});

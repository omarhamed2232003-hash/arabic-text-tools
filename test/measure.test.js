import test from 'node:test';
import assert from 'node:assert/strict';
import { textStats, containsArabic, truncateArabic } from '../src/measure.js';
import { formatEgp } from '../src/currency.js';

test('textStats counts words, sentences and Arabic presence', () => {
  const stats = textStats('الفاتورة صحيحة. الشكر لله!');
  assert.equal(stats.words, 4);
  assert.equal(stats.sentences, 2);
  assert.equal(stats.hasArabic, true);
  assert.equal(textStats('hello world').hasArabic, false);
  assert.deepEqual(textStats(''), { chars: 0, charsNoSpaces: 0, words: 0, sentences: 0, hasArabic: false });
});

test('containsArabic finds Arabic letters only', () => {
  assert.equal(containsArabic('١٢٣'), true);
  assert.equal(containsArabic('123 abc'), false);
});

test('truncateArabic cuts on a word boundary and marks the cut', () => {
  const text = 'إجمالي الفاتورة شامل ضريبة القيمة المضافة';
  const short = truncateArabic(text, 20);
  assert.ok(short.endsWith('…'));
  assert.ok(short.length <= 21);
  assert.ok(!short.includes('  '));
  assert.equal(truncateArabic('قصير', 20), 'قصير');
  assert.throws(() => truncateArabic('نص', 0), RangeError);
});

test('formatEgp formats pounds with separators and optional Arabic digits', () => {
  assert.equal(formatEgp(1250.5), '1,250.50 ج.م');
  assert.equal(formatEgp(-40), '-40.00 ج.م');
  assert.equal(formatEgp(1234567.891), '1,234,567.89 ج.م');
  assert.equal(formatEgp(12, { arabicDigits: true }), '١٢.٠٠ ج.م');
  assert.equal(formatEgp('12'), null);
  assert.equal(formatEgp(Number.NaN), null);
});

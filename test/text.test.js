import test from 'node:test';
import assert from 'node:assert/strict';
import { toWesternDigits, toArabicIndicDigits } from '../src/numerals.js';
import { stripTashkeel } from '../src/tashkeel.js';
import { francoToArabic } from '../src/franco.js';

test('Arabic-Indic digits convert to Western digits', () => {
  assert.equal(toWesternDigits('١٢٣'), '123');
  assert.equal(toWesternDigits('۰۱۲'), '012');
  assert.equal(toWesternDigits('سعر ٢٥ جنيهًا'), 'سعر 25 جنيهًا');
});

test('Western digits convert to Arabic-Indic digits', () => {
  assert.equal(toArabicIndicDigits('123'), '١٢٣');
  assert.equal(toArabicIndicDigits('فاتورة 7'), 'فاتورة ٧');
});

test('tashkeel and tatweel are removed', () => {
  assert.equal(stripTashkeel('مُحَمَّد'), 'محمد');
  assert.equal(stripTashkeel('كـــتاب'), 'كتاب');
  assert.equal(stripTashkeel('  نص   بمسافات  '), 'نص بمسافات');
});

test('franco letters and digits map to Arabic script', () => {
  assert.equal(francoToArabic('3arabi'), 'عارابي');
  assert.equal(francoToArabic('2'), 'ء');
});

test('unmapped Latin letters are kept by default and can be dropped', () => {
  assert.equal(francoToArabic('abc'), 'ابك');
  assert.equal(francoToArabic('x1y', { keepLatin: true }), 'كس1ي');
  assert.equal(francoToArabic('Hello', { keepLatin: false }), 'هيللو');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { numberToArabicWords, tafqeetEgp } from '../src/tafqeet.js';

test('single digits and zero', () => {
  assert.equal(numberToArabicWords(0), 'صفر');
  assert.equal(numberToArabicWords(1), 'واحد');
  assert.equal(numberToArabicWords(9), 'تسعة');
});

test('teens and tens', () => {
  assert.equal(numberToArabicWords(11), 'أحد عشر');
  assert.equal(numberToArabicWords(19), 'تسعة عشر');
  assert.equal(numberToArabicWords(20), 'عشرون');
  assert.equal(numberToArabicWords(21), 'واحد وعشرون');
  assert.equal(numberToArabicWords(99), 'تسعة وتسعون');
});

test('hundreds join with و', () => {
  assert.equal(numberToArabicWords(100), 'مئة');
  assert.equal(numberToArabicWords(200), 'مئتان');
  assert.equal(numberToArabicWords(234), 'مئتان وأربعة وثلاثون');
  assert.equal(numberToArabicWords(999), 'تسعمئة وتسعة وتسعون');
});

test('thousands use dual and plural forms', () => {
  assert.equal(numberToArabicWords(1000), 'ألف');
  assert.equal(numberToArabicWords(2000), 'ألفان');
  assert.equal(numberToArabicWords(3000), 'ثلاثة آلاف');
  assert.equal(numberToArabicWords(12000), 'اثنا عشر ألف');
  assert.equal(numberToArabicWords(2500), 'ألفان وخمسمئة');
  assert.equal(numberToArabicWords(1234), 'ألف ومئتان وأربعة وثلاثون');
});

test('millions use dual and plural forms', () => {
  assert.equal(numberToArabicWords(1_000_000), 'مليون');
  assert.equal(numberToArabicWords(2_000_000), 'مليونان');
  assert.equal(numberToArabicWords(4_000_000), 'أربعة ملايين');
  assert.equal(numberToArabicWords(1_234_567), 'مليون ومئتان وأربعة وثلاثون ألف وخمسمئة وسبعة وستون');
});

test('rejects negative, non-finite and out-of-range input', () => {
  assert.throws(() => numberToArabicWords(-1), RangeError);
  assert.throws(() => numberToArabicWords(Number.NaN), TypeError);
  assert.throws(() => numberToArabicWords(1_000_000_000), RangeError);
});

test('tafqeet formats pounds and piasters', () => {
  assert.equal(tafqeetEgp(1250), 'ألف ومئتان وخمسون جنيهًا فقط');
  assert.equal(tafqeetEgp(1250.5), 'ألف ومئتان وخمسون جنيهًا وخمسون قرشًا فقط');
  assert.equal(tafqeetEgp(0), 'صفر جنيه فقط');
  assert.equal(tafqeetEgp(0.75), 'خمسة وسبعون قرشًا فقط');
});

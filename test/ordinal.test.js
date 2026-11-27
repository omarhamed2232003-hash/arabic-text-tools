import test from 'node:test';
import assert from 'node:assert/strict';
import { toArabicOrdinal } from '../src/ordinal.js';

test('masculine ordinals 1-10', () => {
  assert.equal(toArabicOrdinal(1), 'الأول');
  assert.equal(toArabicOrdinal(3), 'الثالث');
  assert.equal(toArabicOrdinal(10), 'العاشر');
});

test('feminine ordinals 1-10', () => {
  assert.equal(toArabicOrdinal(1, { feminine: true }), 'الأولى');
  assert.equal(toArabicOrdinal(7, { feminine: true }), 'السابعة');
  assert.equal(toArabicOrdinal(10, { feminine: true }), 'العاشرة');
});

test('out-of-range values throw a RangeError', () => {
  assert.throws(() => toArabicOrdinal(0), RangeError);
  assert.throws(() => toArabicOrdinal(11), RangeError);
  assert.throws(() => toArabicOrdinal(2.5), RangeError);
});

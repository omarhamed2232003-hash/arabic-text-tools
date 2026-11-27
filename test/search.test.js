import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeForSearch, matchesArabicQuery } from '../src/search.js';

test('normalizeForSearch folds the letters people type differently', () => {
  assert.equal(normalizeForSearch('أَحْمَد'), normalizeForSearch('احمد'));
  assert.equal(normalizeForSearch('إسماعيل'), normalizeForSearch('اسماعيل'));
  assert.equal(normalizeForSearch('مدرسة'), normalizeForSearch('مدرسه'));
  assert.equal(normalizeForSearch('مصطفى'), normalizeForSearch('مصطفي'));
});

test('normalizeForSearch converts digits and drops punctuation', () => {
  assert.equal(normalizeForSearch('فاتورة ١٢٣'), 'فاتوره 123');
  assert.equal(normalizeForSearch('رقم: ٤٥٦، بتاريخ ٢٠٢٦'), 'رقم 456 بتاريخ 2026');
  assert.equal(normalizeForSearch('  ــنصــ  '), 'نص');
});

test('matchesArabicQuery ignores the variants and needs every word', () => {
  assert.equal(matchesArabicQuery('فاتورة ضريبية إلكترونية', 'الفاتوره الضريبيه'), false, 'extra word must not match');
  assert.equal(matchesArabicQuery('فاتورة ضريبية إلكترونية', 'فاتوره ضريبيه'), true);
  assert.equal(matchesArabicQuery('قرار ١٨٨ لسنة ٢٠٢٠', '188'), true);
  assert.equal(matchesArabicQuery('قرار ١٨٨ لسنة ٢٠٢٠', 'قرار 2020'), true);
  assert.equal(matchesArabicQuery('قرار ١٨٨ لسنة ٢٠٢٠', '518'), false);
});

test('an empty query matches nothing', () => {
  assert.equal(matchesArabicQuery('أي نص', ''), false);
  assert.equal(matchesArabicQuery('أي نص', '   '), false);
});

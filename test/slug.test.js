import test from 'node:test';
import assert from 'node:assert/strict';
import { arabicSlug, stripTatweel } from '../src/index.js';

test('an Arabic title becomes a readable Arabic slug', () => {
  assert.equal(arabicSlug('الفيزياء الحديثة'), 'الفيزياء-الحديثه');
});

test('punctuation and repeated spaces collapse to one dash', () => {
  assert.equal(arabicSlug('  الفيزياء:  الفصل الأول!  '), 'الفيزياء-الفصل-الاول');
});

test('spelling variants fold to the same slug', () => {
  assert.equal(arabicSlug('أسئلة'), arabicSlug('اسئله'));
});

test('tatweel and tashkeel are dropped', () => {
  assert.equal(stripTatweel('مـــاء'), 'ماء');
  assert.equal(arabicSlug('مُقَدِّمَة'), 'مقدمه');
});

test('Arabic-Indic digits become Western digits', () => {
  assert.equal(arabicSlug('امتحان ٢٠٢٦'), 'امتحان-2026');
});

test('mixed Arabic and Latin keeps both, lowercased', () => {
  assert.equal(arabicSlug('MCQ بنك أسئلة'), 'mcq-بنك-اسيله');
});

test('a string with no letters or digits gives an empty slug', () => {
  assert.equal(arabicSlug('!!! ...'), '');
  assert.equal(arabicSlug(''), '');
  assert.equal(arabicSlug(null), '');
});

test('maxLength cuts at a dash boundary instead of mid-word', () => {
  const full = arabicSlug('الفيزياء الحديثة للصف الثالث');
  const slug = arabicSlug('الفيزياء الحديثة للصف الثالث', { maxLength: 20 });
  assert.ok(slug.length <= 20);
  assert.ok(!slug.endsWith('-'));
  assert.ok(full.startsWith(slug), `${slug} is not a prefix of ${full}`);
  assert.equal(slug, 'الفيزياء-الحديثه');
});

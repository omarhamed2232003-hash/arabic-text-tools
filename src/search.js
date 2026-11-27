/**
 * Matching Arabic text the way people actually type it.
 *
 * Search boxes get أ / ا / إ / آ, ة / ه, ى / ي, and Arabic-Indic or Western
 * digits for the same query. These helpers fold those differences so a lookup
 * does not depend on which keyboard or habit the writer used.
 */

import { stripTashkeel } from './tashkeel.js';
import { toWesternDigits } from './numerals.js';

const FOLD = new Map([
  ['أ', 'ا'], ['إ', 'ا'], ['آ', 'ا'], ['ٱ', 'ا'],
  ['ة', 'ه'],
  ['ى', 'ي'], ['ئ', 'ي'], ['ؤ', 'و'],
]);

/**
 * Normalize text for comparison: tashkeel and tatweel removed, letter variants
 * folded, digits converted to Western, punctuation collapsed to spaces.
 */
export function normalizeForSearch(text) {
  const base = toWesternDigits(stripTashkeel(String(text ?? '')));
  return base
    .replace(/[أإآٱ]/g, (letter) => FOLD.get(letter))
    .replace(/[ةىئؤ]/g, (letter) => FOLD.get(letter))
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .toLowerCase();
}

/**
 * True when every word of the query appears in the text after normalization.
 * An empty query matches nothing, so a search box that is still empty does not
 * claim the whole list.
 */
export function matchesArabicQuery(text, query) {
  const needle = normalizeForSearch(query);
  if (needle === '') return false;
  const haystack = normalizeForSearch(text);
  return needle.split(' ').every((word) => haystack.includes(word));
}

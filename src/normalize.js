/**
 * Aggressive Arabic normalisation for search and comparison.
 *
 * This is deliberately lossy: it unifies the alef forms, yeh/alef maqsura and
 * teh marbuta, and drops tashkeel, so that two spellings of the same word
 * compare equal. Do not use it for display text.
 */

import { stripTashkeel } from './tashkeel.js';

const MAP = {
  'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا',
  'ى': 'ي', 'ئ': 'ي', 'ؤ': 'و',
  'ة': 'ه',
};

/** Normalise Arabic text for comparison: unify alef/yeh/teh-marbuta forms and strip tashkeel. */
export function normalizeArabic(text) {
  const withoutTashkeel = stripTashkeel(text);
  return withoutTashkeel.replace(/[أإآٱىئؤة]/g, (char) => MAP[char] ?? char);
}

/** True when two strings are equal after normalisation. */
export function sameArabicWord(a, b) {
  return normalizeArabic(a) === normalizeArabic(b);
}

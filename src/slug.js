/**
 * URL slugs that keep Arabic readable.
 *
 * A slug built from Arabic text should stay Arabic: transliterating it to Latin
 * loses the words, and percent-encoding the raw text produces a long, unstable
 * string. This keeps the letters, folds the spelling variants that would
 * otherwise make two identical titles produce two different slugs, and replaces
 * everything else with a single dash.
 */

import { stripTashkeel } from './tashkeel.js';
import { normalizeArabic } from './normalize.js';
import { toWesternDigits } from './numerals.js';

/** Remove tatweel (kashida), the decorative letter-stretching character. */
export function stripTatweel(text) {
  return String(text ?? '').replace(/\u0640/g, '');
}

/**
 * Build a URL-safe slug from Arabic, Latin or mixed text.
 *
 * @param {string} text
 * @param {{ maxLength?: number }} [options] truncate at a dash boundary
 * @returns {string}
 */
export function arabicSlug(text, options = {}) {
  const maxLength = Number.isInteger(options.maxLength) && options.maxLength > 0 ? options.maxLength : 0;

  const folded = toWesternDigits(normalizeArabic(stripTatweel(String(text ?? ''))))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  if (maxLength === 0 || folded.length <= maxLength) return folded;

  const cut = folded.slice(0, maxLength);
  const lastDash = cut.lastIndexOf('-');
  const trimmed = (lastDash > 0 ? cut.slice(0, lastDash) : cut).replace(/-+$/, '');
  return trimmed;
}

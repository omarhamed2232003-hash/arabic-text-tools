/** Digit grouping and Arabic-number parsing helpers. */

import { toWesternDigits } from './numerals.js';

/** Group a number's integer part with thousands separators: 1234567 -> "1,234,567". */
export function formatWithSeparators(value, separator = ',') {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError('formatWithSeparators needs a finite number');
  const sign = number < 0 ? '-' : '';
  const [integer, fraction] = Math.abs(number).toString().split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${sign}${grouped}${fraction ? `.${fraction}` : ''}`;
}

/**
 * Parse a number written with Arabic-Indic digits, the Arabic decimal
 * separator (٫) or the Arabic thousands separator (٬). Returns NaN when it
 * cannot parse.
 */
export function parseArabicNumber(text) {
  const cleaned = toWesternDigits(String(text))
    .replace(/٬/g, '')
    .replace(/٫/g, '.')
    .replace(/[,\s]/g, '')
    .trim();
  if (cleaned === '') return Number.NaN;
  return Number(cleaned);
}

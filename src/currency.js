/** Egyptian pound formatting for invoice and paperwork output. */

import { toArabicIndicDigits } from './numerals.js';

const withSeparators = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * Formats an amount as Egyptian pounds with two decimals and thousands separators.
 * Returns null for anything that is not a finite number, so callers can decide
 * what to show instead of printing NaN on a document.
 */
export function formatEgp(amount, options = {}) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return null;
  const negative = amount < 0;
  const fixed = Math.abs(amount).toFixed(2);
  const [whole, fraction] = fixed.split('.');
  const text = `${negative ? '-' : ''}${withSeparators(whole)}.${fraction} ج.م`;
  return options.arabicDigits ? toArabicIndicDigits(text) : text;
}

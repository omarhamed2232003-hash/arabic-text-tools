/**
 * Arabic ordinals for the numbers 1 to 10.
 *
 * Only the first ten are handled on purpose: beyond ten Arabic uses the
 * cardinal number with a different construction, and guessing it would be
 * worse than saying the range is limited.
 */

const MASCULINE = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
const FEMININE = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة'];

/**
 * Ordinal word for 1-10.
 * @param {number} value
 * @param {{feminine?: boolean}} [options]
 */
export function toArabicOrdinal(value, options = {}) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > 10) {
    throw new RangeError('toArabicOrdinal handles the numbers 1 to 10 only');
  }
  return (options.feminine ? FEMININE : MASCULINE)[number - 1];
}

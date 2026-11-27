/** Public entry point for arabic-text-tools. */
export { numberToArabicWords, tafqeetEgp } from './tafqeet.js';
export { toWesternDigits, toArabicIndicDigits } from './numerals.js';
export { stripTashkeel } from './tashkeel.js';
export { francoToArabic } from './franco.js';
export { normalizeArabic, sameArabicWord } from './normalize.js';
export { formatWithSeparators, parseArabicNumber } from './format.js';
export { toArabicOrdinal } from './ordinal.js';
export { textStats, containsArabic, truncateArabic } from './measure.js';
export { formatEgp } from './currency.js';
export { normalizeForSearch, matchesArabicQuery } from './search.js';
export { arabicSlug, stripTatweel } from './slug.js';

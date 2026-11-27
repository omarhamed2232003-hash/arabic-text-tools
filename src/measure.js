/** Text measurement and trimming helpers that understand Arabic text. */

const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F]/;

/**
 * Counts what a form or a UI label usually needs to know about a piece of text.
 * Words are split on whitespace; sentences on the Arabic and Latin sentence marks.
 */
export function textStats(text) {
  const value = String(text ?? '');
  const words = value.trim() === '' ? [] : value.trim().split(/\s+/);
  const sentences = value.split(/[.!?؟\n]+/).map((part) => part.trim()).filter(Boolean);
  return {
    chars: value.length,
    charsNoSpaces: value.replace(/\s/g, '').length,
    words: words.length,
    sentences: sentences.length,
    hasArabic: ARABIC_RANGE.test(value),
  };
}

export function containsArabic(text) {
  return ARABIC_RANGE.test(String(text ?? ''));
}

/**
 * Cuts text to a maximum length without splitting a word in the middle, and
 * marks the cut. Arabic words are short, so the look-back window stays small.
 */
export function truncateArabic(text, maxChars, suffix = '…') {
  const value = String(text ?? '');
  if (!Number.isInteger(maxChars) || maxChars <= 0) {
    throw new RangeError('maxChars must be a positive integer');
  }
  if (value.length <= maxChars) return value;
  const cut = value.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(' ');
  const head = lastSpace > maxChars - 15 ? cut.slice(0, lastSpace) : cut;
  return `${head.trimEnd()}${suffix}`;
}

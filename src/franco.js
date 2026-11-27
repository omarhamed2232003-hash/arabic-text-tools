/**
 * Franco-Arabic (Latin letters and digits used for Arabic chat) to Arabic script.
 *
 * This is a best-effort converter, not a translator: it maps the letters and
 * digits that Franco-Arabic conventionally uses, leaves other Latin letters as
 * they are, and does not try to guess missing vowels.
 */

const DIGITS = { '2': 'ء', '3': 'ع', '5': 'خ', '6': 'ط', '7': 'ح', '8': 'ق', '9': 'ص' };
const LETTERS = {
  a: 'ا', b: 'ب', c: 'ك', d: 'د', e: 'ي', f: 'ف', g: 'ج', h: 'ه', i: 'ي', j: 'ج',
  k: 'ك', l: 'ل', m: 'م', n: 'ن', o: 'و', p: 'ب', q: 'ق', r: 'ر', s: 'س', t: 'ت',
  u: 'و', v: 'ف', w: 'و', x: 'كس', y: 'ي', z: 'ز',
};

/**
 * Convert a Franco-Arabic string to Arabic script.
 * @param {string} text
 * @param {{ keepLatin?: boolean }} [options] keepLatin leaves unmapped Latin letters in place
 */
export function francoToArabic(text, options = {}) {
  const { keepLatin = true } = options;
  return String(text)
    .split('')
    .map((char) => {
      const lower = char.toLowerCase();
      if (DIGITS[lower]) return DIGITS[lower];
      if (LETTERS[lower]) return LETTERS[lower];
      if (/[a-z]/i.test(char)) return keepLatin ? char : '';
      return char;
    })
    .join('');
}

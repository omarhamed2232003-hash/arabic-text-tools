/**
 * Number to Arabic words (tafqeet), and EGP amounts for invoices and cheques.
 *
 * The spelling follows the common Egyptian invoice convention: groups are
 * joined with "و", thousands and millions use their dual and plural forms,
 * and an amount closes with "فقط" (only).
 */

const ONES = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
const TEENS = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
const TENS = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
const HUNDREDS = ['', 'مئة', 'مئتان', 'ثلاثمئة', 'أربعمئة', 'خمسمئة', 'ستمئة', 'سبعمئة', 'ثمانمئة', 'تسعمئة'];

/** Words for 0-999. */
function underThousand(value) {
  const parts = [];
  const hundreds = Math.floor(value / 100);
  const rest = value % 100;
  if (hundreds > 0) parts.push(HUNDREDS[hundreds]);
  if (rest > 0) {
    if (rest < 10) parts.push(ONES[rest]);
    else if (rest < 20) parts.push(TEENS[rest - 10]);
    else {
      const ones = rest % 10;
      const tens = Math.floor(rest / 10);
      parts.push(ones > 0 ? `${ONES[ones]} و${TENS[tens]}` : TENS[tens]);
    }
  }
  return parts.join(' و');
}

/** Words for a whole non-negative integer up to 999,999,999. */
export function numberToArabicWords(input) {
  const value = Math.trunc(Number(input));
  if (!Number.isFinite(value)) throw new TypeError('numberToArabicWords needs a finite number');
  if (value < 0) throw new RangeError('numberToArabicWords handles non-negative numbers only');
  if (value > 999_999_999) throw new RangeError('numberToArabicWords handles numbers below one billion');
  if (value === 0) return 'صفر';

  const groups = [
    { size: 1_000_000, one: 'مليون', two: 'مليونان', few: 'ملايين' },
    { size: 1_000, one: 'ألف', two: 'ألفان', few: 'آلاف' },
  ];
  const parts = [];
  let rest = value;

  for (const group of groups) {
    const count = Math.floor(rest / group.size);
    rest %= group.size;
    if (count === 0) continue;
    if (count === 1) parts.push(group.one);
    else if (count === 2) parts.push(group.two);
    else if (count <= 10) parts.push(`${underThousand(count)} ${group.few}`);
    else parts.push(`${underThousand(count)} ${group.one}`);
  }
  if (rest > 0) parts.push(underThousand(rest));
  return parts.join(' و');
}

/**
 * Format an EGP amount: "ألف ومئتان وخمسون جنيهًا وسبعون قرشًا فقط".
 * The piaster part is dropped when it is zero.
 */
export function tafqeetEgp(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) throw new TypeError('tafqeetEgp needs a finite number');
  if (value < 0) throw new RangeError('tafqeetEgp handles non-negative amounts only');
  const piastersTotal = Math.round(value * 100);
  const pounds = Math.floor(piastersTotal / 100);
  const piasters = piastersTotal % 100;

  const parts = [];
  if (pounds > 0) parts.push(`${numberToArabicWords(pounds)} جنيهًا`);
  if (piasters > 0) parts.push(`${numberToArabicWords(piasters)} قرشًا`);
  if (parts.length === 0) return 'صفر جنيه فقط';
  return `${parts.join(' و')} فقط`;
}

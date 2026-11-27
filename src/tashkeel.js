/** Arabic diacritics (tashkeel) and the tatweel used for letter stretching. */
const DIACRITICS = /[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed\u0640]/g;

/** Remove tashkeel and tatweel, keeping the letters themselves. */
export function stripTashkeel(text) {
  return String(text).replace(DIACRITICS, '').replace(/\s+/g, ' ').trim();
}

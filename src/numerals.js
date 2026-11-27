/** Convert Arabic-Indic (٠١٢) and Eastern Arabic-Indic (۰۱۲) digits to Western digits. */
export function toWesternDigits(text) {
  return String(text).replace(/[٠-٩۰-۹]/g, (digit) => {
    const code = digit.codePointAt(0);
    const zero = code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - zero);
  });
}

/** Convert Western digits to Arabic-Indic digits (٠١٢...). */
export function toArabicIndicDigits(text) {
  return String(text).replace(/[0-9]/g, (digit) => String.fromCodePoint(0x0660 + Number(digit)));
}

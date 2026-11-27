/**
 * Type declarations for arabic-text-tools.
 *
 * The runtime accepts anything and coerces it with String(), but these types
 * describe the intended use: pass a string, get a string back.
 */

export interface FrancoOptions {
  /** Leave unmapped Latin letters in place instead of dropping them. */
  keepLatin?: boolean;
}

export interface EgpOptions {
  /** Render the result in Arabic-Indic digits. */
  arabicDigits?: boolean;
}

export interface OrdinalOptions {
  /** Use the feminine form (الأولى … العاشرة). */
  feminine?: boolean;
}

export interface SlugOptions {
  /** Cut at a dash boundary rather than mid-word. */
  maxLength?: number;
}

export interface TextStats {
  chars: number;
  charsNoSpaces: number;
  words: number;
  sentences: number;
  hasArabic: boolean;
}

/** Whole numbers and decimals in Arabic words, with the currency name. */
export function numberToArabicWords(input: number | string): string;
/** An amount in Egyptian pounds, spelled out. */
export function tafqeetEgp(amount: number): string;

/** Arabic-Indic digits to 0-9. */
export function toWesternDigits(text: string): string;
/** 0-9 to Arabic-Indic digits. */
export function toArabicIndicDigits(text: string): string;

/** Remove tashkeel and tatweel and collapse repeated spaces. */
export function stripTashkeel(text: string): string;
/** Remove tatweel only, keeping tashkeel. */
export function stripTatweel(text: string): string;

/** Convert Franco-Arabic (3arabi) to Arabic script. */
export function francoToArabic(text: string, options?: FrancoOptions): string;

/** Fold spelling variants for comparison. Lossy by design: never for display. */
export function normalizeArabic(text: string): string;
/** Compare two words after normalization. */
export function sameArabicWord(a: string, b: string): boolean;

/** Thousands separators. */
export function formatWithSeparators(value: number | string, separator?: string): string;
/** Read a number written with Arabic-Indic digits and separators; NaN when empty. */
export function parseArabicNumber(text: string): number;

/** Ordinal word for 1-10; throws RangeError outside that range. */
export function toArabicOrdinal(value: number, options?: OrdinalOptions): string;

/** Character, word and sentence counts, plus whether any Arabic is present. */
export function textStats(text: string): TextStats;
export function containsArabic(text: string): boolean;
/** Cut to maxChars at a word boundary, appending the suffix. */
export function truncateArabic(text: string, maxChars: number, suffix?: string): string;

/** Format an amount in Egyptian pounds; null when the input is not a finite number. */
export function formatEgp(amount: number, options?: EgpOptions): string | null;

/** Normalize for search: folds variants and digits, collapses whitespace. */
export function normalizeForSearch(text: string): string;
/** Every query word must appear in the text; an empty query matches nothing. */
export function matchesArabicQuery(text: string, query: string): boolean;

/** A URL slug that keeps Arabic readable; optional truncation at a dash. */
export function arabicSlug(text: string, options?: SlugOptions): string;

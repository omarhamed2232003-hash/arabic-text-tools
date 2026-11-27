# Changelog

## 0.7.3

- `test/readme-covers-api.test.js`: every exported function must be named in the
  README, so a new helper cannot ship undocumented.
## 0.7.2

- `test/docs-links.test.js`: every relative link in the documentation must point
  at a file that exists. Tests 40/40.
## 0.7.1

- `CONTRIBUTING.md`: how to add a helper (module, export, declaration, tests,
  README limits in the same commit) and what will not be accepted.
- CI matrix now runs Node 20, 22 and 24.
## 0.7.0

- Type declarations in `src/index.d.ts`, referenced from `package.json` as
  `types`, so TypeScript users do not need a separate `@types` package. Every
  exported function has a signature and the option objects are named types.
- `test/declarations.test.js` fails if a function is exported without a
  declaration, or declared without an export. Tests 39/39.
## 0.6.1

- `RELEASE_CHECKLIST.md`: what has to happen before the first tag, split into
  before, at, and after, with the repository-specific gates underneath.
- `docs/RELEASE_NOTES_DRAFT.md`: draft first-release notes for Omar to read
  next to the README, including a plain "what it does not do" section. Draft
  only: nothing is tagged or published.
## 0.6.0

- `arabicSlug(text, { maxLength })`: a URL slug that keeps Arabic readable
  instead of transliterating or percent-encoding it. It folds spelling variants
  the same way `normalizeArabic` does, drops tashkeel and tatweel, converts
  Arabic-Indic digits, collapses punctuation to single dashes, and with
  `maxLength` cuts at a dash boundary rather than mid-word.
- `stripTatweel(text)`: the tatweel-only helper, useful on its own for display
  text where the aggressive normalisation would be wrong.
- Tests: 8 new (37 total), covering folding, punctuation, tatweel, digits,
  mixed Arabic/Latin, empty input and the truncation boundary.
## 0.5.0

- Add `normalizeForSearch` and `matchesArabicQuery` in `src/search.js`: fold
  alef/ya/ta variants, strip tashkeel and tatweel, convert Arabic-Indic digits,
  and match every query word. An empty query matches nothing on purpose.
## 0.4.0

- Add `textStats`, `containsArabic` and `truncateArabic` in `src/measure.js`.
- Add `formatEgp` in `src/currency.js` for pound amounts with separators and
  optional Arabic-Indic digits; returns null instead of NaN for bad input.

## 0.3.0 — 2026-11-27

- `toArabicOrdinal`: الترتيب بالحروف من الأول إلى العاشر، بصيغتي المذكر والمؤنث، مع رفض ما خارج النطاق بخطأ واضح.
- 3 اختبارات جديدة، والمجموع 21 اختبارًا.

## 0.2.0 — 2026-11-27

- `normalizeArabic` و`sameArabicWord`: توحيد الهمزات والألف المقصورة والتاء المربوطة وإزالة التشكيل، للمقارنة والبحث لا للعرض.
- `formatWithSeparators` و`parseArabicNumber`: فواصل الآلاف، وقراءة الأرقام العربية الهندية مع الفاصلة العشرية العربية (٫) وفاصل الآلاف (٬).
- سطر أوامر `tafqeet`: `npx arabic-text-tools 1250.5` أو `node bin/tafqeet.js --words 1234`.
- 18 اختبارًا بدل 12، وكلها تمر محليًا وعلى CI.

## 0.1.0 — 2026-11-27

- الإصدار الأول: `numberToArabicWords`، `tafqeetEgp`، `toWesternDigits`، `toArabicIndicDigits`، `stripTashkeel`، `francoToArabic`.
- 12 اختبارًا عبر `node:test`، بلا أي تبعيات.

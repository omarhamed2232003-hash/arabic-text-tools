# ملاحظات الإصدار — مسودة لمراجعة عمر

**الحالة: مسودة. لم يُنشر شيء ولم يُوسم إصدار.**

## ما هذا

أدوات نص عربي بلا أي تبعيات: تفقيط المبالغ بالحروف، تحويل الفرانكو إلى حروف عربية، تحويل الأرقام العربية الهندية، إزالة التشكيل والتطويل، قياس النص وتقطيعه، تنسيق مبالغ الجنيه، توحيد النص للبحث، وslug عربي يبقى مقروءًا في الرابط. تعمل كمكتبة وكسطر أوامر.

## English summary

A zero-dependency set of Arabic text helpers: number-to-words (tafqeet), Franco-Arabic to Arabic script, Arabic-Indic digit conversion, tashkeel and tatweel removal, text measurement and truncation, EGP formatting, search normalisation, and an Arabic-preserving URL slug.

## What it does not do

- **Normalisation is lossy on purpose.** `normalizeArabic` folds alef, ya and ta-marbuta variants and drops tashkeel, so it is for search and comparison, never for text you show a user.
- **Franco-Arabic is literal.** It maps the common letters and digits (2 ء, 3 ع, 5 خ, 6 ط, 7 ح, 8 ق, 9 ص). It does not guess vowels or correct spelling, and long text will come out imperfect.
- **Ordinals stop at ten.** `toArabicOrdinal` covers 1 to 10 by design, because beyond that the Arabic construction changes and a silent wrong answer is worse than a stated limit.
- No morphological analysis, no stemming, no diacritisation.

## Use

```bash
npm install arabic-text-tools
node bin/tafqeet.js --words 1234
```

MIT licensed. Node 20 or newer, no dependencies, no network access.

## For the published body

Keep the limits section. Someone will otherwise use `normalizeArabic` for display text and wonder why the hamza disappeared.

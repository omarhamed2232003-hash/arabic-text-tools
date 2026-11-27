# Changelog

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

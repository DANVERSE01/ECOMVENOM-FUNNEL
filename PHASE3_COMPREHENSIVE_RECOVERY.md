# خطة الإصلاح الشاملة – المرحلة الثالثة لمشروع ECOMVENOM

## ملخص المشاكل الحالية

بعد مراجعة المحادثة مع Claude، ملفات السجل (logs) والكود الحالي على الفرع `main`، تبين وجود مجموعة مشاكل لم تُحل بعد أو ظهرت بعد آخر محاولة إصلاح. 

| المشكلة | الدليل (ملف أو جزء من السجل) | السبب المرجح |
| --- | --- | --- |
| **الأزرار لا تستجيب أو لا تقوم بالتمرير** | `components/venom/GlowButton.tsx` مازال يستخدم `href="#founder-vsl"` بدون معالجة قوية للتنقل / تجنب تضارب `Lenis`; بالإضافة لعدم وجود `z-index` مناسب على عناصر الأزرار | عدم وجود معالجة كاملة للتنقل وعرض الأزرار خلف عناصر أخرى |
| **فيديو الـVSL لا يبدأ تلقائياً بالصوت أو لا يشتغل عند الضغط** | الملف `components/cinematic/WistiaPlayer.tsx` ينفذ تشغيل الـWistia باستخدام `_wq` فقط؛ قد يتوقف التشغيل التلقائي على بعض المتصفحات أو يظل الفيديو صامتاً للأبد. | عدم وجود fallback يضمن التشغيل حتى مع تحميل متأخر أو سياسة حظر التشغيل التلقائي |
| **مشكلات كبيرة فى العرض على الموبايل (مشهد سينمائى غير متمركز، فراغات، أزرار غير ظاهرة)** | ملفات CSS مثل `components/venom/cinematic-v2.css` لديها قيم `min-height`, `padding` و `flex` لا تتلاءم مع الشاشات الصغيرة؛ بالإضافة لعدم إضافة media queries كافية | غياب تصميم responsive لكل عناصر المشهد السينمائى |
| **الخطوط غير منسقة والسطور مقصوصة** | فى `cinematic-v2.css` تم ضبط `line-height` على قيم ضيقة مثل 0.98 مما يسبب قص الحروف؛ كذلك لم تتم معالجة Clip-path للـSplitText فى حالة فشل التحميل | استخدام line-height ضيق وعدم وجود margin padding يعالج القص |
| **الأسئلة المتكررة (FAQ) لا تتوسع بسلاسة** | عنصر `<details>` داخل FAQ يفتقر لانتقال سلس ولديه مشاكل فى `overflow` | عدم تطبيق انتقالات ارتفاع/شفافية على الفقرة داخل التفاصيل |
| **عدم وجود انتقالات وحركة احترافية** | ملفات الحركة فى `lib/motion.ts` تفتقد لإضافة parallax & ScrollTrigger لجميع العناصر؛ وأيضاً لا يوجد تأثيرات عمق أو إضاءة بين المقاطع | الاعتماد على أنيميشن واحدة وعدم إضافة طبقات حركة إضافية |
| **التباين بين نسخة الويب والموبايل** | فحص الملفات والصور يؤكد اختلاف كبير بين عرض الويب والموبايل فى مواضع العناصر ومرونة النصوص | غياب اختبار شامل على نقاط توقف مختلفة |

## خطة الإصلاح المقترحة

> **ملاحظة:** هذه الخطة مبنية على commit `81e7f10` وتفترض أن التعديلات السابقة موجودة. يجب تشغيل الخادم محلياً على `http://localhost:3000` وتسجيل لقطات شاشة بعد كل خطوة للتأكد من نجاح الإصلاح.

1. ### تحسين مكون الزر (GlowButton)
   - **المسار:** `components/venom/GlowButton.tsx`
   - **الإصلاح:**
     - استخدم `event.preventDefault()` ثم احصل على العنصر المستهدف بواسطة `document.getElementById()` بدلاً من `querySelector` فقط.
     - أضف حماية فى حالة عدم توفر `__lenis`، مع fall-back للتمرير بسلاسة عبر `window.scrollTo`.
     - قم بإضافة `position: relative; z-index: 20;` لفئة `.vx-actions` فى `tokens.css` لضمان بقاء الأزرار فوق أى محتوى آخر.

2. ### معالجة تشغيل الفيديو التلقائى بالكامل
   - **المسار:** `components/cinematic/WistiaPlayer.tsx`
   - **الإصلاح:**
     - داخل `useEffect`، بعد تحميل سكريبت Wistia، أنشئ متغيرًا فى `_wq` يقوم بتشغيل الفيديو ويقوم بكتم الصوت عند الجاهزية.
     - أضف polling باستخدام `setInterval` للعثور على عنصر `<wistia-player>` وإجبار `play()` حتى لو رفض الوعد الأولي نتيجة سياسات المتصفح.
     - أضف `seo="false"` و `playsinline="true"` داخل الوسم لضمان عدم ظهور صورة فقط.

3. ### جعل السينما (ScrollFilm) متجاوبة تمامًا
   - **المسار:** `components/venom/cinematic-v2.css`
   - **الإصلاح:**
     - ضمن نطاق `@media (max-width: 767px)`, اضبط `.v2-scroll-film--visual .v2-scroll-film__pin` على `display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; min-height: 80svh;` لضمان التمركز العمودى.
     - اضبط العنصر الذى يحتوى الفيديو (`.lusion-monitor-scene` أو `.v2-scroll-film__mobile`) ليأخذ `width: 100%; max-width: 22rem; margin: 0 auto;`.
     - تأكد من أن الفيديو نفسه يملك `width: 100%; aspect-ratio: 9/16; border-radius: 0.75rem; object-fit: cover;`.

4. ### تعديل الـLine-height والـTypography
   - **المسار:** `cinematic-v2.css`
   - **الإصلاح:**
     - غير `line-height` للعناوين الرئيسية إلى `1.05` (أو `1.12` على الموبايل)، مع إضافة `padding-block: 0.05em` و `overflow: visible` لتجنب قص الحروف.
     - أضف fallback فى `@media (prefers-reduced-motion: reduce)` لإظهار النص كاملاً بدون أنيميشن.

5. ### تحسين الـFAQ
   - **المسار:** `components/venom/tokens.css`
   - **الإصلاح:**
     - اجعل `.vx-faq` يمتلك `overflow: hidden` حتى لا يمتد المحتوى خارج الإطار.
     - أضف انتقالات سلسة للفقرات داخل `<details>` باستخدام `max-height` و`opacity` كما يلي:
       ```css
       .vx-faq p {
         margin: 0;
         overflow: hidden;
         max-height: 0;
         opacity: 0;
         padding: 0 1rem;
         transition: max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, padding 0.35s ease;
       }
       .vx-faq details[open] > p {
         max-height: 20rem;
         opacity: 1;
         padding: 0 1rem 1rem;
       }
       ```
     - أضف `cursor: pointer` على `summary` وغيّر لون الأيقونة عند الفتح.

6. ### إضافة حركات وعمق احترافية
   - **المسار:** `lib/motion.ts` و `components/effects/ScrollMotionInit.tsx`
   - **الإصلاح:**
     - إنشاء دالة `initScrollReveals` التى تبحث عن `[data-vx-reveal]` وتطبق `gsap.fromTo` مع `ScrollTrigger` على العناصر بحيث تظهر عند دخولها الشاشة.
     - تطبيق تأثير parallax على `.v2-hero__media` باستخدام `gsap.to` ومع `scrub: 1.5` للتدرج.
     - إنشاء ملف `ScrollMotionInit.tsx` ليستدعى الدالتين فى `useEffect`، وربطه داخل `app/layout.tsx` قبل مكونات المحتوى.
     - إضافة تأثير sheen أو خط لامع عند بداية كل قسم عن طريق CSS:`.vx-section--compact::before` مع keyframes لتحريك الخلفية.

7. ### اختبار شامل على كل أجهزة
   - شغّل `npm run build` ثم `npm run start` على بورت 3000.
   - استخدم متصفح حقيقي أو Playwright لزيارة الصفحات الأربعة: `/`, `/apply`, `/schedule`, `/confirmation` على 3 مقاسات (1440px، 768px، 390px).
   - التقط لقطات شاشة لكل قسم وتأكد من:
     - الأزرار تعمل وتنتقل للروابط الصحيحة.
     - الفيديوهات تعمل تلقائياً بالصوت عند اللزوم ويمكن كتمها/تشغيلها.
     - لا يوجد قص للخطوط أو تداخل نصوص.
     - كل الحركات تعمل بسلاسة، مع احترام `prefers-reduced-motion`.
     - لا يوجد تجاوز أفقي (overflow) أو تغيّرات مفاجئة فى التخطيط.

8. ### إجراءات النشر والتحقق
   - بعد التأكد من مرور `npm run typecheck` و `npm run build` بدون أخطاء:
     - نفذ `git add .` ثم `git commit -m "fix: phase 3 comprehensive recovery — final responsiveness & motion"`.
     - ادفع التعديلات: `git push origin main`.
     - تأكد من أن Netlify نشر الإصدار الجديد. إذا لم يحدث، استخدم Netlify CLI أو لوحة التحكم لنشر آخر deploy يدوياً.

## ملف التنفيذ لكلود كود

لإنجاز هذه الخطة من خلال Claude Code، يجب إنشاء ملف تعليمات موجز يحتوى على الخطوات السابقة بترتيب واضح. أنشئ الملف داخل مجلد العمل الجذرى `02_APP_BUILD_HERE` باسم `_PHASE3_COMPREHENSIVE_RECOVERY.md`. 

### محتوى الملف المقترح
```markdown
# Phase 3 Comprehensive Recovery – Build on commit 81e7f10

## التعليمات
- اقرأ الكود بالكامل ثم نفذ الخطوات بالترتيب. لا تسأل أى أسئلة.
- بعد كل تعديل، شغّل الخادم، التقط لقطات شاشة، وحقق من النجاح قبل الالتزام.

## الخطوات
1. حسّن مكون الزر فى `components/venom/GlowButton.tsx` وطبّق الـz-index فى CSS.
2. طوّر `WistiaPlayer.tsx` ليضمن التشغيل التلقائى للميديا على جميع المتصفحات، مع fallback polling.
3. عدّل `cinematic-v2.css` لجعل مشهد ScrollFilm متجاوب، وعدّل line-height للعناوين.
4. حسّن FAQ بإضافة انتقالات سلسة للفتح/الإغلاق.
5. أضف دوال الحركات الجديدة فى `lib/motion.ts` وأنشئ ملف `ScrollMotionInit.tsx`، ثم استخدمه فى `app/layout.tsx`.
6. حدّث CSS لإضافة sheen line بين الأقسام.
7. شغّل `npm run typecheck && npm run build` للتأكد من عدم وجود أخطاء.
8. شغّل الخادم، افحص جميع الصفحات على مقاسات 1440، 768، 390 بكسل، خذ لقطات شاشة وتحقق من كل عنصر، وعالج أى مشكلة تظهر فورًا.
9. عند اجتياز كل الاختبارات، التزم بالتعديلات ثم ادفع للفرع الرئيسى.

## شروط النجاح
- لا أى أخطاء TypeScript أو بناء.
- لا يوجد تجاوز عرض أو قص للنص.
- كل الأزرار تعمل بسلاسة.
- الفيديوهات تعمل تلقائياً بالصوت ويمكن التحكم فيها.
- الحركات سلسة ومناسبة للغرض.
- التوافق التام بين نسخة الويب والموبايل.
```

بعد إنشاء الملف، شغّل Claude Code فى مسار العمل واستخدم الأمر:
```powershell
Read _PHASE3_COMPREHENSIVE_RECOVERY.md and execute end-to-end without questions. Ensure every fix is visually verified on desktop and mobile. Commit and push only after all quality gates pass.
```

## قائمة التحقق النهائية
- [ ] فحص وإصلاح كل الأزرار.
- [ ] ضمان تشغيل الفيديوهات تلقائياً بالصوت.
- [ ] ضبط الـCSS للمشهد السينمائى على الموبايل.
- [ ] تعديل line-height للخطوط ومنع قصها.
- [ ] تحسين FAQ بانتقالات سلسة.
- [ ] تطبيق حركات parallax و ScrollTrigger جديدة.
- [ ] التقاط لقطات شاشة لكل صفحة على أحجام متعددة.
- [ ] التزام وتحديث الفرع الرئيسى.

## خطوات الرجوع (Rollback)
فى حال حدوث مشكلة بعد النشر، يمكن الرجوع إلى آخر نسخة مستقرة:
1. استخدم `git log` لتحديد رقم commit السابق (مثلاً `81e7f10`).
2. نفّذ `git revert <commit_hash>` لإنشاء revert commit يعيد التعديلات.
3. ادفع التغييرات إلى `origin/main`.
4. انشر من Netlify النسخة المستقرة السابقة إذا لزم الأمر.

"use client";

import { useLang } from "@/lib/lang-context";
import {
  CTA_LABEL as enCTA_LABEL,
  CTA_SUB as enCTA_SUB,
  hero as enHero,
  learn as enLearn,
  promise as enPromise,
  chaosToSystem as enChaosToSystem,
  curriculum as enCurriculum,
  graduationGift as enGraduationGift,
  beyond as enBeyond,
  testimonials as enTestimonials,
  faq as enFaq,
  founder as enFounder,
  schedule as enSchedule,
  confirmation as enConfirmation,
  footer as enFooter,
} from "@/lib/content";

type HeroHeadlineToken = {
  text: string;
  className?: string;
};

type HeroHeadlineLine = readonly HeroHeadlineToken[];

const enHeroHeadline: readonly HeroHeadlineLine[] = [
  [{ text: "BUILD" }, { text: "A" }],
  [{ text: "PROFITABLE", className: "text-venom" }, { text: "DROPSHIPPING" }],
  [{ text: "SYSTEM", className: "text-venom" }],
  [{ text: "IN" }, { text: "45" }, { text: "DAYS" }],
  [{ text: "ZERO", className: "text-venom" }, { text: "EXPERIENCE", className: "text-venom" }],
] as const;

const arHeroHeadline: readonly HeroHeadlineLine[] = [
  [{ text: "ابنِ" }],
  [{ text: "نظام", className: "text-venom" }, { text: "دروبشيبينغ" }, { text: "مربح", className: "text-venom" }],
  [{ text: "في" }, { text: "45", className: "text-venom" }, { text: "يوماً" }],
  [{ text: "بدون" }, { text: "أي خبرة", className: "text-venom" }, { text: "سابقة", className: "text-venom" }],
] as const;

const enProblem = {
  sceneTitle: "THE PROBLEM",
  eyebrow: "THE PROBLEM",
  headline: "Random inputs create expensive chaos.",
  body: "Most people who try dropshipping operate on guesswork. The system you're about to see replaces that chaos with a structured operating path.",
  signalLabel: "Signal",
  signalState: "Uncontrolled",
  signals: [
    { label: "Random tutorials", detail: "Hours of YouTube videos, contradicting advice, no clear path forward" },
    { label: "Random products", detail: "Testing blindly, burning budget on items nobody wants to buy" },
    { label: "Random ad spend", detail: "Money leaving your account with zero idea what's working or why" },
  ],
};

const arProblem = {
  sceneTitle: "المشكلة",
  eyebrow: "المشكلة",
  headline: "العشوائية تصنع فوضى تكلّفك الكثير.",
  body: "غالبية من يدخل مجال الدروبشيبينغ يعتمد على التخمين. النظام الذي ستكتشفه هنا يستبدل هذه الفوضى بمسار تشغيلي دقيق ومجرّب.",
  signalLabel: "إشارة",
  signalState: "غير مستقرة",
  signals: [
    { label: "دروس عشوائية وعامة", detail: "تضييع ساعات على يوتيوب في نصائح متناقضة بلا مسار واضح للتطبيق السليم." },
    { label: "اختبار منتجات بالحظ", detail: "إطلاق حملات عمياء وحرق الميزانية على منتجات لا يطلبها السوق فعلياً." },
    { label: "استنزاف الإعلانات", detail: "خروج الأموال من حسابك بدون أدنى فهم للمقاييس الناجحة أو أسباب الفشل." },
  ],
};

const enSystemScene = {
  sceneTitle: "THE SYSTEM",
  eyebrow: "THE SYSTEM",
  checkpoints: [
    {
      t: "00-20%",
      label: "System wakes",
      body: "The operator view opens. Inputs are still loose, but the frame establishes control.",
    },
    {
      t: "20-45%",
      label: "Chaos enters",
      body: "Carts, products, panels, and random signals move through the dark field.",
    },
    {
      t: "45-70%",
      label: "Frames align",
      body: "The conversion engine stops drifting and starts arranging decisions into a repeatable path.",
    },
    {
      t: "70-100%",
      label: "Operating mode",
      body: "Store, roadmap, booking, and ECOMVENOM lockup resolve into one command state.",
    },
  ],
};

const arSystemScene = {
  sceneTitle: "النظام",
  eyebrow: "النظام",
  checkpoints: [
    {
      t: "00-20%",
      label: "إقلاع النظام",
      body: "تظهر واجهة التشغيل المركزية. في البداية تبدو المتغيرات غير مستقرة، حتى يفرض الإطار سيطرته.",
    },
    {
      t: "20-45%",
      label: "دخول البيانات",
      body: "الإشارات المتفرقة والمقاييس تتزاحم في الخلفية الداكنة في انتظار التنظيم.",
    },
    {
      t: "45-70%",
      label: "توجيه المسار",
      body: "يتوقف التذبذب ويبدأ محرك التحويل بتنظيم القرارات ضمن معادلة قابلة للتكرار بدقة.",
    },
    {
      t: "70-100%",
      label: "وضع التشغيل الكامل",
      body: "يتفاعل المتجر مع الخارطة والبيانات مكونين حالة تشغيلية متماسكة وحاسمة.",
    },
  ],
};

const enOfferScene = {
  sceneTitle: "THE OFFER",
  eyebrow: "THE OFFER",
  marquee: "FREE STORE BUILD · 2 WINNING PRODUCTS · US MARKET · SAUDI MARKET · ",
  marketCodes: { saudi: "KSA", default: "USA" },
};

const arOfferScene = {
  sceneTitle: "العرض",
  eyebrow: "العرض",
  marquee: "بناء متجر مجاني · منتجان رابحان · السوق الأمريكي · السوق السعودي · ",
  marketCodes: { saudi: "KSA", default: "USA" },
};

const enProofScene = {
  sceneTitle: "RESULTS",
  eyebrow: "RESULTS",
  cardLabel: "VERIFIED STUDENT",
  imageNotes: [
    "Direct screenshot from student account",
    "Unedited progress capture",
    "Real platform results",
  ],
  transparencyLabel: "Transparency Note",
};

const arProofScene = {
  sceneTitle: "النتائج",
  eyebrow: "النتائج",
  cardLabel: "طالب موثّق",
  imageNotes: [
    "لقطة مباشرة من حساب طالب حقيقي",
    "توثيق تقدم غير معدل",
    "نتائج فعلية من المنصة",
  ],
  transparencyLabel: "ملاحظة شفافية",
};

const enApplicationScene = {
  sceneTitle: "APPLY",
  eyebrow: "APPLY",
  headline: "Enter the operating system.",
  body: "The funnel stays simple: submit your application, confirm fit, then choose a consultation time. No fake scarcity, no hidden endpoint.",
  support: "Applications are reviewed for fit before scheduling.",
  faqHeading: enFaq.heading,
  steps: [
    {
      title: "Application",
      body: "Send the details needed to understand fit before the call.",
    },
    {
      title: "Schedule",
      body: "Choose a 20-minute consultation window that works for your time zone.",
    },
    {
      title: "Confirmation",
      body: "Watch the pre-call video and arrive prepared with your questions.",
    },
  ],
  stepLabel: "Step",
};

const enFinalScene = {
  sceneTitle: "START",
  eyebrow: "START",
  headlineLead: "Your system is",
  headlineAccent: "waiting.",
  body: "A 45-day roadmap. A free store build. Two winning products. Dual-market strategies. And a mentor who won't leave you behind.",
};

const arFinalScene = {
  sceneTitle: "انطلق",
  eyebrow: "الانطلاق",
  headlineLead: "نظامك الاحترافي",
  headlineAccent: "بانتظارك.",
  body: "خطة عمل حاسمة لـ 45 يوماً. تصميم متجر احترافي بالكامل. منتجان أثبتا نجاحهما. تكتيكات متقدمة للسوق الأمريكي والخليجي. ومرشد يقف معك خطوة بخطوة.",
};

const enApplyPage = {
  step: "STEP 1 OF 2",
  heading: "Apply for the program",
  body: "Tell us about you. If we're a fit, you'll book a call on the next step.",
  duration: "Application takes ~2 minutes",
};

const arApplyPage = {
  step: "الخطوة 01 / 02",
  heading: "خطوة التقديم الأولى",
  body: "أطلعنا على بعض التفاصيل لنتأكد من توافق الرؤية. في حال الملاءمة، سننقلك لتحديد موعد الاستشارة فوراً.",
  duration: "خطوة الطلب تستغرق حوالي دقيقتين",
};

const enNav = {
  defaultScene: "SYSTEM ONLINE",
  homeScene: "SYSTEM ONLINE",
  routeLabels: {
    apply: "APPLY",
    schedule: "START",
    confirmation: "CONFIRMED",
  },
};

const arNav = {
  defaultScene: "النظام يعمل",
  homeScene: "النظام يعمل",
  routeLabels: {
    apply: "تقدّم",
    schedule: "ابدأ",
    confirmation: "تم التأكيد",
  },
};

const enStickyCta = {
  label: "APPLY FOR THE PROGRAM",
  sub: "Free 20-minute consultation",
};

const arStickyCta = {
  label: "قدّم طلبك للبرنامج",
  sub: "استشارة مجانية لمدة 20 دقيقة",
};

const enSceneLabels = {
  roadmap: "ROADMAP",
  learn: "WHAT YOU LEARN",
  coach: "THE COACH",
};

const arSceneLabels = {
  roadmap: "الخارطة",
  learn: "ماذا ستتعلم",
  coach: "المدرّب",
};

const enContent = {
  CTA_LABEL: enCTA_LABEL,
  CTA_SUB: enCTA_SUB,
  hero: enHero,
  heroHeadline: enHeroHeadline,
  learn: enLearn,
  promise: enPromise,
  chaosToSystem: enChaosToSystem,
  curriculum: enCurriculum,
  graduationGift: enGraduationGift,
  beyond: enBeyond,
  testimonials: enTestimonials,
  faq: enFaq,
  founder: enFounder,
  schedule: enSchedule,
  confirmation: enConfirmation,
  footer: enFooter,
  problem: enProblem,
  systemScene: enSystemScene,
  offerScene: enOfferScene,
  proofScene: enProofScene,
  applicationScene: enApplicationScene,
  finalScene: enFinalScene,
  applyPage: enApplyPage,
  nav: enNav,
  stickyCta: enStickyCta,
  sceneLabels: enSceneLabels,
};

// ─── Arabic content (mirrors exact shape of content.ts) ──────────────────────

const arCTA_LABEL = "قدّم طلبك للبرنامج";
const arCTA_SUB = "أماكن محدودة*";

const arHero = {
  eyebrow: "للمتعلّمين الجادّين الذين يريدون بناء عمل تجاري مستدام ومتسق",
  headlineLead: "ابنِ",
  headlineHighlight: "نظام دروبشيبينغ مربح",
  headlineTail: "خلال ٤٥ يوماً مع",
  headlineHighlight2: "صفر خبرة",
  sub: "خارطة طريق متكاملة من الألف إلى الياء للأسواق الأمريكية والسعودية/الخليجية. بدون أموال مهدرة أو دروس عشوائية أو ثرثرة.",
  scrollCue: "اسحب للأسفل لرؤية النظام",
};

const arLearn = {
  heading: "ما الذي ستتقنه",
  sub: "اكسب المهارات العملية الصلبة لبناء مشروع دروبشيبينغ مستقر ومتنامي.",
  cards: [
    {
      title: "اقتناص المنتجات الرابحة",
      body: "كيف تلتقط المنتجات ذات الإقبال العالي قبل المنافسين والتي تقدم حلاً ملموساً للعميل. لا مكان للتخمين، فقط بيع ما يحتاجه السوق.",
    },
    {
      title: "غزو السوق الأمريكي",
      body: "فهم دقيق للعميل الأمريكي. من تأمين أفضل الموردين الموثوقين مروراً بمنصات PlusBase وتوفير بوابات دفع مصممة لتسهيل الشراء.",
    },
    {
      title: "السيطرة على السوق السعودي والخليجي",
      body: "تحليل تشريحي للسوق السعودي: التعامل المباشر مع موردين خليجيين، توفير منصات الدفع المفضلة محلياً، وإتقان إعلانات تيك توك لاستهدافهم.",
    },
    {
      title: "التسويق المتقدم والمؤثرين",
      body: "استخدم طرق البيع الذكية دون حرق رأس مالك. نوجهك بأساليب التسويق عبر نظام السفراء، التعاون مع المؤثرين، وصناعة المحتوى الجذاب.",
    },
    {
      title: "التحكم المالي والميزانيات",
      body: "لا تدع محدودية الميزانية توقفك. ستتعلم الإدارة الدقيقة للنفقات، قياس معدل العائد (ROAS)، والتوسع في مبيعاتك دون مجازفات قاتلة.",
    },
    {
      title: "هندسة وأتمتة المتجر",
      body: "توجيه عملي لتهيئة متاجر مصممة لرفع معدل التحويل. كما نهديك متجراً مبنياً بالكامل عند الانتهاء من البرنامج التدريبي.",
    },
    {
      title: "تأسيس علامة تجارية صلبة",
      body: "كيف تخلق مصداقية قبل طلب الشراء. استراتيجيات متقدمة للابتعاد عن الدروبشيبينغ العادي نحو بناء براند قوي يضمن ولاء وعودة العملاء.",
    },
    {
      title: "عقلية رجل الأعمال",
      body: "هذا بزنس حقيقي وليس رهاناً. ستغير طريقة تفكيرك لإدارة التدفق النقدي، وتقييم أدائك، وتفادي فخاخ المبتدئين الساذجة.",
    },
  ],
};

const arPromise = {
  headline: "لا ندرّس الدروبشيبينغ فحسب — نبني المسارات المهنية.",
  sub: "تعرّف على كيف ساعدنا طلابنا في تحقيق أهدافهم من خلال دليلنا الشامل خطوة بخطوة.",
};

const arChaosToSystem = {
  eyebrow: "فوضى → نظام",
  headline: "توقّف عن التخمين. ابدأ بالتشغيل.",
  body: "معظم من يجرب الدروبشيبينغ يعمل بالتخمين — دروس عشوائية ومنتجات عشوائية وإنفاق عشوائي على الإعلانات. النتيجة فوضى. الخارطة بالداخل هي النقيض: نظام تشغيل دقيق لإيجاد المنتجات وبناء المتاجر وتشغيل الإعلانات، يُطبَّق بنفس الطريقة في كل مرة.",
  caption: "عرض نظام التشغيل — حركة محكومة، بلا صوت تلقائي، صامت تماماً.",
};

const arCurriculum = {
  heading: "محتوى الدورة",
  sub: "كل ما تحتاجه للنجاح، خطوة بخطوة.",
  modules: [
    { n: "01", title: "مقدمة في الدروبشيبينغ", bullets: ["ما هو الدروبشيبينغ؟", "سير عملية الشراء من الألف إلى الياء"] },
    { n: "02", title: "أنواع المتاجر", bullets: ["أفضل أنواع المتاجر", "تحليل نماذج المتاجر"] },
    { n: "03", title: "استراتيجيات السوق الأمريكي", bullets: ["أفضل موردي السوق الأمريكي", "منصة PlusBase", "بحث المنتجات الرابحة"] },
    { n: "04", title: "استراتيجيات التسويق", bullets: ["التسويق عبر المؤثرين", "إعداد برنامج السفراء", "التسويق بالمحتوى"] },
    { n: "05", title: "استراتيجيات السوق السعودي والخليجي", bullets: ["استراتيجيات الإعلان السعودية/الخليجية", "موردون محليون", "منصات الخليج", "ملاءمة المنتج للسوق الخليجي"] },
    { n: "06", title: "بوابات الدفع وإعداد المتجر", bullets: ["بوابات الدفع", "مكافأة إعداد المتجر المجاني"] },
  ],
};

const arGraduationGift = {
  ribbon: "★ هدية التخرج الحصرية ★",
  title: "نبني متجرك مجاناً",
  sub: "محمّل مسبقاً بـ ٢ منتج رابح",
  body: "نريد ضمان انطلاقتك الصحيحة. بعد إتمام الدورة، سيبني فريقنا لك متجر دروبشيبينغ احترافي. تختار فقط جمهورك المستهدف:",
  options: [
    { flag: "🇺🇸", label: "الخيار أ", market: "السوق الأمريكي" },
    { flag: "🇸🇦", label: "الخيار ب", market: "السوق السعودي" },
  ],
  outro: "كل ما تحتاجه لبناء مشروع تجاري مستدام",
};

const arBeyond = {
  heading: "ما وراء الفيديو",
  sub: "ليست مجرد دورة؛ إنها شراكة. هذا هو المعيار الذي نلتزم به.",
  pillars: [
    {
      title: "التزام كامل",
      body: "«لن أتركك خلفي.» إذا كنت ملتزماً بالنجاح، نقدم دعماً لا يتزعزع في كل خطوة حتى تحقق نتائج استثنائية.",
    },
    {
      title: "لا حشو، فعل خالص",
      body: "نفضّل التعلم العملي على النظرية الممّلة. نركز فقط على استراتيجيات المبيعات الحديثة وتقنيات بناء المتاجر التي يمكنك تطبيقها فوراً.",
    },
    {
      title: "نمو مستدام",
      body: "نتجنب بشدة الأساليب المشبوهة أو الاختصارات التي تضر بسمعتك. ندرّسك بناء علامة تجارية شرعية مصمّمة للبقاء على المدى الطويل.",
    },
    {
      title: "خارطة طريق ٤-٨ أسابيع",
      body: "لا وعود كاذبة بالثروة السريعة. الطلاب الذين يطبقون استراتيجياتنا بانتظام يمكنهم بشكل واقعي توقع نتائج ذات معنى خلال ٤ إلى ٨ أسابيع.",
    },
  ],
};

const arTestimonials = {
  heading: "نتائج موثّقة",
  subheading: "طلاب حقيقيون. لقطات شاشة حقيقية. لا شيء مصطنع.",
  honestNote:
    "جميع الأدلة المعروضة مأخوذة مباشرة من حسابات الطلاب. لا نصنع اقتباسات ولا نضخّم أرقاماً ولا نستخدم صور ستوك.",
};

const arFaq = {
  heading: "أسئلة شائعة",
  sub: "لديك أسئلة؟ لدينا إجابات. كل ما تحتاج معرفته قبل الانضمام.",
  items: [
    {
      q: "هل أحتاج خبرة سابقة للبدء؟",
      a: "لا. الخارطة مبنية من الصفر وتأخذك من اختيار المنتج حتى تشغيل الإعلانات. إذا كنت قادراً على اتباع الخطوات وتكريس الوقت، النظام يغطي الباقي.",
    },
    {
      q: "كم من الوقت حتى أرى نتائج؟",
      a: "الطلاب الذين يطبقون الاستراتيجيات بانتظام يمكنهم بشكل واقعي توقع نتائج ذات معنى خلال ٤ إلى ٨ أسابيع. لا وعود بالثروة السريعة.",
    },
    {
      q: "هل أحتاج ميزانية كبيرة للبدء؟",
      a: "لا. وحدة إتقان المالية والميزانية مبنية حول رأس المال المحدود — حساب ROAS وإدارة التدفق النقدي والتوسع دون إهدار المال.",
    },
    {
      q: "هل هذا يناسب السوق السعودي؟",
      a: "نعم. هناك وحدة مخصصة للسوق السعودي والخليجي تغطي الموردين المحليين وطرق الدفع واستراتيجية إعلانات تيك توك لجمهور الخليج.",
    },
    {
      q: "هل إعداد المتجر مجاني حقاً؟",
      a: "نعم. عند إتمام الدورة، يبني فريقنا لك متجر دروبشيبينغ احترافي محمّل مسبقاً بـ ٢ منتج رابح. تختار إما السوق الأمريكي أو السعودي.",
    },
    {
      q: "ماذا لو تعطّلت؟ هل هناك دعم؟",
      a: "نحن ملتزمون بنجاحك. إذا كنت مستعداً للعمل، لن نتركك خلفنا. ندعمك في كل خطوة حتى تحقق النتائج التي تسعى إليها.",
    },
  ],
  closing:
    "نحن ملتزمون بنجاحك. إذا كنت مستعداً للعمل، لن نتركك خلفنا. ندعمك في كل خطوة حتى تحقق النتائج التي تسعى إليها.",
};

const arApplicationScene = {
  sceneTitle: "التقديم",
  eyebrow: "التقديم",
  headline: "انضم الآن إلى النظام.",
  body: "الآلية لدينا بسيطة وشفافة: أرسل طلبك، نتحقق من التوافق، ثم تختار موعد الاستشارة. لا نلجأ لأساليب الندرة الوهمية أو الخطوات المعقدة.",
  support: "نقوم بمراجعة كافة تفاصيل الطلب بشكل دقيق قبل الموافقة على الحجز.",
  faqHeading: arFaq.heading,
  steps: [
    {
      title: "تقديم الطلب",
      body: "شاركنا تفاصيلك لنتمكن من دراسة مستوى التوافق قبل إجراء المكالمة معك.",
    },
    {
      title: "جدولة الموعد",
      body: "حدد وقتاً متاحاً لاستشارة مدتها 20 دقيقة تتناسب مع توقيت النطاق الجغرافي الخاص بك.",
    },
    {
      title: "التأكيد والاستعداد",
      body: "شاهد الفيديو التمهيدي واحضر للمكالمة مستعداً بكافة استفساراتك الهامة.",
    },
  ],
  stepLabel: "الخطوة",
};

const arFounder = {
  eyebrow: "رئيس الاستراتيجيات",
  heading: "يـوسـف عـادل",
  paragraphs: [
    "لم أبدأ بمسيرة مفروشة بالنجاح. بدأت مثل أغلبكم — أختبر وأستنزف ميزانيتي في إعلانات فاشلة، حتى أدركت أن كل ادعاءات «الثراء السريع» على الإنترنت كانت محض وهم. تعلمت بالطريقة القاسية أن الدروبشيبينغ بعيد كل البعد عن ضربات الحظ؛ بل هو علم ونظام تشغيل صارم يحتاج إلى بصيرة حادة وأدوات محددة.",
    "بدلاً من الانسحاب والاعتراف بالهزيمة، صرت مهووساً بتحليل أسباب الفشل. فككت شفرة العقلية الشرائية، وسيطرت على استراتيجيات السوق الأمريكي والسعودي وبنيت آلية مبيعات مستدامة تدوم. واليوم، أضع بين يديك عصارة هذا النظام وتلك الخبرة حتى تتجاوز أخطائي وتختصر الطريق.",
  ],
  traits: [
    {
      title: "خبير الأسواق المزدوجة",
      body: "تكتيكات احترافية قاطعة لاختراق السوق الأمريكي، وفرض السيطرة في السوق الخليجي والسعودي القوي.",
    },
    {
      title: "العمل الدقيق لا الكلام",
      body: "أرفض تماماً أساليب الوهم الشائعة. أتعامل مع الدروبشيبينغ كبناء شركات ونماذج مالية حقيقية للمدى البعيد.",
    },
    {
      title: "استراتيجية التسويق الأذكى",
      body: "احتراف طرق الاستحواذ على العملاء عبر السفراء والمحتوى لترسيخ مصداقية البراند قبل المطالبة بالشراء.",
    },
    {
      title: "تدريب تطبيقي صافٍ",
      body: "تم تصميم النظام لسحق المنهجيات التنظيرية، وليقدم مساراً عملياً وعلمياً قابلاً للتطبيق فوراً بنسبة ١٠٠٪.",
    },
  ],
  pullquote: "«قررت أن أعرف لماذا تفشل الناس أولاً، لأن النجاح لا يأتي بالصدفة أبدًا.»",
  signature: "يوسف عادل",
  signatureRole: "المؤسس والمدرّب المباشر",
};

const arSchedule = {
  eyebrow: "الخطوة الأخيرة:",
  heading: "مطلوب لإتمام طلبك",
  sub: "تهانينا على اتخاذ الخطوة الأولى! لإنهاء طلبك، يرجى تحديد وقت مناسب أدناه لمكالمة الاستشارة المجانية.",
  cta: "اختر وقت استشارتك المجانية",
  card: { name: "مكالمة استكشافية مجانية", duration: "٢٠ دقيقة" },
  slots: enSchedule.slots,
};

const arConfirmation = {
  banner: "لا تغلق هذه الصفحة",
  h1: "تأكّد!",
  sub: "تم حجز مكالمتك",
  stepsHeading: "خطوات مهمة قبل المكالمة:",
  steps: [
    { title: "الخطوة ١: شاهد هذا الفيديو", body: "" },
    {
      title: "الخطوة ٢: تحقق من واتساب",
      body: "سنرسل لك تفاصيل المكالمة على واتساب. ستصلك تذكيرات قبل المكالمة ثم رابط للانضمام.",
    },
    {
      title: "الخطوة ٣: الالتزام بالمواعيد",
      body: "انضم إلى مكالمتك مبكراً وفي بيئة هادئة. مستشارك سيعطيك انتباهه الكامل ونتوقع الأمر نفسه منك.",
    },
    {
      title: "الخطوة ٤: الأسئلة",
      body: "نريد الإجابة على أي سؤال في ذهنك لتبديد الغموض وإيضاح كل شيء.",
    },
  ],
};

const arFooter = {
  legal: "سياسة الخصوصية | الشروط والأحكام",
  copyright: "© ٢٠٢٦ إيكوم فينوم. جميع الحقوق محفوظة.",
};

const arContent = {
  CTA_LABEL: arCTA_LABEL,
  CTA_SUB: arCTA_SUB,
  hero: arHero,
  heroHeadline: arHeroHeadline,
  learn: arLearn,
  promise: arPromise,
  chaosToSystem: arChaosToSystem,
  curriculum: arCurriculum,
  graduationGift: arGraduationGift,
  beyond: arBeyond,
  testimonials: arTestimonials,
  faq: arFaq,
  founder: arFounder,
  schedule: arSchedule,
  confirmation: arConfirmation,
  footer: arFooter,
  problem: arProblem,
  systemScene: arSystemScene,
  offerScene: arOfferScene,
  proofScene: arProofScene,
  applicationScene: arApplicationScene,
  finalScene: arFinalScene,
  applyPage: arApplyPage,
  nav: arNav,
  stickyCta: arStickyCta,
  sceneLabels: arSceneLabels,
};

export type AppContent = typeof enContent;

export function getContentForLang(lang: "en" | "ar"): AppContent {
  return lang === "ar" ? arContent : enContent;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useContent() {
  const { lang } = useLang();
  return getContentForLang(lang);
}

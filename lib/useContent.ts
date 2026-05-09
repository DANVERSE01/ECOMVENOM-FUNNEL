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
  [{ text: "خلال" }, { text: "45", className: "text-venom" }, { text: "يوماً" }],
  [{ text: "مع" }, { text: "صفر", className: "text-venom" }, { text: "خبرة", className: "text-venom" }],
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
  headline: "المدخلات العشوائية تصنع فوضى مكلفة.",
  body: "معظم من يدخل الدروبشيبينغ يعمل بالتخمين. النظام الذي ستراه الآن يستبدل تلك الفوضى بمسار تشغيل منظم.",
  signalLabel: "إشارة",
  signalState: "غير منضبط",
  signals: [
    { label: "دروس عشوائية", detail: "ساعات من فيديوهات يوتيوب ونصائح متناقضة ولا مسار واضح للتنفيذ" },
    { label: "منتجات عشوائية", detail: "تجارب عمياء تستهلك الميزانية على منتجات لا يريدها السوق أصلًا" },
    { label: "إنفاق إعلاني عشوائي", detail: "المال يخرج من حسابك دون فهم واضح لما ينجح أو لماذا" },
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
      label: "استيقاظ النظام",
      body: "واجهة التشغيل تظهر أولًا. المدخلات ما زالت غير مستقرة، لكن الإطار يبدأ فرض السيطرة.",
    },
    {
      t: "20-45%",
      label: "دخول الفوضى",
      body: "العربات والمنتجات واللوحات والإشارات العشوائية تتحرك داخل الحقل الداكن.",
    },
    {
      t: "45-70%",
      label: "اصطفاف الإطارات",
      body: "محرك التحويل يتوقف عن التشتت ويبدأ ترتيب القرارات داخل مسار قابل للتكرار.",
    },
    {
      t: "70-100%",
      label: "وضع التشغيل",
      body: "المتجر والخارطة والحجز وشعار ECOMVENOM يتماسك كله في حالة تشغيل واحدة.",
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
  sceneTitle: "ابدأ",
  eyebrow: "ابدأ",
  headlineLead: "نظامك",
  headlineAccent: "ينتظرك.",
  body: "خارطة طريق لـ 45 يومًا. بناء متجر مجاني. منتجان رابحان. استراتيجيات مزدوجة للسوقين. ومرشد لا يتركك خلفه.",
};

const enApplyPage = {
  step: "STEP 1 OF 2",
  heading: "Apply for the program",
  body: "Tell us about you. If we're a fit, you'll book a call on the next step.",
  duration: "Application takes ~2 minutes",
};

const arApplyPage = {
  step: "الخطوة 1 من 2",
  heading: "قدّم للبرنامج",
  body: "احكِ لنا عنك. إذا كانت هناك ملاءمة، ستنتقل لحجز المكالمة في الخطوة التالية.",
  duration: "الطلب يستغرق حوالي دقيقتين",
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
  heading: "ما الذي ستتعلّمه",
  sub: "أتقن المهارات اللازمة لبناء مشروع دروبشيبينغ مستدام.",
  cards: [
    {
      title: "بحث المنتجات الرابحة",
      body: "تعلّم كيف تحدد المنتجات عالية الإمكانات التي تحل مشاكل حقيقية. توقّف عن التخمين وابدأ في بيع ما يريد الناس شراءه فعلاً.",
    },
    {
      title: "استراتيجيات السوق الأمريكي",
      body: "أتقن السوق الأمريكي. احصل على أفضل الموردين ومنصات مثل PlusBase وبوابات دفع مصمّمة للعملاء الأمريكيين.",
    },
    {
      title: "التوسع في السوق السعودي والخليجي",
      body: "تفصيل كامل للسوق السعودي: موردون محليون وطرق دفع خاصة واستراتيجيات إعلانات تيك توك لاستهداف الجمهور الخليجي.",
    },
    {
      title: "تكتيكات تسويقية متقدمة",
      body: "تعلّم البيع دون إهدار ميزانيتك. ندرّسك التسويق عبر السفراء والمؤثرين والمحتوى.",
    },
    {
      title: "إتقان المالية والميزانية",
      body: "تغلّب على تحدي رأس المال المحدود. تعلّم إدارة ميزانيتك وحساب ROAS والتوسع الفعّال دون إهدار المال.",
    },
    {
      title: "إنشاء المتجر وأتمتته",
      body: "إرشادات خطوة بخطوة لبناء متاجر عالية التحويل. بالإضافة إلى خدمة بناء متجر مجاني عند إتمام الدورة.",
    },
    {
      title: "بناء علامة تجارية موثوقة",
      body: "تعلّم بناء الثقة قبل البيع. تجاوز الدروبشيبينغ الأساسي لإنشاء علامة تجارية معروفة تحتفظ بالعملاء وتشجع على الشراء المتكرر.",
    },
    {
      title: "عقلية رجل الأعمال",
      body: "الدروبشيبينغ نظام وليس يانصيب. تعلّم التعامل معه كعمل تجاري حقيقي وإدارة التدفق النقدي وتجنّب الأخطاء التي تُفشل المبتدئين.",
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
  headline: "ادخل نظام التشغيل.",
  body: "الفانل هنا بسيط وواضح: قدّم طلبك، تأكد من الملاءمة، ثم اختر وقت الاستشارة. بلا ندرة مزيفة ولا نهاية مخفية.",
  support: "يتم مراجعة الطلبات أولًا قبل فتح الحجز.",
  faqHeading: arFaq.heading,
  steps: [
    {
      title: "الطلب",
      body: "أرسل التفاصيل الأساسية حتى نفهم الملاءمة قبل المكالمة.",
    },
    {
      title: "الحجز",
      body: "اختر نافذة استشارة مدتها 20 دقيقة تناسب توقيتك.",
    },
    {
      title: "التأكيد",
      body: "شاهد فيديو ما قبل المكالمة وادخل مستعدًا بأسئلتك.",
    },
  ],
  stepLabel: "الخطوة",
};

const arFounder = {
  eyebrow: "المدرّب",
  heading: "تعرّف على يوسف عادل",
  paragraphs: [
    "لم أبدأ بالنجاح. بدأت مثل كثيرين منكم — أجرّب وأخسر أموالاً في الإعلانات وأدرك أن وعود «الثروة السريعة» عبر الإنترنت مجرد كذب. تعلّمت بالطريقة الصعبة أن الدروبشيبينغ ليس حظاً؛ إنه نظام تجاري دقيق يحتاج خارطة طريق محددة.",
    "بدلاً من الاستسلام، أصبحت مهووساً بالتفاصيل. أتقنت الفروق بين السوقين الأمريكي والسعودي وفككت سيكولوجيا المستهلك وبنيت استراتيجية تركز على النمو المستدام بدلاً من المكاسب السريعة. الآن أدرّس هذا النظام بالضبط لضمان ألا تقع في نفس أخطائي.",
  ],
  traits: [
    {
      title: "خبير في السوقين",
      body: "استراتيجيات متخصصة للسيطرة على السوق الأمريكي العالمي والقطاع السعودي/الخليجي المحلي.",
    },
    {
      title: "النظام قبل الضجيج",
      body: "يرفض وعود «الغورو المزيف». يدرّس الدروبشيبينغ كنموذج أعمال منظّم وطويل الأمد.",
    },
    {
      title: "التسويق أولاً",
      body: "إتقان في التسويق عبر المؤثرين والسفراء والمحتوى لبناء الثقة قبل طلب البيع.",
    },
    {
      title: "مرشد بلا حشو",
      body: "أنشأ هذه الدورة لسد الفجوة في التعليم العربي بخطوات عملية وقابلة للتنفيذ ١٠٠٪.",
    },
  ],
  pullquote: "«قرّرت أن أفهم لماذا فشلت، ليس فقط كيف أنجح.»",
  signature: "يوسف عادل",
  signatureRole: "المؤسّس والمدرّب الرئيسي",
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

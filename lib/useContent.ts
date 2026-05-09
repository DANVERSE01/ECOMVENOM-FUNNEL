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
  [{ text: "ابنِ" }, { text: "منظومة" }],
  [{ text: "دروبشيبينغ", className: "text-venom" }, { text: "رابحة" }],
  [{ text: "خلال" }, { text: "45", className: "text-venom" }, { text: "يوماً" }],
  [{ text: "حتى" }, { text: "لو" }, { text: "بدأت" }, { text: "من الصفر", className: "text-venom" }],
] as const;

const enProblem = {
  sceneTitle: "THE PROBLEM",
  eyebrow: "THE PROBLEM",
  headline: "When every move is reactive, every dollar works against you.",
  body: "Most people do not fail because dropshipping is impossible. They fail because the process is fragmented: a trend-led product, a copied ad, and a store with no conversion logic. What comes next is the opposite: control.",
  signalLabel: "Signal",
  signalState: "Out of control",
  signals: [
    { label: "Endless content, no method", detail: "There is always more advice to watch, but no operating order that tells you what to do first and what actually matters." },
    { label: "Testing without filters", detail: "Budget gets spent on weak products because selection happens through excitement, not real demand signals." },
    { label: "Spend without diagnosis", detail: "Money goes out fast, but the operator still cannot explain what is working, what is failing, or why." },
  ],
};

const arProblem = {
  sceneTitle: "المشكلة",
  eyebrow: "المشكلة",
  headline: "حين تتحرك بردّ فعل، تبدأ الميزانية بالعمل ضدك.",
  body: "المشكلة ليست في الدروبشيبينغ نفسه، بل في دخوله بلا منهج: منتج مأخوذ من ترند، إعلان منسوخ، ومتجر لا يحمل منطق تحويل واضح. ما ستراه بعد قليل هو النقيض الكامل: سيطرة لا تخبّط.",
  signalLabel: "إشارة",
  signalState: "خارج السيطرة",
  signals: [
    { label: "محتوى كثير بلا منهج", detail: "فيديوهات ونصائح لا تنتهي، لكن بدون ترتيب عملي يقول لك ما الذي تبدأ به وما الذي يغيّر النتيجة فعلاً." },
    { label: "اختبارات بلا فلترة", detail: "تُهدر الميزانية على منتجات ضعيفة لأن الاختيار تم بالحماس لا بإشارات طلب حقيقية." },
    { label: "إعلان بلا تشخيص", detail: "الإنفاق يتحرك بسرعة، بينما صاحب المتجر لا يستطيع أن يشرح ما الذي ينجح، وما الذي يفشل، ولماذا." },
  ],
};

const enSystemScene = {
  sceneTitle: "THE SYSTEM",
  eyebrow: "THE SYSTEM",
  checkpoints: [
    {
      t: "00-20%",
      label: "Cold view",
      body: "The scene opens quiet and distant, letting the noise expose itself before the system steps in.",
    },
    {
      t: "20-45%",
      label: "Signals collide",
      body: "Products, metrics, panels, and unfinished decisions overlap at once before the sorting logic takes control.",
    },
    {
      t: "45-70%",
      label: "Method forms",
      body: "The drift stops here. Decisions begin to align into a method you can understand, repeat, and improve.",
    },
    {
      t: "70-100%",
      label: "Ready to operate",
      body: "The store, the offer, and the next move settle into one clear operating path instead of competing fragments.",
    },
  ],
};

const arSystemScene = {
  sceneTitle: "النظام",
  eyebrow: "النظام",
  checkpoints: [
    {
      t: "00-20%",
      label: "مشهد بارد",
      body: "يفتتح المشهد بهدوء ومسافة، حتى ترى حجم الضوضاء كما هو قبل أن يتدخل النظام ويبدأ في فرض السيطرة.",
    },
    {
      t: "20-45%",
      label: "تصادم الإشارات",
      body: "المنتجات، المؤشرات، والقرارات الناقصة تتداخل كلها في لحظة واحدة قبل أن يبدأ الفرز الحقيقي.",
    },
    {
      t: "45-70%",
      label: "تكوّن المنهج",
      body: "هنا يتوقف التخبط، وتبدأ القرارات في الاصطفاف داخل منهج يمكنك فهمه وتكراره وتحسينه بثقة.",
    },
    {
      t: "70-100%",
      label: "جاهز للتشغيل",
      body: "المتجر، العرض، والخطوة التالية يتجمعون في مسار واحد واضح، بدل أن يبقى كل شيء مفككًا ومتنافسًا.",
    },
  ],
};

const enOfferScene = {
  sceneTitle: "THE OFFER",
  eyebrow: "THE OFFER",
  marquee: "FREE STORE BUILD · 2 TEST-READY PRODUCTS · U.S. MARKET · SAUDI MARKET · ",
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
  headline: "Step into the real build phase.",
  body: "The path stays simple: submit the application, pass the fit review, then choose your consultation slot. No fake urgency. No hidden step.",
  support: "Every application is reviewed before scheduling so the consultation stays relevant, focused, and useful.",
  faqHeading: enFaq.heading,
  steps: [
    {
      title: "Application",
      body: "Share the details that let us understand your current position before the consultation happens.",
    },
    {
      title: "Schedule",
      body: "Choose a 20-minute consultation window that fits your time zone and availability.",
    },
    {
      title: "Confirmation",
      body: "Watch the pre-call video and arrive with the questions that matter most to you.",
    },
  ],
  stepLabel: "Step",
};

const enFinalScene = {
  sceneTitle: "START",
  eyebrow: "START",
  headlineLead: "A real start",
  headlineAccent: "for your store.",
  body: "A 45-day roadmap. A store built for you. Two products ready for testing. Clearer strategy for the U.S. and Gulf markets. And support that does not disappear after the first step.",
};

const arFinalScene = {
  sceneTitle: "انطلق",
  eyebrow: "الانطلاق",
  headlineLead: "بداية صحيحة",
  headlineAccent: "لمتجرك.",
  body: "خطة 45 يومًا، متجر نجهّزه لك، ومنتجان جاهزان للاختبار، مع رؤية أوضح للسوق الأمريكي والخليجي ومتابعة لا تختفي بعد أول خطوة.",
};

const enApplyPage = {
  step: "STEP 1 OF 2",
  heading: "Start your application",
  body: "Share the essentials. If the fit is right, the next step is choosing your consultation time.",
  duration: "Application takes about 2 minutes",
};

const arApplyPage = {
  step: "الخطوة 01 / 02",
  heading: "ابدأ طلب الانضمام",
  body: "أرسل التفاصيل الأساسية أولًا، وإذا كان البرنامج مناسبًا لك ننتقل مباشرة إلى اختيار موعد الاستشارة.",
  duration: "التقديم يستغرق قرابة دقيقتين",
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
  label: "START YOUR APPLICATION",
  sub: "Free 20-minute consultation",
};

const arStickyCta = {
  label: "ابدأ التقديم الآن",
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

const arCTA_LABEL = "ابدأ التقديم الآن";
const arCTA_SUB = "قبول محدود*";

const arHero = {
  eyebrow: "لمن يريد بناء تجارة رقمية حقيقية بمنهج واضح، لا بمحاولات عشوائية",
  headlineLead: "ابنِ",
  headlineHighlight: "نظام دروبشيبينغ مربح",
  headlineTail: "خلال ٤٥ يوماً مع",
  headlineHighlight2: "صفر خبرة",
  sub: "مسار عملي يأخذك من اختيار المنتج إلى بناء المتجر وتشغيل الإعلان في السوق الأمريكي والخليجي، بخطوات محسوبة ومتابعة حقيقية.",
  scrollCue: "مرّر لتدخل داخل النظام",
};

const arLearn = {
  heading: "ماذا ستتقن فعلياً",
  sub: "مهارات تنفيذية واضحة تبني بها متجرًا يبيع، وتقرأ بها الأرقام، وتتخذ بها قرارات مبنية على بيانات.",
  cards: [
    {
      title: "اقتناص المنتجات الرابحة",
      body: "تحديد المنتجات التي يطلبها السوق فعلاً قبل أن تتحول إلى ساحة مزدحمة، بالاعتماد على مؤشرات واضحة لا على الحدس.",
    },
    {
      title: "غزو السوق الأمريكي",
      body: "بناء عرض يناسب العميل الأمريكي من اختيار الموردين الموثوقين إلى تجهيز الدفع وتجربة شراء تقلل التردد وتزيد التحويل.",
    },
    {
      title: "السيطرة على السوق السعودي والخليجي",
      body: "تكييف المنتج والعرض والإعلانات مع ذوق السوق السعودي والخليجي بدل نسخ ما ينجح في أمريكا بشكل أعمى.",
    },
    {
      title: "التسويق المتقدم والمؤثرين",
      body: "استخدام المؤثرين وصنّاع المحتوى وبرامج السفراء بطريقة تخدم الربحية وتبني الثقة بدل حرق الميزانية على انتشار بلا عائد.",
    },
    {
      title: "التحكم المالي والميزانيات",
      body: "قراءة الأرقام الأساسية، ضبط الإنفاق، ومعرفة متى توسّع ومتى توقف الاختبار قبل أن يبدأ رأس المال بالنزيف.",
    },
    {
      title: "هندسة وأتمتة المتجر",
      body: "بناء متجر نظيف وسريع ومقنع بمنطق تحويل حقيقي، لا مجرد واجهة جميلة. وعند الإتمام نجهّز لك متجرًا جاهزًا للانطلاق.",
    },
    {
      title: "تأسيس علامة تجارية صلبة",
      body: "تحويل المتجر من تجربة مؤقتة إلى براند يخلق ثقة ويزيد احتمالية العودة والشراء المتكرر.",
    },
    {
      title: "عقلية رجل الأعمال",
      body: "التفكير بعقلية صاحب مشروع: قرارات أهدأ، اختبارات أنظف، ونمو مبني على أساس صحيح بدل الاندفاع وراء أي ترند.",
    },
  ],
};

const arPromise = {
  headline: "هذا ليس محتوى تحفيزيًا. هذا منهج تشغيل.",
  sub: "الفكرة بسيطة: نستبدل القرارات المرتبكة بمنهج يمكنك فهمه وتشغيله وتحسينه مع الوقت.",
};

const arChaosToSystem = {
  eyebrow: "فوضى → نظام",
  headline: "أوقف العشوائية. واشتغل بمنهج واضح.",
  body: "حين يكون المسار مفككًا، تضيع الميزانية بين اختبارات عشوائية، وإعلانات منسوخة، ومتجر لا يشرح للعميل لماذا يشتري. هنا ترى العكس: نظام واحد لاختيار المنتج، وصياغة العرض، وبناء المتجر، وقراءة الإعلان.",
  caption: "المشهد يبدأ باردًا، يتسع مع السكرول، ثم يكشف المنهج أمامك بوضوح.",
};

const arCurriculum = {
  heading: "محتوى الدورة",
  sub: "من الأساسيات حتى التشغيل الفعلي، بترتيب يبني الفهم والتنفيذ معًا.",
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
  ribbon: "★ ميزة التخرّج ★",
  title: "نجهّز متجرك لك مجاناً",
  sub: "مع منتجين جاهزين للاختبار",
  body: "بعد إتمام البرنامج، يبني فريقنا لك متجرًا احترافيًا قابلًا للانطلاق. أنت تختار فقط السوق الأنسب لك:",
  options: [
    { flag: "🇺🇸", label: "الخيار أ", market: "السوق الأمريكي" },
    { flag: "🇸🇦", label: "الخيار ب", market: "السوق السعودي" },
  ],
  outro: "كل ما تحتاجه لتبدأ على أرض صلبة، لا من نقطة عشوائية.",
};

const arBeyond = {
  heading: "ما بعد المحتوى",
  sub: "البرنامج ليس ملفات مشاهدة ثم وداعًا. هذه هي المعايير التي نعمل بها معك.",
  pillars: [
    {
      title: "متابعة جدّية",
      body: "إذا التزمت بالتنفيذ، لن تُترك وحدك أمام التفاصيل. هناك توجيه حقيقي حتى تبدأ النتائج في الظهور.",
    },
    {
      title: "تنفيذ قبل التنظير",
      body: "نركّز على ما يحرّك المبيعات فعلًا: اختيار صحيح، عرض قوي، متجر مقنع، وتسويق يخدم الهدف.",
    },
    {
      title: "بناء طويل النفس",
      body: "لا نبيعك اختصارات تحرق السمعة. نعلّمك كيف تبني أصلًا تجاريًا يمكن تطويره والاستمرار عليه.",
    },
    {
      title: "نافذة نتائج واقعية",
      body: "لا وعود ثراء سريع. من يطبّق بانتظام يستطيع رؤية مؤشرات ونتائج ملموسة خلال ٤ إلى ٨ أسابيع.",
    },
  ],
};

const arTestimonials = {
  heading: "نتائج موثّقة",
  subheading: "أرقام حقيقية من طلاب حقيقيين، بلا اقتباسات مصطنعة ولا لقطات مزيفة.",
  honestNote:
    "كل لقطة معروضة مأخوذة مباشرة من حسابات الطلاب أو منصاتهم الفعلية. لا نختلق شهادات ولا نجمّل الأرقام.",
};

const arFaq = {
  heading: "الأسئلة التي تتكرر قبل الانضمام",
  sub: "إجابات واضحة على الأسئلة الأهم قبل أن تتخذ قرارك.",
  items: [
    {
      q: "هل أحتاج خبرة سابقة للبدء؟",
      a: "لا. البرنامج مبني لمن يبدأ من الصفر، ويأخذك من اختيار المنتج حتى تشغيل الإعلانات. المطلوب فقط التزام حقيقي بالتنفيذ.",
    },
    {
      q: "كم من الوقت حتى أرى نتائج؟",
      a: "إذا طبّقت الاستراتيجيات بانتظام، فمن الواقعي أن تبدأ برؤية مؤشرات ونتائج ملموسة خلال ٤ إلى ٨ أسابيع. لا نبيع وعودًا خيالية.",
    },
    {
      q: "هل أحتاج ميزانية كبيرة للبدء؟",
      a: "لا. جزء مهم من البرنامج مبني حول رأس المال المحدود: كيف تختبر، كيف تقرأ ROAS، وكيف تتوسع بدون إهدار.",
    },
    {
      q: "هل هذا يناسب السوق السعودي؟",
      a: "نعم. لدينا مسار مخصص للسوق السعودي والخليجي يغطي الموردين المحليين ووسائل الدفع وطريقة بناء عرض وإعلان يناسب الجمهور فعلاً.",
    },
    {
      q: "هل إعداد المتجر مجاني حقاً؟",
      a: "نعم. بعد إتمام البرنامج، يبني فريقنا لك متجرًا احترافيًا مُجهزًا بمنتجين قابلين للاختبار. تختار أنت السوق: الأمريكي أو السعودي.",
    },
    {
      q: "ماذا لو تعطّلت؟ هل هناك دعم؟",
      a: "إذا كنت جادًا في التنفيذ فلن تُترك في منتصف الطريق. هناك متابعة وتوجيه ومحاسبة حتى تتقدم بشكل فعلي.",
    },
  ],
  closing: "إذا كنت جادًا في التنفيذ فستجد معنا وضوحًا، متابعة، ومحاسبة حقيقية.",
};

const arApplicationScene = {
  sceneTitle: "التقديم",
  eyebrow: "التقديم",
  headline: "ادخل مرحلة التفعيل.",
  body: "طريق الانضمام واضح: طلب مختصر، مراجعة للتوافق، ثم اختيار موعد الاستشارة. لا تعقيد، ولا ضغط وهمي، ولا خطوات بلا معنى.",
  support: "نراجع الطلبات بعناية قبل فتح الحجز حتى تبقى الاستشارة مخصصة وجادّة.",
  faqHeading: arFaq.heading,
  steps: [
    {
      title: "الطلب",
      body: "أرسل البيانات الأساسية التي تساعدنا على فهم وضعك الحالي وتحديد درجة التوافق قبل المكالمة.",
    },
    {
      title: "الجدولة",
      body: "اختر نافذة مناسبة لاستشارة مدتها 20 دقيقة بما يتناسب مع توقيتك ومكانك الجغرافي.",
    },
    {
      title: "التأكيد والاستعداد",
      body: "شاهد الفيديو التمهيدي وادخل الاستشارة ومعك أسئلتك الحقيقية حتى تكون المكالمة مفيدة من الدقيقة الأولى.",
    },
  ],
  stepLabel: "الخطوة",
};

const arFounder = {
  eyebrow: "المدير الاستراتيجي",
  heading: "يـوسـف عـادل",
  paragraphs: [
    "بدايتي لم تكن سهلة ولا براقة. بدأت مثل كثيرين: أختبر، أخسر، وأحاول فهم لماذا لا يتحول الجهد إلى نتائج. ومع الوقت اتضح لي أن أغلب ما يُباع على أنه سر النجاح ليس سوى ضوضاء وتسويق لفكرة الثراء السريع.",
    "بدل أن أنسحب، قررت أن أفهم اللعبة من الداخل: كيف يختار الناس؟ لماذا يثقون؟ متى يشترون؟ ومن هنا بنيت نظام تشغيل واضحًا للتعامل مع السوق الأمريكي والسعودي والخليجي، وأصبحت أدرّس ما كنت أتمنى أن أجده عندما بدأت.",
  ],
  traits: [
    {
      title: "خبير الأسواق المزدوجة",
      body: "استراتيجيات واضحة للتعامل مع السوق الأمريكي والسوق السعودي والخليجي، مع فهم لاختلاف العميل والسلوك الشرائي بينهما.",
    },
    {
      title: "العمل الدقيق لا الكلام",
      body: "لا أتعامل مع الدروبشيبينغ كترند عابر، بل كنشاط تجاري له أرقام، وقرارات، ومسار نمو واضح.",
    },
    {
      title: "استراتيجية التسويق الأذكى",
      body: "بناء اكتساب عميل يعتمد على الثقة والمحتوى والمؤثرين بطريقة تخدم الربحية لا مجرد الوصول.",
    },
    {
      title: "تدريب تطبيقي صافٍ",
      body: "منهج تطبيقي مباشر يختصر النظريات الزائدة ويمنحك مسارًا يمكن تنفيذه فورًا داخل مشروعك.",
    },
  ],
  pullquote: "«بدأ التحول الحقيقي عندما توقفت عن مطاردة الحظ وبدأت أبني نظامًا يمكن قياسه.»",
  signature: "يوسف عادل",
  signatureRole: "المؤسس والمدرّب الرئيسي",
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

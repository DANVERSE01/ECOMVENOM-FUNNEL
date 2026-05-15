export type MarketingCopy = {
  hero: {
    headline: string;
    body: string;
    primary: string;
    secondary: string;
    proof: string[];
  };
  scrollFilm: {
    label: string;
    title: string;
    body: string;
    mobileTitle: string;
    mobileBody: string;
  };
  mechanism: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Array<{ n: string; title: string; body: string }>;
  };
  roadmap: {
    eyebrow: string;
    title: string;
    body: string;
  };
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    transparency: string;
  };
  founder: {
    eyebrow: string;
    title: string;
    body: string;
    quote: string;
  };
  offer: {
    eyebrow: string;
    title: string;
    body: string;
    supportTitle: string;
    supportBody: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export type ScrollFilmPhase = {
  n: string;
  time: string;
  title: string;
  body: string;
};

export type ProofAsset = {
  src: string;
  alt: string;
  label: string;
  market: string;
  note: string;
};

export const recoveryCopy = {
  ar: {
    hero: {
      headline: "حوّل الدروبشيبينغ من مقامرة إلى نظام قرار.",
      body:
        "قبل أن تبني المتجر أو تطلق الإعلان، تتعلم كيف تختار المنتج بإشارات طلب حقيقية، تصيغ العرض، تختبر السوق، ثم تقرأ الأرقام بدون تخمين.",
      primary: "ابدأ التقديم الآن",
      secondary: "شاهد فيديو المؤسس",
      proof: ["خطة تشغيل 45 يومًا", "السوق الأمريكي والسعودي/الخليجي", "متجر مجاني بعد الإتمام"],
    },
    scrollFilm: {
      label: "مشهد التحول",
      title: "من ضوضاء السوق إلى غرفة تشغيل.",
      body:
        "المشهد السينمائي يختصر الفكرة: لا تبدأ من قالب متجر أو إعلان منسوخ. تبدأ من إشارة، ثم يتحول كل قرار إلى خطوة قابلة للقياس.",
      mobileTitle: "النظام لا يظهر دفعة واحدة. يتكوّن مع كل قرار.",
      mobileBody:
        "على الموبايل نعرض نسخة خفيفة من المشهد حتى تبقى التجربة سريعة وواضحة، بدون تحميل كامل فريمات الديسكتوب.",
    },
    mechanism: {
      eyebrow: "آلية التشغيل",
      title: "كل خطوة لها سبب قبل أن تأخذ من ميزانيتك.",
      body:
        "المنهج لا يبيعك حماسًا. هو يربط المنتج، العرض، المتجر، الإعلان، والقرار التالي داخل حلقة تشغيل واحدة.",
      steps: [
        { n: "01", title: "فلترة الطلب", body: "نبحث عن إشارات شراء قابلة للاختبار قبل اختيار المنتج." },
        { n: "02", title: "هندسة العرض", body: "نصيغ سبب الشراء والثقة والاعتراضات قبل وصول الترافيك." },
        { n: "03", title: "بناء المتجر", body: "واجهة سريعة ومقنعة تحمل منطق العرض لا مجرد شكل جميل." },
        { n: "04", title: "قرار الإعلان", body: "كل حملة تنتهي بقرار واضح: تحسين، إيقاف، أو توسّع." },
      ],
    },
    roadmap: {
      eyebrow: "خريطة التنفيذ",
      title: "45 يومًا تُدار كسبرنت تشغيل، لا كقائمة فيديوهات.",
      body:
        "كل مرحلة تسلم ما بعدها: فهم النموذج، اختيار السوق، تجهيز العرض، بناء المتجر، اختبار الإعلان، ثم قرار التوسّع أو التعديل.",
    },
    proof: {
      eyebrow: "إثبات حقيقي",
      title: "لقطات موجودة فقط. بلا مسرحية وعود.",
      body:
        "نعرض أصولًا حقيقية من المشروع: محادثات، لقطات Funnel، وشواهد منصة. لا أرقام مخترعة، ولا اقتباسات مصنوعة، ولا لوجوهات مزيفة.",
      transparency: "النتائج تختلف حسب السوق، جودة المنتج، سرعة التنفيذ، وقوة العرض.",
    },
    founder: {
      eyebrow: "من يقود النظام",
      title: "يوسف عادل كصاحب تشغيل، لا كواجهة ضجيج.",
      body:
        "دور المؤسس هنا ليس الظهور، بل تثبيت المنهج: فهم اختلاف السوق الأمريكي والخليجي، جودة العرض، وقرارات الاختبار التي تمنع الإنفاق الأعمى.",
      quote: "التحول يبدأ عندما تتوقف التجارة عن كونها حظًا وتصبح نظامًا يمكن قياسه.",
    },
    offer: {
      eyebrow: "العرض",
      title: "لا تبدأ من صفحة بيضاء. تبدأ من متجر جاهز للاختبار.",
      body:
        "المقعد لا يكتفي بالمنهج: متجر مجاني بمنتج إلى منتجين، فريق Media Buying حول الإعلانات، اجتماع أسبوعي مع يوسف، ومسار استرداد مشروط عند إثبات 50 أوردر في السوق السعودي.",
      supportTitle: "دعم حول القرار التالي",
      supportBody: "مراجعة طلبك، استشارة 20 دقيقة، ثم متابعة تجعل كل خطوة مرتبطة بالسوق والعرض والحملة التالية.",
    },
    faq: {
      eyebrow: "اعتراضات عملية",
      title: "الأسئلة التي تحدد هل هذا مناسب لك أم لا.",
      body: "إجابات مختصرة على نقاط القرار: الخبرة، الميزانية، السوق، الدعم، والواقعية.",
      items: [
        { q: "هل أحتاج خبرة سابقة؟", a: "لا. المسار يبدأ من الأساسيات، لكنه يتطلب تنفيذًا جادًا وليس مشاهدة فقط." },
        { q: "هل أحتاج ميزانية كبيرة؟", a: "لا. الفكرة أن تبدأ باختبار مضبوط، وتقرأ الأرقام قبل التوسّع." },
        { q: "هل يناسب السوق السعودي؟", a: "نعم. توجد معالجة مختلفة للسوق السعودي والخليجي بدل نسخ السوق الأمريكي." },
        { q: "هل المتجر المجاني حقيقي؟", a: "نعم بعد إتمام البرنامج، مع منتج إلى منتجين جاهزين للاختبار حسب السوق المختار." },
        { q: "هل توجد وعود أرباح؟", a: "لا. لا نضمن نتيجة مالية. نضمن أن المسار أكثر وضوحًا وانضباطًا من التخمين." },
      ],
    },
    finalCta: {
      eyebrow: "الخطوة التالية",
      title: "إذا كنت تريد متجرًا مبنيًا على قرار، ابدأ من الطلب.",
      body: "الطلب يحدد التوافق أولًا. إذا كان مناسبًا، تنتقل إلى استشارة مركزة ومسار تشغيل أوضح للسوق الذي تختاره.",
    },
  },
  en: {
    hero: {
      headline: "Turn dropshipping from gambling into a decision system.",
      body:
        "Before the store or the ad, learn how to validate demand, shape the offer, test the market, and read the numbers without guessing.",
      primary: "Start your application",
      secondary: "Watch founder video",
      proof: ["45-day operating roadmap", "U.S. and Saudi/Gulf markets", "Free store build after completion"],
    },
    scrollFilm: {
      label: "Transformation scene",
      title: "From market noise to an operating room.",
      body:
        "The cinematic sequence carries the core idea: you do not start with a store template or copied ad. You start with one signal, then every decision becomes measurable.",
      mobileTitle: "The system forms one decision at a time.",
      mobileBody:
        "Mobile gets a lighter cinematic cut so the experience stays sharp without loading the full desktop frame sequence.",
    },
    mechanism: {
      eyebrow: "Mechanism",
      title: "Every step has a reason before it uses budget.",
      body:
        "This is not motivation. It connects product, offer, store, ad test, and next decision into one operating loop.",
      steps: [
        { n: "01", title: "Demand filter", body: "Find testable purchase signals before choosing the product." },
        { n: "02", title: "Offer engineering", body: "Shape the reason to buy, trust layer, and objections before traffic arrives." },
        { n: "03", title: "Store build", body: "A fast, credible storefront that carries the offer logic." },
        { n: "04", title: "Ad decision", body: "Every campaign ends with a clear choice: improve, stop, or scale." },
      ],
    },
    roadmap: {
      eyebrow: "Execution map",
      title: "45 days run as an operating sprint, not a pile of videos.",
      body:
        "Each stage feeds the next: business model, market choice, offer, store build, ad test, then a decision to improve, stop, or scale.",
    },
    proof: {
      eyebrow: "Real proof",
      title: "Existing captures only. No success theatre.",
      body:
        "The proof system uses real local assets: conversations, funnel screenshots, and platform captures. No financial promises, fabricated quotes, or fake logos.",
      transparency: "Results vary by market, product quality, execution speed, and offer strength.",
    },
    founder: {
      eyebrow: "Operator behind it",
      title: "Youssef Adel as an operator, not a hype layer.",
      body:
        "The founder section builds trust in the method: U.S. versus Gulf market differences, offer quality, and test decisions that prevent blind spend.",
      quote: "The shift begins when ecommerce stops being luck and becomes a system you can measure.",
    },
    offer: {
      eyebrow: "Offer",
      title: "Do not start from a blank page. Start from a test-ready store.",
      body:
        "The seat is not only curriculum: a free store build with one to two products, media-buying support around ads, weekly one-on-one review with Youssef, and a conditional refund path when 50 Saudi-market orders are proven.",
      supportTitle: "Support around the next decision",
      supportBody: "Application review, a 20-minute consultation, then guidance that keeps the next market, offer, and campaign decision connected.",
    },
    faq: {
      eyebrow: "Practical objections",
      title: "The questions that decide whether this is right for you.",
      body: "Short answers on experience, budget, market fit, support, and realistic expectations.",
      items: [
        { q: "Do I need prior experience?", a: "No. The path starts from fundamentals, but it requires serious execution rather than passive watching." },
        { q: "Do I need a large budget?", a: "No. The point is controlled testing and reading numbers before scaling." },
        { q: "Does it fit the Saudi market?", a: "Yes. Saudi and Gulf positioning are handled differently instead of copying the U.S. market." },
        { q: "Is the free store build real?", a: "Yes, after completion, with one to two products prepared for testing in your selected market." },
        { q: "Are profit outcomes guaranteed?", a: "No. Financial outcomes are not guaranteed. The promise is a clearer operating path than guessing." },
      ],
    },
    finalCta: {
      eyebrow: "Next move",
      title: "If you want a store built on decisions, start with the application.",
      body: "The application checks fit first. If the fit is right, the next step is a focused consultation and a clearer operating path for your market.",
    },
  },
} satisfies Record<"ar" | "en", MarketingCopy>;

export const scrollFilmPhases = {
  ar: [
    { n: "01", time: "00-20%", title: "الفوضى تظهر", body: "منتج، إعلان، متجر، وسوق بلا ترتيب تشغيل واضح." },
    { n: "02", time: "20-45%", title: "الإشارات تتجمع", body: "الطلب، المورد، السعر، والثقة تصبح مدخلات لا آراء." },
    { n: "03", time: "45-70%", title: "النظام يتكوّن", body: "كل قرار يأخذ مكانه داخل تسلسل قابل للتكرار." },
    { n: "04", time: "70-100%", title: "جاهز للتشغيل", body: "المتجر والعرض والاختبار يتحولون إلى مسار واحد." },
  ],
  en: [
    { n: "01", time: "00-20%", title: "Chaos shows up", body: "Product, ad, store, and market with no operating order." },
    { n: "02", time: "20-45%", title: "Signals gather", body: "Demand, supplier, price, and trust become inputs instead of opinions." },
    { n: "03", time: "45-70%", title: "The system forms", body: "Every decision finds a place in a repeatable sequence." },
    { n: "04", time: "70-100%", title: "Ready to operate", body: "Store, offer, and test become one path." },
  ],
} satisfies Record<"ar" | "en", ScrollFilmPhase[]>;

export const proofAssets = {
  ar: [
    {
      src: "/proof/proof-order-signal.webp",
      alt: "لقطة محادثة طلب حقيقي من أصول إيكوم فينوم",
      label: "إشارة طلب مباشرة",
      market: "واتساب / EasyOrders",
      note: "لقطة حقيقية من محادثة وطلب ظاهر، تستخدم كدليل سياقي لا كوعد دخل.",
    },
    {
      src: "/proof/proof-student-dashboard.webp",
      alt: "لقطة نتيجة طالب أو منصة من أصول إيكوم فينوم",
      label: "نتيجة طالب موثقة",
      market: "منصة / مبيعات",
      note: "لقطة تعرض مبيعات وطلبات من تجربة طالب، بدون إضافة أرقام خارج الصورة.",
    },
    {
      src: "/proof/proof-first-day-orders.webp",
      alt: "لقطة Funnel حقيقية من أصول إيكوم فينوم",
      label: "طلبات يوم التشغيل",
      market: "تشغيل / واتساب",
      note: "محادثات وطلبات موثقة من أصل موجود، مع إخفاء أي بيانات شخصية.",
    },
  ],
  en: [
    {
      src: "/proof/proof-order-signal.webp",
      alt: "Real order conversation capture from ECOMVENOM assets",
      label: "Demand signal",
      market: "WhatsApp / EasyOrders",
      note: "A real conversation and visible order capture, used as context rather than an income promise.",
    },
    {
      src: "/proof/proof-student-dashboard.webp",
      alt: "Real student or platform progress capture from ECOMVENOM assets",
      label: "Verified student result",
      market: "Platform / sales",
      note: "A capture showing sales and orders from a student context, without adding numbers outside the image.",
    },
    {
      src: "/proof/proof-first-day-orders.webp",
      alt: "Real funnel screenshot from ECOMVENOM assets",
      label: "Launch-day orders",
      market: "Execution / WhatsApp",
      note: "Documented chats and orders from an existing asset, with personal data withheld.",
    },
  ],
} satisfies Record<"ar" | "en", ProofAsset[]>;

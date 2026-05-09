export type Lang = "en" | "ar";

export const defaultLang: Lang = "en";

export const translations = {
  en: {
    // Nav
    applyBtn: "Apply",
    ctaLabel: "APPLY FOR THE PROGRAM",
    ctaSub: "LIMITED SPOTS*",
    statusOnline: "SYSTEM ONLINE",
    statusApply: "APPLY",
    statusStart: "START",
    statusConfirmed: "CONFIRMED",
    langToggle: "عربي",

    // Hero
    heroEyebrow: "FOR SERIOUS LEARNERS WHO WANT TO BUILD A SUSTAINABLE, CONSISTENT BUSINESS",
    heroSub: "A complete A-Z roadmap for U.S. and Saudi/Gulf markets. No wasted money. No random tutorials. No fluff.",
    heroScrollCue: "Scroll to see the system",

    // Common
    skipToContent: "Skip to content",
    playVsl: "Watch founder VSL",
    closePlayer: "Close mini player",
    miniPlayerLabel: "Mini VSL Player",
  },
  ar: {
    // Nav
    applyBtn: "تقدّم",
    ctaLabel: "قدّم طلبك للبرنامج",
    ctaSub: "أماكن محدودة*",
    statusOnline: "النظام يعمل",
    statusApply: "تقدّم",
    statusStart: "ابدأ",
    statusConfirmed: "تأكّد",
    langToggle: "EN",

    // Hero
    heroEyebrow: "للمتعلّمين الجادّين الذين يريدون بناء عمل تجاري مستدام ومتسق",
    heroSub: "خارطة طريق متكاملة من الألف إلى الياء للأسواق الأمريكية والسعودية/الخليجية. بدون أموال مهدرة أو دروس عشوائية أو ثرثرة.",
    heroScrollCue: "اسحب للأسفل لرؤية النظام",

    // Common
    skipToContent: "تخطّ إلى المحتوى",
    playVsl: "شاهد VSL المؤسّس",
    closePlayer: "إغلاق المشغّل الصغير",
    miniPlayerLabel: "مشغّل VSL صغير",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(lang: Lang, key: TranslationKey): string {
  return (translations[lang] as Record<string, string>)[key] ?? (translations.en as Record<string, string>)[key] ?? key;
}

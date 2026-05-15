"use client";

import { DocumentStack, type DocumentStackItem } from "@/components/venom/DocumentStack";
import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { useLang } from "@/lib/lang-context";

const copy = {
  en: {
    eyebrow: "THE STACK",
    title: "Every decision enters one operating order.",
    body: "The page is built around a simple sequence: product signal, store build, ad test, market fit, validation. No loose tactic gets to run the business.",
    console: "CONTROL STACK",
  },
  ar: {
    eyebrow: "التكديس التشغيلي",
    title: "كل قرار يدخل في ترتيب تشغيل واحد.",
    body: "المنظومة مبنية على تسلسل واضح: إشارة المنتج، بناء المتجر، اختبار الإعلان، السوق، ثم التحقق. لا توجد تكتيكات مفككة تقود المشروع.",
    console: "تكديس التحكم",
  },
} as const;

export function SystemStackSection() {
  const { lang } = useLang();
  const c = lang === "ar" ? copy.ar : copy.en;
  const docs: DocumentStackItem[] = [
    {
      label: "01",
      title: lang === "ar" ? "Product Signal / إشارة المنتج" : "Product Signal",
      body: lang === "ar" ? "فلترة طلب حقيقي قبل فتح المتجر أو إنفاق الإعلان." : "Filter real demand before store work or ad spend starts.",
      status: "SIGNAL",
    },
    {
      label: "02",
      title: lang === "ar" ? "Store Build / بناء المتجر" : "Store Build",
      body: lang === "ar" ? "صفحة تثبت الثقة وتوضح العرض وتزيل الاحتكاك." : "A page that builds trust, clarifies the offer, and reduces friction.",
      status: "BUILD",
    },
    {
      label: "03",
      title: lang === "ar" ? "Ad Test / اختبار الإعلان" : "Ad Test",
      body: lang === "ar" ? "حملة تُقاس بقرار واضح: استمرار، تعديل، أو إيقاف." : "Campaigns are measured toward one decision: continue, adjust, or stop.",
      status: "TEST",
    },
    {
      label: "04",
      title: lang === "ar" ? "Market / السوق" : "Market",
      body: lang === "ar" ? "اختيار بين السوق الأمريكي والسعودي/الخليجي بمنطق مختلف لكل سوق." : "Choose U.S. or Saudi/Gulf with a different operating logic for each.",
      status: "FIT",
    },
    {
      label: "05",
      title: lang === "ar" ? "Validation / التحقق" : "Validation",
      body: lang === "ar" ? "قراءة الأرقام قبل التوسّع حتى لا يصبح النمو عشوائياً." : "Read the numbers before scaling so growth does not become random.",
      status: "READ",
    },
  ];

  return (
    <SectionWrapper id="system-stack">
      <div className="vx-shell vx-grid vx-grid--two">
        <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
        <GlassPanel className="vx-console" variant="strong" data-vx-reveal>
          <div className="vx-console__top">
            <span>{c.console}</span>
            <span>05 FILES</span>
          </div>
          <DocumentStack items={docs} />
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}

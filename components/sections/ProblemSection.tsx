"use client";

import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { useLang } from "@/lib/lang-context";

const copy = {
  en: {
    eyebrow: "CHAOS BEFORE SYSTEM",
    title: "The loss is rarely one mistake.",
    body: "It is a chain: a weak product, a copied offer, scattered tools, unclear validation, and ad spend moving faster than the operator can think.",
    cards: [
      ["01", "Wrong market", "A product can look promising and still be wrong for the buyer, payment behavior, or delivery expectation."],
      ["02", "Scattered tools", "Research, store work, suppliers, content, and ads live in separate tabs with no operating order."],
      ["03", "Wasted ad spend", "Budget leaks when the test has no diagnosis plan before the first campaign goes live."],
      ["04", "Weak offer", "The store may look finished while the buyer still has no sharp reason to trust or buy now."],
      ["05", "Unclear validation", "Clicks, carts, ROAS, and comments mean nothing until they are read inside one decision system."],
    ],
  },
  ar: {
    eyebrow: "الفوضى قبل النظام",
    title: "الخسارة غالباً لا تأتي من خطأ واحد.",
    body: "هي سلسلة: منتج ضعيف، عرض منسوخ، أدوات متفرقة، اختبار بلا وضوح، وإنفاق أسرع من قدرة صاحب المتجر على التشخيص.",
    cards: [
      ["01", "سوق غير مناسب", "قد يبدو المنتج واعداً، لكنه لا يناسب سلوك الشراء أو الدفع أو التوصيل في السوق المختار."],
      ["02", "أدوات متفرقة", "البحث، المتجر، المورد، المحتوى، والإعلانات كلها في تبويبات منفصلة بلا ترتيب تشغيل واضح."],
      ["03", "ميزانية تُهدر", "ينزف الإعلان عندما يبدأ الاختبار بلا خطة تشخيص قبل إطلاق أول حملة."],
      ["04", "عرض ضعيف", "قد يبدو المتجر مكتملاً، لكن العميل لا يجد سبباً حاداً للثقة والشراء الآن."],
      ["05", "تحقق غير واضح", "النقرات والسلات وROAS لا تعني شيئاً إذا لم تُقرأ داخل نظام قرار واحد."],
    ],
  },
} as const;

export function ProblemSection() {
  const { lang } = useLang();
  const c = lang === "ar" ? copy.ar : copy.en;

  return (
    <SectionWrapper id="problem" className="vx-section--compact">
      <div className="vx-shell vx-problem-diagnostic">
        <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} tone="danger" wide />
        <GlassPanel className="vx-problem-rail" variant="danger" data-vx-reveal>
          <div className="vx-console__top">
            <span>{lang === "ar" ? "تشخيص النزيف" : "LOSS DIAGNOSTIC"}</span>
            <span>{lang === "ar" ? "05 تسريبات" : "05 LEAKS"}</span>
          </div>
          <div className="vx-leak-list">
          {c.cards.map(([index, title, body]) => (
            <article className="vx-leak-row" key={title}>
              <span>{index}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
          </div>
          <p className="vx-mini">{lang === "ar" ? "الهدف: إيقاف التسريب قبل زيادة الإنفاق" : "Goal: stop the leak before spend increases"}</p>
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}

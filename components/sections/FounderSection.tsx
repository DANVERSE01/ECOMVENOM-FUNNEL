"use client";

import Image from "next/image";
import { BentoCard } from "@/components/venom/BentoCard";
import { BentoGrid } from "@/components/venom/BentoGrid";
import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

const copy = {
  en: {
    eyebrow: "FOUNDER",
    title: "Youssef Adel, without the hype layer.",
    body: "The founder story is used for credibility only: a practical operator focused on product choice, market differences, offer quality, and disciplined execution.",
    quote: "The shift happens when ecommerce stops being luck and starts being a system you can measure.",
    cards: [
      ["01", "Dual-market thinking", "U.S. and Saudi/Gulf customers are treated as different buyers, not one copied playbook."],
      ["02", "Marketing-first execution", "Creators, content, and trust-building are tied to conversion, not vanity reach."],
    ],
  },
  ar: {
    eyebrow: "المؤسس",
    title: "يوسف عادل، بدون طبقة الضجيج.",
    body: "نستخدم قصة المؤسس لبناء الثقة فقط: مشغّل عملي يركّز على اختيار المنتج، اختلاف الأسواق، جودة العرض، والانضباط في التنفيذ.",
    quote: "التحول يبدأ عندما تتوقف التجارة عن كونها حظاً وتصبح نظاماً يمكن قياسه.",
    cards: [
      ["01", "فهم سوقين مختلفين", "العميل الأمريكي والعميل السعودي/الخليجي ليسا نفس الشخص ولا يحتاجان نفس العرض."],
      ["02", "تسويق يخدم التحويل", "المؤثرون والمحتوى وبناء الثقة تُستخدم لرفع احتمالية الشراء، لا للانتشار الفارغ."],
    ],
  },
} as const;

export function FounderSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].founder;
  const cards = lang === "ar" ? copy.ar.cards : copy.en.cards;

  return (
    <SectionWrapper id="founder" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-founder">
        <GlassPanel className="vx-founder__media" variant="strong" data-vx-reveal>
          <Image
            src="/founder/youssef-founder-premium.webp"
            alt={lang === "ar" ? "يوسف عادل مؤسس إيكوم فينوم" : "Youssef Adel, founder of ECOMVENOM"}
            fill
            sizes="(min-width: 960px) 42vw, 92vw"
          />
        </GlassPanel>
        <div className="vx-copy">
          <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
          <blockquote className="vx-quote" data-vx-reveal>{c.quote}</blockquote>
          <BentoGrid data-vx-reveal>
            {cards.map(([index, title, body]) => (
              <BentoCard key={title} index={index} title={title} body={body} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </SectionWrapper>
  );
}

"use client";

import Image from "next/image";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

export function FounderSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].founder;

  return (
    <SectionWrapper id="founder" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-founder vx-founder--editorial">
        <GlassPanel className="vx-founder__media" variant="strong" data-vx-reveal>
          <Image
            src="/founder/youssef-founder-premium.webp"
            alt={lang === "ar" ? "يوسف عادل مؤسس إيكوم فينوم" : "Youssef Adel, founder of ECOMVENOM"}
            fill
            sizes="(min-width: 960px) 42vw, 92vw"
          />
        </GlassPanel>
        <div className="vx-founder__copy" data-vx-reveal>
          <span className="v2-label">{c.eyebrow}</span>
          <h2 className="vx-founder__title">{c.title}</h2>
          <p className="vx-founder__body">{c.body}</p>
          <blockquote className="vx-founder__quote">
            <p>{c.quote}</p>
          </blockquote>
        </div>
      </div>
    </SectionWrapper>
  );
}

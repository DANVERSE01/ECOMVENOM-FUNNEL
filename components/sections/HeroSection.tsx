"use client";

import { GlowButton } from "@/components/venom/GlowButton";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { VslStage } from "@/components/venom/VslStage";
import { SignalFieldScene } from "@/components/effects/SignalFieldScene";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

export function HeroSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].hero;

  return (
    <SectionWrapper id="system-boot" className="v2-hero" sceneTitle="ECOMVENOM">
      <div className="vx-shell v2-hero__grid">
        <div className="v2-hero__copy" data-vx-reveal>
          <h1 className="v2-hero__headline">{c.headline}</h1>
          <p className="v2-hero__body">{c.body}</p>
          <div className="vx-actions">
            <span data-hero-cta>
              <GlowButton href="/apply">{c.primary}</GlowButton>
            </span>
            <GlowButton href="#founder-vsl" variant="ghost">
              {c.secondary}
            </GlowButton>
          </div>
          <div className="v2-hero__proof" aria-label={lang === "ar" ? "دلائل مختصرة" : "Program proof points"}>
            {c.proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="v2-hero__media" data-vx-reveal>
          <SignalFieldScene />
          <div className="v2-hero__signal">
            <strong>{lang === "ar" ? "قرار قبل الإنفاق" : "Decision before spend"}</strong>
            <span>
              {lang === "ar"
                ? "الصفحة لا تبيع كورسًا عامًا. هي تفتح مسار تشغيل قابل للقياس."
                : "This page does not sell a generic course. It opens a measurable operating path."}
            </span>
          </div>
          <div id="founder-vsl" className="v2-hero__vsl">
            <VslStage
              label={lang === "ar" ? "فيديو المؤسس" : "Founder video"}
              playLabel={c.secondary}
              title={lang === "ar" ? "افتح ملخص التشغيل" : "Open the operating brief"}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

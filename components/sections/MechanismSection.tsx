"use client";

import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

export function MechanismSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].mechanism;

  return (
    <SectionWrapper id="mechanism" className="vx-section--compact" sceneTitle={c.eyebrow}>
      <div className="vx-shell v2-mechanism">
        <div className="v2-section-copy" data-vx-reveal>
          <span className="v2-label">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p>{c.body}</p>
        </div>
        <GlassPanel className="vx-command-board v2-mechanism__grid" variant="strong" data-vx-reveal>
          <div className="vx-console__top">
            <span>{lang === "ar" ? "خريطة التشغيل" : "OPERATING MAP"}</span>
            <span>{lang === "ar" ? "حلقة قرار واحدة" : "ONE DECISION LOOP"}</span>
          </div>
          {c.steps.map((step) => (
            <article className="v2-mechanism__step" key={step.n}>
              <span>{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}

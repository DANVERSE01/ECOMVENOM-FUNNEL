"use client";

import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

export function FaqSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].faq;

  return (
    <SectionWrapper id="faq" className="vx-section--compact" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-grid vx-grid--two">
        <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
        <div className="vx-faq-list" data-vx-reveal>
          {c.items.map((item, index) => (
            <GlassPanel key={item.q} className="vx-faq">
              <details open={index === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            </GlassPanel>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

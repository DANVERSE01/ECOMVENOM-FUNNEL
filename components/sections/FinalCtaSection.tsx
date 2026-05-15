"use client";

import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { GlowButton } from "@/components/venom/GlowButton";
import { MobileCTA } from "@/components/venom/MobileCTA";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/lang-context";

export function FinalCtaSection() {
  const { lang } = useLang();
  const { CTA_LABEL } = useContent();
  const c = recoveryCopy[lang].finalCta;

  return (
    <SectionWrapper id="final-cta" className="vx-section--final" finalCtaZone sceneTitle={c.eyebrow}>
      <div className="vx-shell">
        <GlassPanel className="vx-final-panel v2-final" variant="strong" data-vx-reveal>
          <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} wide />
          <div>
            <GlowButton href="/apply">{CTA_LABEL}</GlowButton>
          </div>
        </GlassPanel>
      </div>
      <MobileCTA />
    </SectionWrapper>
  );
}

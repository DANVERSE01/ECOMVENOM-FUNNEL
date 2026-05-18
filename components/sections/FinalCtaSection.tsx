"use client";

import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement | null>(null);

  // The horizontal "door" hairline above the panel animates from edge to
  // centre when the section enters view. Driven via a data attribute so the
  // animation can be paused under prefers-reduced-motion via CSS only.
  useEffect(() => {
    const section = document.getElementById("final-cta");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.setAttribute("data-door", "visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  void sectionRef;

  return (
    <SectionWrapper id="final-cta" className="vx-section--final" finalCtaZone sceneTitle={c.eyebrow}>
      <span className="vx-final-door" aria-hidden="true" />
      <div className="vx-shell">
        <GlassPanel className="vx-final-panel v2-final surface-acid-emissive" variant="strong" data-vx-reveal>
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

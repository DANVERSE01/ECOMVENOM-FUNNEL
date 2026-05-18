"use client";

import { useEffect } from "react";
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

  return (
    <SectionWrapper id="final-cta" className="vx-section--final" finalCtaZone sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-final-cta">
        <div className="vx-final-cta__content" data-vx-reveal>
          <span className="v2-label">{c.eyebrow}</span>
          <h2 className="vx-final-cta__title">{c.title}</h2>
          <p className="vx-final-cta__body">{c.body}</p>
          <div className="vx-final-cta__action">
            <GlowButton href="/apply">{CTA_LABEL}</GlowButton>
          </div>
        </div>
      </div>
      <MobileCTA />
    </SectionWrapper>
  );
}

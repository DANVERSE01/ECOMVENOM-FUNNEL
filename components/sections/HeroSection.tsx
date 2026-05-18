"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { GlowButton } from "@/components/venom/GlowButton";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { VslStage } from "@/components/venom/VslStage";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";
import { useMagnetic } from "@/lib/magnetic";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { revealHeadline } from "@/lib/motion";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].hero;
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const magRef = useMagnetic<HTMLSpanElement>(0.22, 130);
  const isDesktop = useMediaQuery("(min-width: 769px)");

  useGSAP(() => {
    const split = revealHeadline(headlineRef.current);
    return () => split?.revert();
  }, []);

  return (
    <SectionWrapper id="system-boot" className="v2-hero v2-hero--vsl-first" sceneTitle="ECOMVENOM">
      <div className="v2-hero__scene-canvas" aria-hidden="true">
        {isDesktop ? <HeroScene /> : null}
      </div>
      <div className="vx-shell v2-hero__vsl-first-grid">
        <div id="founder-vsl" className="v2-hero__vsl-dominant" data-vx-reveal>
          <VslStage
            playLabel={c.secondary}
            pauseLabel={lang === "ar" ? "إيقاف مؤقت" : "Pause video"}
            soundLabel={lang === "ar" ? "تشغيل الصوت" : "Sound on"}
            mutedLabel={lang === "ar" ? "كتم الصوت" : "Mute"}
            blockedLabel={lang === "ar" ? "اضغط للتشغيل بالصوت" : "Tap to play with sound"}
            controlsLabel={lang === "ar" ? "أزرار التحكم" : "Video controls"}
            title={lang === "ar" ? "فيديو المؤسس" : "Founder video"}
          />
        </div>

        <div className="v2-hero__support" data-vx-reveal>
          <h1 ref={headlineRef} className="v2-hero__headline">
            {c.headline}
          </h1>
          <p className="v2-hero__body">{c.body}</p>
          <div className="vx-actions">
            <span ref={magRef} data-hero-cta>
              <GlowButton href="/apply">{c.primary}</GlowButton>
            </span>
            <GlowButton href="#founder-vsl" variant="ghost">
              {c.secondary}
            </GlowButton>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

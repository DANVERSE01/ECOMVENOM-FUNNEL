"use client";

import { LusionMonitorScrollScene } from "@/components/cinematic/LusionMonitorScrollScene";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { HIGGSFIELD_FRAMES, HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { useLang } from "@/lib/lang-context";

export function ScrollFilmSection() {
  const { lang } = useLang();

  return (
    <SectionWrapper id="chaos-system-film" className="v2-scroll-film v2-scroll-film--visual">
      <div className="v2-scroll-film__track">
        <div className="v2-scroll-film__pin">
          <h2 className="sr-only">
            {lang === "ar" ? "مشهد تحول بصري من الفوضى إلى النظام" : "Visual transformation scene from chaos to system"}
          </h2>
          <LusionMonitorScrollScene
            alt={lang === "ar" ? "مشهد هيجسفيلد يتحول مع الاسكرول من الفوضى إلى النظام" : "Higgsfield scroll scene transforming chaos into system"}
            assets={{
              frames: HIGGSFIELD_FRAMES,
              mobileVideo: "/media/chaos-system.mp4",
              monitorFrame: "/textures/lusion-monitor-frame.webp",
              poster: HIGGSFIELD_FRAMES[0] ?? HIGGSFIELD_STILLS.systemIntro,
            }}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

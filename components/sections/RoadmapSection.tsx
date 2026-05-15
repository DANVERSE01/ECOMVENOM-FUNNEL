"use client";

import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { TimelineStep } from "@/components/venom/TimelineStep";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/lang-context";

export function RoadmapSection() {
  const { lang } = useLang();
  const { curriculum } = useContent();
  const c = recoveryCopy[lang].roadmap;

  return (
    <SectionWrapper id="roadmap" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-grid vx-grid--two">
        <GlassPanel className="vx-roadmap-panel" variant="signal" data-vx-reveal>
          <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
          <p className="vx-mini">{lang === "ar" ? "من إشارة المنتج إلى قرار التوسع" : "From product signal to scale decision"}</p>
        </GlassPanel>
        <div className="vx-timeline-list" data-vx-reveal>
          {curriculum.modules.map((module) => (
            <TimelineStep key={module.n} index={module.n} title={module.title} body={module.bullets.join(" / ")} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

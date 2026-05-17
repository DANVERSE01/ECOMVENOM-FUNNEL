"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = list.querySelectorAll<HTMLElement>(".vx-timeline");
    if (!steps.length) return;

    gsap.set(steps, { opacity: 0, y: 28, filter: "blur(3px)" });

    ScrollTrigger.create({
      trigger: list,
      start: "top 80%",
      onEnter: () => {
        gsap.to(steps, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "expo.out",
          stagger: { amount: 0.5, from: "start" },
        });
      },
    });
  }, { scope: listRef });

  return (
    <SectionWrapper id="roadmap" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-grid vx-grid--two">
        <GlassPanel className="vx-roadmap-panel" variant="signal" data-vx-reveal>
          <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
          <p className="vx-mini">{lang === "ar" ? "من إشارة المنتج إلى قرار التوسع" : "From product signal to scale decision"}</p>
        </GlassPanel>
        <div ref={listRef} className="vx-timeline-list">
          {curriculum.modules.map((module) => (
            <TimelineStep key={module.n} index={module.n} title={module.title} body={module.bullets.join(" / ")} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

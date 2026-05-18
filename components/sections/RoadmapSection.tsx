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

const TOTAL_SPRINT_DAYS = 45;

/**
 * computeSprintRange — distributes the 45-day operating sprint across the
 * curriculum modules. Index is 0-based. Returns a label like "D1–D7".
 *
 * Pure function; derives only from existing data shape (no copy edits).
 */
function computeSprintRange(index: number, total: number) {
  if (total <= 0) return null;
  const stride = TOTAL_SPRINT_DAYS / total;
  const startDay = Math.round(index * stride) + 1;
  const endDay = Math.min(TOTAL_SPRINT_DAYS, Math.round((index + 1) * stride));
  return `D${startDay}–D${endDay}`;
}

export function RoadmapSection() {
  const { lang } = useLang();
  const { curriculum } = useContent();
  const c = recoveryCopy[lang].roadmap;
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = list.querySelectorAll<HTMLElement>(".vx-timeline");
    if (!steps.length) return;

    gsap.set(steps, { opacity: 0, y: 28, filter: "blur(3px)" });

    const enterTrigger = ScrollTrigger.create({
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

    // Sweep hairline animation on enter.
    const section = document.getElementById("roadmap");
    let sweepTrigger: ScrollTrigger | null = null;
    if (section) {
      sweepTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        once: true,
        onEnter: () => {
          section.classList.add("vx-section--sweep-in");
        },
      });
    }

    return () => {
      enterTrigger.kill();
      sweepTrigger?.kill();
    };
  }, { scope: listRef });

  // Refs typing: SectionWrapper internally creates its own ref so the
  // section element used by `vx-roadmap-sweep` is queried via `#roadmap`.
  void sectionRef;

  return (
    <SectionWrapper id="roadmap" sceneTitle={c.eyebrow}>
      <span className="vx-roadmap-sweep" aria-hidden="true" />
      <div className="vx-shell vx-grid vx-grid--two">
        <GlassPanel className="vx-roadmap-panel" variant="signal" data-vx-reveal>
          <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
          <p className="vx-mini">
            {lang === "ar"
              ? "سبرنت تشغيل لمدة 45 يوماً — من إشارة المنتج إلى قرار التوسع"
              : "A 45-day operating sprint — from product signal to scale decision"}
          </p>
        </GlassPanel>
        <div ref={listRef} className="vx-timeline-list">
          {curriculum.modules.map((module, index) => {
            const range = computeSprintRange(index, curriculum.modules.length);
            return (
              <TimelineStep
                key={module.n}
                index={module.n}
                title={
                  <>
                    {range ? <span className="vx-timeline__sprint">{range}</span> : null}
                    <span className="vx-timeline__title">{module.title}</span>
                  </>
                }
                body={module.bullets.join(" / ")}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

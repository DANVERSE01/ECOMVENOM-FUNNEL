"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CinematicPanel } from "@/components/ui/CinematicPanel";
import { Countdown } from "@/components/schedule/countdown";
import { ScheduleBoard } from "@/components/schedule/schedule-board";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { useContent } from "@/lib/useContent";

export function SchedulePageShell() {
  const { schedule } = useContent();

  return (
    <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.ecomvenomLockup} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.09]" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 64% 46% at 88% -6%, rgba(213,217,4,0.10), transparent 70%), radial-gradient(ellipse 50% 36% at 6% 78%, rgba(92,62,11,0.10), transparent 72%), linear-gradient(180deg, #010101 0%, #0B0A08 56%, #010101 100%)",
        }} />
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "linear-gradient(rgba(228,225,220,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(228,225,220,0.018) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 80%, transparent)",
        }} />
      </div>
      <Container className="relative z-10 max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-acid">
          {schedule.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.012em] text-bone sm:text-7xl lg:text-8xl">
          {schedule.heading}
        </h1>
        <p className="mt-3 text-base text-bone-2 sm:text-lg">{schedule.sub}</p>

        <CinematicPanel className="mt-6 p-4">
          <Countdown />
        </CinematicPanel>

        <p className="mt-8 font-display text-xl font-semibold uppercase tracking-[0.04em] text-bone sm:text-2xl">
          {schedule.cta}
        </p>

        <div className="mt-6">
          <ScheduleBoard />
        </div>
      </Container>
    </section>
  );
}

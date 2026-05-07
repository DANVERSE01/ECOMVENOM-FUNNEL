import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CinematicPanel } from "@/components/ui/CinematicPanel";
import { Countdown } from "@/components/schedule/countdown";
import { ScheduleBoard } from "@/components/schedule/schedule-board";
import { schedule } from "@/lib/content";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";

export const metadata: Metadata = {
  title: "Schedule your call — ECOMVENOM",
  description:
    "Final step: schedule your free 20-minute discovery call with the ECOMVENOM team.",
  robots: { index: false, follow: false },
};

export default function SchedulePage() {
  return (
    <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.ecomvenomLockup} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.72))]" />
      </div>
      <Container className="relative z-10 max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-venom">
          {schedule.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.88] tracking-tightest">
          {schedule.heading}
        </h1>
        <p className="mt-3 text-ash text-base sm:text-lg">{schedule.sub}</p>

        <CinematicPanel className="mt-6 p-4">
          <Countdown />
        </CinematicPanel>

        <p className="mt-8 font-display text-xl sm:text-2xl uppercase tracking-tight">
          {schedule.cta}
        </p>

        <div className="mt-6">
          <ScheduleBoard />
        </div>
      </Container>
    </section>
  );
}

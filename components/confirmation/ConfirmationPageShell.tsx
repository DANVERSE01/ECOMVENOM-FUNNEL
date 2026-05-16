"use client";

import { Container } from "@/components/ui/container";
import { PreCallSteps } from "@/components/confirmation/pre-call-steps";
import { LusionMonitorScrollScene } from "@/components/cinematic/LusionMonitorScrollScene";
import { HIGGSFIELD_FRAMES, HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { useContent } from "@/lib/useContent";

export function ConfirmationPageShell() {
  const { confirmation } = useContent();

  return (
    <>
      <div className="border-b border-gold/25 bg-gold/10 pb-2 pt-20 text-center font-heading text-xs uppercase tracking-caps text-gold sm:text-sm">
        {confirmation.banner}
      </div>

      <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
        {/* Monitor scene background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ opacity: 0.38 }}
          aria-hidden
        >
          <LusionMonitorScrollScene
            alt="ECOMVENOM system scene"
            assets={{
              frames: HIGGSFIELD_FRAMES,
              mobileVideo: "/media/chaos-system.mp4",
              monitorFrame: "/textures/lusion-monitor-frame.webp",
              poster: HIGGSFIELD_FRAMES[0] ?? HIGGSFIELD_STILLS.systemIntro,
            }}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_16%,rgba(0,0,0,0.88)_74%)] z-[1]" />

        <Container className="relative z-10 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <h1 className="font-display text-6xl uppercase leading-[1.02] tracking-tightest text-venom sm:text-8xl lg:text-9xl">
                {confirmation.h1}
              </h1>
              <p className="mt-4 font-display text-2xl uppercase leading-tight tracking-tight text-bone sm:text-3xl">
                {confirmation.sub}
              </p>
              <h2 className="mt-12 font-display text-xl uppercase tracking-tight text-bone sm:text-2xl">
                {confirmation.stepsHeading}
              </h2>
            </div>
            <div>
              <PreCallSteps />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

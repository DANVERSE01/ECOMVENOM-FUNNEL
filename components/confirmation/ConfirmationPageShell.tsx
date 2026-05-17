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
      <div className="border-b border-amber/40 bg-amber/15 pb-2 pt-20 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[#E47A3A] sm:text-xs">
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
              <h1 className="font-display text-6xl font-semibold leading-[1.02] tracking-[-0.012em] text-acid sm:text-8xl lg:text-9xl" style={{
                textShadow: "0 0 42px rgba(213,217,4,0.22)",
              }}>
                {confirmation.h1}
              </h1>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[0.02em] text-bone sm:text-3xl">
                {confirmation.sub}
              </p>
              <h2 className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-2 sm:text-xs">
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

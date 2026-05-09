"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PreCallSteps } from "@/components/confirmation/pre-call-steps";
import { CinematicLoopVideo } from "@/components/cinematic/CinematicLoopVideo";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { useContent } from "@/lib/useContent";

export function ConfirmationPageShell() {
  const { confirmation } = useContent();

  return (
    <>
      <div className="border-b border-gold/25 bg-gold/10 py-2 text-center font-heading text-xs uppercase tracking-caps text-gold sm:text-sm">
        {confirmation.banner}
      </div>

      <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image src={HIGGSFIELD_STILLS.ecomvenomLockup} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
          <CinematicLoopVideo
            src="/media/system-loop-02.mp4"
            poster={HIGGSFIELD_STILLS.ecomvenomLockup}
            preload="metadata"
            hideOnMobile
            className="opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_16%,rgba(0,0,0,0.9)_74%)]" />
        </div>
        <Container className="relative z-10 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <h1 className="font-display text-[clamp(4rem,9vw,8rem)] uppercase leading-[1.02] tracking-tightest text-venom">
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
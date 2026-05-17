"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ApplicationForm } from "@/components/apply/application-form";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/lang-context";

export function ApplyPageShell() {
  const { applyPage } = useContent();
  const { lang } = useLang();

  return (
    <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.1]" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 50% at 78% -10%, rgba(213,217,4,0.10), transparent 70%), radial-gradient(ellipse 50% 36% at 6% 38%, rgba(199,66,8,0.04), transparent 72%), linear-gradient(180deg, #010101 0%, #0B0A08 56%, #010101 100%)",
        }} />
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "linear-gradient(rgba(228,225,220,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(228,225,220,0.018) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 80%, transparent)",
        }} />
      </div>
      <Container className="relative z-10 grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-acid">
            {applyPage.step}
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.012em] text-bone sm:text-7xl lg:text-8xl">
            {applyPage.heading}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-bone-2 sm:text-lg">
            {applyPage.body}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ash-2" dir={lang === "ar" ? "rtl" : "ltr"}>
            {applyPage.duration}
          </p>
        </div>
        <div>
          <ApplicationForm />
        </div>
      </Container>
    </section>
  );
}

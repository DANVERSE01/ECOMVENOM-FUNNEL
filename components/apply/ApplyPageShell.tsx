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
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.94)_78%)]" />
      </div>
      <Container className="relative z-10 grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="font-mono text-[10px] text-venom">
            {applyPage.step}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] text-bone sm:text-7xl lg:text-8xl">
            {applyPage.heading}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">
            {applyPage.body}
          </p>
          <p className="mt-3 font-mono text-[10px] text-ash/70" dir={lang === "ar" ? "rtl" : "ltr"}>
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

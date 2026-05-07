import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ApplicationForm } from "@/components/apply/application-form";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";

export const metadata: Metadata = {
  title: "Apply — ECOMVENOM",
  description: "Apply for the ECOMVENOM dropshipping program. Limited spots.",
  robots: { index: false, follow: false },
};

export default function ApplyPage() {
  return (
    <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_78%)]" />
      </div>
      <Container className="relative z-10 grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="font-heading text-[10px] uppercase tracking-caps text-venom">
            STEP 1 OF 2
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.86] tracking-tightest">
            Apply for the program
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">
            Tell us about you. If we&apos;re a fit, you&apos;ll book a call on the next step.
          </p>
          <p className="mt-3 font-heading text-[10px] uppercase tracking-label text-ash/60">
            Application takes ~2 minutes
          </p>
        </div>
        <div>
          <ApplicationForm />
        </div>
      </Container>
    </section>
  );
}

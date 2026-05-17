"use client";

import Image from "next/image";
import { Container } from "./ui/container";
import { useContent } from "@/lib/useContent";

export function Footer() {
  const { footer } = useContent();

  return (
    <footer className="relative border-t border-bone/6 bg-ink py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/30 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle at 50% 100%, rgba(213,217,4,0.4), transparent 60%)",
      }} aria-hidden />
      <Container className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="relative block h-9 w-44 overflow-hidden">
          <Image
            src="/brand/ecomvenom-logo-final.png"
            alt="ECOMVENOM"
            fill
            sizes="176px"
            className="object-contain scale-[2.65] opacity-90"
          />
        </span>
        <div className="flex flex-col gap-2 text-sm text-ash sm:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-2/70">
            {footer.legal}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/65">
            {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

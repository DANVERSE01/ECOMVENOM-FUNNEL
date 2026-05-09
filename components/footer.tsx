"use client";

import Image from "next/image";
import { Container } from "./ui/container";
import { useContent } from "@/lib/useContent";

export function Footer() {
  const { footer } = useContent();

  return (
    <footer className="relative border-t border-white/6 bg-ink py-12">
      {/* Venom hairline accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-venom/15 to-transparent" aria-hidden />
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="relative block h-9 w-44 overflow-hidden">
          <Image
            src="/brand/ecomvenom-logo-final.png"
            alt="ECOMVENOM"
            fill
            sizes="176px"
            className="object-contain scale-[2.65] opacity-80"
          />
        </span>
        <div className="flex flex-col gap-2 text-sm text-ash sm:items-end">
          <p className="font-heading text-[10px] uppercase tracking-label text-ash/55">
            {footer.legal}
          </p>
          <p className="font-heading text-xs uppercase tracking-label text-ash-2">
            {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

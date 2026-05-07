"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "./ui/button";
import { ScrollProgressIndicator } from "./ui/ScrollProgressIndicator";
import { CTA_LABEL, CTA_SUB } from "@/lib/content";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

export function Nav() {
  const pathname = usePathname();
  const [scene, setScene] = useState("ECOMVENOM");
  const sceneLabelRef = useRef<HTMLSpanElement>(null);
  const firstRender = useRef(true);

  useGSAP(
    () => {
      const routeLabel =
        pathname === "/apply"
          ? "APPLY"
          : pathname === "/schedule"
            ? "START"
            : pathname === "/confirmation"
              ? "CONFIRMED"
              : "ECOMVENOM";

      setScene(routeLabel);

      if (pathname !== "/") return;

      const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-title]"));
      scenes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top center",
          end: "bottom center",
          onEnter: () => setScene(node.dataset.sceneTitle ?? "ECOMVENOM"),
          onEnterBack: () => setScene(node.dataset.sceneTitle ?? "ECOMVENOM"),
        });
      });

      return;
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  useEffect(() => {
    const el = sceneLabelRef.current;
    if (!el) return;

    if (firstRender.current) {
      firstRender.current = false;
      el.textContent = scene;
      return;
    }

    if (reducedMotion()) {
      el.textContent = scene;
      return;
    }

    gsap.to(el, {
      duration: 0.45,
      scrambleText: {
        text: scene,
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        revealDelay: 0.2,
      },
    });
  }, [scene]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[9000] isolate border-b border-white/[0.06] bg-black/55 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
          <Link href="/" aria-label="ECOMVENOM home" className="relative z-40 flex min-h-11 min-w-0 items-center gap-3">
            <span className="relative block h-11 w-40 overflow-hidden">
              <Image
                src="/brand/ecomvenom-logo-final.png"
                alt="ECOMVENOM"
                fill
                sizes="160px"
                className="object-contain scale-[2.7]"
                priority
              />
            </span>
          </Link>

          <div className="relative z-10 hidden max-w-[min(36vw,24rem)] items-center justify-center gap-3 overflow-hidden border-x border-white/10 px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ash lg:flex">
            <span className="system-status-dot h-1.5 w-1.5 rounded-full bg-venom shadow-[0_0_12px_rgba(184,255,46,0.8)]" />
            <span ref={sceneLabelRef} className="truncate" />
          </div>

          <div className="relative z-40 flex justify-end justify-self-end">
            <div className="hidden sm:block">
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command min-w-[13.5rem] px-5">
                {CTA_LABEL}
              </CtaLink>
            </div>
            <Link
              href="/apply"
              className="relative z-40 inline-flex h-11 min-w-16 items-center justify-center border border-venom/45 bg-black/80 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-venom transition-colors hover:bg-venom hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom sm:hidden"
            >
              Apply
            </Link>
          </div>
        </div>
      </header>
      <ScrollProgressIndicator />
    </>
  );
}

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
import { scrambleText } from "@/lib/motion";

function displaySceneLabel(label?: string) {
  return label === "ECOMVENOM" ? "SYSTEM ONLINE" : label ?? "SYSTEM ONLINE";
}

export function Nav() {
  const pathname = usePathname();
  const [scene, setScene] = useState("SYSTEM ONLINE");
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
              : "SYSTEM ONLINE";

      setScene(routeLabel);

      if (pathname !== "/") return;

      const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-title]"));
      scenes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top center",
          end: "bottom center",
          onEnter: () => setScene(displaySceneLabel(node.dataset.sceneTitle)),
          onEnterBack: () => setScene(displaySceneLabel(node.dataset.sceneTitle)),
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

    scrambleText(el, scene, { duration: 0.45 });
  }, [scene]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[9000] isolate border-b border-white/[0.06] bg-black/72 backdrop-blur-md backdrop-saturate-125">
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

          <div className="relative z-10 hidden max-w-[min(36vw,24rem)] items-center justify-center gap-3 overflow-hidden border-x border-white/10 px-5 font-heading text-[10px] uppercase tracking-normal text-ash lg:flex">
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
              aria-current={pathname === "/apply" ? "page" : undefined}
              className="nav-link-draw relative z-40 inline-flex h-11 min-w-16 items-center justify-center rounded-[8px] border border-venom/45 bg-ink-2/80 px-3 font-heading text-[10px] uppercase tracking-normal text-venom shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-venom hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom sm:hidden"
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "./ui/button";
import { ScrollProgressIndicator } from "./ui/ScrollProgressIndicator";
import { LangToggle } from "./ui/LangToggle";
import { CTA_LABEL, CTA_SUB } from "@/lib/content";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { scrambleText } from "@/lib/motion";
import { useLang } from "@/lib/lang-context";

function displaySceneLabel(label?: string) {
  return label === "ECOMVENOM" ? "SYSTEM ONLINE" : label ?? "SYSTEM ONLINE";
}

export function Nav() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const [scene, setScene] = useState("SYSTEM ONLINE");
  const [compressed, setCompressed] = useState(false);
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

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY < 24) {
        setCompressed(false);
      } else if (delta > 6) {
        setCompressed(true);
      } else if (delta < -6) {
        setCompressed(false);
      }

      lastY = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        data-compressed={compressed}
        className={cn(
          "fixed left-0 right-0 top-0 z-[9000] isolate border-b border-white/[0.06] bg-black/72 backdrop-blur-md backdrop-saturate-125 transition-[background-color,border-color] duration-300 ease-out",
          compressed && "border-white/[0.09] bg-black/82",
        )}
      >
        <div
          className={cn(
            "mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 transition-[height] duration-300 ease-out sm:px-6",
            compressed && "h-14",
          )}
        >
          <Link href="/" aria-label="ECOMVENOM home" className="relative z-40 flex min-h-11 min-w-0 items-center gap-3">
            <span
              className={cn(
                "relative block h-12 w-44 origin-left overflow-hidden transition-transform duration-300 ease-out",
                compressed && "scale-90",
              )}
            >
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
            <span className="system-status-dot h-1.5 w-1.5 rounded-full bg-venom" />
            <span ref={sceneLabelRef} className="truncate" />
          </div>

          <div className="relative z-40 flex items-center gap-2 justify-end justify-self-end">
            <LangToggle />
            <div className="hidden sm:block">
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command min-w-[13.5rem] px-5">
                {CTA_LABEL}
              </CtaLink>
            </div>
            <Link
              href="/apply"
              aria-current={pathname === "/apply" ? "page" : undefined}
              className="nav-link-draw relative z-40 inline-flex h-11 min-w-16 items-center justify-center rounded-lg border border-venom/45 bg-ink-2/80 px-3 font-heading text-[10px] uppercase tracking-normal text-venom transition-colors hover:bg-venom hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom sm:hidden"
            >
              {t("applyBtn")}
            </Link>
          </div>
        </div>
      </header>
      <ScrollProgressIndicator />
    </>
  );
}

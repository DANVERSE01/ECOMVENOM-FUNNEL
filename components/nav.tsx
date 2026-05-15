"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "./ui/button";
import { ScrollProgressIndicator } from "./ui/ScrollProgressIndicator";
import { LangToggle } from "./ui/LangToggle";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { scrambleText } from "@/lib/motion";
import { useLang } from "@/lib/lang-context";
import { useContent } from "@/lib/useContent";

export function Nav() {
  const pathname = usePathname();
  const { t, lang } = useLang();
  const { CTA_LABEL, CTA_SUB, nav } = useContent();
  const [scene, setScene] = useState(nav.defaultScene);
  const [compressed, setCompressed] = useState(false);
  const sceneLabelRef = useRef<HTMLSpanElement>(null);
  const firstRender = useRef(true);
  const showMobileApply = pathname !== "/";

  const displaySceneLabel = (label?: string) => {
    return label === "ECOMVENOM" ? nav.homeScene : label ?? nav.defaultScene;
  };

  useGSAP(
    () => {
      const routeLabel =
        pathname === "/apply"
          ? nav.routeLabels.apply
          : pathname === "/schedule"
            ? nav.routeLabels.schedule
            : pathname === "/confirmation"
              ? nav.routeLabels.confirmation
              : nav.defaultScene;

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
    { dependencies: [nav, pathname], revertOnUpdate: true },
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
          "fixed left-0 right-0 top-0 z-[9000] isolate transition-[background-color,border-color,backdrop-filter] duration-400 ease-out",
          compressed
            ? "border-b border-white/[0.08] bg-[rgba(6,10,20,0.88)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent backdrop-blur-0",
        )}
      >
        <div
          className={cn(
            "mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 transition-[height] duration-300 ease-out sm:gap-3 sm:px-6",
            compressed && "h-14",
          )}
        >
          <Link href="/" aria-label="ECOMVENOM home" className="relative z-40 flex min-h-11 min-w-0 items-center gap-3">
            <span
              className={cn(
                "relative block h-12 w-36 origin-left overflow-hidden transition-transform duration-300 ease-out sm:w-44",
                compressed && "scale-90",
              )}
            >
              <Image
                src="/brand/ecomvenom-logo-final.png"
                alt="ECOMVENOM"
                fill
                sizes="160px"
                className="object-contain scale-[1.88] sm:translate-x-0 sm:scale-[2.7]"
                priority
              />
            </span>
          </Link>

          <div className={cn(
            "relative z-10 hidden max-w-[min(36vw,24rem)] items-center justify-center gap-3 overflow-hidden px-5 lg:flex editorial-meta",
            lang === "ar" ? "text-[0.72rem] tracking-[0.02em]" : "",
          )}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F9FF00", boxShadow: "0 0 6px rgba(249,255,0,0.5)" }} aria-hidden />
            <span ref={sceneLabelRef} className="truncate" />
          </div>

          <div data-nav-actions="true" className="relative z-40 flex items-center gap-3 justify-end justify-self-end">
            <LangToggle />
            <div className="hidden lg:block">
              <CtaLink href="/apply" sub={CTA_SUB} className="nav-sticky-cta">
                {CTA_LABEL}
              </CtaLink>
            </div>
            {showMobileApply ? (
              <Link
                href="/apply"
                aria-current={pathname === "/apply" ? "page" : undefined}
                className={cn(
                  "relative z-40 inline-flex h-10 min-w-16 items-center justify-center rounded-full border border-white/20 bg-transparent px-4 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:hidden",
                  lang === "ar" ? "text-[0.74rem] tracking-[0.02em]" : "text-[10px] uppercase tracking-[0.08em]",
                )}
              >
                {t("applyBtn")}
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <ScrollProgressIndicator />
    </>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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

          <div className={cn(
            "relative z-10 hidden max-w-[min(36vw,24rem)] items-center justify-center gap-3 overflow-hidden border-x border-white/10 px-5 font-heading text-ash lg:flex",
            lang === "ar" ? "text-[0.72rem] tracking-[0.02em]" : "text-[10px] uppercase tracking-normal",
          )}>
            <span className="system-status-dot h-1.5 w-1.5 rounded-full bg-venom" />
            <span ref={sceneLabelRef} className="truncate" />
          </div>

          <div data-nav-actions="true" className="relative z-40 flex items-center gap-2 justify-end justify-self-end">
            <LangToggle />
            <div className="hidden sm:block">
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command min-w-[13.5rem] px-5">
                {CTA_LABEL}
              </CtaLink>
            </div>
            {showMobileApply ? (
              <Link
                href="/apply"
                aria-current={pathname === "/apply" ? "page" : undefined}
                className={cn(
                  "nav-link-draw relative z-40 inline-flex h-11 min-w-16 items-center justify-center rounded-lg border border-venom/45 bg-ink-2/80 px-3 font-heading text-venom transition-colors hover:bg-venom hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom sm:hidden",
                  lang === "ar" ? "text-[0.74rem] tracking-[0.02em]" : "text-[10px] uppercase tracking-normal",
                )}
              >
                {t("applyBtn")}
              </Link>
            ) : null}
            {/* DANVERSE-style hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="dan-hamburger ml-1"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* DANVERSE fullscreen nav overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="dan-nav-overlay"
        data-open={menuOpen ? "true" : "false"}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        {/* Close button top-right */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute right-5 top-5 dan-hamburger"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <nav className="dan-nav-menu" onClick={() => setMenuOpen(false)}>
          <Link href="/apply" className="dan-nav-menu__item text-venom">
            {lang === "ar" ? "قدّم الآن" : CTA_LABEL}
          </Link>
          <Link href="/" className="dan-nav-menu__item">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <Link href="/apply" className="dan-nav-menu__item">
            {lang === "ar" ? "سجّل الآن" : "Apply"}
          </Link>
        </nav>

        <p className={cn(
          "absolute bottom-8 font-heading text-ash-2",
          lang === "ar" ? "text-sm" : "text-xs uppercase tracking-widest",
        )}>
          ECOMVENOM — {lang === "ar" ? "نظام التجارة الإلكترونية" : "ECOMMERCE SYSTEM"}
        </p>
      </div>

      <ScrollProgressIndicator />
    </>
  );
}

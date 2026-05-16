"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, getCurrentLenis, getLenis, scrollToElement } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}

export function useLenis() {
  if (typeof window === "undefined") return null;
  return window.__lenis ?? getCurrentLenis();
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const useNativeScroll =
      reduced ||
      window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const source = event.target instanceof Element ? event.target : null;
      const anchor = source?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToElement(target);
    };

    document.addEventListener("click", handleAnchorClick);

    if (useNativeScroll) {
      delete window.__lenis;
      destroyLenis();
      ScrollTrigger.refresh();
      return () => {
        document.removeEventListener("click", handleAnchorClick);
        delete window.__lenis;
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    const instance = getLenis();
    if (instance) window.__lenis = instance;
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 0);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.clearTimeout(refresh);
      delete window.__lenis;
      destroyLenis();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname, reduced]);

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, getLenis } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      destroyLenis();
      ScrollTrigger.refresh();
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    getLenis();
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 0);

    return () => {
      window.clearTimeout(refresh);
      destroyLenis();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname, reduced]);

  return <>{children}</>;
}

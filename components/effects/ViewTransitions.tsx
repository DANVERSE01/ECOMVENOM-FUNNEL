"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function shouldSkipTransition(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    anchor.target ||
    anchor.hasAttribute("download")
  ) {
    return true;
  }

  const url = new URL(anchor.href, window.location.href);
  return (
    url.origin !== window.location.origin ||
    url.pathname === window.location.pathname && url.hash ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof document.startViewTransition !== "function"
  );
}

export function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || shouldSkipTransition(event, anchor)) return;

      const url = new URL(anchor.href, window.location.href);
      event.preventDefault();
      document.startViewTransition(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}

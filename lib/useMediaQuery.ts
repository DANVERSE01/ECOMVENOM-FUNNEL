"use client";

import { useEffect, useState } from "react";

/**
 * useMediaQuery — listens to a CSS media query and returns whether it matches.
 *
 * SSR-safe: returns `false` on the server and during the first client render,
 * then updates on mount and on every change. Use a sensible default in the
 * caller when the SSR/initial value matters for layout decisions.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    // Older Safari fallback
    media.addListener(update);
    return () => media.removeListener(update);
  }, [query]);

  return matches;
}

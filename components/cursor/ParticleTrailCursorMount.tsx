"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Client-side gate for the desktop particle trail cursor.
 *
 * Loads the cursor chunk only when (a) the device reports a fine pointer
 * (mouse/trackpad), (b) the user has not requested reduced motion, and
 * (c) the viewport is large enough that a cursor decoration makes sense.
 *
 * Result on touch devices and reduced-motion users: zero JS shipped for the
 * cursor — the dynamic chunk is never requested.
 */
const ParticleTrailCursor = dynamic(
  () => import("./ParticleTrailCursor").then((mod) => mod.ParticleTrailCursor),
  { ssr: false, loading: () => null },
);

export function ParticleTrailCursorMount() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideViewport = window.matchMedia("(min-width: 768px)").matches;
    if (finePointer && !reducedMotion && wideViewport) {
      setShouldMount(true);
    }
  }, []);

  return shouldMount ? <ParticleTrailCursor /> : null;
}

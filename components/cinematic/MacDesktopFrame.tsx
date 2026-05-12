"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  url?: string;
  className?: string;
};

/**
 * Lusion-style macOS desktop frame.
 * Pairs with useVslScrollExpansion (or any scroll-scrub hook) to animate
 * a cold-view → expand reveal as the user scrolls.
 */
export const MacDesktopFrame = forwardRef<HTMLDivElement, Props>(
  function MacDesktopFrame({ children, url = "ECOMVENOM.SYSTEM // FOUNDER VSL", className }, ref) {
    return (
      <div ref={ref} className={cn("mac-frame", className)}>
        <div className="mac-frame__chrome" aria-hidden>
          <div className="mac-frame__dots">
            <span className="mac-frame__dot" />
            <span className="mac-frame__dot" />
            <span className="mac-frame__dot" />
          </div>
          <span className="mac-frame__url">{url}</span>
          <span style={{ width: 38 }} aria-hidden />
        </div>
        <div className="mac-frame__viewport">{children}</div>
      </div>
    );
  },
);

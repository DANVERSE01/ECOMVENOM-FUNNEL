"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlowButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
};

function Arrow() {
  return (
    <span className="vx-button__arrow" aria-hidden>
      <svg viewBox="0 0 18 18" width="14" height="14" fill="none">
        <path
          d="M5 9h8m0 0-3.5-3.5M13 9l-3.5 3.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

export function GlowButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  type = "button",
}: GlowButtonProps) {
  const classes = cn("vx-button", variant === "ghost" && "vx-button--ghost", className);

  if (href?.startsWith("#")) {
    const handleHashClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick?.();
      if (typeof window === "undefined") return;

      const targetId = href.slice(1);
      const target =
        document.getElementById(targetId) ??
        document.querySelector<HTMLElement>(href);

      if (!target) {
        console.warn("[GlowButton] target not found:", href);
        return;
      }

      try { window.history.pushState(null, "", href); } catch {}

      const lenis = window.__lenis ?? (window as unknown as { __lenis?: Window["__lenis"] }).__lenis;
      if (lenis) {
        try {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
          return;
        } catch {}
      }

      const rect = target.getBoundingClientRect();
      const y = rect.top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    };

    return (
      <button
        type="button"
        onClick={handleHashClick}
        className={classes}
        style={{ position: "relative", zIndex: 10 }}
      >
        <span>{children}</span>
        <Arrow />
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
        <Arrow />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
}

"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

type Common = {
  children: React.ReactNode;
  className?: string;
};

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function triggerRipple(event: MouseEvent<HTMLElement>) {
  if (reducedMotion()) return;

  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.65;
  const ripple = document.createElement("span");

  ripple.setAttribute("aria-hidden", "true");
  Object.assign(ripple.style, {
    position: "absolute",
    left: `${event.clientX - rect.left - size / 2}px`,
    top: `${event.clientY - rect.top - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "999px",
    background: "rgba(255,255,255,0.32)",
    pointerEvents: "none",
    zIndex: "1",
  });

  target.appendChild(ripple);
  ripple
    .animate(
      [
        { opacity: 0.34, transform: "scale(0)" },
        { opacity: 0, transform: "scale(1)" },
      ],
      { duration: 460, easing: "cubic-bezier(0.34,1.56,0.64,1)" },
    )
    .finished.finally(() => ripple.remove());
}

export function CtaLink({
  href,
  children,
  className,
  sub,
}: Common & { href: string; sub?: string }) {
  const ref = useMagnetic<HTMLSpanElement>(0.28);

  return (
    <span ref={ref} className="relative z-40 inline-flex max-w-full isolate">
      <Link
        href={href}
        className={cn("btn-primary min-w-0 max-w-full", className)}
        onClick={triggerRipple}
      >
        <span className="btn-primary__material" aria-hidden />
        <span className="text-center text-sm font-heading font-bold leading-tight whitespace-normal sm:whitespace-nowrap sm:text-base">
          {children}
        </span>
        {sub && (
          <span className="text-center font-mono text-[10px] font-semibold leading-none tracking-[0.08em] opacity-70 whitespace-normal sm:whitespace-nowrap">
            {sub}
          </span>
        )}
        <span className="btn-primary__glyph" aria-hidden>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5H10.25M7.25 3.5L10.25 6.5L7.25 9.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </span>
  );
}

export function CtaButton({
  type = "submit",
  children,
  className,
  sub,
  disabled,
  onClick,
}: Common & {
  type?: "submit" | "button";
  sub?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const ref = useMagnetic<HTMLButtonElement>(0.28);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={(event) => {
        triggerRipple(event);
        onClick?.();
      }}
      className={cn("btn-primary relative z-40 min-w-0 max-w-full disabled:opacity-50", className)}
    >
      <span className="btn-primary__material" aria-hidden />
      <span className="text-center text-sm font-heading font-bold leading-tight whitespace-normal sm:whitespace-nowrap sm:text-base">
        {children}
      </span>
      {sub && (
        <span className="text-center font-mono text-[10px] font-semibold leading-none tracking-[0.08em] opacity-70 whitespace-normal sm:whitespace-nowrap">
          {sub}
        </span>
      )}
      <span className="btn-primary__glyph" aria-hidden>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 6.5H10.25M7.25 3.5L10.25 6.5L7.25 9.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

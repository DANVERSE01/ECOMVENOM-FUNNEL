"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

type Common = {
  children: React.ReactNode;
  className?: string;
};

export function CtaLink({
  href,
  children,
  className,
  sub,
}: Common & { href: string; sub?: string }) {
  const ref = useMagnetic<HTMLSpanElement>(0.28);

  return (
    <span ref={ref} className="relative z-40 inline-flex max-w-full isolate">
      <Link href={href} className={cn("btn-primary min-w-0 max-w-full", className)}>
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
      onClick={onClick}
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

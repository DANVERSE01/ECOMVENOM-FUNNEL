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
        <span className="text-center text-sm font-heading font-bold leading-tight whitespace-normal sm:whitespace-nowrap sm:text-base">
          {children}
        </span>
        {sub && (
          <span className="text-center font-mono text-[10px] font-semibold leading-none tracking-[0.18em] opacity-70 whitespace-normal sm:whitespace-nowrap">
            {sub}
          </span>
        )}
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
      <span className="text-center text-sm font-heading font-bold leading-tight whitespace-normal sm:whitespace-nowrap sm:text-base">
        {children}
      </span>
      {sub && (
        <span className="text-center font-mono text-[10px] font-semibold leading-none tracking-[0.18em] opacity-70 whitespace-normal sm:whitespace-nowrap">
          {sub}
        </span>
      )}
    </button>
  );
}

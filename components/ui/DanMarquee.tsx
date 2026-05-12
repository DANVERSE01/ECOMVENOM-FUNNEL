"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/cn";

const EN_ITEMS = [
  { text: "ECOMVENOM", accent: true },
  { text: "ECOMMERCE SYSTEM", accent: false },
  { text: "U.S. + GULF MARKET", accent: false },
  { text: "FREE STORE BUILD", accent: true },
  { text: "APPLY NOW", accent: false },
  { text: "ECOMVENOM", accent: true },
  { text: "ECOMMERCE SYSTEM", accent: false },
  { text: "U.S. + GULF MARKET", accent: false },
  { text: "FREE STORE BUILD", accent: true },
  { text: "APPLY NOW", accent: false },
];

const AR_ITEMS = [
  { text: "إيكوم فينوم", accent: true },
  { text: "منظومة التجارة الإلكترونية", accent: false },
  { text: "السوق الأمريكي والخليجي", accent: false },
  { text: "نبني متجرك مجاناً", accent: true },
  { text: "قدّم الآن", accent: false },
  { text: "إيكوم فينوم", accent: true },
  { text: "منظومة التجارة الإلكترونية", accent: false },
  { text: "السوق الأمريكي والخليجي", accent: false },
  { text: "نبني متجرك مجاناً", accent: true },
  { text: "قدّم الآن", accent: false },
];

const DOT = (
  <span aria-hidden className="dan-marquee-strip__item dan-marquee-strip__item--accent" style={{ padding: "0 0.75rem", fontSize: "1.5rem" }}>
    ✦
  </span>
);

export function DanMarquee({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const items = lang === "ar" ? AR_ITEMS : EN_ITEMS;

  return (
    <div className={cn("dan-marquee-strip relative z-10", className)} aria-hidden>
      <div className="dan-marquee-strip__inner" style={reduced ? { animation: "none" } : {}}>
        {items.map((item, i) => (
          <span key={i}>
            <span className={cn("dan-marquee-strip__item", item.accent && "dan-marquee-strip__item--accent")}>
              {item.text}
            </span>
            {DOT}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span key={`b-${i}`}>
            <span className={cn("dan-marquee-strip__item", item.accent && "dan-marquee-strip__item--accent")}>
              {item.text}
            </span>
            {DOT}
          </span>
        ))}
      </div>
    </div>
  );
}

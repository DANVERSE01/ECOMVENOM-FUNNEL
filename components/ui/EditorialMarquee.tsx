"use client";

import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/cn";

const EN_ITEMS = [
  "ECOMVENOM",
  "ECOMMERCE SYSTEM",
  "U.S. + GULF MARKET",
  "FREE STORE BUILD",
  "APPLY NOW",
];

const AR_ITEMS = [
  "إيكوم فينوم",
  "منظومة التجارة الإلكترونية",
  "السوق الأمريكي والخليجي",
  "نبني متجرك مجاناً",
  "قدّم الآن",
];

export function EditorialMarquee({ className }: { className?: string }) {
  const { lang } = useLang();
  const items = lang === "ar" ? AR_ITEMS : EN_ITEMS;
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <section className={cn("editorial-marquee", className)} aria-hidden>
      <div className="editorial-marquee__track">
        {doubled.map((text, i) => (
          <span key={i} className="contents">
            <span className="editorial-marquee__item">{text}</span>
            <span className="editorial-marquee__dot" />
          </span>
        ))}
      </div>
    </section>
  );
}

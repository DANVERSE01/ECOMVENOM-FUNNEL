"use client";

import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/cn";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const isAr = lang === "ar";

  return (
    <button
      type="button"
      onClick={() => setLang(isAr ? "en" : "ar")}
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-lg border border-venom/30 bg-venom/10 px-3 font-heading text-[9px] uppercase tracking-widest text-venom transition-all duration-200 hover:bg-venom hover:text-ink hover:border-venom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom",
        className,
      )}
    >
      <span>{isAr ? "EN" : "عربي"}</span>
    </button>
  );
}

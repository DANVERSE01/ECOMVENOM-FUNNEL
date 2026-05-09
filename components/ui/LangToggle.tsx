"use client";

import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/cn";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const isAr = lang === "ar";

  return (
    <button
      dir="ltr"
      type="button"
      onClick={() => setLang(isAr ? "en" : "ar")}
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      className={cn(
        "relative inline-grid h-10 min-w-[7.25rem] grid-cols-2 items-center rounded-full border border-white/10 bg-white/[0.03] p-1 font-heading text-[9px] uppercase tracking-[0.16em] text-bone shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:border-venom/45 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-venom shadow-[0_8px_20px_rgba(184,255,46,0.24)] transition-transform duration-300 ease-out-expo",
          isAr ? "translate-x-0" : "translate-x-full",
        )}
      />
      <span className={cn("relative z-10 px-3 text-center transition-colors duration-300", isAr ? "text-ink" : "text-ash")}>عربي</span>
      <span className={cn("relative z-10 px-3 text-center transition-colors duration-300", isAr ? "text-ash" : "text-ink")}>EN</span>
    </button>
  );
}

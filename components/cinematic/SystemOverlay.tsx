import { cn } from "@/lib/cn";
export function SystemOverlay({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-[1]", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(184,255,46,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(184,255,46,0.025)_1px,transparent_1px)] bg-[size:80px_80px] opacity-50" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.04)_3px,rgba(0,0,0,0.04)_4px)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.7),transparent_18%,transparent_82%,rgba(0,0,0,0.7))]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent" />
      <span className="cross-mark absolute top-5 left-5 opacity-30" />
      <span className="cross-mark absolute top-5 right-5 opacity-30" />
      <span className="cross-mark absolute bottom-5 left-5 opacity-20" />
      <span className="cross-mark absolute bottom-5 right-5 opacity-20" />
    </div>
  );
}

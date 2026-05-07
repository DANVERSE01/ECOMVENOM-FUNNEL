import { cn } from "@/lib/cn";
export function SystemOverlay({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("system-overlay pointer-events-none absolute inset-0 z-[1]", className)}>
      <div className="system-overlay__mesh" />
      <div className="system-overlay__scan" />
      <div className="system-overlay__shade" />
      <div className="system-overlay__rails" />
      <span className="cross-mark absolute top-5 left-5 opacity-30" />
      <span className="cross-mark absolute top-5 right-5 opacity-30" />
      <span className="cross-mark absolute bottom-5 left-5 opacity-20" />
      <span className="cross-mark absolute bottom-5 right-5 opacity-20" />
    </div>
  );
}

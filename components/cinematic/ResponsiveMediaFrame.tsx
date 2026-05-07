import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const ResponsiveMediaFrame = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { children: ReactNode }
>(function ResponsiveMediaFrame({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("cinematic-frame relative isolate overflow-hidden", className)} {...props}>
      <span className="cinematic-frame__shell" aria-hidden />
      <span className="cinematic-frame__glass" aria-hidden />
      <span className="cinematic-frame__rail cinematic-frame__rail--top" aria-hidden />
      <span className="cinematic-frame__rail cinematic-frame__rail--bottom" aria-hidden />
      <span data-corner="tl" />
      <span data-corner="tr" />
      <span data-corner="bl" />
      <span data-corner="br" />
      {children}
    </div>
  );
});

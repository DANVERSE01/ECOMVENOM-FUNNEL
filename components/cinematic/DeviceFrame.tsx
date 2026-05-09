import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const DeviceFrame = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string }
>(function DeviceFrame({ children, className }, ref) {
  return (
    <div ref={ref} className={cn("device-frame-shell", className)} aria-hidden>
      <div className="device-frame-bezel">
        <div className="device-frame-screen">{children}</div>
      </div>
    </div>
  );
});
DeviceFrame.displayName = "DeviceFrame";

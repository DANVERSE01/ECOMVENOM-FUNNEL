import { cn } from "@/lib/cn";

type MobileCTAProps = {
  className?: string;
};

export function MobileCTA({ className }: MobileCTAProps) {
  return <div className={cn("vx-mobile-safe-zone", className)} aria-hidden />;
}

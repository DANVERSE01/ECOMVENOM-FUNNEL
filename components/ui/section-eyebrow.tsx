import { cn } from "@/lib/cn";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] text-venom",
        className,
      )}
    >
      {children}
    </span>
  );
}

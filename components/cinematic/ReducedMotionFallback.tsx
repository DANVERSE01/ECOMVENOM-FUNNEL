import Image from "next/image";
import { cn } from "@/lib/cn";

export function ReducedMotionFallback({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-black", className)}>
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover opacity-[0.85]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.78)_100%)]" />
      {children}
    </div>
  );
}

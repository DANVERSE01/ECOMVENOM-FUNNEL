import Image from "next/image";
import { FrameScrubCanvas } from "./FrameScrubCanvas";
import { SystemOverlay } from "./SystemOverlay";
import { cn } from "@/lib/cn";

export function CinematicFramePlayer({
  frames,
  poster,
  triggerSelector,
  className,
}: {
  frames: string[];
  poster: string;
  triggerSelector: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 bg-black", className)}>
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-95"
      />
      <FrameScrubCanvas
        frames={frames}
        poster={poster}
        alt="Scroll-driven ECOMVENOM operating system film sequence"
        triggerSelector={triggerSelector}
        className="relative z-[2] opacity-70 mix-blend-screen"
      />
      <SystemOverlay />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgba(0,0,0,0.74),transparent_22%,transparent_78%,rgba(0,0,0,0.74))]" />
      <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
}

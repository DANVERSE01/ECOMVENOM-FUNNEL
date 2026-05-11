"use client";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  color?: string;
  className?: string;
}

export function BorderBeam({
  size = 120,
  duration = 6,
  delay = 0,
  color = "var(--c-venom)",
  className = "",
}: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      className={`border-beam pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] ${className}`}
    >
      <span
        className="border-beam__ray absolute aspect-square"
        style={{
          width: size,
          offsetPath: "rect(0 100% 100% 0 round 0px)",
          animation: `border-beam-travel ${duration}s ${delay}s linear infinite`,
          background: `linear-gradient(to left, ${color}, transparent)`,
        }}
      />
    </span>
  );
}

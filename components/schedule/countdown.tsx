"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown({ initialSeconds = 9 * 60 + 44 }: { initialSeconds?: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [seconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-alert/40 bg-alert/10 px-4 py-2 text-sm font-mono"
      role="timer"
      aria-live="polite"
    >
      <span aria-hidden className="h-2 w-2 rounded-full bg-alert animate-pulse" />
      <span className="text-bone">
        {h} hour{h === 1 ? "" : "s"} {pad(m)} minute{m === 1 ? "" : "s"} {pad(s)} seconds
      </span>
    </div>
  );
}

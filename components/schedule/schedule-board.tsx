"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CtaButton } from "@/components/ui/button";
import { schedule } from "@/lib/content";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = first.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ day: number | null }> = [];
  for (let i = 0; i < start; i++) cells.push({ day: null });
  for (let d = 1; d <= lastDate; d++) cells.push({ day: d });
  return cells;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function ScheduleBoard() {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState<number | null>(today.getDate());
  const [slot, setSlot] = useState<string | null>(null);
  const [tz, setTz] = useState<string>("");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const cells = useMemo(() => buildDays(year, month), [year, month]);
  const provider = process.env.NEXT_PUBLIC_SCHEDULE_PROVIDER_URL;

  function confirm() {
    if (!day || !slot) return;
    router.push("/confirmation");
  }

  return (
    <div
      data-integration="calendar"
      data-provider-url={provider ?? ""}
      className="border border-white/10 bg-ink-3/60 p-3 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.12em] text-ash">
            {schedule.card.name} · {schedule.card.duration}
          </p>
          <p className="font-display text-lg sm:text-xl mt-1 text-bone uppercase tracking-tight">
            Select Date &amp; Time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            aria-label="Month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="tap-target border border-white/10 bg-ink-2 px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
          >
            {MONTH_NAMES.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            aria-label="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="tap-target border border-white/10 bg-ink-2 px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
          >
            {[year - 1, year, year + 1, year + 2].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-0.5 text-center text-xs text-ash sm:gap-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
        {cells.map((c, i) => {
          if (c.day === null) {
            return <div key={i} aria-hidden className="aspect-square min-h-11" />;
          }

          const isToday =
            c.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          const past =
            c.day !== null &&
            new Date(year, month, c.day) <
              new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const selected = c.day !== null && c.day === day;
          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => setDay(c.day)}
              aria-pressed={selected}
              aria-label={`${MONTH_NAMES[month]} ${c.day}, ${year}`}
              className={[
                "aspect-square min-h-11 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom",
                past ? "text-ash/40 cursor-not-allowed" : "text-bone hover:bg-white/5",
                selected ? "bg-venom text-ink hover:bg-venom" : "",
                isToday && !selected ? "ring-1 ring-venom/50" : "",
              ].join(" ")}
            >
              {c.day}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="text-xs tracking-[0.12em] text-ash">
          Time zone: <span className="text-bone">{tz || "—"}</span>
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
          20-minute consultation windows
        </p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
          {schedule.slots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSlot(t)}
              className={[
                "tap-target border px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom",
                slot === t
                  ? "border-venom bg-venom text-ink shadow-[0_0_24px_rgba(184,255,46,0.18)]"
                  : "border-white/10 bg-ink-2 text-bone hover:border-venom/50 hover:bg-venom/10 hover:text-venom",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <CtaButton type="button" disabled={!day || !slot} onClick={confirm} className="cinematic-command">
          Confirm booking
        </CtaButton>
      </div>

      {!provider && (
        <p className="mt-4 text-[11px] text-ash/80">
          Calendar integration not yet configured.
          Set <code>NEXT_PUBLIC_SCHEDULE_PROVIDER_URL</code> before launch.
        </p>
      )}
    </div>
  );
}

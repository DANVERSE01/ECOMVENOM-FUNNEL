import type { Metadata } from "next";
import { SchedulePageShell } from "@/components/schedule/SchedulePageShell";

export const metadata: Metadata = {
  title: "Schedule your call — ECOMVENOM",
  description:
    "Final step: schedule your free 20-minute discovery call with the ECOMVENOM team.",
  robots: { index: false, follow: false },
};

export default function SchedulePage() {
  return <SchedulePageShell />;
}

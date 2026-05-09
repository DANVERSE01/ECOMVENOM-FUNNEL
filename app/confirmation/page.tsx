import type { Metadata } from "next";
import { ConfirmationPageShell } from "@/components/confirmation/ConfirmationPageShell";

export const metadata: Metadata = {
  title: "You're confirmed — ECOMVENOM",
  description: "Your call is booked. Here are your pre-call steps.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return <ConfirmationPageShell />;
}

import type { Metadata } from "next";
import { ApplyPageShell } from "@/components/apply/ApplyPageShell";

export const metadata: Metadata = {
  title: "Apply — ECOMVENOM",
  description: "Apply for the ECOMVENOM dropshipping program. Limited spots.",
  robots: { index: false, follow: false },
};

export default function ApplyPage() {
  return <ApplyPageShell />;
}

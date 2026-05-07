import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/container";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="relative block h-9 w-44 overflow-hidden">
          <Image
            src="/brand/ecomvenom-logo-final.png"
            alt="ECOMVENOM"
            fill
            sizes="176px"
            className="object-contain scale-[2.65] opacity-90"
          />
        </span>
        <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ash sm:items-end">
          <div className="flex gap-3">
            <Link href="#" className="inline-flex min-h-11 min-w-11 items-center hover:text-bone transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link href="#" className="inline-flex min-h-11 min-w-11 items-center hover:text-bone transition-colors">
              Terms
            </Link>
          </div>
          <p>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

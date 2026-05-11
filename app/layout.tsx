import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Syne, Inter, Alexandria, Cairo } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { ParticleTrailCursorMount } from "@/components/cursor/ParticleTrailCursorMount";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { BackToTop } from "@/components/ui/BackToTop";
import { LanguageProvider } from "@/lib/lang-context";
import { type Lang, defaultLang } from "@/lib/translations";

// 4 families: Syne (EN display) + Inter (EN body) + Alexandria (AR display) + Cairo (AR body)
// Space Grotesk removed — --font-space aliases Inter via globals.css :root
// JetBrains Mono removed — --font-mono resolves to system stack via globals.css :root
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "optional" });
const alexandria = Alexandria({ subsets: ["arabic"], weight: ["600", "700", "800"], variable: "--font-arabic-display", display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic-body", display: "swap" });

export const metadata: Metadata = {
  title: "ECOMVENOM — Become a Profitable Dropshipper in 45 Days",
  description: "An A-Z roadmap to build a sustainable dropshipping business across the U.S. and Saudi/Gulf markets. Zero fluff. Real systems. Free store build on completion.",
  metadataBase: new URL("https://go.ecomvenom.com"),
  icons: { icon: "/brand/ecomvenom-logo-final.png" },
  openGraph: {
    title: "ECOMVENOM — Become a Profitable Dropshipper in 45 Days",
    description: "An A-Z roadmap to build a sustainable dropshipping business. Apply for the program — limited spots.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("ev.lang")?.value;
  const initialLang: Lang = savedLang === "ar" || savedLang === "en" ? savedLang : defaultLang;

  return (
    <html lang={initialLang} dir={initialLang === "ar" ? "rtl" : "ltr"} className={`${syne.variable} ${inter.variable} ${alexandria.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Preloader />
        <ParticleTrailCursorMount />
        <LanguageProvider initialLang={initialLang}>
          <SmoothScroll>
            <Nav />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
          <StickyMobileCTA />
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}

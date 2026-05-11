import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Syne, Space_Grotesk, Inter, JetBrains_Mono, Alexandria, Cairo } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { ParticleTrailCursor } from "@/components/cursor/ParticleTrailCursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { BackToTop } from "@/components/ui/BackToTop";
import { LanguageProvider } from "@/lib/lang-context";
import { type Lang, defaultLang } from "@/lib/translations";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "optional" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
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
    <html lang={initialLang} dir={initialLang === "ar" ? "rtl" : "ltr"} className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${alexandria.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Preloader />
        <ParticleTrailCursor />
        <FilmGrain />
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

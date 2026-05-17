import type { Metadata } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ParticleTrailCursor } from "@/components/cursor/ParticleTrailCursor";
import { ChapterRail } from "@/components/effects/ChapterRail";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { BackToTop } from "@/components/ui/BackToTop";
import { ViewTransitions } from "@/components/effects/ViewTransitions";
import { ScrollMotionInit } from "@/components/effects/ScrollMotionInit";
import { Preloader } from "@/components/ui/Preloader";
import { LanguageProvider } from "@/lib/lang-context";
import { type Lang, defaultLang } from "@/lib/translations";

const arabicDisplay = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["700", "800", "900"],
  variable: "--font-arabic-display",
  display: "swap",
});
const arabicBody = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-body",
  display: "swap",
});

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
    <html lang={initialLang} dir={initialLang === "ar" ? "rtl" : "ltr"} className={`${arabicDisplay.variable} ${arabicBody.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Preloader />
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <div className="ev-unified-canvas" aria-hidden />
        <ViewTransitions />
        <ScrollMotionInit />
        <ParticleTrailCursor />
        <LanguageProvider initialLang={initialLang}>
          <SmoothScroll>
            <Nav />
            <ChapterRail />
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

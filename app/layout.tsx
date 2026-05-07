import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { ParticleTrailCursor } from "@/components/cursor/ParticleTrailCursor";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "optional" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Preloader />
        <ParticleTrailCursor />
        <SmoothScroll>
          <Nav />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <StickyMobileCTA />
      </body>
    </html>
  );
}

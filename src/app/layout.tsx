import type { Metadata } from "next";
import { LINE_Seed_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ClickSpark from "@/components/ClickSpark";

// LINE Seed JP via Google Fonts (v3) — this build has properly proportional
// Cyrillic, so it renders both Latin and the Russian copy with normal tracking.
// next/font self-hosts and subsets it (latin + cyrillic) at build time.
const lineSeed = LINE_Seed_JP({
  variable: "--font-line",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "800"],
  display: "swap",
});

// IBM Plex Mono — typewriter-style monospace with Cyrillic support.
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Школа GDD — онлайн-школа геймдизайна";
const description =
  "Самая заботливая онлайн-школа, которая учит делать видеоигры.";
// Set NEXT_PUBLIC_SITE_URL to the production domain so OG/canonical URLs are
// absolute; falls back to localhost in development.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Школа GDD",
    title,
    description,
    images: [{ url: "/img/herobg.png", width: 1923, height: 900, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/img/herobg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${lineSeed.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>
          <ClickSpark
            sparkColor="#fe6911"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            {children}
          </ClickSpark>
        </SmoothScroll>
      </body>
    </html>
  );
}

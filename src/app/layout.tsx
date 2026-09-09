import type { Metadata, Viewport } from "next";
import { LINE_Seed_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ClickSpark from "@/components/ClickSpark";
import { contactEmail, socials } from "@/data/content";
import { Analytics } from "@vercel/analytics/next";

// LINE Seed JP via Google Fonts — used for the Latin brand look (logo, English
// words, headings). This is a Japanese family: Google serves it as ~370
// unicode-range slices and does NOT honour a `subsets` restriction for CJK
// fonts, and it carries no Cyrillic at all — the Russian copy renders in the
// system-ui fallback below. So preload is DISABLED: preloading would block
// first paint on ~250 font files (4+ MB, mostly kanji the site never shows).
// With `display: "swap"` the page paints instantly in the fallback and the one
// or two Latin slices that are actually used swap in on demand.
const lineSeed = LINE_Seed_JP({
  variable: "--font-line",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  preload: false,
});

// IBM Plex Mono — typewriter-style monospace with Cyrillic support.
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Школа GDD: онлайн-школа геймдизайна";
const description =
  "Самая заботливая онлайн-школа, которая учит делать видеоигры.";
// Set NEXT_PUBLIC_SITE_URL to the production domain so OG/canonical URLs are
// absolute; falls back to localhost in development.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Школа GDD",
  },
  description,
  alternates: {
    canonical: "/",
  },
  applicationName: "Школа GDD",
  authors: [{ name: "Школа GDD" }],
  keywords: [
    "геймдизайн",
    "нарративный дизайн",
    "гейм-дизайнер",
    "обучение геймдеву",
    "GDD",
    "Школа GDD",
    "Алла Довгалюк",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Школа GDD",
    title,
    description,
    url: "/",
    images: [{ url: "/SEO.webp", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/SEO.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fe6911",
  colorScheme: "light",
};

// Structured data — describes the school + the website. Helps Google build
// the right knowledge panel and link to the search results properly.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Школа GDD",
  alternateName: "GDD School",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description,
  email: contactEmail,
  founder: { "@type": "Person", name: "Алла Довгалюк" },
  sameAs: socials.map((s) => s.href),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Школа GDD",
  url: siteUrl,
  inLanguage: "ru",
  publisher: { "@type": "EducationalOrganization", name: "Школа GDD" },
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
        {/* Skip-to-content link for keyboard / screen-reader users.
            Hidden visually until it receives focus, then becomes a normal
            orange pill at the top-left. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-orange focus:px-5 focus:py-3 focus:text-[14px] focus:font-medium focus:text-black focus:shadow-lg"
        >
          Перейти к содержимому
        </a>
        {/* JSON-LD structured data for the school + website. Rendered in
            the body (allowed for Schema.org) so it ships on every page. */}
        <script
          type="application/ld+json"
          // Schema.org data is an object literal we control — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
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
        <Analytics />
      </body>
    </html>
  );
}

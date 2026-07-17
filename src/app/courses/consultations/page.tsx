import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import StickyHeader, { type NavLink } from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import CourseHero from "@/components/CourseHero";
import TeachersCarousel from "@/components/TeachersCarousel";
import FaqAccordion from "@/components/FaqAccordion";
import CourseCard from "@/components/CourseCard";
import ScrollWords from "@/components/ScrollWords";
import { courses } from "@/data/content";
import ConsultationsFormats from "@/components/ConsultationsFormats";
import {
  consultationsHero,
  consultationsIntro,
  consultationsQuestions,
  consultationsTeachersHeading,
  consultationsTeachers,
  consultationsServicesHeading,
  consultationsServices,
  consultationsFormatsHeading,
  consultationsFormats,
  consultationsPricing,
  consultationsFaq,
} from "@/data/consultations";

const pageDescription =
  "Персональные консультации и сопровождение разработки игр: команда, бюджет, документация, работа с издателями, выход на зарубежный рынок.";

export const metadata: Metadata = {
  title: "Персональные консультации по созданию игр",
  description: pageDescription,
  alternates: { canonical: "/courses/consultations" },
  openGraph: {
    title: "Персональные консультации по созданию игр | Школа GDD",
    description: pageDescription,
    url: "/courses/consultations",
    images: [{ url: "/SEO.jpg", width: 1200, height: 630, alt: "Персональные консультации по созданию игр" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Персональные консультации по созданию игр | Школа GDD",
    description: pageDescription,
    images: ["/SEO.jpg"],
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Персональные консультации по созданию игр",
  description: pageDescription,
  url: "/courses/consultations",
  inLanguage: "ru",
  image: "/img/consult.png",
  provider: {
    "@type": "EducationalOrganization",
    name: "Школа GDD",
    sameAs: "/",
  },
  offers: {
    "@type": "Offer",
    price: "299",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      price: "299",
      valueAddedTaxIncluded: false,
      description: "от $299, итоговая стоимость зависит от формата и стадии проекта",
    },
  },
};

// Lowercase, then capitalize the first letter (sentence case, RU-aware).
const toSentence = (s: string) => {
  const lower = s.toLocaleLowerCase("ru");
  return lower.replace(/\p{L}/u, (ch) => ch.toLocaleUpperCase("ru"));
};

// Nav reflects the consultations page's own sections (besides "Курсы",
// which keeps the mega menu treatment from StickyHeader).
const courseNavLinks: NavLink[] = [
  { label: "Курсы" },
  { label: "Вопросы", href: "#questions" },
  { label: "Кто проводит", href: "#teachers" },
  { label: "Что мы делаем", href: "#services" },
  { label: "Стоимость", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function ConsultationsPage() {
  const crossSell = courses[1]; // «Гейм-дизайнеры»

  return (
    <>
      <StickyHeader navLinks={courseNavLinks} />
      <CourseHero hero={consultationsHero} armatureIndex={2} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <main id="main" className="relative bg-white text-foreground">
        {/* Column guides continue down the page */}
        <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1160px] text-black/[0.12]">
          <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
        </div>

        <div className="relative mx-auto flex max-w-[1160px] flex-col gap-20 px-6 pt-16">
          {/* ── ВСТУПЛЕНИЕ — scroll-driven word reveal ─────────────── */}
          <section id="questions" className="scroll-mt-28 py-16 md:py-28">
            <ScrollWords
              text={consultationsIntro.text}
              className="mx-auto block max-w-3xl text-center text-fluid-2xl leading-snug text-foreground"
            />
          </section>

          {/* ── ВОПРОСЫ — 2×3 numbered grid, full content width.
              Each card is split into a number cell (left, with diagonal-stripe
              bg + right hairline) and a text cell (right), so the number
              container reads as part of the page's grid the way the schedule
              calendar's icon tiles do. */}
          <section className="-mx-6 -mt-20 grid border-y border-black/10 sm:grid-cols-2">
            {consultationsQuestions.map((q) => (
              <div
                key={q.number}
                className="group flex items-stretch border-t border-black/10 transition-colors duration-200 hover:bg-brand-orange/10 [&:first-child]:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l"
              >
                <span
                  className="grid w-16 shrink-0 place-items-center border-r border-black/10 text-fluid-sm tabular-nums text-foreground/45 md:w-24"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent 0 10px, rgba(0,0,0,0.08) 10px 11px)",
                  }}
                >
                  {q.number}
                </span>
                <div className="flex flex-1 items-center p-6 md:p-8">
                  <h3 className="font-bold leading-[1.15] text-foreground">
                    {q.question}
                  </h3>
                </div>
              </div>
            ))}
          </section>

          {/* ── КТО ПРОВОДИТ ─────────────────────────────────────── */}
          <section id="teachers" className="-mt-20 scroll-mt-28">
            <div className="-mx-6 border-x border-b border-black/10">
              <TeachersCarousel
                items={consultationsTeachers}
                title={consultationsTeachersHeading}
              />
            </div>
          </section>

          {/* ── ВМЕСТЕ МЫ — sticky heading + 2×3 services ─────────── */}
          <section
            id="services"
            className="-mx-6 -mt-20 grid scroll-mt-28 border-b border-black/10 md:grid-cols-2"
          >
            <div className="border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-10">
              <h2 className="text-fluid-4xl leading-tight text-foreground md:sticky md:top-24">
                {consultationsServicesHeading}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {consultationsServices.map((s) => (
                <div
                  key={s.title}
                  className="flex flex-col gap-3 border-t border-black/10 p-6 transition-colors duration-200 hover:bg-brand-orange/10 md:p-8 [&:first-child]:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l"
                >
                  <h3 className="font-bold leading-[1.08] text-foreground">
                    {toSentence(s.title)}
                  </h3>
                  <p className="text-fluid-sm text-foreground/65">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── СТОИМОСТЬ — formats (left) + pricing card (right) ─── */}
          <section
            id="pricing"
            className="-mx-6 -mt-20 grid scroll-mt-28 border-b border-black/10 md:grid-cols-2"
          >
            {/* Left: format cards. Top-only padding so the heading has
                breathing room from the section top; the last format card's
                bottom border lines up with the section bottom (no green
                tail). */}
            <div className="border-b border-black/10 pt-10 md:border-b-0 md:border-r md:pt-14">
              <ConsultationsFormats
                heading={consultationsFormatsHeading}
                formats={consultationsFormats}
              />
            </div>

            {/* Right: pricing card */}
            <div className="flex flex-col gap-8 p-6 md:p-14">
              {/* Price — styled like the PricingPanel's price line so the
                  consultations section reads in the same typographic
                  hierarchy as the other course pricing blocks. */}
              <span className="text-fluid-hero font-bold leading-none tracking-[-0.02em] text-foreground">
                {consultationsPricing.price}
              </span>
              <p className="text-fluid-sm leading-relaxed text-foreground/75">
                {consultationsPricing.description}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={consultationsPricing.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-black py-3 pl-5 pr-2 text-[14px] text-white shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.4)]"
                >
                  <span>{consultationsPricing.primaryCta.label}</span>
                  <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" strokeWidth={2.25} />
                  </span>
                </a>
                <a
                  href={consultationsPricing.secondaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-black/15 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-black/[0.04]"
                >
                  {consultationsPricing.secondaryCta.label}
                </a>
              </div>
              <ul className="flex flex-col gap-3 border-t border-black/10 pt-6">
                {consultationsPricing.notes.map((n) => (
                  <li
                    key={n}
                    className="text-fluid-sm leading-relaxed text-foreground/65"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────── */}
          <section id="faq" className="-mt-20 scroll-mt-28">
            <div className="relative z-20 -mx-6 border-x border-b border-black/10 bg-white">
              <div className="flex items-center gap-4 border-b border-black/10 px-6 py-5 md:px-10">
                <h2 className="text-fluid-3xl leading-tight text-foreground">
                  Отвечаем на вопросы
                </h2>
              </div>
              <FaqAccordion items={consultationsFaq} />
            </div>
          </section>

          {/* ── ФИНАЛЬНЫЙ БЛОК — кросс-селл (same CourseCard as the homepage) ── */}
          <section className="-mx-6 -mt-20 border-b border-black/10 bg-white">
            <CourseCard course={crossSell} index={1} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

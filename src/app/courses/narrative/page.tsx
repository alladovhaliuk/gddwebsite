import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Gift, CreditCard, Play, ThumbsUp } from "lucide-react";
import StickyHeader, { type NavLink } from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import CourseHero from "@/components/CourseHero";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import TeachersCarousel from "@/components/TeachersCarousel";
import FaqAccordion from "@/components/FaqAccordion";
import CourseCard from "@/components/CourseCard";
import ProgramSection from "@/components/ProgramSection";
import PricingPanel from "@/components/PricingPanel";
import ScrollWords from "@/components/ScrollWords";
import Marquee from "@/components/Marquee";
import { features, testimonials, courses, studioLogos } from "@/data/content";
import {
  narrativeHero,
  narrativeIntro,
  resultsHeading,
  programWeeks,
  programTotalWeeks,
  teachers,
  pricing,
  faq,
  presentation,
} from "@/data/narrative";

export const metadata: Metadata = {
  title: "Курс «Нарративщики» — нарративный гейм-дизайн | Школа GDD",
  description:
    "Курс нарративного дизайна «Нарративщики». Научим всему за 9 недель — без специальной подготовки, навыков или программ.",
};

// Lowercase, then capitalize the first letter (sentence case, RU-aware).
const toSentence = (s: string) => {
  const lower = s.toLocaleLowerCase("ru");
  return lower.replace(/\p{L}/u, (ch) => ch.toLocaleUpperCase("ru"));
};

// Nav reflects the course page's own sections (besides "Курсы", which keeps
// the mega menu treatment from StickyHeader).
const courseNavLinks: NavLink[] = [
  { label: "Курсы" },
  { label: "Программа", href: "#program" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Стоимость", href: "#pricing" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function NarrativeCoursePage() {
  const crossSell = courses[1]; // «Гейм-дизайнеры»

  // Derive the pricing benefit numbers directly from the program so they stay
  // accurate as the curriculum evolves.
  const lessonCount = programWeeks.reduce((s, w) => s + w.days.length, 0);
  const callCount = programWeeks.reduce(
    (s, w) => s + w.tasks.filter((t) => t.kind === "call").length,
    0
  );
  const pricingBenefits = [
    `${programTotalWeeks} недель обучения с нуля`,
    `${lessonCount} видеоуроков`,
    `${callCount} личных созвонов с преподавателем`,
    "2 игры в портфолио — личная + командная",
    "Подробный письменный фидбэк на каждое ДЗ",
  ];

  return (
    <>
      <StickyHeader navLinks={courseNavLinks} />
      <CourseHero hero={narrativeHero} armatureIndex={0} />

      <main className="relative bg-white text-foreground">
        {/* Column guides continue down the page */}
        <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1160px] text-black/[0.12]">
          <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
        </div>

        <div className="relative mx-auto flex max-w-[1160px] flex-col gap-20 px-6 pt-16">
          {/* ── ВСТУПЛЕНИЕ — scroll-driven word reveal (как на главной) ── */}
          <section className="py-16 md:py-28">
            <ScrollWords
              text={narrativeIntro.text}
              className="mx-auto max-w-3xl text-center text-fluid-2xl leading-snug text-foreground"
            />
          </section>

          {/* ── СТУДИИ (logo marquee) ─────────────────────── */}
          <section className="-mx-6 flex items-stretch border-y border-black/10 text-foreground">
            <div className="flex max-w-[9.5rem] shrink-0 items-center border-r border-black/10 px-6 text-fluid-sm leading-tight text-foreground/70">
              Где работают наши ученики
            </div>
            <div className="relative z-20 min-w-0 flex-1 overflow-hidden bg-white py-5">
              <Marquee
                items={studioLogos}
                repeat={2}
                trackClassName="items-center"
                liClassName="px-7"
                renderItem={({ src, light }) => (
                  <Image
                    src={src}
                    alt=""
                    aria-hidden
                    width={1062}
                    height={438}
                    className={`h-8 w-auto object-contain opacity-60 grayscale ${
                      light ? "invert" : ""
                    }`}
                  />
                )}
              />
            </div>
          </section>

          {/* ── РЕЗУЛЬТАТЫ — heading left, features right (как «О школе») ── */}
          <section className="-mx-6 -mt-20 grid border-b border-black/10 md:grid-cols-2">
            <div className="border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-10">
              <h2 className="text-fluid-4xl leading-tight text-foreground md:sticky md:top-24">
                {resultsHeading}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col gap-3 border-t border-black/10 p-6 transition-colors duration-200 hover:bg-brand-orange/10 md:p-8 [&:first-child]:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l"
                >
                  <h3 className="font-bold leading-[1.08] text-foreground">
                    {toSentence(f.title)}
                  </h3>
                  <p className="text-fluid-sm text-foreground/65">{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ПРОГРАММА (divider + schedule calendar) ────── */}
          <ProgramSection
            ctaLabel="Забронировать место"
            ctaHref="/book?course=narrative"
            weeks={programWeeks}
            totalWeeks={programTotalWeeks}
          />

          {/* ── ПРЕПОДАВАТЕЛИ ───────────────────────────────── */}
          <section id="teachers" className="-mt-20 scroll-mt-28">
            <div className="-mx-6 border-x border-b border-black/10">
              <TeachersCarousel items={teachers} title="Преподаватели" />
            </div>
          </section>

          {/* ── СТОИМОСТЬ — title left, pricing card right (как «Результаты») ── */}
          <section
            id="pricing"
            className="-mx-6 -mt-20 grid scroll-mt-28 border-b border-black/10 md:grid-cols-2"
          >
            {/* Title + perk (sticky on desktop) */}
            <div className="border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-14">
              <div className="flex flex-col gap-14 md:sticky md:top-24">
                <h2 className="text-fluid-4xl leading-tight text-foreground">
                  Пора сделать себе классное портфолио нарративного гейм-дизайнера
                </h2>
                <div className="flex flex-col gap-3">
                  <p className="flex items-start gap-3 text-fluid-sm text-foreground/70">
                    <CreditCard
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={2}
                    />
                    {pricing.note}
                  </p>
                  <p className="flex items-start gap-3 text-fluid-sm text-foreground/70">
                    <Gift
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={2}
                    />
                    {pricing.perk}
                  </p>
                  <p className="flex items-start gap-3 text-fluid-sm text-foreground/70">
                    <ThumbsUp
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={2}
                    />
                    Рекомендация в LinkedIn — самым трудолюбивым
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing content — toggleable installment view lives in the client component */}
            <PricingPanel
              pricing={pricing}
              benefits={pricingBenefits}
              ctaHref="/book?course=narrative"
            />
          </section>

          {/* ── ОТЗЫВЫ ──────────────────────────────────────── */}
          <section id="testimonials" className="-mt-20 scroll-mt-28">
            <div className="-mx-6 border-x border-b border-black/10">
              <TestimonialsCarousel items={testimonials} />
            </div>
          </section>

          {/* ── ПРЕЗЕНТАЦИЯ — full-content-width image card ─── */}
          <section className="relative -mx-6 -mt-20 min-h-[28rem] overflow-hidden border-b border-black/10 md:aspect-[1160/360] md:min-h-0">
            <Image
              src="/presentation.png"
              alt=""
              fill
              sizes="(min-width: 1160px) 1160px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center md:px-12">
              <h2 className="mx-auto max-w-2xl text-fluid-3xl font-bold leading-tight text-white">
                {presentation.title}
              </h2>
              <p className="mx-auto max-w-xl text-fluid-sm leading-snug text-white/85">
                {presentation.subtext}
              </p>
              <div className="flex w-full max-w-sm flex-col items-stretch gap-3 md:max-w-none md:flex-row md:flex-wrap md:items-center md:justify-center">
                {/* Primary CTA — frosted-glass pill, same shape as the hero CTA */}
                <a
                  href={presentation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-white/80 py-2 pl-4 pr-2 text-[14px] text-black backdrop-blur-md transition hover:bg-white md:inline-flex md:w-auto"
                >
                  <span>{presentation.cta}</span>
                  <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" strokeWidth={2.25} />
                  </span>
                </a>
                {/* Secondary CTA — same pill shape, outlined glass for hierarchy */}
                <a
                  href={presentation.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/40 bg-white/10 py-2 pl-4 pr-2 text-[14px] text-white backdrop-blur-md transition hover:bg-white/20 md:inline-flex md:w-auto"
                >
                  <span>{presentation.videoCta}</span>
                  <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-x-0.5">
                    <Play className="size-3 translate-x-[1px]" strokeWidth={2.25} fill="currentColor" />
                  </span>
                </a>
              </div>
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
              <FaqAccordion items={faq} />
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

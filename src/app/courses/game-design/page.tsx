import type { Metadata } from "next";
import Image from "next/image";
import { Gift, CreditCard, ThumbsUp } from "lucide-react";
import StickyHeader, { type NavLink } from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import CourseHero from "@/components/CourseHero";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import TeachersCarousel from "@/components/TeachersCarousel";
import FaqAccordion from "@/components/FaqAccordion";
import CourseCard from "@/components/CourseCard";
import ProgramSection from "@/components/ProgramSection";
import VideoLecture from "@/components/VideoLecture";
import TeacherBooks from "@/components/TeacherBooks";
import PricingPanel from "@/components/PricingPanel";
import Marquee from "@/components/Marquee";
import { features, courses, studioLogos } from "@/data/content";
import {
  gameDesignHero,
  gameDesignIntro,
  gameDesignResultsHeading,
  gameDesignProgramWeeks,
  gameDesignTotalWeeks,
  gameDesignTeachers,
  gameDesignPricing,
  gameDesignFaq,
  gameDesignTestimonials,
  gameDesignVideo,
} from "@/data/game-design";

const courseDescription =
  "Курс гейм-дизайна «Гейм-дизайнеры». Научим всему за 8 недель, без специальной подготовки, навыков или программ.";

export const metadata: Metadata = {
  title: "Курс «Гейм-дизайнеры», гейм-дизайн с нуля",
  description: courseDescription,
  alternates: { canonical: "/courses/game-design" },
  openGraph: {
    title: "Курс «Гейм-дизайнеры» | Школа GDD",
    description: courseDescription,
    url: "/courses/game-design",
    images: [{ url: "/SEO.webp", width: 1200, height: 630, alt: "Курс «Гейм-дизайнеры»" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Курс «Гейм-дизайнеры» | Школа GDD",
    description: courseDescription,
    images: ["/SEO.webp"],
  },
};

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Курс «Гейм-дизайнеры»",
  description: courseDescription,
  url: "/courses/game-design",
  inLanguage: "ru",
  image: "/img/gamedesigners.webp",
  provider: {
    "@type": "EducationalOrganization",
    name: "Школа GDD",
    sameAs: "/",
  },
  offers: {
    "@type": "Offer",
    price: "589",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "/book?course=game-design",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    startDate: "2026-10-19",
    inLanguage: "ru",
  },
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

export default function GameDesignCoursePage() {
  const crossSell = courses[0]; // «Нарративщики»

  // Teachers' published books, collected for the dedicated Книги block.
  const teacherBooks = gameDesignTeachers.flatMap((t) => t.books ?? []);

  // Derive the pricing benefit numbers directly from the program so they stay
  // accurate as the curriculum evolves.
  const lessonCount = gameDesignProgramWeeks.reduce(
    (s, w) => s + w.days.length,
    0
  );
  const callCount = gameDesignProgramWeeks.reduce(
    (s, w) => s + w.tasks.filter((t) => t.kind === "call").length,
    0
  );
  const pricingBenefits = [
    `${gameDesignTotalWeeks} недель обучения с нуля`,
    `${lessonCount} видеоуроков`,
    `${callCount} личных созвонов с преподавателем`,
    "2 игры в портфолио: личная + командная",
    "Подробный письменный фидбэк на каждое ДЗ",
  ];

  return (
    <>
      <StickyHeader navLinks={courseNavLinks} />
      <CourseHero hero={gameDesignHero} armatureIndex={1} scene="game-design" body={gameDesignIntro.text} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />

      <main id="main" className="relative bg-white text-foreground">
        {/* Column guides continue down the page */}
        <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1160px] text-black/[0.12]">
          <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
        </div>

        <div className="relative mx-auto flex max-w-[1160px] flex-col gap-20 px-6">

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
                {gameDesignResultsHeading}
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
            ctaHref="/book?course=game-design"
            weeks={gameDesignProgramWeeks}
            totalWeeks={gameDesignTotalWeeks}
          />

          {/* ── ВИДЕОЛЕКЦИЯ ─────────────────────────────────── */}
          <div className="-mt-20">
            <VideoLecture title={gameDesignVideo.title} url={gameDesignVideo.url} />
          </div>

          {/* ── ПРЕПОДАВАТЕЛИ ───────────────────────────────── */}
          {gameDesignTeachers.length > 0 && (
            <section id="teachers" className="-mt-20 scroll-mt-28">
              <div className="-mx-6 border-x border-b border-black/10">
                <TeachersCarousel
                  items={gameDesignTeachers}
                  title="Преподаватели"
                />
              </div>
            </section>
          )}

          {/* ── КНИГИ ПРЕПОДАВАТЕЛЯ ─────────────────────────── */}
          {teacherBooks.length > 0 && (
            <div className="-mt-20">
              <TeacherBooks items={teacherBooks} title="Книги Иеронима К." />
            </div>
          )}

          {/* ── СТОИМОСТЬ — title left, pricing card right (как «Результаты») ── */}
          <section
            id="pricing"
            className="-mx-6 -mt-20 grid scroll-mt-28 border-b border-black/10 md:grid-cols-2"
          >
            {/* Title + perk (sticky on desktop) */}
            <div className="border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-14">
              <div className="flex flex-col gap-14 md:sticky md:top-24">
                <h2 className="text-fluid-4xl leading-tight text-foreground">
                  Пора сделать себе классное портфолио гейм-дизайнера
                </h2>
                <div className="flex flex-col gap-3">
                  <p className="flex items-start gap-3 text-fluid-sm text-foreground/70">
                    <CreditCard
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={2}
                    />
                    {gameDesignPricing.note}
                  </p>
                  <p className="flex items-start gap-3 text-fluid-sm text-foreground/70">
                    <Gift
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={2}
                    />
                    {gameDesignPricing.perk}
                  </p>
                  <p className="flex items-start gap-3 text-fluid-sm text-foreground/70">
                    <ThumbsUp
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={2}
                    />
                    Рекомендация в LinkedIn, самым трудолюбивым
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing content — toggleable installment view lives in the client component */}
            <PricingPanel
              pricing={gameDesignPricing}
              benefits={pricingBenefits}
              ctaHref="/book?course=game-design"
            />
          </section>

          {/* ── ОТЗЫВЫ ──────────────────────────────────────── */}
          <section id="testimonials" className="-mt-20 scroll-mt-28">
            <div className="-mx-6 border-x border-b border-black/10">
              <TestimonialsCarousel items={gameDesignTestimonials} />
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
              <FaqAccordion items={gameDesignFaq} />
            </div>
          </section>

          {/* ── ФИНАЛЬНЫЙ БЛОК — кросс-селл (same CourseCard as the homepage) ── */}
          <section className="-mx-6 -mt-20 border-b border-black/10 bg-white">
            <CourseCard course={crossSell} index={0} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

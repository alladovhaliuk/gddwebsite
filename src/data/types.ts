/**
 * Shared course-data types. Each course (narrative, game-design, consultations)
 * ships its own data file (`src/data/<slug>.ts`) exporting values that match
 * these shapes; the shared components (CourseHero, ProgramSection,
 * ScheduleCalendar, TeachersCarousel, PricingPanel, FaqAccordion) consume them
 * via props so the same components render every course page.
 */

export type CourseHero = {
  title: string;
  subtitle?: string; // optional second line under the headline
  cta: string;
  ctaHref?: string; // defaults to "#pricing"
  image: string; // path under /public, e.g. "/hero_gamedes.webp"
};

export type CourseIntro = { text: string };

export type ProgramDay = { day: string; text: string };
export type ProgramTask = { kind: "doc" | "proto" | "call"; text: string };
export type ProgramWeek = {
  index: number; // 1-based week number
  group: string; // pagination group label, e.g. "1–3"
  title: string;
  days: ProgramDay[];
  tasks: ProgramTask[];
};

// A book authored by a teacher, shown in the dedicated Книги block (large,
// upright cover + readable caption) rather than as tiny overlays.
export type TeacherBook = {
  cover: string; // path under /public
  title?: string; // shown next to the cover
  note?: string; // secondary line, e.g. co-authors
};

export type Teacher = {
  name: string;
  role: string;
  image?: string; // under /public
  badge?: string;
  // Optional CSS `object-position` override for the portrait (default
  // `center 22%`). Per-teacher because each photo's framing is different.
  imagePosition?: string;
  // Optional published books — rendered in their own Книги section so the
  // covers and titles are clearly legible.
  books?: TeacherBook[];
};

export type Pricing = {
  price: string; // display string e.g. "$759"
  priceValue: number; // numeric value used for installment math
  currency: string;
  installments: number; // default number of parts shown as the installment hint
  note: string;
  perk: string;
  primaryCta: string; // pay-in-full CTA, e.g. "Купить курс целиком"
  secondaryCta: string; // pay-in-parts CTA, e.g. "Оплатить частями"
};

export type FaqItem = { q: string; a: string };

export type Presentation = {
  title: string;
  subtext: string;
  cta: string;
  url: string;
  videoCta: string;
  videoUrl: string;
};

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

export type Teacher = {
  name: string;
  role: string;
  image?: string; // under /public
  badge?: string;
  // Optional CSS `object-position` override for the portrait (default
  // `center 22%`). Per-teacher because each photo's framing is different.
  imagePosition?: string;
};

export type Pricing = {
  price: string; // display string e.g. "$759"
  priceValue: number; // numeric value used for installment math
  currency: string;
  installments: number; // default number of parts when "Рассчитать рассрочку" opens
  note: string;
  perk: string;
  primaryCta: string;
  secondaryCta: string;
  installmentCtaLabel: string;
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

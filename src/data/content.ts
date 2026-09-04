/**
 * Static site content — course catalog, feature grid, testimonials, partner
 * logos and social links. The editable copy lives in `content/main.json`
 * (edited by the client through Pages CMS — see `.pages.yml`); this module
 * re-exports it with types plus the derived values (logos, marquee).
 */

import main from "../../content/main.json";

export type Course = {
  kind: string; // "Курс" | "Консультация"
  title: string;
  startDate?: string; // DD/MM/YYYY
  status: { label: string; tone: "open" | "free" };
  points: { title: string; text: string }[];
  image?: string; // path under /public
  href?: string; // course landing page; falls back to "#" when absent
  // cycling typewriter blocks over the image; `pos` = position/size classes
  overlays?: { lines: string[]; pos: string }[];
};

// Homepage copy (hero, intro lead, about heading, author block).
export const home = main.home;

export const features: { title: string; text: string }[] = main.features;

export const courses = main.courses as Course[];

export const testimonials: { name: string; text: string }[] = main.testimonials;

// Partner studio logos (in /public/img/logos). Some are white artwork and
// need inverting so they read as gray on the light background.
const lightLogos = new Set([6, 10]);
export const studioLogos = Array.from({ length: 18 }, (_, i) => ({
  src: `/img/logos/logo-${i + 1}.webp`,
  light: lightLogos.has(i + 1),
}));

// Nearest intakes for the hero ticker (courses that have a start date).
export const marqueeItems = courses
  .filter((c) => !!c.startDate)
  .map((c) => ({
    title: `«${c.title}»`,
    date: c.startDate!,
  }));

export const socials = main.socials;

export const contactEmail = main.contactEmail;

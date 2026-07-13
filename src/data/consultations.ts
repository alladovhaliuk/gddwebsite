/**
 * Content for the "Персональные консультации" course page
 * (/courses/consultations). The editable copy lives in
 * `content/consultations.json` (edited by the client through Pages CMS — see
 * `.pages.yml`); this module re-exports it typed with the shared shapes from
 * `data/types.ts`. The shared course components (CourseHero,
 * TeachersCarousel, FaqAccordion, …) consume the exports via props so the
 * same page shell renders this course too.
 *
 * Consultations differ from the educational courses in two ways:
 *  - no weekly program / pricing / presentation card,
 *  - two Results-grid sections instead of one: a "questions you're facing"
 *    block (numbered prompts) and a "what we do together" services block.
 */

import type { CourseHero, Teacher, FaqItem } from "@/data/types";
import { contactEmail } from "@/data/content";
import data from "../../content/consultations.json";

export const consultationsHero = data.hero as CourseHero;

// Intro = the "Вы хотите сделать свою игру…" lead, rendered as one
// cohesive paragraph via ScrollWords. The grid of 01–06 questions sits
// directly below.
export const consultationsIntro = data.intro;

export type QuestionItem = { number: string; question: string };

export const consultationsQuestions: QuestionItem[] = data.questions;

// ── Кто проводит консультации/сопровождение ──────────────────────
export const consultationsTeachersHeading = data.teachersHeading;

export const consultationsTeachers = data.teachers as Teacher[];

// ── «Вместе мы:» — services block ─────────────────────────────────
export const consultationsServicesHeading = data.servicesHeading;

export type ServiceItem = { title: string; text: string };

export const consultationsServices: ServiceItem[] = data.services;

// ── Форматы услуг + Стоимость ─────────────────────────────────────
export type ConsultationDuration = {
  label: string;
  /**
   * Number of consultations the bundle includes when this duration is
   * selected. When set, the card title rewrites itself to `${count}
   * консультаций` (with Russian plural agreement) as the user toggles
   * durations.
   */
  count?: number;
};

export type ConsultationFormat = {
  title: string;
  description?: string;
  /**
   * Duration toggle (e.g. 3 / 6 / 12 months). When set, the format card
   * renders the switch. If any option has a `count`, the title is replaced
   * by that count + "консультаций" while the matching duration is selected.
   */
  durations?: ConsultationDuration[];
  extraNote?: string;
  audience?: string;
};

export const consultationsFormatsHeading = data.formatsHeading;

export const consultationsFormats: ConsultationFormat[] = data.formats;

// The mailto link is rebuilt from `contactEmail` (content/main.json) so the
// school email lives in a single editable place.
export const consultationsPricing = {
  ...data.pricing,
  secondaryCta: {
    label: data.pricing.secondaryCta.label,
    href: `mailto:${contactEmail}`,
  },
};

export const consultationsFaq: FaqItem[] = data.faq;

/**
 * Content for the "Нарративщики" course page (/courses/narrative).
 * The editable copy lives in `content/narrative.json` (edited by the client
 * through Pages CMS — see `.pages.yml`); this module re-exports it typed with
 * the shared shapes from `data/types.ts` so the shared course components
 * (CourseHero, ProgramSection, …) render this page unchanged.
 *
 * The Результаты cards reuse the shared `features` array and the cross-sell
 * card reuses `courses[1]` from `content.ts`, so they live there — not here.
 */

import type {
  CourseHero,
  CourseIntro,
  ProgramWeek,
  Teacher,
  Pricing,
  FaqItem,
  Presentation,
} from "@/data/types";
import data from "../../content/narrative.json";

export const narrativeHero = data.hero as CourseHero;

export const narrativeIntro: CourseIntro = data.intro;

export const resultsHeading = data.resultsHeading;

export const programTotalWeeks = data.totalWeeks;
export const programWeeks = data.weeks as ProgramWeek[];

export const teachers = data.teachers as Teacher[];

export const pricing: Pricing = data.pricing;

export const faq: FaqItem[] = data.faq;

export const presentation: Presentation = data.presentation;

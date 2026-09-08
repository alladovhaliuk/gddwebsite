/**
 * Content for the "Гейм-дизайнеры" course page (/courses/game-design).
 * The editable copy lives in `content/game-design.json` (edited by the client
 * through Pages CMS — see `.pages.yml`); this module re-exports it typed with
 * the shared shapes from `data/types.ts`, so the same shared course
 * components render this page. The Результаты cards reuse the shared
 * `features` array from `content.ts`, and the cross-sell card reuses
 * `courses[0]` ("Нарративщики") from `content.ts` — those live there.
 */

import type {
  CourseHero,
  CourseIntro,
  ProgramWeek,
  Teacher,
  Pricing,
  FaqItem,
} from "@/data/types";
import data from "../../content/game-design.json";

export const gameDesignHero = data.hero as CourseHero;

export const gameDesignIntro: CourseIntro = data.intro;

export const gameDesignResultsHeading = data.resultsHeading;

export const gameDesignTotalWeeks = data.totalWeeks;
export const gameDesignProgramWeeks = data.weeks as ProgramWeek[];

export const gameDesignTeachers = data.teachers as Teacher[];

export const gameDesignPricing: Pricing = data.pricing;

export const gameDesignFaq: FaqItem[] = data.faq;


export const gameDesignTestimonials: { name: string; text: string }[] =
  data.testimonials;

export const gameDesignVideo = data.videoLecture as { title: string; url: string };

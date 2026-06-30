/**
 * Content for the "Персональные консультации" course page
 * (/courses/consultations). Mirrors the shape of the other course data
 * files and reuses the shared types from `data/types.ts`. The shared course
 * components (CourseHero, TeachersCarousel, FaqAccordion, …) consume the
 * exports via props so the same page shell renders this course too.
 *
 * Consultations differ from the educational courses in two ways:
 *  - no weekly program / pricing / presentation card,
 *  - two Results-grid sections instead of one: a "questions you're facing"
 *    block (numbered prompts) and a "what we do together" services block.
 */

import type { CourseHero, Teacher, FaqItem } from "@/data/types";
import { contactEmail } from "@/data/content";

export const consultationsHero: CourseHero = {
  title: "Консультирование по созданию игр",
  subtitle: "Сопровождение от идеи до релиза игры",
  cta: "Узнать подробнее",
  ctaHref: "#services",
  image: "/hero_consultations.png",
};

// Intro = the "Вы хотите сделать свою игру…" lead, rendered as one
// cohesive paragraph via ScrollWords. The grid of 01–06 questions sits
// directly below.
export const consultationsIntro = {
  text: "Вы хотите сделать свою игру, но не знаете, с чего начать? За последние несколько лет инди-игры выбороли себе внимание миллионов игроков! Теперь мини-команды делают игры, которые становятся не менее любимыми и важными, чем AAA-проекты.",
};

export type QuestionItem = { number: string; question: string };

export const consultationsQuestions: QuestionItem[] = [
  { number: "01", question: "Как собрать команду и выстроить в ней процессы?" },
  { number: "02", question: "Как подготовить страницу на Steam?" },
  { number: "03", question: "Рассчитать бюджет для игры?" },
  { number: "04", question: "Где искать издателя?" },
  { number: "05", question: "Как вести переговоры?" },
  { number: "06", question: "Как выйти на зарубежный рынок?" },
];

// ── Кто проводит консультации/сопровождение ──────────────────────
export const consultationsTeachersHeading =
  "Кто проводит консультации/сопровождение";

export const consultationsTeachers: Teacher[] = [
  {
    name: "Алла Довгалюк",
    role: "Гейм-дизайнер, нарративный дизайнер, сценарист игр, основатель школы GDD, преподаватель. Работала с такими игровыми студиями и издательствами с 2013 г. (Big Fish Games, Belka Games, tinyBuild…).",
    image: "/alla-2.png",
  },
  {
    name: "Александр Лавришко",
    role: "Игровой продюсер. Работал с такими игровыми студиями и издательствами с 2015 (101xp, Belka Games, Saber Interactive, Saber Porto…). Самые популярные игры портфолио: Snow Runner, Expeditions: A MudRunner Game. Специализация: продюсирование, бизнес-модели, взаимодействие с издателями, инвесторами и платформами.",
    image: "/alex.png",
  },
];

// ── «Вместе мы:» — services block ─────────────────────────────────
export const consultationsServicesHeading = "Вместе мы:";

export type ServiceItem = { title: string; text: string };

export const consultationsServices: ServiceItem[] = [
  {
    title: "ИДЕЯ, ЖАНР И АУДИТОРИЯ",
    text: "Вместе выберем лучшую идею игры под ваши цели, оформим её, определим жанр и игровую аудиторию. Разберём, как из документов и картинок сделать настоящую игру, а не серию изображений.",
  },
  {
    title: "КОМАНДА И ПОДБОР СПЕЦИАЛИСТОВ",
    text: "Определим, какое количество человек нужно в команде, поможем искать и подбирать специалистов, даже если бюджет пока очень ограничен.",
  },
  {
    title: "БЮДЖЕТ И ПЛАНИРОВАНИЕ",
    text: "Рассчитаем бюджет для игры и проговорим возможные пути оптимизации. Поможем наладить процессы внутри команды, чтобы вы действительно могли дойти до релиза.",
  },
  {
    title: "ДОКУМЕНТАЦИЯ И ПОДГОТОВКА ПРОЕКТА",
    text: "Напишем гейм-дизайн-документ, питч и другую необходимую документацию. Подробно объясним, что такое «вертикальный срез» и как его правильно собрать.",
  },
  {
    title: "РАБОТА С ИЗДАТЕЛЯМИ",
    text: "Поможем составить список издателей, будем вести переговоры с издателем и выберем самого подходящего под ваши цели.",
  },
  {
    title: "ПЛАТФОРМА И ПРОДВИЖЕНИЕ",
    text: "Подготовим страницу на Steam и выстроим стратегию продвижения, чтобы о вашей игре узнали ещё на ранних этапах.",
  },
];

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

export const consultationsFormatsHeading = "Форматы услуг";

export const consultationsFormats: ConsultationFormat[] = [
  {
    title: "Разовая консультация",
    description:
      "Поддерживаем после консультации: вы можете писать нам в любое время, и мы с радостью поможем.",
  },
  {
    title: "Консультации для коммерческих игровых студий (неинди)",
    description:
      "Настройка процессов в разных отделах, документация, командные процессы.",
  },
  {
    // Title is the default (3-month bundle); the toggle swaps it to "14
    // консультаций" / "25 консультаций" when the longer durations are
    // selected. See ConsultationDuration.count.
    title: "6 консультаций",
    durations: [
      { label: "3 месяца", count: 6 },
      { label: "6 месяцев", count: 14 },
      { label: "12 месяцев", count: 25 },
    ],
    extraNote: "+ Постоянная обратная письменная связь",
    audience:
      "Для инди и соло-авторов: подходит командам с прототипом или вертикальным срезом и авторам-одиночкам, которые готовы собирать команду.",
  },
];

export const consultationsPricing = {
  price: "от 299$*",
  description:
    "Напишите коротко о вашей игре и целях, и мы предложим формат под ваш проект. Стоимость для авторов-одиночек, средних команд и больших игровых студий разнится.",
  primaryCta: {
    label: "Связаться в Telegram",
    href: "https://t.me/alla_dovhaliuk",
  },
  secondaryCta: {
    label: "Написать письмо",
    href: `mailto:${contactEmail}`,
  },
  notes: [
    "* Также стоимость зависит от ваших целей (скорый релиз или пополнение личного портфолио в спокойном темпе) и стадии проекта.",
    "Мы подберём оптимальный формат: разовую консультацию, серию встреч или полное сопровождение.",
  ],
};

// ── FAQ ───────────────────────────────────────────────────────────
export const consultationsFaq: FaqItem[] = [
  {
    q: "Когда стоит обращаться?",
    a: "Вы можете написать нам, когда у вас уже есть игровой прототип, гейм-дизайн-документ или другая документация. Но если пока есть только идея, также смело обращайтесь, мы поможем определиться с жанром и планом реализации.",
  },
  {
    q: "Если у меня нет команды?",
    a: "Ничего страшного, любая игра начинается с идеи одного человека. Мы поможем отыскать людей для вашей команды, как правило, вам понадобится ещё 1–3 человека для создания прототипа, с которым можно будет искать инвестора, издателя.",
  },
  {
    q: "А если у меня уже есть команда? Мы можем прийти на созвон все вместе?",
    a: "Вы обязаны прийти ВСЕ вместе на нашу консультацию! :) Так будет только лучше для вашей игры, что и есть нашей целью!",
  },
  {
    q: "Вы помогаете искать издателя?",
    a: "Да. Мы подберём список издателей для вас, подготовим питч и документы, расскажем, как защитить свои права и избежать невыгодных контрактов.",
  },
  {
    q: "Будет ли обратная связь?",
    a: "Алла детально проверяет каждое задание, отвечает в общем чате и в личной переписке. Если вы не уверены в каком-то решении, нужна помощь, например, не поняли вопроса в тестовом задании, смело обращайтесь и после курса!",
  },
  {
    q: "Подходит ли сопровождение для занятых людей?",
    a: "Будьте спокойны, мы выберем такой график, чтобы он комфортно вплетался в вашу жизнь.",
  },
  {
    q: "Что я получу по итогу?",
    a: "Документы, обратную связь с точки зрения гейм-дизайна и продюсирования, питч, список подходящих издателей, сопровождение в переговорах, чтобы получить лучшие условия для вас и вашей игры, стратегию продвижения. До релиза мы дойдём вместе.",
  },
];

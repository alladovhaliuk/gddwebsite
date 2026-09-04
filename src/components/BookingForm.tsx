"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { contactEmail, courses as homepageCourses } from "@/data/content";
import { pricing as narrativePricing } from "@/data/narrative";
import { gameDesignPricing } from "@/data/game-design";
import type { Pricing } from "@/data/types";
import { submitBooking } from "@/app/book/actions";

/**
 * Booking form for /book. Single-viewport split: left half is the chosen
 * course's painterly card image (reused from the homepage course cards —
 * sharper than the wide hero PNG), right half is the contact form. Course
 * is preselected from ?course=narrative|game-design; the header CTA (no
 * preselect) lets the visitor pick. Shell-only — submit just flips to a
 * success state; wire to a real backend later.
 */

type CourseSlug = "narrative" | "game-design";

type CourseOption = {
  slug: CourseSlug;
  label: string;
  image: string;
  pricing: Pricing;
};

const COURSES: CourseOption[] = [
  {
    slug: "narrative",
    label: "Нарративщики",
    // Reuse the homepage course-card image — full-resolution painting, much
    // sharper than the wide hero strip.
    image: homepageCourses[0].image ?? "/img/narrators.webp",
    pricing: narrativePricing,
  },
  {
    slug: "game-design",
    label: "Гейм-дизайнеры",
    image: homepageCourses[1].image ?? "/img/gamedesigners.webp",
    pricing: gameDesignPricing,
  },
];

// Russian plural for "часть". Lifted from PricingPanel.
function pluralizeParts(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "частей";
  if (mod10 === 1) return "часть";
  if (mod10 >= 2 && mod10 <= 4) return "части";
  return "частей";
}

const PART_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

export default function BookingForm() {
  const params = useSearchParams();
  const slugParam = params.get("course") as CourseSlug | null;
  const initialCourse =
    COURSES.find((c) => c.slug === slugParam) ?? null;

  const [course, setCourse] = useState<CourseOption | null>(initialCourse);
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  // 1 = full payment; 2–6 = installments.
  const [parts, setParts] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const perPart = course
    ? Math.round(course.pricing.priceValue / parts)
    : null;

  // Image shown on the left: chosen course's card painting; falls back to
  // the dedicated booking-form painting when no course is selected yet,
  // so the empty state still feels on-brand instead of a blank panel.
  const heroImage = course?.image ?? "/form_hero.webp";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const result = await submitBooking({
      course: course?.label ?? "(не выбран)",
      parts,
      priceValue: course?.pricing.priceValue ?? 0,
      currency: course?.pricing.currency ?? "",
      name,
      email,
      telegram,
      note,
    });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  };

  return (
    <main id="main" className="grid h-full bg-white text-foreground md:grid-cols-2">
      {/* Left — course hero painting, fixed full-height column. Stays put
          while the right column scrolls. */}
      <aside className="relative isolate hidden overflow-hidden border-r border-black/10 bg-cream md:block">
        {heroImage ? (
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center p-12 text-center">
            <p className="max-w-sm text-fluid-2xl leading-snug text-foreground/55">
              Выберите курс справа, и мы подскажем следующие шаги.
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-3 p-8 text-white md:p-12">
          <span className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-fluid-sm text-white backdrop-blur-md">
            Забронировать место
          </span>
          {course ? (
            <h1 className="text-fluid-4xl font-bold leading-tight">
              {course.label}
            </h1>
          ) : (
            <p className="max-w-md text-fluid-4xl font-bold leading-tight">
              Выберите курс справа, и мы подскажем следующие шаги.
            </p>
          )}
        </div>
      </aside>

      {/* Right — form column. Splits into a scrollable body + a sticky footer
          that pins the submit button to the bottom of the viewport. */}
      <section className="relative flex min-h-0 flex-col overflow-hidden">
        {submitted ? (
          <div className="overflow-y-auto px-6 py-10 md:px-12 md:py-14">
            <SuccessState courseLabel={course?.label} />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            {/* Scrollable body. Top padding clears the floating glass header
                with a small extra breathing line. `data-lenis-prevent` keeps
                Lenis from hijacking wheel events here so the mouse wheel
                actually scrolls this panel instead of the whole page. */}
            <div
              data-lenis-prevent
              className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-20 md:px-12 md:pb-10 md:pt-24"
            >
              <header className="flex flex-col gap-3">
                <h2 className="text-fluid-3xl leading-tight text-foreground">
                  Оставьте контакты, мы свяжемся в течение суток
                </h2>
              </header>

            {/* Course selector. When a course is chosen the other card fades
                so the active selection reads clearly. */}
            <fieldset className="flex flex-col gap-3">
              <div className="grid gap-2 sm:grid-cols-2">
                {COURSES.map((c) => {
                  const isSelected = course?.slug === c.slug;
                  const isFaded = course !== null && !isSelected;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setCourse(c)}
                      aria-pressed={isSelected}
                      className={`flex flex-col gap-1 rounded-xl border px-4 py-3 text-left text-fluid-sm transition-all ${
                        isSelected
                          ? "border-foreground bg-foreground/[0.04]"
                          : isFaded
                          ? "border-black/10 opacity-50 hover:opacity-100"
                          : "border-black/15 hover:bg-black/[0.04]"
                      }`}
                    >
                      <span className="font-bold text-foreground">
                        {c.label}
                      </span>
                      <span className="text-foreground/55">
                        {c.pricing.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Contact fields. */}
            <div className="flex flex-col gap-4">
              <Field
                label="Имя"
                required
                value={name}
                onChange={setName}
                placeholder="Как к вам обращаться"
              />
              <Field
                label="Email"
                type="email"
                required
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
              />
              <Field
                label="Telegram"
                required
                value={telegram}
                onChange={setTelegram}
                placeholder="@username"
              />
              <FieldArea
                label="Ваши вопросы"
                value={note}
                onChange={setNote}
                placeholder="Напишите ваши вопросы"
                hint="Если вопросов нет — просто пропустите это поле."
              />
            </div>

            {/* Installments selector — only show when a course is picked.
                Preference only — actual payment is arranged during the
                callback, no card details are taken here. */}
            {course && perPart !== null && (
              <fieldset className="flex flex-col gap-3">
                <legend className="pb-1 text-fluid-sm font-medium text-foreground">
                  Предпочтительная оплата
                </legend>
                <p className="-mt-1 text-fluid-xs text-foreground/55">
                  Сейчас ничего платить не нужно, обсудим формат оплаты,
                  когда напишем вам.
                </p>
                <div className="flex flex-wrap gap-2">
                  {PART_OPTIONS.map((n) => {
                    const isSelected = parts === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setParts(n)}
                        aria-pressed={isSelected}
                        className={`rounded-full px-4 py-2 text-fluid-sm tabular-nums transition-colors ${
                          isSelected
                            ? "bg-foreground text-white"
                            : "border border-black/15 text-foreground hover:bg-black/[0.04]"
                        }`}
                      >
                        {n === 1
                          ? "Целиком"
                          : `${n} ${pluralizeParts(n)}`}
                      </button>
                    );
                  })}
                </div>
                <p className="text-fluid-sm text-foreground/65">
                  {parts === 1
                    ? `${course.pricing.currency}${course.pricing.priceValue} одной оплатой`
                    : `${course.pricing.currency}${perPart} × ${parts} ${pluralizeParts(
                        parts
                      )} · итого ${course.pricing.price}`}
                </p>
              </fieldset>
            )}

            </div>

            {/* Sticky footer — submit button is always reachable without
                scrolling, even if the form body overflows the viewport. */}
            <div className="shrink-0 border-t border-black/10 bg-white px-6 py-5 md:px-12 md:py-6">
              {error && (
                <p
                  role="alert"
                  className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-fluid-sm text-red-900"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-black py-3 pl-5 pr-2 text-[14px] text-white shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {submitting ? "Отправляем…" : "Забронировать место"}
                </span>
                <span className="grid size-7 place-items-center rounded-lg bg-white text-black shadow-[inset_0_0_2px_1px_rgba(0,0,0,0.25)] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" strokeWidth={2.25} />
                </span>
              </button>
              <p className="mt-3 text-center text-fluid-xs text-foreground/55">
                Или напишите нам напрямую:{" "}
                <a
                  href="https://t.me/alla_dovhaliuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:underline"
                >
                  @alla_dovhaliuk
                </a>{" "}
                ·{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-brand-orange hover:underline"
                >
                  {contactEmail}
                </a>
              </p>
              <p className="mt-2 text-center text-fluid-xs text-foreground/45">
                Отправляя форму, вы соглашаетесь с{" "}
                <a href="/privacy" className="underline hover:text-foreground/70">
                  политикой конфиденциальности
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-fluid-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-black/15 bg-white px-4 py-3 text-fluid-sm text-foreground placeholder:text-foreground/35 focus:border-foreground focus:outline-none"
      />
      {hint && (
        <span className="text-fluid-xs text-foreground/55">{hint}</span>
      )}
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-fluid-sm font-medium text-foreground">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="rounded-xl border border-black/15 bg-white px-4 py-3 text-fluid-sm text-foreground placeholder:text-foreground/35 focus:border-foreground focus:outline-none"
      />
      {hint && (
        <span className="text-fluid-xs text-foreground/55">{hint}</span>
      )}
    </label>
  );
}

function SuccessState({ courseLabel }: { courseLabel?: string }) {
  return (
    <div className="flex flex-col items-start gap-6">
      <span className="grid size-14 place-items-center rounded-full bg-brand-orange/15 text-brand-orange">
        <Check className="size-7" strokeWidth={2.5} />
      </span>
      <div className="flex flex-col gap-3">
        <h2 className="text-fluid-4xl leading-tight text-foreground">
          Спасибо! Мы свяжемся с вами в течение суток.
        </h2>
        <p className="text-fluid-base leading-relaxed text-foreground/70">
          {courseLabel
            ? `Бронь на курс «${courseLabel}» принята. Свяжемся в течение суток, ответим на вопросы и согласуем удобный формат оплаты.`
            : "Заявка отправлена. Напишем с подробностями и ответим на все вопросы."}
        </p>
      </div>
      <Link
        href="/"
        className="group inline-flex items-center gap-2.5 rounded-xl border border-black/15 px-5 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-black/[0.04]"
      >
        <span>Вернуться на главную</span>
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.25}
        />
      </Link>
    </div>
  );
}

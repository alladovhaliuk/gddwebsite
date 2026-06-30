"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Pricing } from "@/data/types";

/**
 * Right column of the Стоимость section. Default view shows the full price.
 * Clicking "Рассчитать рассрочку" opens an installment breakdown with a switch
 * to pick how many payments (2 → 6). Selecting any number updates the
 * per-payment number live. Click "Скрыть рассрочку" to return to the full
 * price.
 *
 * Lives as a client component because of the toggle + switch state — the
 * surrounding section is server-rendered. Pricing data comes in as a prop so
 * the same panel powers every course page.
 */

const PART_OPTIONS = [2, 3, 4, 5, 6] as const;

// Russian noun declension for "часть": 1 часть, 2–4 части, 5+ частей. Handles
// the 11–14 exception range too.
function pluralizeParts(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "частей";
  if (mod10 === 1) return "часть";
  if (mod10 >= 2 && mod10 <= 4) return "части";
  return "частей";
}

export default function PricingPanel({
  pricing,
  benefits,
  ctaHref = "#",
}: {
  pricing: Pricing;
  benefits: string[];
  /** Primary CTA target. Pages pass /book?course=… so "Купить курс целиком"
   *  lands on the booking form. */
  ctaHref?: string;
}) {
  // null = installment view hidden. A number = installment view shown with
  // that many payments selected.
  const [installmentParts, setInstallmentParts] = useState<number | null>(null);
  const installment = installmentParts !== null;
  const parts = installmentParts ?? pricing.installments;
  // Whole-dollar per-payment, rounded to the nearest integer.
  const perMonth = Math.round(pricing.priceValue / parts);

  return (
    <div className="p-6 md:p-14">
      {/* Price line — always single line, value changes with installment. */}
      <span className="text-fluid-hero font-bold leading-none tracking-[-0.02em] text-foreground">
        {installment ? (
          <>
            {pricing.currency}
            {perMonth}
            <span className="ml-2 text-fluid-2xl font-normal text-foreground/55">
              × {parts} {pluralizeParts(parts)}
            </span>
          </>
        ) : (
          pricing.price
        )}
      </span>

      {/* Collapsible: total subtext + parts switch. Uses the grid-rows-[0fr→1fr]
          trick (same pattern as FaqAccordion) so the height animates smoothly
          and takes zero space when collapsed — no permanent white gap. */}
      <div
        aria-hidden={!installment}
        className={`grid transition-all duration-300 ease-out ${
          installment
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-5 pt-2">
            <span className="text-fluid-sm text-foreground/55">
              {pricing.price} итого
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-fluid-sm text-foreground/55">Платежей:</span>
              <div className="flex gap-2">
                {PART_OPTIONS.map((n) => {
                  const selected = parts === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setInstallmentParts(n)}
                      tabIndex={installment ? 0 : -1}
                      aria-pressed={selected}
                      className={`grid size-9 place-items-center rounded-full text-fluid-sm tabular-nums transition-colors ${
                        selected
                          ? "bg-foreground text-white"
                          : "border border-black/15 text-foreground hover:bg-black/[0.04]"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits list */}
      <ul className="mt-14 flex flex-col gap-3">
        {benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-fluid-sm text-foreground"
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-brand-orange"
              strokeWidth={2.5}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3">
        {/* Primary — black pill with white icon tile */}
        <a
          href={ctaHref}
          className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-black py-2 pl-5 pr-2 text-[14px] text-white shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.4)]"
        >
          <span>{pricing.primaryCta}</span>
          <span className="grid size-7 place-items-center rounded-lg bg-white text-black shadow-[inset_0_0_2px_1px_rgba(0,0,0,0.25)] transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-4" strokeWidth={2.25} />
          </span>
        </a>

        {/* Secondary — text-only outlined pill; toggles installment view */}
        <button
          type="button"
          onClick={() =>
            setInstallmentParts((p) => (p === null ? pricing.installments : null))
          }
          aria-pressed={installment}
          className="inline-flex items-center justify-center rounded-xl border border-black/15 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-black/[0.04]"
        >
          {installment ? pricing.installmentCtaLabel : pricing.secondaryCta}
        </button>
      </div>
    </div>
  );
}

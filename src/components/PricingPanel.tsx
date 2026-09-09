import { ArrowRight, Check } from "lucide-react";
import type { Pricing } from "@/data/types";

/**
 * Right column of the Стоимость section. Shows the full price with an
 * installment hint underneath, then two real CTAs: pay in full, or pay in
 * parts. Both link to the booking page — "Оплатить частями" carries
 * `plan=installment` so the booking form opens with the installment plan
 * preselected (the exact number of payments is chosen there). Server-rendered;
 * pricing data comes in as a prop so the same panel powers every course page.
 */

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
  /** Booking target. Pages pass /book?course=… — the installment CTA appends
   *  plan=installment to preselect paying in parts. */
  ctaHref?: string;
}) {
  // Smallest per-payment amount (the default max number of parts), shown as a
  // "from" figure so visitors immediately see installments are possible.
  const perPart = Math.round(pricing.priceValue / pricing.installments);
  const sep = ctaHref.includes("?") ? "&" : "?";
  const installmentHref = `${ctaHref}${sep}plan=installment`;

  return (
    <div className="p-6 md:p-14">
      {/* Price + installment hint */}
      <span className="text-fluid-hero font-bold leading-none tracking-[-0.02em] text-foreground">
        {pricing.price}
      </span>
      <p className="mt-3 text-fluid-sm text-foreground/55">
        или частями — от {pricing.currency}
        {perPart} × {pricing.installments} {pluralizeParts(pricing.installments)}
      </p>

      {/* Benefits list */}
      <ul className="mt-12 flex flex-col gap-3">
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

      {/* CTAs — two real booking links: pay in full, or pay in parts */}
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

        {/* Secondary — outlined pill, also a real booking link (installments) */}
        <a
          href={installmentHref}
          className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-black/15 py-2 pl-5 pr-2 text-[14px] font-medium text-foreground transition-colors hover:bg-black/[0.04]"
        >
          <span>{pricing.secondaryCta}</span>
          <span className="grid size-7 place-items-center rounded-lg border border-black/15 text-foreground transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-4" strokeWidth={2.25} />
          </span>
        </a>
      </div>
    </div>
  );
}

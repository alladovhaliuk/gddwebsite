"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { ConsultationFormat } from "@/data/consultations";

/**
 * Left column of the consultations Стоимость section: a stack of "format"
 * cards. The 6-консультаций bundle carries an interactive 3 / 6 / 12 month
 * duration switch, which rewrites the card title to the matching number of
 * consultations (6 / 14 / 25). Lives as a client component because of the
 * toggle state — the surrounding section is server-rendered.
 */

// Russian plural agreement for "консультация": 1 консультация, 2–4
// консультации, 5+ консультаций. Handles the 11–14 exception.
function pluralizeConsultations(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "консультаций";
  if (mod10 === 1) return "консультация";
  if (mod10 >= 2 && mod10 <= 4) return "консультации";
  return "консультаций";
}

export default function ConsultationsFormats({
  heading,
  formats,
}: {
  heading: string;
  formats: ConsultationFormat[];
}) {
  // One selected duration per format card. Defaults to the first option.
  const [selected, setSelected] = useState<Record<number, number>>({});

  return (
    <div className="flex flex-col">
      <h2 className="px-6 pb-8 text-fluid-4xl leading-tight text-foreground md:px-10">
        {heading}
      </h2>
      {/* Top border only — the column's own border-b (mobile) / border-r
          (desktop) provides the closing rule, so the seam stays a single 1px
          hairline. */}
      <div className="flex flex-col border-t border-black/10">
        {formats.map((f, i) => {
          const current = selected[i] ?? 0;
          const currentCount = f.durations?.[current]?.count;
          const title =
            currentCount !== undefined
              ? `${currentCount} ${pluralizeConsultations(currentCount)}`
              : f.title;
          return (
            <article
              key={f.title}
              className="flex flex-col gap-4 border-t border-black/10 px-6 py-8 [&:first-child]:border-t-0 md:px-10"
            >
              <h3 className="font-bold uppercase tracking-[0.06em] leading-[1.15] text-foreground">
                {title}
              </h3>

              {f.description && (
                <p className="flex items-start gap-3 text-fluid-sm text-foreground/75">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-brand-orange"
                    strokeWidth={2.5}
                  />
                  <span>{f.description}</span>
                </p>
              )}

              {f.durations && (
                <div className="flex flex-wrap items-center gap-2">
                  {f.durations.map((d, di) => {
                    const isSelected = di === current;
                    return (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() =>
                          setSelected((s) => ({ ...s, [i]: di }))
                        }
                        aria-pressed={isSelected}
                        className={`rounded-full px-4 py-2 text-fluid-sm transition-colors ${
                          isSelected
                            ? "bg-foreground text-white"
                            : "border border-black/15 text-foreground hover:bg-black/[0.04]"
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {f.extraNote && (
                <p className="text-fluid-sm text-foreground/65">{f.extraNote}</p>
              )}

              {f.audience && (
                <p className="flex items-start gap-3 text-fluid-sm text-foreground/75">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-brand-orange"
                    strokeWidth={2.5}
                  />
                  <span>
                    <span className="font-bold text-foreground">
                      {f.audience.split(": ")[0]}
                    </span>
                    {f.audience.includes(": ")
                      ? `: ${f.audience.split(": ").slice(1).join(": ")}`
                      : null}
                  </span>
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

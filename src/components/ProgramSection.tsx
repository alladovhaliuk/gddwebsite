"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import MouseParallax from "@/components/MouseParallax";
import ScheduleCalendar, {
  SCHEDULE_PAGE_SIZE,
  schedulePageCount,
} from "@/components/ScheduleCalendar";
import { useRafScroll } from "@/hooks/useRafScroll";
import type { ProgramWeek } from "@/data/types";

/**
 * Course Программа section. Owns the pagination state for the schedule grid
 * below; the divider carries the section title over the poppy-meadow art,
 * and all page switching happens through the block tabs — keeping the
 * calendar itself uncluttered.
 *
 * Renders a Fragment of two siblings under the page's flex container:
 *   1. divider (poppy bg + composition lines + title + controls)
 *   2. <section id="program"> with the calendar + booking CTA
 *
 * Course-specific `weeks` + `totalWeeks` come in as props so the same section
 * powers every course page.
 *
 * The full extent of the program must be impossible to miss: the divider
 * subtitle states the totals ("9 недель · 3 блока") and a block-tab bar sits
 * between the divider and the grid, one clickable tab per page with its week
 * range. A sticky pill with the same blocks appears once the tabs scroll out
 * of view, so switching stays one tap away deep inside the calendar.
 */

// Russian plural for the divider subtitle.
const pluralWeeks = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "недель";
  if (mod10 === 1) return "неделя";
  if (mod10 >= 2 && mod10 <= 4) return "недели";
  return "недель";
};
export default function ProgramSection({
  ctaLabel,
  ctaHref = "#pricing",
  weeks,
  totalWeeks,
}: {
  ctaLabel: string;
  ctaHref?: string;
  weeks: ProgramWeek[];
  totalWeeks: number;
}) {
  const pageCount = schedulePageCount(totalWeeks);
  const [page, setPage] = useState(0);

  // Sticky bar: visible while the program section is in view but the block
  // tabs have scrolled past the top of the viewport.
  const sectionRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  useRafScroll(
    () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Section top above ~80px (under the sticky site header) AND its bottom
      // still well within the viewport (so the bar doesn't linger after the
      // section is done).
      setShowSticky(r.top < 80 && r.bottom > 220);
    },
    { resize: true }
  );

  // "Недели 1–3" / "Неделя 8" for the block tabs.
  const pageWeeksLabel = (i: number) => {
    const start = i * SCHEDULE_PAGE_SIZE + 1;
    const end = Math.min(totalWeeks, start + SCHEDULE_PAGE_SIZE - 1);
    return end > start ? `Недели ${start}–${end}` : `Неделя ${start}`;
  };

  return (
    <>
      {/* Divider (poppy meadow) — title + page controls */}
      <div
        data-mouse-parallax-root
        className="relative z-20 -mx-6 -mt-20 aspect-[3168/470] overflow-hidden"
      >
        <MouseParallax strength={6} className="absolute -inset-3">
          <Image
            src="/programm.png"
            alt=""
            aria-hidden
            fill
            className="object-cover"
          />
        </MouseParallax>

        {/* Rule-of-thirds composition schema */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 h-full w-full text-white/55"
          viewBox="0 0 1440 214"
          preserveAspectRatio="none"
          fill="none"
        >
          <g
            stroke="currentColor"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          >
            {/* Pushed out toward the edges (~15%/85%) so they never cross
                the centered title + badge. */}
            <line x1="-400" y1="32" x2="1840" y2="32" />
            <line x1="-400" y1="182" x2="1840" y2="182" />
            <line x1="216" y1="-200" x2="216" y2="420" />
            <line x1="1224" y1="-200" x2="1224" y2="420" />
          </g>
        </svg>

        {/* Centered title + program totals, so the full extent reads even
            before the block tabs below */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 px-4 text-center md:gap-3">
          <h2 className="font-bold leading-tight tracking-[-0.02em] text-white text-fluid-2xl md:text-fluid-4xl">
            Программа курса
          </h2>
          {/* The divider is too short on phones to carry a subtitle — the
              week count only shows from md up. */}
          <p className="hidden text-fluid-sm text-white/85 md:block">
            {totalWeeks} {pluralWeeks(totalWeeks)}
          </p>
        </div>

      </div>

      {/* Section — white bg covers the page center column guide */}
      <section
        ref={sectionRef}
        id="program"
        className="relative z-20 -mt-20 flex scroll-mt-28 flex-col bg-white"
      >
        {/* Block tabs — one per calendar page. Every block is visible and
            clickable up front, so nobody mistakes the first three weeks for
            the whole program. The calendar's own border-t draws the line
            between the tabs and the grid. */}
        <div className="-mx-6 flex divide-x divide-black/10">
          {Array.from({ length: pageCount }, (_, i) => {
            const isActive = page === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-pressed={isActive}
                className={`relative flex flex-1 items-center justify-center px-2 py-3.5 text-center transition-colors md:py-4 ${
                  isActive
                    ? "bg-cream/40 text-foreground"
                    : "text-foreground/45 hover:bg-black/[0.02] hover:text-foreground"
                }`}
              >
                <span
                  className={`text-fluid-sm tabular-nums ${
                    isActive ? "font-bold" : ""
                  }`}
                >
                  {pageWeeksLabel(i)}
                </span>
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-orange" />
                )}
              </button>
            );
          })}
        </div>

        <ScheduleCalendar page={page} weeks={weeks} totalWeeks={totalWeeks} />

        {/* CTA sits on top of a striped, edge-to-edge band — stripes behind,
            CTA on top. Diagonal hairlines at the site's standard weight. */}
        <div className="-mx-6 flex justify-center border-b border-black/10 bg-[repeating-linear-gradient(45deg,transparent_0_10px,rgba(0,0,0,0.08)_10px_11px)] px-6 py-6">
          <a
            href={ctaHref}
            className="group relative z-10 flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-orange py-2 pl-4 pr-2 text-[14px] text-black transition hover:bg-brand-orange/90 md:inline-flex md:w-auto"
          >
            <span>{ctaLabel}</span>
            <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-y-0.5">
              <ArrowDown className="size-4" strokeWidth={2.25} />
            </span>
          </a>
        </div>
      </section>

      {/* Sticky block pill — fades in once the tabs scroll past the top, so
          the blocks stay one tap away deep inside the calendar. On mobile it
          docks to the bottom of the viewport for thumb access; on md+ it
          lives just under the sticky site header. */}
      <div
        aria-hidden={!showSticky}
        className={`fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-300 bottom-6 md:bottom-auto md:top-28 ${
          showSticky
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0 md:-translate-y-2"
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1.5 shadow-lg backdrop-blur-md">
          {Array.from({ length: pageCount }, (_, i) => {
            const isActive = page === i;
            return (
              <button
                key={i}
                type="button"
                aria-label={pageWeeksLabel(i)}
                aria-pressed={isActive}
                onClick={() => setPage(i)}
                tabIndex={showSticky ? 0 : -1}
                className={`rounded-full px-4 py-2 text-fluid-sm tabular-nums transition-colors ${
                  isActive
                    ? "bg-foreground text-white"
                    : "text-foreground/70 hover:bg-black/[0.06]"
                }`}
              >
                {pageWeeksLabel(i)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

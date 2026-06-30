"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import MouseParallax from "@/components/MouseParallax";
import ScheduleCalendar, {
  schedulePageCount,
} from "@/components/ScheduleCalendar";
import { useRafScroll } from "@/hooks/useRafScroll";
import type { ProgramWeek } from "@/data/types";

/**
 * Course Программа section. Owns the pagination state for the schedule grid
 * below so the divider (which carries the section title over the poppy-meadow
 * art) can host the prev/next arrows and the page counter — keeping the
 * calendar itself uncluttered.
 *
 * Renders a Fragment of two siblings under the page's flex container:
 *   1. divider (poppy bg + composition lines + title + controls)
 *   2. <section id="program"> with the calendar + booking CTA
 *
 * Course-specific `weeks` + `totalWeeks` come in as props so the same section
 * powers every course page.
 */
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
  const atStart = page === 0;
  const atEnd = page === pageCount - 1;

  // Sticky bar: visible while the program section is in view but the divider
  // (with the inline arrows) has scrolled past the top of the viewport.
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

  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

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
            <line x1="-400" y1="71" x2="1840" y2="71" />
            <line x1="-400" y1="143" x2="1840" y2="143" />
            <line x1="480" y1="-200" x2="480" y2="420" />
            <line x1="960" y1="-200" x2="960" y2="420" />
          </g>
        </svg>

        {/* Centered title */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 text-center">
          <h2 className="font-bold leading-tight tracking-[-0.02em] text-white text-fluid-2xl md:text-fluid-4xl">
            Программа курса
          </h2>
        </div>

        {/* Arrows on the same horizontal axis as the title, pinned to edges */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-6 md:px-10">
          <button
            type="button"
            aria-label="Назад"
            onClick={goPrev}
            disabled={atStart}
            className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 disabled:opacity-25"
          >
            <ArrowLeft className="size-4" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Вперёд"
            onClick={goNext}
            disabled={atEnd}
            className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 disabled:opacity-25"
          >
            <ArrowRight className="size-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Section — white bg covers the page center column guide */}
      <section
        ref={sectionRef}
        id="program"
        className="relative z-20 -mt-20 flex scroll-mt-28 flex-col bg-white"
      >
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

      {/* Sticky control bar — fades in once the divider scrolls past the top.
          On mobile it docks to the bottom of the viewport for thumb access;
          on md+ it lives just under the sticky site header. */}
      <div
        aria-hidden={!showSticky}
        className={`fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-300 bottom-6 md:bottom-auto md:top-28 ${
          showSticky
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0 md:-translate-y-2"
        }`}
      >
        <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/85 px-2 py-2 shadow-lg backdrop-blur-md">
          <button
            type="button"
            aria-label="Назад"
            onClick={goPrev}
            disabled={atStart}
            tabIndex={showSticky ? 0 : -1}
            className="grid size-9 place-items-center rounded-full text-foreground transition hover:bg-black/[0.06] disabled:opacity-25"
          >
            <ArrowLeft className="size-4" strokeWidth={2.25} />
          </button>
          <span className="text-fluid-sm tabular-nums text-foreground/70">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            aria-label="Вперёд"
            onClick={goNext}
            disabled={atEnd}
            tabIndex={showSticky ? 0 : -1}
            className="grid size-9 place-items-center rounded-full text-foreground transition hover:bg-black/[0.06] disabled:opacity-25"
          >
            <ArrowRight className="size-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </>
  );
}

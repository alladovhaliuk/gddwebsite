import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Parallax from "@/components/Parallax";
import MouseParallax from "@/components/MouseParallax";
import type { CourseHero as CourseHeroData } from "@/data/types";

/**
 * Course hero — a single painterly banner at a controlled, shorter height.
 * Subtle scroll + mouse parallax for life, white column guides over the art,
 * and the course headline + brand CTA centered on top.
 *
 * Background image, headline, and CTA come in as props (`hero`). The
 * composition armature is selected by `armatureIndex` so each course's hero
 * mirrors the matching CourseCard armature on the homepage:
 *   0 — golden-ratio / Fibonacci spiral  (narrative)
 *   1 — one-point perspective            (game design)
 *   2 — golden-triangle armature         (consultations)
 */
export default function CourseHero({
  hero,
  armatureIndex,
}: {
  hero: CourseHeroData;
  armatureIndex: 0 | 1 | 2;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        data-mouse-parallax-root
        className="relative h-[58vh] min-h-[380px] w-full max-h-[600px]"
      >
        {/* Background banner */}
        <Parallax speed={0.12} className="absolute inset-0 z-0">
          <MouseParallax strength={8} className="absolute inset-0">
            <div className="absolute -inset-y-[12%] -inset-x-[3%]">
              <Image
                src={hero.image}
                alt=""
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </MouseParallax>
        </Parallax>

        {/* Very light darken — lifts the white headline + armature lines off
            painterly hero artwork that has near-white edges. Sits above the
            image but below the armature so the lines stay readable. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-black/15"
        />

        {/* Composition armature — same schema as the matching course-card,
            redrawn in a landscape viewBox so the lines fall inside the wide
            hero strip (the card's portrait viewBox would clip them off the
            bottom edge). */}
        {armatureIndex === 1 ? (
          // One-point perspective grid (game / level design). Horizon sits
          // around the middle of the hero so the rays + depth lines only
          // mark the lower half — sky stays clean. Stroke matches the
          // page's column-guide hairlines.
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible text-white/70"
            viewBox="0 0 1600 600"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            >
              {/* horizon (vanishing point sits on this line) */}
              <line x1="-1200" y1="320" x2="2800" y2="320" />
              {/* depth lines receding below the horizon */}
              <line x1="-1200" y1="400" x2="2800" y2="400" />
              <line x1="-1200" y1="480" x2="2800" y2="480" />
              <line x1="-1200" y1="560" x2="2800" y2="560" />
              {/* rays fanning out from the vanishing point at (800, 320) */}
              <line x1="800" y1="320" x2="-1200" y2="900" />
              <line x1="800" y1="320" x2="0" y2="900" />
              <line x1="800" y1="320" x2="500" y2="900" />
              <line x1="800" y1="320" x2="1100" y2="900" />
              <line x1="800" y1="320" x2="1600" y2="900" />
              <line x1="800" y1="320" x2="2800" y2="900" />
            </g>
          </svg>
        ) : armatureIndex === 2 ? (
          // Golden-triangle armature (strategy / decisions), flipped.
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible text-white/70"
            viewBox="0 0 1000 1618"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              transform="translate(1000 0) scale(-1 1)"
            >
              <line x1="-3000" y1="-4854" x2="3000" y2="4854" />
              <line x1="-3854" y1="3000" x2="5854" y2="-3000" />
              <line x1="-4854" y1="4618" x2="4854" y2="-1382" />
              <line x1="382" y1="-3000" x2="382" y2="5000" />
            </g>
          </svg>
        ) : (
          // Golden-ratio / Fibonacci spiral (narrative / composition)
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible text-white/70"
            viewBox="0 0 1000 1618"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              transform="translate(1000 0) scale(-1 1)"
            >
              {/* φ subdivisions */}
              <line x1="-3000" y1="1000" x2="4000" y2="1000" />
              <line x1="382" y1="-3000" x2="382" y2="5000" />
              <line x1="-3000" y1="1236" x2="4000" y2="1236" />
              <line x1="236" y1="-3000" x2="236" y2="5000" />
              {/* Fibonacci spiral arcs */}
              <path
                d="
                  M 1000 0
                  A 1000 1000 0 0 1 0 1000
                  L 0 1000
                  A 618 618 0 0 1 382 1618
                "
              />
            </g>
          </svg>
        )}

        {/* Column guides */}
        <div className="pointer-events-none absolute inset-0 z-[2] mx-auto max-w-[1160px] text-white/40">
          <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
        </div>

        {/* Headline + CTA */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl font-bold leading-[0.986] tracking-[-0.02em] text-white text-fluid-hero">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-4 max-w-xl text-fluid-base leading-snug text-white/85">
              {hero.subtitle}
            </p>
          )}
          <a
            href={hero.ctaHref ?? "/book"}
            className="group mt-8 flex w-full max-w-sm items-center justify-center gap-2.5 rounded-xl bg-white/80 py-2 pl-4 pr-2 text-[14px] text-black backdrop-blur-md transition hover:bg-white md:inline-flex md:w-auto md:max-w-none"
          >
            <span>{hero.cta}</span>
            <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-y-0.5">
              <ArrowDown className="size-4" strokeWidth={2.25} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

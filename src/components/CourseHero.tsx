import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Parallax from "@/components/Parallax";
import MouseParallax from "@/components/MouseParallax";
import CourseScene from "@/components/CourseScene";
import type { CourseHero as CourseHeroData } from "@/data/types";

/**
 * Course hero. With `sceneSrc` it renders a split: headline + CTA on a white
 * panel (left) and the square course scene (right). Without it, the original
 * full-bleed painterly banner is used.
 *
 * The composition armature mirrors the matching CourseCard on the homepage:
 *   0 — golden-ratio / Fibonacci spiral  (narrative)
 *   1 — one-point perspective            (game design)
 *   2 — golden-triangle armature         (consultations)
 */
export default function CourseHero({
  hero,
  armatureIndex,
  scene,
  body,
}: {
  hero: CourseHeroData;
  armatureIndex: 0 | 1 | 2;
  /** Layered course scene key; when set the hero uses the split layout with the
   *  live animated scene on the right. */
  scene?: string;
  /** Intro paragraph shown as body copy under the headline (split layout). */
  body?: string;
}) {
  if (scene) {
    return (
      <section className="relative isolate border-b border-black/10">
        {/* Constrained to the same 1160 grid as the page body, so the headline
            lines up with the left column guide and the split falls on the
            centre guide. */}
        <div className="mx-auto grid max-w-[1160px] md:grid-cols-2">
          {/* Text — left, on white */}
          <div className="order-2 flex flex-col justify-center gap-6 px-6 pb-14 pt-10 md:order-1 md:min-h-[640px] md:pb-24 md:pr-12 md:pt-32">
            <h1 className="max-w-xl font-bold leading-[0.99] tracking-[-0.02em] text-foreground text-fluid-hero">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="max-w-md text-fluid-lg font-medium leading-snug text-foreground/75">
                {hero.subtitle}
              </p>
            )}
            {body && (
              <p className="max-w-md text-fluid-base leading-relaxed text-foreground/60">
                {body}
              </p>
            )}
            <a
              href={hero.ctaHref ?? "/book"}
              className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-xl bg-foreground py-2.5 pl-5 pr-2.5 text-[14px] text-white transition hover:opacity-90 md:w-auto md:self-start"
            >
              <span>{hero.cta}</span>
              <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-y-0.5">
                <ArrowDown className="size-4" strokeWidth={2.25} />
              </span>
            </a>
          </div>

          {/* Scene — right */}
          <div
            data-mouse-parallax-root
            className="relative order-1 min-h-[320px] overflow-hidden bg-gradient-to-b from-[#cfe4ec] to-[#eef4f2] md:order-2 md:min-h-[640px]"
          >
            <CourseScene scene={scene} />
            <Armature index={armatureIndex} />
          </div>
        </div>

        {/* Column guides — same 1160 grid that runs down the rest of the page */}
        <div className="pointer-events-none absolute inset-0 z-20 mx-auto max-w-[1160px] text-black/[0.12]">
          <span className="absolute inset-y-0 left-0 w-px bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-px bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-px bg-current" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden">
      <div
        data-mouse-parallax-root
        className="relative h-[58vh] min-h-[380px] w-full max-h-[600px]"
      >
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-black/15"
        />
        <Armature index={armatureIndex} />
        <div className="pointer-events-none absolute inset-0 z-[2] mx-auto max-w-[1160px] text-white/40">
          <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
        </div>
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

/** Composition armature overlay — landscape viewBox so lines fall inside the
 *  strip. `text-white/60` reads on the artwork without dominating. */
function Armature({ index }: { index: 0 | 1 | 2 }) {
  const cls =
    "pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible text-white/55";
  if (index === 1) {
    return (
      <svg aria-hidden className={cls} viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
          <line x1="-1200" y1="320" x2="2800" y2="320" />
          <line x1="-1200" y1="400" x2="2800" y2="400" />
          <line x1="-1200" y1="480" x2="2800" y2="480" />
          <line x1="-1200" y1="560" x2="2800" y2="560" />
          <line x1="800" y1="320" x2="-1200" y2="900" />
          <line x1="800" y1="320" x2="0" y2="900" />
          <line x1="800" y1="320" x2="500" y2="900" />
          <line x1="800" y1="320" x2="1100" y2="900" />
          <line x1="800" y1="320" x2="1600" y2="900" />
          <line x1="800" y1="320" x2="2800" y2="900" />
        </g>
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg aria-hidden className={cls} viewBox="0 0 1000 1618" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" transform="translate(1000 0) scale(-1 1)">
          <line x1="-3000" y1="-4854" x2="3000" y2="4854" />
          <line x1="-3854" y1="3000" x2="5854" y2="-3000" />
          <line x1="-4854" y1="4618" x2="4854" y2="-1382" />
          <line x1="382" y1="-3000" x2="382" y2="5000" />
        </g>
      </svg>
    );
  }
  return (
    <svg aria-hidden className={cls} viewBox="0 0 1000 1618" preserveAspectRatio="xMidYMid slice" fill="none">
      <g stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" transform="translate(1000 0) scale(-1 1)">
        <line x1="-3000" y1="1000" x2="4000" y2="1000" />
        <line x1="382" y1="-3000" x2="382" y2="5000" />
        <line x1="-3000" y1="1236" x2="4000" y2="1236" />
        <line x1="236" y1="-3000" x2="236" y2="5000" />
        <path d="M 1000 0 A 1000 1000 0 0 1 0 1000 L 0 1000 A 618 618 0 0 1 382 1618" />
      </g>
    </svg>
  );
}

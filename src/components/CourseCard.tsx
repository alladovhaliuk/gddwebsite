import Image from "next/image";
import { ArrowRight } from "lucide-react";
import MouseParallax from "@/components/MouseParallax";
import Typewriter from "@/components/Typewriter";
import type { Course } from "@/data/content";

/**
 * One course row: image half (with cycling typewriter overlays and a
 * composition armature) and text half (chips, title, points, CTA). Odd rows
 * flip the image to the left for an alternating zig-zag.
 */
export default function CourseCard({
  course,
  index,
}: {
  course: Course;
  index: number;
}) {
  const imageLeft = index % 2 === 1;

  const ImageBlock = (
    <div
      className={`relative min-h-64 w-full overflow-hidden bg-foreground/10 md:min-h-full ${
        imageLeft ? "md:order-1" : "md:order-2 md:border-l md:border-black/10"
      }`}
    >
      {course.image && (
        <MouseParallax strength={5} className="absolute -inset-2">
          <Image
            src={course.image}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </MouseParallax>
      )}

      {/* Cycling typewriter overlays (cards that define them) */}
      {course.overlays?.map((ov, oi) => (
        <div
          key={oi}
          className={`pointer-events-none absolute z-20 -translate-y-[10px] ${ov.pos}`}
        >
          <Typewriter
            texts={ov.lines}
            typeSpeed={55}
            deleteSpeed={22}
            holdMs={2200}
            startDelay={500 + oi * 1100}
            className={`font-mono text-fluid-xs leading-snug ${
              imageLeft ? "text-black/45" : "text-white/55"
            }`}
          />
        </div>
      ))}

      {/* Composition overlay (cards with art) */}
      {course.image && (
        <svg
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full -translate-y-[10px] overflow-visible text-white/70 ${
            imageLeft ? "translate-x-[30px]" : "-translate-x-[30px]"
          }`}
          viewBox="0 0 1000 1618"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {index === 1 ? (
            // One-point perspective grid (game / level design)
            <g
              stroke="currentColor"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            >
              {/* horizon */}
              <line x1="-3000" y1="1000" x2="4000" y2="1000" />
              {/* depth lines (receding toward horizon) */}
              <line x1="-3000" y1="1140" x2="4000" y2="1140" />
              <line x1="-3000" y1="1320" x2="4000" y2="1320" />
              <line x1="-3000" y1="1560" x2="4000" y2="1560" />
              {/* rays fanning out from the vanishing point */}
              <line x1="500" y1="1000" x2="-1400" y2="2800" />
              <line x1="500" y1="1000" x2="-300" y2="2800" />
              <line x1="500" y1="1000" x2="320" y2="2800" />
              <line x1="500" y1="1000" x2="680" y2="2800" />
              <line x1="500" y1="1000" x2="1300" y2="2800" />
              <line x1="500" y1="1000" x2="2400" y2="2800" />
            </g>
          ) : index === 2 ? (
            // Golden-triangle armature (strategy / decisions),
            // flipped horizontally, with a sweeping arch.
            <g
              stroke="currentColor"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              transform="translate(1000 0) scale(-1 1)"
            >
              {/* main diagonal, extended */}
              <line x1="-3000" y1="-4854" x2="3000" y2="4854" />
              {/* perpendiculars from the opposite corners */}
              <line x1="-3854" y1="3000" x2="5854" y2="-3000" />
              <line x1="-4854" y1="4618" x2="4854" y2="-1382" />
              {/* vertical golden line */}
              <line x1="382" y1="-3000" x2="382" y2="5000" />
            </g>
          ) : (
            // Golden-ratio spiral (narrative / composition)
            <g
              stroke="currentColor"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              transform="translate(1000 0) scale(-1 1)"
            >
              {/* φ subdivisions — extended past the viewBox */}
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
          )}
        </svg>
      )}
    </div>
  );

  const TextBlock = (
    <div
      className={`flex flex-col gap-8 p-8 md:p-12 ${
        imageLeft ? "md:order-2 md:border-l md:border-black/10" : "md:order-1"
      }`}
    >
      {/* Chips row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-black/15 px-4 py-2.5 text-fluid-sm">
            {course.kind}
          </span>
          {course.startDate && (
            <span className="rounded-full border border-black/15 px-4 py-2.5 text-fluid-sm tabular-nums">
              {course.startDate}
            </span>
          )}
        </div>
        <span
          className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-fluid-sm ${
            course.status.tone === "open"
              ? "bg-emerald-100 text-emerald-900"
              : "bg-amber-100 text-amber-900"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              course.status.tone === "open" ? "bg-emerald-600" : "bg-amber-600"
            }`}
          />
          {course.status.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-fluid-4xl leading-tight text-foreground">
        {course.title}
      </h3>

      {/* Points */}
      <div className="flex flex-col gap-6">
        {course.points.map((p) => (
          <div key={p.title} className="flex flex-col gap-1.5">
            <h4 className="font-bold text-foreground">{p.title}</h4>
            <p className="text-fluid-sm text-foreground/65">{p.text}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#"
        className="group inline-flex items-center gap-2.5 self-start rounded-xl bg-black py-2 pl-4 pr-2 text-[14px] text-white shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.4)]"
      >
        <span>Узнать подробнее</span>
        <span className="grid size-7 place-items-center rounded-lg bg-white text-black shadow-[inset_0_0_2px_1px_rgba(0,0,0,0.25)] transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="size-4" strokeWidth={2.25} />
        </span>
      </a>
    </div>
  );

  return (
    <article
      data-mouse-parallax-root
      className="grid md:grid-cols-2"
    >
      {/* Image always first in the DOM so it sits on top when the card stacks
          on mobile; md:order keeps the desktop left/right zig-zag. */}
      {ImageBlock}
      {TextBlock}
    </article>
  );
}

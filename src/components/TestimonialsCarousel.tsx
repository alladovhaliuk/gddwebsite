"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Item = { name: string; text: string };

// Testimonials longer than this get a full-width slide of their own; shorter
// ones pair up two-per-slide (one-per-slide on mobile).
const LONG = 350;

export default function TestimonialsCarousel({ items }: { items: Item[] }) {
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(2);

  useEffect(() => {
    const update = () =>
      setPerView(window.matchMedia("(min-width: 768px)").matches ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Group into slides: a long testimonial takes a full-width slide of its own;
  // short ones fill up to `perView` per slide. Mobile is always 1-up.
  const slides: Item[][] = [];
  let bucket: Item[] = [];
  const flush = () => {
    if (bucket.length) {
      slides.push(bucket);
      bucket = [];
    }
  };
  for (const it of items) {
    if (it.text.length > LONG || perView === 1) {
      flush();
      slides.push([it]);
    } else {
      bucket.push(it);
      if (bucket.length === perView) flush();
    }
  }
  flush();

  const pageCount = Math.max(1, slides.length);
  const current = Math.min(page, pageCount - 1);
  const slide = slides[current] ?? [];
  const atStart = current <= 0;
  const atEnd = current >= pageCount - 1;

  return (
    <div className="relative z-20 bg-white">
      {/* Header — heading + counter + nav arrows */}
      <div className="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-5 md:px-10">
        <h2 className="text-fluid-3xl leading-tight text-foreground">
          Наши студенты о школе
        </h2>
        <div className="flex shrink-0 items-center gap-4">
          <span className="hidden text-fluid-sm tabular-nums text-foreground/45 sm:block">
            {current + 1} / {pageCount}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Назад"
              onClick={() => setPage(Math.max(0, current - 1))}
              disabled={atStart}
              className="grid size-10 place-items-center rounded-full border border-black/15 text-foreground transition hover:bg-black/[0.04] disabled:opacity-25"
            >
              <ArrowLeft className="size-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Вперёд"
              onClick={() => setPage(Math.min(pageCount - 1, current + 1))}
              disabled={atEnd}
              className="grid size-10 place-items-center rounded-full border border-black/15 text-foreground transition hover:bg-black/[0.04] disabled:opacity-25"
            >
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>

      {/* Current slide — natural height so the full review always fits (no
          clipping). `key` re-triggers the fade when the page changes. Long
          reviews are one full-width card; short ones share the row. */}
      <div
        key={current}
        className={`grid animate-fade ${
          slide.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {slide.map((t, j) => (
          <figure
            key={`${t.name}-${j}`}
            className={`flex min-h-[18rem] flex-col gap-4 p-6 md:p-10 ${
              slide.length > 1 && j === 0 ? "md:border-r border-black/10" : ""
            }`}
          >
            <figcaption className="font-bold text-foreground">
              {t.name}
            </figcaption>
            <blockquote className="text-fluid-sm leading-relaxed text-foreground/70">
              {t.text}
            </blockquote>
          </figure>
        ))}
      </div>
    </div>
  );
}

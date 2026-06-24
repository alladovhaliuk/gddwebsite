"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Item = { name: string; text: string };

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

  // Split the reviews into `perView` contiguous chunks — one per container.
  // Each container cycles through its own chunk; nav slides them all in sync.
  // The first chunk is the longest, so its length is the number of slides;
  // with an uneven total the final slide may leave a trailing slot empty.
  const chunkSize = Math.max(1, Math.ceil(items.length / perView));
  const pageCount = chunkSize;
  const current = Math.min(page, pageCount - 1);
  const atStart = current <= 0;
  const atEnd = current >= pageCount - 1;

  const slotItems = (s: number) =>
    items.slice(s * chunkSize, (s + 1) * chunkSize);

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

      {/* Fixed-height slots; text slides horizontally and hides behind the
          white padding/edges of each card */}
      <div className="grid md:grid-cols-2">
        {Array.from({ length: perView }, (_, s) => (
          <figure
            key={s}
            className="relative h-[22rem] overflow-hidden p-6 md:p-10 md:[&:not(:last-child)]:border-r border-black/10"
          >
            {/* masked viewport inset by the white padding */}
            <div className="relative h-full overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {slotItems(s).map((t, idx) => (
                  <div
                    key={`${t.name}-${idx}`}
                    className="flex h-full w-full shrink-0 flex-col gap-4"
                  >
                    <figcaption className="font-bold text-foreground">
                      {t.name}
                    </figcaption>
                    <blockquote className="text-fluid-sm leading-relaxed text-foreground/70">
                      {t.text}
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";
import type { TeacherBook } from "@/data/types";

/**
 * Dedicated "Книги" block. The teacher's published books used to be fanned out
 * as tiny, rotated overlays on the portrait, where the titles were unreadable
 * and they looked like scattered cards. Here each cover is shown large and
 * upright — with a spine highlight so it reads as a real book — beside a clear
 * title and author line. Framed like the other full-width sections (bordered
 * header + padded body) so it drops into the course page layout unchanged.
 */
export default function TeacherBooks({
  items,
  title = "Книги преподавателя",
}: {
  items: TeacherBook[];
  title?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative z-20 -mx-6 scroll-mt-28 border-x border-b border-black/10 bg-white">
      <div className="flex items-center gap-4 border-b border-black/10 px-6 py-5 md:px-10">
        <h2 className="text-fluid-3xl leading-tight text-foreground">{title}</h2>
      </div>

      <div className="grid gap-x-10 gap-y-8 p-6 md:grid-cols-2 md:p-10">
        {items.map((b) => (
          <article key={b.cover} className="flex items-center gap-5 md:gap-6">
            {/* Cover — upright, with a subtle spine so it reads as a book. */}
            <div className="relative shrink-0">
              <Image
                src={b.cover}
                alt={b.title ? `Обложка книги ${b.title}` : ""}
                width={520}
                height={800}
                sizes="(min-width: 768px) 150px, 130px"
                className="h-auto w-[130px] rounded-[3px] shadow-[0_16px_32px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/10 md:w-[150px]"
              />
              {/* Spine + page-edge highlight along the binding side. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-[7%] rounded-l-[3px] bg-gradient-to-r from-black/25 via-black/5 to-transparent"
              />
            </div>

            {/* Caption — always legible regardless of cover resolution. */}
            {(b.title || b.note) && (
              <div className="flex min-w-0 flex-col gap-1.5">
                {b.title && (
                  <h3 className="text-fluid-base font-bold leading-snug text-foreground">
                    {b.title}
                  </h3>
                )}
                {b.note && (
                  <p className="text-fluid-sm leading-snug text-foreground/60">
                    {b.note}
                  </p>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import type { Teacher } from "@/data/types";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/**
 * Teachers row framed like the TestimonialsCarousel: outer bordered container
 * (applied by the parent), internal header, and a grid of card columns with
 * hairline separators between them. No arrows — all teachers fit on screen.
 */
export default function TeachersCarousel({
  items,
  title,
}: {
  items: Teacher[];
  /**
   * Optional header text. When omitted (or empty) the carousel skips its own
   * header bar so the page can render a custom header above the cards (e.g.
   * the consultations page combines a title + intro paragraph in one block).
   */
  title?: string;
}) {
  return (
    <div className="relative z-20 bg-white">
      {/* Header — title only */}
      {title ? (
        <div className="border-b border-black/10 px-6 py-5 md:px-10">
          <h2 className="text-fluid-3xl leading-tight text-foreground">
            {title}
          </h2>
        </div>
      ) : null}

      {/* Cards — grid columns separated by hairlines. The grid adapts to the
          number of teachers so every card fits in a single row at md+. */}
      <div
        className={`grid ${
          items.length === 2
            ? "md:grid-cols-2"
            : items.length === 4
            ? "md:grid-cols-4"
            : "md:grid-cols-3"
        }`}
      >
        {items.map((t, i) => (
          <article
            key={t.name}
            className={`group flex flex-col bg-white ${
              i < items.length - 1 ? "md:border-r md:border-black/10" : ""
            } ${i > 0 ? "border-t border-black/10 md:border-t-0" : ""}`}
          >
            <div className="flex flex-col gap-3 p-6 md:p-10">
              <h3 className="text-fluid-2xl leading-tight text-foreground">
                {t.name}
              </h3>
              <p className="text-fluid-sm text-foreground/65">{t.role}</p>
            </div>

            {/* Square portrait pinned to the bottom of the card. Badge (if any)
                sits in the top-left corner — frosted pill, megamenu pattern. */}
            <div className="relative mt-auto aspect-square w-full overflow-hidden bg-foreground/5">
              {t.image ? (
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
                  className="object-cover"
                  style={{ objectPosition: t.imagePosition ?? "center 22%" }}
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-fluid-4xl text-foreground/30">
                  {initials(t.name)}
                </span>
              )}
              {t.badge && (
                <span className="absolute left-4 top-4 z-20 whitespace-nowrap rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-medium text-foreground shadow-sm backdrop-blur">
                  {t.badge}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

/**
 * Seamless horizontal ticker. Renders two identical `<ul>` copies inside an
 * `animate-marquee` track (which translates -50%), so the loop never shows a
 * seam. `repeat` duplicates the items within each copy enough times to overflow
 * the container. The second copy is `aria-hidden` so screen readers read the
 * list once.
 */
export default function Marquee<T>({
  items,
  renderItem,
  repeat = 1,
  liClassName,
  trackClassName,
}: {
  items: T[];
  renderItem: (item: T) => ReactNode;
  repeat?: number;
  liClassName?: string;
  trackClassName?: string;
}) {
  return (
    <div
      className={`flex w-max animate-marquee will-change-transform ${
        trackClassName ?? ""
      }`}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center"
        >
          {Array.from({ length: repeat }).flatMap((_, r) =>
            items.map((item, i) => (
              <li key={`${r}-${i}`} className={liClassName}>
                {renderItem(item)}
              </li>
            ))
          )}
        </ul>
      ))}
    </div>
  );
}

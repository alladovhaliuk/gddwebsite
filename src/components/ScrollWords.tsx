"use client";

import { useEffect, useRef } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Splits `text` into words and ties each word's opacity to scroll position.
 * As the element travels from ~85vh to ~25vh, words light up left-to-right
 * from `dim` to 1.0. Same font weight throughout.
 */
export default function ScrollWords({
  text,
  dim = 0.18,
  className,
}: {
  text: string;
  dim?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // When reduced motion is on, show every word at full opacity and skip the
  // scroll-driven brightening below.
  useEffect(() => {
    if (!reduced) return;
    ref.current
      ?.querySelectorAll<HTMLElement>("[data-w]")
      .forEach((w) => (w.style.opacity = "1"));
  }, [reduced]);

  useRafScroll(
    () => {
      const el = ref.current;
      if (!el) return;
      const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress 0..1 as the block scrolls from 85vh down to 25vh.
      const start = vh * 0.85;
      const end = vh * 0.25;
      const range = start - end;
      const p = Math.max(0, Math.min(1, (start - rect.top) / range));

      const n = words.length;
      // Each word brightens within a sliding window for a staggered feel.
      const window_ = 0.12; // fraction of total progress per-word fade-in
      words.forEach((w, i) => {
        const wStart = (i / n) * (1 - window_);
        const wEnd = wStart + window_;
        const t = Math.max(0, Math.min(1, (p - wStart) / (wEnd - wStart)));
        w.style.opacity = String(dim + (1 - dim) * t);
      });
    },
    { enabled: !reduced, resize: true }
  );

  // Split on spaces but keep punctuation glued to its word.
  const parts = text.split(/(\s+)/);

  return (
    <div ref={ref} className={className}>
      {parts.map((p, i) =>
        /^\s+$/.test(p) ? (
          <span key={i}> </span>
        ) : (
          <span
            key={i}
            data-w
            style={{ opacity: 0, transition: "opacity 120ms linear" }}
          >
            {p}
          </span>
        )
      )}
    </div>
  );
}

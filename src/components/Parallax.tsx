"use client";

import { useRef, type ReactNode } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Lightweight scroll parallax: translates its content vertically by
 * `scrollY * speed`. Positive speed drifts down, negative drifts up.
 * Uses rAF + a passive scroll listener (no heavy ScrollTrigger).
 */
export default function Parallax({
  speed = 0.15,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useRafScroll(
    () => {
      const el = ref.current;
      if (el) el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    },
    { enabled: !reduced }
  );

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Mouse parallax: translates its content by a fraction of the cursor's
 * offset from the center of the nearest `data-mouse-parallax-root` ancestor
 * (or the window if none). `strength` is the max shift in px at the edges.
 * Eased toward target each frame for a soft feel.
 */
export default function MouseParallax({
  strength = 12,
  className,
  children,
}: {
  strength?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip on touch

    const root =
      (el.closest("[data-mouse-parallax-root]") as HTMLElement | null) ?? null;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        raf = 0;
      }
    };

    const clamp = (v: number) => (v < -1 ? -1 : v > 1 ? 1 : v);

    const onMove = (e: MouseEvent) => {
      const rect = (root ?? document.documentElement).getBoundingClientRect();
      // Normalize to [-1, 1] relative to the root's center. Clamp so a cursor
      // outside the root can't push the shift past the element's edge bleed.
      const nx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1);
      const ny = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx * strength;
      targetY = ny * strength;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, reduced]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

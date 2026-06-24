"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `onFrame` on scroll (and optionally resize), throttled to one call per
 * animation frame via a single rAF token. Fires once on mount so initial
 * position is applied. Pass `enabled: false` to detach entirely (e.g. when
 * prefers-reduced-motion is on). The latest `onFrame` is always used without
 * re-subscribing.
 */
export function useRafScroll(
  onFrame: () => void,
  { enabled = true, resize = false }: { enabled?: boolean; resize?: boolean } = {}
) {
  const cb = useRef(onFrame);

  // Keep the ref pointing at the latest callback without re-subscribing.
  useEffect(() => {
    cb.current = onFrame;
  });

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const run = () => {
      raf = 0;
      cb.current();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };

    cb.current(); // initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    if (resize) window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (resize) window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, resize]);
}

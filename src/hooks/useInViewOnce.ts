"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether an element has entered the viewport at least once. Returns a
 * ref-setter callback and the boolean. After the first intersection the
 * observer disconnects and `inView` stays `true`.
 */
export function useInViewOnce(
  options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const [node, setNode] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node || inView) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
          break;
        }
      }
    }, options);
    io.observe(node);
    return () => io.disconnect();
    // `options` is intentionally not a dep — callers pass an inline literal and
    // the observer only needs to run until the first intersection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, inView]);

  return [setNode, inView] as const;
}

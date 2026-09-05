"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Holds a layered scene hidden until all of its images have finished loading,
 * then fades the whole group in at once — so multi-layer illustrations never
 * pop in chunk by chunk. Also waits until the scene is (near) the viewport, so
 * lower sections reveal as they're scrolled to.
 *
 * Renders a positioned div; pass `className="absolute inset-0"` when the layers
 * inside are absolutely positioned (hero, footer, course card), or a normal
 * block className for a self-sized scene (the divider).
 */
export default function SceneReveal({
  children,
  className = "",
  duration = 700,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let inView = false;
    let loaded = false;
    let done = false;
    const reveal = () => {
      if (inView && loaded && !done) {
        done = true;
        setShown(true);
      }
    };

    // Reveal a little before the scene is fully on screen.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          inView = true;
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(el);

    // Wait for every image in the group to finish (decode where supported).
    const imgs = Array.from(el.querySelectorAll("img"));
    if (imgs.length === 0) {
      loaded = true;
      reveal();
    } else {
      let remaining = imgs.length;
      const one = () => {
        if (--remaining <= 0) {
          loaded = true;
          reveal();
        }
      };
      imgs.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          one();
        } else {
          img.addEventListener("load", one, { once: true });
          img.addEventListener("error", one, { once: true });
        }
      });
    }

    // Safety net: never leave the scene hidden if something stalls.
    const t = window.setTimeout(() => {
      inView = true;
      loaded = true;
      reveal();
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} motion-safe:transition-opacity motion-safe:ease-out ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

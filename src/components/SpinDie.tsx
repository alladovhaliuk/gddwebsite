"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A d20 die layer that spins around its own centre in any container. Because
 * the layer is a full-canvas `object-cover` image, the die's on-screen centre
 * depends on the container's aspect vs the image's — so the transform-origin is
 * measured at runtime (and on resize) instead of hard-coded per card.
 *
 * `fx`/`fy` are the die's centre as a fraction of the source image.
 */
export default function SpinDie({
  src,
  fx,
  fy,
  className,
}: {
  src: string;
  fx: number;
  fy: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<string>();

  useEffect(() => {
    const wrap = ref.current;
    const img = wrap?.querySelector("img");
    if (!wrap || !img) return;

    const calc = () => {
      const r = wrap.getBoundingClientRect();
      const bw = r.width;
      const bh = r.height;
      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;
      if (!bw || !bh) return;
      const Ai = iw / ih;
      const Ab = bw / bh;
      let ox: number;
      let oy: number;
      if (Ab > Ai) {
        // cover scales by width, crops vertically
        const s = bw / Ai;
        ox = fx * 100;
        oy = ((fy * s - (s - bh) / 2) / bh) * 100;
      } else {
        // cover scales by height, crops horizontally
        const s = bh * Ai;
        oy = fy * 100;
        ox = ((fx * s - (s - bw) / 2) / bw) * 100;
      }
      setOrigin(`${ox.toFixed(2)}% ${oy.toFixed(2)}%`);
    };

    if (img.complete && img.naturalWidth) calc();
    else img.addEventListener("load", calc, { once: true });
    const ro = new ResizeObserver(calc);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [fx, fy]);

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={className}
        style={origin ? { transformOrigin: origin } : undefined}
      />
    </div>
  );
}

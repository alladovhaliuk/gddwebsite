"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lenis smooth scroll on the document root.
 * Uses native scroll position under the hood, so position:fixed elements
 * (the sticky header) and our scrollY-based parallax keep working.
 *
 * Hash-anchor clicks are intercepted and routed through `lenis.scrollTo` so
 * jumps to in-page sections animate at Lenis's `duration` instead of snapping
 * instantly. The offset matches `scroll-mt-28` (112px) on target sections so
 * the sticky header doesn't cover the section heading.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // On route change, snap Lenis to the top. Lenis keeps its own animated
  // scroll position, so without this it "restores" the previous page's
  // offset and the new page opens mid-scroll instead of at the top.
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return; // anchor navigation wins
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Skip modified clicks so cmd/ctrl-click still opens in a new tab.
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;

      // Only intercept same-page hash links.
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.host !== window.location.host) return;
      const id = url.hash.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      const lenis = lenisRef.current?.lenis;
      if (!lenis) return; // let the browser handle it before Lenis is ready
      event.preventDefault();
      lenis.scrollTo(target, { offset: -112, duration: 1.2 });
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

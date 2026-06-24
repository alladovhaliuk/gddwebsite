"use client";

import { useEffect, useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Types out each entry in `texts` character-by-character, pauses, then deletes
 * it before typing the next — like someone drafting and rewriting a scene.
 * Loops forever by default; pass `loop={false}` to type through the entries
 * once and stop with the final text left on screen. Starts when the element
 * first enters the viewport. Respects prefers-reduced-motion.
 */
export default function Typewriter({
  texts,
  typeSpeed = 55,
  deleteSpeed = 28,
  holdMs = 1800,
  startDelay = 400,
  loop = true,
  className,
}: {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
  startDelay?: number;
  loop?: boolean;
  className?: string;
}) {
  const [shown, setShown] = useState("");
  const [caretOn, setCaretOn] = useState(true);
  const reduced = usePrefersReducedMotion();
  const [setEl, inView] = useInViewOnce({ threshold: 0.2 });
  const started = inView && !reduced;

  // Type / hold / delete / advance loop.
  useEffect(() => {
    if (!started || texts.length === 0) return;
    let cancelled = false;
    let i = 0;
    let charIdx = 0;
    let phase: "type" | "hold" | "delete" = "type";

    const tick = () => {
      if (cancelled) return;
      const current = texts[i];

      if (phase === "type") {
        if (charIdx < current.length) {
          charIdx += 1;
          setShown(current.slice(0, charIdx));
          setTimeout(tick, typeSpeed);
        } else if (!loop && i === texts.length - 1) {
          // One-shot: leave the final text on screen and stop.
          return;
        } else {
          phase = "hold";
          setTimeout(tick, holdMs);
        }
      } else if (phase === "hold") {
        phase = "delete";
        setTimeout(tick, deleteSpeed);
      } else {
        if (charIdx > 0) {
          charIdx -= 1;
          setShown(current.slice(0, charIdx));
          setTimeout(tick, deleteSpeed);
        } else {
          i = (i + 1) % texts.length;
          phase = "type";
          setTimeout(tick, 240);
        }
      }
    };

    const start = setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [started, texts, typeSpeed, deleteSpeed, holdMs, startDelay, loop]);

  // Caret blink.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setCaretOn((c) => !c), 520);
    return () => clearInterval(id);
  }, [reduced]);

  // Reduced motion: render the first entry in full; otherwise the typed text.
  const display = reduced ? texts[0] ?? "" : shown;
  const lines = display.split("\n");

  return (
    <span ref={setEl} className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block">
          {line}
          {idx === lines.length - 1 && (
            <span
              aria-hidden
              className={`ml-0.5 inline-block w-[0.55em] -translate-y-px ${
                caretOn ? "opacity-90" : "opacity-0"
              }`}
              style={{ borderBottom: "0.13em solid currentColor" }}
            />
          )}
        </span>
      ))}
    </span>
  );
}

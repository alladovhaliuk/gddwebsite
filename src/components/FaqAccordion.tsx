"use client";

import { Fragment, useState, type ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import type { FaqItem } from "@/data/types";

// URLs, emails and Telegram @handles inside answer copy are turned into
// clickable links. Email/handle order matters in the regex — emails contain
// "@", so they must be matched before the bare-@handle alternative.
const LINK_PATTERN =
  /(https?:\/\/[^\s,)]+|[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}|@[a-zA-Z0-9_]{4,})/g;

function linkify(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_PATTERN)) {
    const match = m[0];
    const offset = m.index ?? 0;
    if (offset > last) parts.push(text.slice(last, offset));
    const key = `${offset}-${match}`;
    const className = "text-brand-orange hover:underline";
    if (match.startsWith("http")) {
      parts.push(
        <a
          key={key}
          href={match}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {match}
        </a>
      );
    } else if (match.startsWith("@")) {
      parts.push(
        <a
          key={key}
          href={`https://t.me/${match.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {match}
        </a>
      );
    } else {
      parts.push(
        <a key={key} href={`mailto:${match}`} className={className}>
          {match}
        </a>
      );
    }
    last = offset + match.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const Chevron = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * Single-open FAQ accordion. Rows stitch together with the standard hairline
 * rule; the answer area expands via a grid-rows transition. Items whose answer
 * is empty (copy not finalized yet) show a muted placeholder.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-stretch text-left transition-colors hover:bg-brand-orange/10"
            >
              <span className="grid w-14 shrink-0 place-items-center border-r border-black/10 text-foreground/60 md:w-20">
                <HelpCircle className="size-4" strokeWidth={2} />
              </span>
              <span className="flex flex-1 items-center px-6 py-5 font-bold leading-snug text-foreground md:px-10">
                {item.q}
              </span>
              <span className="flex shrink-0 items-center pr-6 md:pr-10">
                <Chevron
                  className={`size-4 text-foreground/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex">
                  <div className="w-14 shrink-0 border-r border-black/10 md:w-20" />
                  <p className="flex-1 px-6 pb-6 text-fluid-sm leading-relaxed text-foreground/65 md:px-10">
                    {item.a ? (
                      linkify(item.a).map((node, idx) => (
                        <Fragment key={idx}>{node}</Fragment>
                      ))
                    ) : (
                      "Текст скоро появится."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

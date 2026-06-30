"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRafScroll } from "@/hooks/useRafScroll";

export type NavLink = { label: string; href?: string };

// Default nav for the homepage. Pass a custom `navLinks` prop on other pages
// to reflect their own sections. Keep "Курсы" in the list to retain the mega
// menu — it's matched by label.
const defaultNavLinks: NavLink[] = [
  { label: "Курсы" },
  { label: "О школе", href: "#about" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Об авторе", href: "#alla" },
  { label: "Контакты", href: "#alla" },
];

const courseMenu = [
  {
    title: "«Нарративщики»",
    desc: "Сюжет, GDD, диалоги и портфолио нарративного гейм-дизайнера.",
    meta: "Старт 12/01/2026",
    img: "/img/narrators.png",
    href: "/courses/narrative",
  },
  {
    title: "«Гейм-дизайнеры»",
    desc: "Геймплей, механики, метрики и документы гейм-дизайнера.",
    meta: "Старт 20/04/2026",
    img: "/img/gamedesigners.png",
    href: "/courses/game-design",
  },
  {
    title: "Персональные консультации",
    desc: "Разработка, издатель, бюджет и продвижение вашей игры.",
    meta: "Есть места",
    img: "/img/consult.png",
    href: "/courses/consultations",
  },
];

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

export default function StickyHeader({
  navLinks = defaultNavLinks,
}: {
  navLinks?: NavLink[];
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMobile = () => setMobileOpen(false);

  // Shared open/close so moving between the "Курсы" button and the menu
  // doesn't close it in the gap — a small delay bridges the dead zone.
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCoursesOpen(true);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCoursesOpen(false), 120);
  };

  // Clear any pending close timer on unmount so it can't fire afterward.
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Close the mega menu / mobile menu on Escape (keyboard dismissal).
  useEffect(() => {
    if (!coursesOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setCoursesOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [coursesOpen, mobileOpen]);

  // Solidify the frosted nav/CTA backgrounds once the page is scrolled.
  useRafScroll(() => setScrolled(window.scrollY > 40));

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="relative z-50 max-w-[1160px] mx-auto px-3 md:px-6 py-6 flex items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="GDD — на главную"
          className={`logo-anim shrink-0 grid place-items-center size-14 rounded-full backdrop-blur-md transition-colors ${
            scrolled ? "bg-white/85 ring-1 ring-black/5" : "bg-white/40"
          }`}
        >
          <Image
            src="/logo/Orange/Logo_Full.svg"
            alt="GDD"
            width={48}
            height={48}
            className="size-12"
          />
        </Link>

        {/* Nav links — frosted glass that solidifies after scroll */}
        <nav
          className={`hidden lg:flex items-center gap-6 xl:gap-10 h-14 px-8 rounded-xl backdrop-blur-md text-[14px] text-black whitespace-nowrap transition-colors ${
            scrolled
              ? "bg-white/85 ring-1 ring-black/5"
              : "bg-white/30 ring-1 ring-white/40"
          }`}
        >
          {navLinks.map((l) =>
            l.label === "Курсы" ? (
              <div
                key={l.label}
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                <button
                  type="button"
                  onClick={() => setCoursesOpen((o) => !o)}
                  onFocus={openMenu}
                  aria-haspopup="menu"
                  aria-expanded={coursesOpen}
                  aria-controls="courses-mega-menu"
                  className="group flex items-center gap-1 py-1"
                >
                  {l.label}
                  <Chevron
                    className={`size-3.5 transition-transform duration-300 ${
                      coursesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ) : (
              <a key={l.label} href={l.href} className="group relative py-1">
                {l.label}
                <span className="pointer-events-none absolute left-1/2 -bottom-0.5 size-1.5 -translate-x-1/2 translate-y-1 rounded-full bg-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
              </a>
            )
          )}
        </nav>

        {/* Mega menu — spans the full content width (logo edge to CTA edge),
            anchored to the relative container via left-6/right-6. Kept a
            sibling of (not inside) the blurred <nav>, whose backdrop-filter
            would otherwise clip/contain it. pt-* is an invisible hover bridge
            across the 24px gap up to the nav so the menu stays open. */}
        <div
          id="courses-mega-menu"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
          className={`absolute left-6 right-6 top-[80px] z-40 pt-7 transition-all duration-200 ${
            coursesOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="whitespace-normal rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
            <div className="grid gap-2 sm:grid-cols-3">
              {courseMenu.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  className="group/card flex flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-brand-orange/10"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-black/5">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-top transition-transform duration-300 group-hover/card:scale-105"
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-medium text-foreground shadow-sm backdrop-blur">
                      {c.meta}
                    </span>
                  </span>
                  <span className="font-bold leading-tight text-foreground">
                    {c.title}
                  </span>
                  <span className="text-[13px] leading-snug text-foreground/60">
                    {c.desc}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] font-medium text-brand-orange">
                    Узнать больше
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA — desktop only */}
        <Link
          href="/book"
          className="hidden lg:grid shrink-0 ml-auto h-14 place-items-center px-7 whitespace-nowrap rounded-xl bg-brand-orange/90 backdrop-blur-md text-[14px] text-black font-medium hover:bg-brand-orange transition"
        >
          Хочу обучаться
        </Link>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className={`lg:hidden ml-auto grid size-14 shrink-0 place-items-center rounded-xl backdrop-blur-md transition-colors ${
            scrolled || mobileOpen
              ? "bg-white/85 ring-1 ring-black/5"
              : "bg-white/40 ring-1 ring-white/40"
          }`}
        >
          {mobileOpen ? (
            <X className="size-6" strokeWidth={2} />
          ) : (
            <Menu className="size-6" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-cream/95 backdrop-blur-xl" />
        <nav
          data-lenis-prevent
          className="relative flex h-full flex-col gap-1 overflow-y-auto px-6 pb-10 pt-28 text-foreground"
        >
          {navLinks.map((l) =>
            l.label === "Курсы" ? (
              <div key={l.label} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen((o) => !o)}
                  aria-expanded={mobileCoursesOpen}
                  className="flex w-full items-center justify-between py-4 text-fluid-2xl"
                >
                  {l.label}
                  <Chevron
                    className={`size-5 transition-transform duration-300 ${
                      mobileCoursesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    mobileCoursesOpen
                      ? "grid-rows-[1fr] pb-3 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1 overflow-hidden">
                    {courseMenu.map((c) => (
                      <a
                        key={c.title}
                        href={c.href}
                        onClick={closeMobile}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-brand-orange/10"
                      >
                        <span className="font-medium">{c.title}</span>
                        <span className="shrink-0 text-[12px] font-medium text-brand-orange">
                          {c.meta}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onClick={closeMobile}
                className="border-b border-black/10 py-4 text-fluid-2xl"
              >
                {l.label}
              </a>
            )
          )}

          <Link
            href="/book"
            onClick={closeMobile}
            className="mt-8 grid h-14 shrink-0 place-items-center rounded-xl bg-brand-orange/90 text-[15px] font-medium text-black transition hover:bg-brand-orange"
          >
            Хочу обучаться
          </Link>
        </nav>
      </div>
    </header>
  );
}

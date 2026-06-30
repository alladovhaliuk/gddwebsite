import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Такой страницы нет. Вернитесь на главную, чтобы продолжить.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <StickyHeader />
      <main
        id="main"
        className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center bg-white px-6 py-32 text-foreground"
      >
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <p
            aria-hidden
            className="text-fluid-hero font-bold leading-none tracking-[-0.02em] text-foreground"
          >
            404
          </p>
          <h1 className="text-fluid-3xl leading-tight text-foreground">
            Страница не найдена
          </h1>
          <p className="text-fluid-base leading-relaxed text-foreground/65">
            Возможно, ссылка устарела или адрес был набран с опечаткой.
          </p>
          <Link
            href="/"
            className="group mt-2 inline-flex items-center gap-2.5 self-center rounded-xl bg-black py-2 pl-4 pr-2 text-[14px] text-white shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.4)]"
          >
            <span>Вернуться на главную</span>
            <span className="grid size-7 place-items-center rounded-lg bg-white text-black shadow-[inset_0_0_2px_1px_rgba(0,0,0,0.25)] transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

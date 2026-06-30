import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Забронировать место | Школа GDD",
  description:
    "Оставьте контактные данные — мы свяжемся с вами и обсудим участие в курсе.",
};

// Slim header for the booking flow — no nav, no mega menu. Just the logo and
// a "back to home" pill, both frosted-glass over the painterly hero painting.
// Floats above the layout (absolute / z-50) so the main column can fill the
// full viewport without ceding header space.
export default function BookPage() {
  return (
    <div className="relative h-screen overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-50 flex items-center gap-3 px-3 py-6 md:px-6">
        <Link
          href="/"
          aria-label="GDD — на главную"
          className="logo-anim grid size-14 shrink-0 place-items-center rounded-full bg-white/40 backdrop-blur-md transition-colors"
        >
          <Image
            src="/logo/Orange/Logo_Full.svg"
            alt="GDD"
            width={48}
            height={48}
            className="size-12"
          />
        </Link>
        <Link
          href="/"
          className="group inline-flex h-14 items-center gap-2 rounded-xl bg-white/30 px-5 text-[14px] text-foreground ring-1 ring-white/40 backdrop-blur-md transition hover:bg-white/50"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={2.25}
          />
          <span>На главную</span>
        </Link>
      </header>
      <Suspense fallback={null}>
        <BookingForm />
      </Suspense>
    </div>
  );
}

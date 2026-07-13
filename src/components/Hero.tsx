import { Fragment } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Parallax from "@/components/Parallax";
import MouseParallax from "@/components/MouseParallax";
import Marquee from "@/components/Marquee";
import { home, marqueeItems } from "@/data/content";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-width image at its natural aspect ratio (taller image) */}
      <div
        data-mouse-parallax-root
        className="relative w-full aspect-[1923/900] min-h-[480px]"
      >
        {/* Background sky/field — scroll parallax + tiny mouse tilt */}
        <Parallax speed={0.18} className="absolute inset-0 z-0">
          <MouseParallax strength={8} className="absolute inset-0">
            {/* extra vertical bleed so the drift never reveals an edge */}
            <div className="absolute -inset-y-[16%] -inset-x-[3%]">
              <Image
                src="/img/herobg.png"
                alt=""
                fill
                priority
                unoptimized
                className="object-cover object-bottom"
              />
            </div>
          </MouseParallax>
        </Parallax>

        {/* Foreground clouds — scroll up + a stronger mouse tilt for depth */}
        <Parallax
          speed={-0.08}
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <MouseParallax strength={22} className="absolute inset-0">
            <Image
              src="/img/cloud02.png"
              alt=""
              aria-hidden
              width={533}
              height={501}
              className="absolute left-[-2%] top-[-6%] w-[33%] select-none"
            />
            <Image
              src="/img/cloud01.png"
              alt=""
              aria-hidden
              width={578}
              height={506}
              className="absolute right-[-2%] top-0 w-[34%] select-none"
            />
          </MouseParallax>
        </Parallax>

        {/* Column guides + arcs (Figma "Group 1"), white over the hero */}
        <Parallax
          speed={0.18}
          className="pointer-events-none absolute inset-0 z-[2]"
        >
          <div className="absolute inset-0 mx-auto max-w-[1160px] text-white/55">
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1156 809"
              preserveAspectRatio="none"
              fill="none"
            >
              <g stroke="currentColor" strokeWidth="0.5">
                <ellipse cx="578" cy="12" rx="578" ry="439" />
                <ellipse cx="578" cy="889" rx="578" ry="439" />
              </g>
            </svg>
            <span className="absolute -inset-y-[16%] left-0 w-[0.5px] bg-current" />
            <span className="absolute -inset-y-[16%] left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
            <span className="absolute -inset-y-[16%] right-0 w-[0.5px] bg-current" />
          </div>
        </Parallax>

        {/* Foreground field object — pinned to the hero bottom (no parallax) */}
        <Image
          src="/img/object.png"
          alt=""
          aria-hidden
          width={1440}
          height={367}
          unoptimized
          className="pointer-events-none absolute inset-x-0 -bottom-[11%] z-10 h-auto w-full select-none"
        />

        {/* Headline + button, positioned in the upper sky area */}
        <div className="absolute inset-x-0 top-[22%] flex flex-col items-center text-center px-4">
          <h1 className="max-w-3xl font-bold leading-[0.986] tracking-[-0.02em] text-white text-fluid-hero">
            {home.heroTitle.split("\n").map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <a
            href="#courses"
            className="group mt-8 flex w-full max-w-sm items-center justify-center gap-2.5 rounded-xl bg-white/80 py-2 pl-4 pr-2 text-[14px] text-black backdrop-blur-md transition hover:bg-white md:inline-flex md:w-auto md:max-w-none"
          >
            <span>{home.heroCta}</span>
            <span className="grid size-7 place-items-center rounded-lg bg-white text-brand-orange transition-transform group-hover:translate-y-0.5">
              <ArrowDown className="size-4" strokeWidth={2.25} />
            </span>
          </a>
        </div>

        {/* Ticker: fixed "Идёт набор" label + scrolling course names */}
        <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-[1160px] items-stretch border-y border-white/10 bg-black/25 text-white backdrop-blur-md">
          <div className="flex shrink-0 items-center border-r border-white/15 bg-black/20 px-6 py-3 text-fluid-sm whitespace-nowrap">
            Идёт набор
          </div>
          <div className="min-w-0 flex-1 overflow-hidden py-3">
            <Marquee
              items={marqueeItems}
              repeat={6}
              trackClassName="whitespace-nowrap"
              liClassName="px-6 text-fluid-sm"
              renderItem={(item) => `${item.title}, старт ${item.date}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

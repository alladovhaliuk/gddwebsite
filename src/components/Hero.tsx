import { Fragment } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Parallax from "@/components/Parallax";
import MouseParallax from "@/components/MouseParallax";
import Marquee from "@/components/Marquee";
import SceneReveal from "@/components/SceneReveal";
import { home, marqueeItems } from "@/data/content";

// Layered hero scene ("Главная 1"). Every layer is exported from the source
// PSD at the full 5320×2492 canvas, so each one sits at inset-0 and lines up
// automatically. Depth comes from grouping the layers into planes and giving
// each plane its own scroll + mouse parallax.
const LAYER = "absolute inset-0 h-full w-full object-cover select-none";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        data-mouse-parallax-root
        className="relative w-full aspect-[5320/2492] min-h-[480px]"
      >
       <SceneReveal className="absolute inset-0">
        {/* ── Ground plane: sky/hills + coin-path — slow scroll, tiny tilt ── */}
        <Parallax speed={0.16} className="absolute inset-0 z-0">
          <MouseParallax strength={6} className="absolute inset-0">
            <div className="absolute -inset-y-[10%] -inset-x-[3%]">
              <Image
                src="/img/hero1/bg.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className={LAYER + " object-bottom"}
              />
              <Image
                src="/img/hero1/dots.webp"
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className={LAYER + " object-bottom"}
              />
            </div>
          </MouseParallax>
        </Parallax>

        {/* ── Subject: light burst + cart + glowing blocks — medium tilt ── */}
        <Parallax speed={0.06} className="pointer-events-none absolute inset-0 z-[2]">
          <MouseParallax strength={14} className="absolute inset-0">
            {/* soft pulsing glow behind the cart */}
            <Image
              src="/img/hero1/light.webp"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className={LAYER + " hero-glow"}
            />
            <Image src="/img/hero1/shadow.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER} />
            <Image src="/img/hero1/horse.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER} />
            {/* small light glints + floating tetromino cubes */}
            <Image src="/img/hero1/light4.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-glow"} />
            <Image src="/img/hero1/cube4.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-float hero-float-a"} />
            <Image src="/img/hero1/light3.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-glow"} />
            <Image src="/img/hero1/cube3.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-float hero-float-b"} />
            <Image src="/img/hero1/light2.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-glow"} />
            <Image src="/img/hero1/cube2.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-float hero-float-c"} />
            <Image src="/img/hero1/light1.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-glow"} />
            <Image src="/img/hero1/cube1.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " hero-float hero-float-d"} />
          </MouseParallax>
        </Parallax>

        {/* ── Foreground: big die + grass tufts — strongest tilt ── */}
        <Parallax speed={-0.04} className="pointer-events-none absolute inset-0 z-[3]">
          <MouseParallax strength={22} className="absolute inset-0">
            <div className="absolute -inset-x-[2%] -inset-y-[3%]">
              <Image src="/img/hero1/dice.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER} />
              <Image src="/img/hero1/grass.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER + " object-bottom"} />
            </div>
          </MouseParallax>
        </Parallax>

        {/* ── Clouds — drift upward on scroll, strong tilt ── */}
        <Parallax speed={-0.1} className="pointer-events-none absolute inset-0 z-[4]">
          <MouseParallax strength={26} className="absolute inset-0">
            <div className="absolute -inset-[4%]">
              <Image src="/img/hero1/clouds.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER} />
            </div>
          </MouseParallax>
        </Parallax>

        {/* ── Column guides + arcs (baked into the artwork) ── */}
        <Parallax speed={0.16} className="pointer-events-none absolute inset-0 z-[5]">
          <Image src="/img/hero1/lines.webp" alt="" aria-hidden fill sizes="100vw" className={LAYER} />
        </Parallax>

        {/* Headline + button, positioned in the upper sky area */}
        <div className="absolute inset-x-0 top-[20%] z-20 flex flex-col items-center text-center px-4">
          <h1 className="max-w-3xl font-bold leading-[0.986] tracking-[-0.02em] text-white text-fluid-hero [text-shadow:0_2px_18px_rgba(0,0,0,0.28)]">
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
       </SceneReveal>
      </div>
    </section>
  );
}

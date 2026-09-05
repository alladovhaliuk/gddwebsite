import Image from "next/image";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import Marquee from "@/components/Marquee";
import MouseParallax from "@/components/MouseParallax";
import ScrollWords from "@/components/ScrollWords";
import SceneReveal from "@/components/SceneReveal";
import StickyHeader from "@/components/StickyHeader";
import Typewriter from "@/components/Typewriter";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { courses, features, home, testimonials, studioLogos, socials } from "@/data/content";

// Lowercase, then capitalize the first letter (sentence case, RU-aware).
const toSentence = (s: string) => {
  const lower = s.toLocaleLowerCase("ru");
  return lower.replace(/\p{L}/u, (ch) => ch.toLocaleUpperCase("ru"));
};

export default function Home() {
  return (
    <>
      <StickyHeader />
      <Hero />

      <main id="main" className="relative bg-white text-foreground">
        {/* Column guides continue down the page, faint over the cream */}
        <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1160px] text-black/[0.12]">
          <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
          <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
        </div>

        <div className="relative max-w-[1160px] mx-auto px-6 pt-16 flex flex-col gap-20">
          {/* Intro lead — scroll-driven word reveal, same weight throughout */}
          <section className="py-16 md:py-28">
            <ScrollWords
              text={home.intro}
              className="mx-auto max-w-3xl text-center text-fluid-2xl leading-snug text-foreground"
            />
          </section>

          {/* ── ОБУЧЕНИЕ ──────────────────────────────────── */}
          <section
            id="courses"
            className="scroll-mt-28 -mx-6 divide-y divide-black/10 border-y border-black/10 bg-white"
          >
            {courses.map((c, i) => (
              <CourseCard key={c.title} course={c} index={i} />
            ))}
          </section>

          {/* ── СТУДИИ (logo marquee) ─────────────────────── */}
          <section className="-mx-6 -mt-20 flex items-stretch border-b border-black/10 text-foreground">
            <div className="flex max-w-[9.5rem] shrink-0 items-center border-r border-black/10 px-6 text-fluid-sm leading-tight text-foreground/70">
              Где работают наши ученики
            </div>
            <div className="relative z-20 min-w-0 flex-1 overflow-hidden bg-white py-5">
              <Marquee
                items={studioLogos}
                repeat={2}
                trackClassName="items-center"
                liClassName="px-7"
                renderItem={({ src, light }) => (
                  <Image
                    src={src}
                    alt=""
                    aria-hidden
                    width={1062}
                    height={438}
                    className={`h-8 w-auto object-contain opacity-60 grayscale ${
                      light ? "invert" : ""
                    }`}
                  />
                )}
              />
            </div>
          </section>

          {/* ── О ШКОЛЕ ───────────────────────────────────── */}
          <section
            id="about"
            className="scroll-mt-28 -mx-6 -mt-20 grid border-b border-black/10 md:grid-cols-2"
          >
            {/* Heading — left half (left line → center line) */}
            <div className="border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-10">
              <h2 className="text-fluid-4xl leading-tight text-foreground md:sticky md:top-24">
                {home.aboutHeading}
              </h2>
            </div>

            {/* Features — right half (center line → right line), 2 sub-columns */}
            <div className="grid sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col gap-3 border-t border-black/10 p-6 transition-colors duration-200 hover:bg-brand-orange/10 md:p-8 [&:first-child]:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l"
                >
                  <h3 className="font-bold leading-[1.08] text-foreground">
                    {toSentence(f.title)}
                  </h3>
                  <p className="text-fluid-sm text-foreground/65">{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── DIVIDER (poppy meadow) ────────────────────── */}
          <div
            data-mouse-parallax-root
            className="relative z-20 -mx-6 -mt-20 aspect-[5375/825] overflow-hidden"
          >
            <SceneReveal className="absolute inset-0">
            {/* Backdrop — sky, clouds, base grass; tiny parallax drift */}
            <MouseParallax strength={1.5} className="absolute inset-0">
              <div className="absolute -inset-[2%]">
                <Image src="/img/divider2/sky.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
                <Image src="/img/divider2/clouds.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
                <Image src="/img/divider2/grass_base.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </MouseParallax>
            {/* Sword + fluttering ribbon */}
            <MouseParallax strength={3} className="absolute inset-0">
              <Image src="/img/divider2/sword.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
              <Image src="/img/divider2/ribbon.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover divider-sway" />
            </MouseParallax>
            {/* Poppies — split into clusters so each sways on its own timing
                (staggered, not in unison); wind on the images, parallax on wrapper */}
            <MouseParallax strength={4} className="absolute inset-0">
              <Image src="/img/divider2/flowers_l.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover wind-sway wind-sway-a" />
              <Image src="/img/divider2/flowers_m.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover wind-sway wind-sway-c" />
              <Image src="/img/divider2/flowers_r.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover wind-sway wind-sway-d" />
            </MouseParallax>
            {/* Foreground grass — closest, strongest parallax */}
            <MouseParallax strength={6} className="absolute inset-0">
              <Image src="/img/divider2/grass_front.webp" alt="" aria-hidden fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover object-bottom wind-sway wind-sway-b" />
            </MouseParallax>
            </SceneReveal>

            {/* rule-of-thirds composition schema */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 h-full w-full text-white/55"
              viewBox="0 0 1440 214"
              preserveAspectRatio="none"
              fill="none"
            >
              <g
                stroke="currentColor"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              >
                <line x1="-400" y1="71" x2="1840" y2="71" />
                <line x1="-400" y1="143" x2="1840" y2="143" />
                <line x1="480" y1="-200" x2="480" y2="420" />
                <line x1="960" y1="-200" x2="960" y2="420" />
              </g>
            </svg>

            {/* Social links, centered */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-3">
              {socials.map(({ label, href, src }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="pointer-events-auto grid size-9 place-items-center rounded-lg bg-white shadow-sm transition hover:-translate-y-0.5 md:size-10"
                >
                  <Image
                    src={src}
                    alt=""
                    aria-hidden
                    width={20}
                    height={20}
                    className="size-4 md:size-5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── ОТЗЫВЫ (carousel) ─────────────────────────── */}
          <section
            id="testimonials"
            className="scroll-mt-28 -mx-6 -mt-20 border-x border-b border-black/10"
          >
            <TestimonialsCarousel items={testimonials} />
          </section>

          {/* ── ОБ АВТОРЕ ─────────────────────────────────── */}
          <section
            id="alla"
            className="scroll-mt-28 -mx-6 -mt-20 grid border-b border-black/10 md:grid-cols-2"
          >
            {/* Experience — left half, cells stacked on the column lines */}
            <div className="order-2 flex flex-col md:order-1 md:border-r border-black/10">
              {/* Name + role */}
              <div className="flex flex-col gap-3 border-b border-black/10 p-6 md:p-10">
                <p className="self-start rounded-full border border-black/15 px-4 py-2.5 text-fluid-sm text-foreground">
                  Об авторе
                </p>
                <h2 className="text-fluid-4xl leading-tight text-foreground">
                  {home.author.name}
                </h2>
                <p className="text-fluid-sm text-foreground/65">
                  {home.author.role}
                </p>
              </div>

              {/* Headline stats */}
              <div className="grid grid-cols-2 border-b border-black/10">
                {home.author.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`p-6 md:p-8 ${
                      i % 2 === 0 ? "border-r border-black/10" : ""
                    }`}
                  >
                    <p className="text-fluid-3xl tracking-[-0.02em] text-foreground whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="text-fluid-sm text-foreground/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Studios */}
              <div className="flex flex-col gap-3 border-b border-black/10 p-6 md:p-8">
                <p className="self-start rounded-full border border-black/15 px-4 py-2.5 text-fluid-sm text-foreground">
                  Работала в студиях
                </p>
                <div className="flex flex-wrap gap-2">
                  {home.author.studios.map((l) => (
                    <span
                      key={l}
                      className="rounded-lg bg-black/[0.04] px-4 py-2 text-fluid-sm text-black/55"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contacts — pinned to the bottom of the column */}
              <div className="flex flex-1 items-end p-6 md:p-8">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-fluid-sm font-medium text-foreground">
                  <a
                    href="https://t.me/alla_dovhaliuk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-brand-orange"
                  >
                    <Image
                      src="/social/telegram-logo.svg"
                      alt="Telegram"
                      width={18}
                      height={18}
                      className="size-[1.1em]"
                    />
                    @alla_dovhaliuk
                  </a>
                  <a
                    href="mailto:myfirstnameisalla@gmail.com"
                    className="inline-flex items-center gap-2 transition-colors hover:text-brand-orange"
                  >
                    <Image
                      src="/social/envelope.svg"
                      alt="Email"
                      width={18}
                      height={18}
                      className="size-[1.1em]"
                    />
                    myfirstnameisalla@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Photo — right half, with the mission typed over it */}
            <div className="relative order-1 min-h-[26rem] overflow-hidden bg-foreground/5 md:order-2 md:min-h-full">
              <Image
                src="/alla-author.webp"
                alt="Алла Довгалюк"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[32%_center]"
              />

              {/* Legibility scrim for the typed text */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Mission — typed once as the section scrolls into view */}
              <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 md:inset-x-8 md:bottom-8">
                <Typewriter
                  loop={false}
                  texts={[home.author.mission]}
                  typeSpeed={28}
                  className="font-mono text-fluid-sm leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

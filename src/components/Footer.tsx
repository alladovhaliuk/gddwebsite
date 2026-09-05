import Image from "next/image";
import MouseParallax from "@/components/MouseParallax";
import SceneReveal from "@/components/SceneReveal";
import { contactEmail, socials } from "@/data/content";

const SCENE = "absolute inset-0 h-full w-full object-cover select-none";

const footerLinks = [
  { label: "Курсы", href: "#" },
  { label: "О школе", href: "#about" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Об авторе", href: "#alla" },
  { label: "Контакты", href: "#alla" },
];

// Social links + email, all shown as white icon chips. URLs live in
// `data/content.ts` so they're shared with the page-body social row.
const contactIcons = [
  ...socials,
  {
    label: "Почта",
    href: `mailto:${contactEmail}`,
    src: "/social/envelope.svg",
  },
];

export default function Footer() {
  return (
    <footer
      data-mouse-parallax-root
      className="relative isolate overflow-hidden bg-[#141327] text-white"
    >
      {/* Layered night-castle backdrop (главная 3). Dark bg keeps the copy
          legible before the scene fades in. */}
      <SceneReveal className="absolute inset-0 -z-10">
        {/* Backdrop — sky, clouds, castle, grass, road */}
        <MouseParallax strength={3} className="absolute inset-0">
          <div className="absolute -inset-[2%]">
            <Image src="/img/footer/sky.webp" alt="" fill sizes="100vw" className={SCENE} />
            <Image src="/img/footer/clouds.webp" alt="" fill sizes="100vw" className={SCENE} />
            <Image src="/img/footer/castle.webp" alt="" fill sizes="100vw" className={SCENE} />
            <Image src="/img/footer/grass.webp" alt="" fill sizes="100vw" className={SCENE} />
            <Image src="/img/footer/road.webp" alt="" fill sizes="100vw" className={SCENE} />
          </div>
        </MouseParallax>
        {/* Poppies — split into clusters, gentle staggered wind sway */}
        <MouseParallax strength={10} className="absolute inset-0">
          <div className="absolute -inset-[2%]">
            <Image src="/img/footer/flowers_l.webp" alt="" fill sizes="100vw" className={SCENE + " wind-soft wind-soft-a"} />
            <Image src="/img/footer/flowers_m.webp" alt="" fill sizes="100vw" className={SCENE + " wind-soft wind-soft-c"} />
            <Image src="/img/footer/flowers_r.webp" alt="" fill sizes="100vw" className={SCENE + " wind-soft wind-soft-d"} />
            <Image src="/img/footer/grass1.webp" alt="" fill sizes="100vw" className={SCENE + " wind-soft wind-soft-b"} />
            <Image src="/img/footer/grass2.webp" alt="" fill sizes="100vw" className={SCENE + " wind-soft wind-soft-a"} />
          </div>
        </MouseParallax>
        {/* Stars — each rotates slowly left↔right around its own centre */}
        <MouseParallax strength={6} className="absolute inset-0">
          <div className="absolute -inset-[2%]">
            <Image src="/img/footer/star_l.webp" alt="" fill sizes="100vw" className={SCENE + " star-rock star-rock-a"} style={{ transformOrigin: "18.4% 35.9%" }} />
            <Image src="/img/footer/star_m.webp" alt="" fill sizes="100vw" className={SCENE + " star-rock star-rock-b"} style={{ transformOrigin: "46.2% 25.2%" }} />
            <Image src="/img/footer/star_r.webp" alt="" fill sizes="100vw" className={SCENE + " star-rock star-rock-c"} style={{ transformOrigin: "78.3% 40.6%" }} />
          </div>
        </MouseParallax>
        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
      </SceneReveal>

      <div className="mx-auto flex max-w-[1160px] flex-col gap-12 px-6 py-16 md:py-24">
        {/* Brand + nav */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-white/15 backdrop-blur-md">
                <Image
                  src="/logo/Orange/Logo_Full.svg"
                  alt="GDD"
                  width={40}
                  height={40}
                  className="size-10"
                />
              </span>
              <span className="text-fluid-lg font-bold">Школа GDD</span>
            </a>
            <p className="text-fluid-sm text-white/70">
              Самая заботливая онлайн-школа, которая учит делать видеоигры.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-fluid-sm">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Socials + contacts + copyright */}
        <div className="flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {contactIcons.map(({ label, href, src }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="grid size-10 place-items-center rounded-lg bg-white/90 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <Image
                    src={src}
                    alt=""
                    aria-hidden
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-fluid-sm text-white/55">
            <a
              href="/privacy"
              className="transition-colors hover:text-white/80"
            >
              Политика конфиденциальности
            </a>
            <p>© 2026 Школа GDD</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

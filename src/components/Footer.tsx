import Image from "next/image";
import { contactEmail, socials } from "@/data/content";

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
    <footer className="relative isolate overflow-hidden text-white">
      {/* Painterly night wheat-field backdrop */}
      <Image
        src="/footer.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Legibility scrim — darkest toward the lighter wheat at the bottom */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/30 to-black/60"
      />

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

          <p className="text-fluid-sm text-white/55">© 2026 Школа GDD</p>
        </div>
      </div>
    </footer>
  );
}

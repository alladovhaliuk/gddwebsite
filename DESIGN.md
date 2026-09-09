# GDD School — Design System

Precise design specification extracted from the home page (`src/app/page.tsx`),
the course landing page (`src/app/courses/narrative/page.tsx`), and the shared
`src/components/*` + `src/app/globals.css`. Use this as the single source of
truth when building new pages so they feel identical to the existing ones.

The aesthetic: **editorial, architectural, warm.** A printed-poster grid (thin
hairline rules, faint column guides, golden-ratio armatures drawn over imagery)
crossed with painterly storybook illustrations, a single hot-orange accent, and
quiet, tactile motion (parallax, typewriters, marquees). Russian-language
product. Light by default; no dark mode.

---

## 1. Foundations

### 1.1 Color

Defined in `globals.css` as CSS variables and exposed to Tailwind via
`@theme inline`. **Never hard-code hex** — use the tokens / utilities below.

| Token | Value | Tailwind utility | Use |
|---|---|---|---|
| `--background` | `#ffffff` | `bg-background` / `bg-white` | Page + section surfaces |
| `--foreground` | `#171717` | `text-foreground` | Primary text (near-black, not pure) |
| `--brand-orange` | `#fe6911` | `*-brand-orange` | The only accent — CTAs, hovers, links, spark |
| `--cream` | `#ece8dd` | `*-cream` | Warm neutral (mobile menu scrim) |

**Opacity is the palette.** Almost every tone is `foreground`, `black`, or
`white` at an alpha. Memorize these exact steps — reuse them, don't invent new
ones:

- Text hierarchy: `text-foreground` → `text-foreground/70` → `/65` → `/60` → `/55` → `/45` → `/30`
- Hairline rules: `border-black/10` (primary divider everywhere), `border-black/15` (chip/pill outlines)
- Column guides: `text-black/[0.12]` with `bg-current` spans
- Hover wash: `hover:bg-brand-orange/10` (cards, menu items, FAQ rows), `hover:bg-black/[0.04]` (neutral buttons)
- Soft fills: `bg-black/[0.04]` / `bg-black/5` (chips, image placeholders), `bg-cream/40` (calendar week titles)
- Image-area placeholders: `bg-foreground/5` (teacher cards) and `bg-foreground/10` (course-card image half)
- On imagery: `text-white`, `text-white/85`, `text-white/70`, `text-white/55`, `text-white/40`; rules `border-white/10`–`/15`–`/40`; guides `text-white/40`–`/55`–`/70`
- Frosted glass: `bg-white/10` (secondary CTA), `bg-white/20`–`/30`–`/80`–`/85` + `backdrop-blur-md`, rings `ring-white/40` / `ring-black/5`
- FAQ inline links: `text-brand-orange hover:underline`

**Status colors** (the only non-brand hues, used for course-status pills):

- Open / "Идёт набор": `bg-emerald-100 text-emerald-900`, dot `bg-emerald-600`
- Free / "Свободные места": `bg-amber-100 text-amber-900`, dot `bg-amber-600`

### 1.2 Typography

Two fonts, loaded in `layout.tsx` via `next/font/google`, subset `latin` +
`cyrillic`:

- **LINE Seed JP** → `--font-line`, exposed as `font-sans` (the default body
  font). Weights `400`, `700`, `800`. Used for everything structural.
- **IBM Plex Mono** → `--font-mono`, exposed as `font-mono`. Weights `400`,
  `500`. Used **only** for typewriter overlays (the "diary"/diegetic text typed
  over images and the author's mission).

**Fluid type scale** (clamps interpolating 320px→1280px viewport, defined in
`globals.css` under `@theme inline`). Always prefer these over fixed `text-*`
sizes for content:

| Utility | Range | Typical use |
|---|---|---|
| `text-fluid-xs` | 12 → 12.5px | Typewriter overlays, fine print |
| `text-fluid-sm` | 13 → 14px | Body copy, captions, chips, nav, meta |
| `text-fluid-base` | 15 → 16px | Default body size (set on `body`) |
| `text-fluid-lg` | 16 → 18px | Footer brand name; sub-headings |
| `text-fluid-2xl` | 21 → 24px | Intro lead, mobile menu links, teacher names |
| `text-fluid-3xl` | 24 → 30px | Stat numbers, mid-section headings (testimonials/teachers/FAQ/presentation) |
| `text-fluid-4xl` | 28 → 36px | Section `<h2>` / course titles |
| `text-fluid-hero` | 28 → 40px | Hero `<h1>` only |

**Fixed pixel sizes still in use** (do not convert to fluid):

- `text-[14px]` — every nav link, button, CTA label (consistency over fluidity)
- `text-[13px]` — mega-menu hint ("Узнать больше →"), mobile course meta
- `text-[12px]` — frosted meta-pill labels over images (mega-menu / teacher badge)
- `text-[15px]` — mobile menu CTA

**Type treatment conventions:**

- Headings carry no weight utility by default (LINE Seed renders at 400) — they
  read large but light. Add `font-bold` only for sub-labels (`<h3>`/`<h4>` in
  feature/point lists), emphasis copy, hero/section banner heads (presentation
  card title), and the hero `<h1>`.
- Big headings: `leading-tight`; hero: `leading-[0.986]`; tight sub-heads:
  `leading-[1.08]`; large display numbers: `leading-none`.
- Negative tracking on large display text: `tracking-[-0.02em]` (hero, stats,
  banner titles over images).
- Wide tracking for tags / strapline: `tracking-[0.15em] uppercase`.
- Numbers: `tabular-nums` (counters, dates, week numbers), `whitespace-nowrap`
  on stat figures.
- Body copy: `leading-relaxed` or `leading-snug`; muted via `/65`–`/70`.
- Sentence-casing helper: source data is often ALL-CAPS; both `page.tsx`s define
  a RU-aware `toSentence()` that lowercases then capitalizes the first letter —
  reuse this verbatim, don't restyle in CSS.

### 1.3 Spacing, sizing & radii

- **Content max width: `max-w-[1160px]`**, centered `mx-auto`, with `px-6`
  gutters. This is the master container — every full-width section reuses it.
  Both the home and the narrative page use the same inner shell:
  ```jsx
  <div className="relative mx-auto flex max-w-[1160px] flex-col gap-20 px-6 pt-16">
  ```
- Prose measure: `max-w-3xl` (intro lead, hero headline, narrative hero
  headline); presentation title `max-w-2xl`, subtext `max-w-xl`.
- Section vertical rhythm: `py-16 md:py-28` for breathing "intro" sections;
  cells use `p-6 md:p-8` or `p-6 md:p-10`; large card halves `p-8 md:p-12`; the
  **pricing section uses `p-6 md:p-14`** on both halves so the price block reads
  heavier than other sections.
- **Vertical-gap convention inside sections** (e.g. pricing): two-child stacks
  use `gap-14` (56px) when you want the title + perks (or price + benefits) to
  breathe; smaller groups use `gap-3` / `gap-5` / `gap-6` / `gap-8`.
- **Radii vocabulary** (consistent, rounded but not pill-everything):
  - `rounded-lg` — small icon chips, logo tiles, inner image thumbs, FAQ-row icon-button shape
  - `rounded-xl` — buttons, nav bar, CTA, menu cards
  - `rounded-2xl` — mega-menu panel
  - `rounded-full` — pills/chips (labels, status), circular icon buttons, logo badge, nav hover dot, parts switch in pricing
- **Icon button sizes:** `size-9`/`size-10` (social/nav arrows, pricing parts
  switch), `size-14` (logo badge, hamburger, CTA height), `size-7` (inline
  arrow affordance inside buttons), `size-12` (footer logo badge).
- Icons: **lucide-react**, `strokeWidth={2.25}` for arrows/chevrons; `strokeWidth={2}` for `HelpCircle` (FAQ), `CreditCard` / `Gift` / `ThumbsUp` (pricing perks). `Check` uses `strokeWidth={2.5}`. Inside small icon tiles use `size-4`; the secondary CTA's `Play` is `size-3` filled (`fill="currentColor"`, `translate-x-[1px]` for optical centering). Custom inline SVG chevron/arrow also use `stroke-width 2.25`, round caps/joins.

---

## 2. The grid & line system (the signature look)

This is the most distinctive element. Treat the page as a **drafting grid.**

### 2.1 Column guides

Faint vertical hairlines mark the content edges and centerline, running the full
height of `<main>` behind content:

```jsx
<div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1160px] text-black/[0.12]">
  <span className="absolute inset-y-0 left-0 w-[0.5px] bg-current" />
  <span className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 w-[0.5px] bg-current md:block" />
  <span className="absolute inset-y-0 right-0 w-[0.5px] bg-current" />
</div>
```

Over imagery the same guides switch to `text-white/40`–`/55`. The centerline is
`md:`-only (hidden on mobile). Lines are `0.5px` (`w-[0.5px]`/`h-[0.5px]`).

**Masking the column guides through opaque sections.** Sections that render a
solid white panel (testimonials, teachers, program calendar, FAQ, cross-sell)
sit at `z-20` so the `z-10` column guide doesn't show through them. The
canonical wrapper is `relative z-20 bg-white` (sometimes on the outer `<section>`
itself, sometimes on the inner bordered `<div>`). When you build a section that
contains its own internal grid, opt into this — otherwise the middle vertical
line bleeds through the panel.

### 2.2 Section framing with hairlines

Sections are bordered boxes that bleed to the container edges and stitch
together with shared rules:

- Edge-bleed a section out of the `px-6` column with **`-mx-6`**, then border it
  with `border-y` / `border-x` / `border-b` `border-black/10`.
- Stack sections so borders overlap by pulling each up with **`-mt-20`** (the
  parent flex gap is `gap-20`; `-mt-20` collapses it so adjacent section rules
  sit flush). Apply `-mt-20` to **every** section after the first inside the
  inner flex column — otherwise an 80-px green gap is visible (the flex gap),
  which is the wrong default.
- Internal cell dividers: `divide-y divide-black/10`, or per-cell
  `border-t`/`border-r`/`border-l border-black/10` with `[&:first-child]`,
  `[&:nth-child(...)]` selectors to suppress edge borders.
- Two-column section pattern: `grid md:grid-cols-2` with a center divider
  (`md:border-r border-black/10`). Right half often subdivides into
  `grid sm:grid-cols-2`.
- **Sticky title in a two-column section:** wrap the left column's content in
  `md:sticky md:top-24` so the title stays in view while the right column
  scrolls (used by results, pricing, cross-sell title).

### 2.3 Composition armatures (drawn over images)

Every image block carries an `aria-hidden` SVG overlay of classical composition
lines in `text-white/55`–`/70` (`vectorEffect="non-scaling-stroke"`,
`stroke-width` ~0.5–1.2). These are decorative and rotate by context:

- Home hero: two large `ellipse` arcs + the white column guides.
- Course hero (`NarrativeHero.tsx`): horizontally-flipped golden-ratio
  / Fibonacci spiral, matching `CourseCard` index 0.
- Course cards (`CourseCard.tsx`), keyed by `index`:
  - `index 0` (narrative): **golden-ratio / Fibonacci spiral** (φ subdivisions + arc), horizontally flipped.
  - `index 1` (game design): **one-point perspective grid** (horizon + receding lines + rays from a vanishing point).
  - `index 2` (consultations): **golden-triangle armature** (diagonals + perpendiculars + vertical golden line), horizontally flipped.
- Divider band (poppy meadow on the home page; program divider on the narrative page): **rule-of-thirds** (2 horizontal + 2 vertical lines).

When adding new image sections, give them a composition overlay in the same
style to stay on-brand.

---

## 3. Components & patterns

### 3.1 Buttons & CTAs

Four established button styles — reuse exactly:

1. **Primary dark CTA** (course cards, pricing "Купить курс целиком"): black
   pill-rect with an inset white glow and a white arrow tile that nudges right
   on hover.
   ```jsx
   <a className="group inline-flex items-center gap-2.5 self-start rounded-xl bg-black py-2 pl-4 pr-2 text-[14px] text-white shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.4)]">
     <span>Узнать подробнее</span>
     <span className="grid size-7 place-items-center rounded-lg bg-white text-black shadow-[inset_0_0_2px_1px_rgba(0,0,0,0.25)] transition-transform group-hover:translate-x-0.5">
       <ArrowRight className="size-4" strokeWidth={2.25} />
     </span>
   </a>
   ```
   When the course has a `course.href`, render this as a `next/link` instead of an `<a>` (see [`CourseCard.tsx`](src/components/CourseCard.tsx)).
2. **Brand CTA** (header "Хочу обучаться"): `bg-brand-orange/90 backdrop-blur-md
   text-black font-medium hover:bg-brand-orange`, `h-14 px-7 rounded-xl`.
3. **Frosted primary CTA** (hero / narrative hero / presentation card / program
   section "Забронировать место"): `bg-white/80 backdrop-blur-md text-black
   hover:bg-white`, with a `bg-white` arrow tile in `text-brand-orange`. Arrow
   nudges **down** (`group-hover:translate-y-0.5`) for "scroll-into" CTAs and
   **right** (`group-hover:translate-x-0.5`) for "go-somewhere" CTAs.
   The program-section variant uses `bg-brand-orange hover:bg-brand-orange/90`
   instead of frosted white, on top of a hatched stripe band.
4. **Frosted secondary CTA** (presentation card → YouTube): same pill shape, but
   `border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20`,
   keeping the white arrow tile in `text-brand-orange`.

**Neutral icon button** (carousel/program nav, pricing parts switch): `size-9`
or `size-10`, `rounded-full border border-black/15 hover:bg-black/[0.04]
disabled:opacity-25`.

**Outline secondary** (FAQ accordion does **not** use one; the section header
itself is just a bordered band — see §3.7).

Button text is `text-[14px]` (fixed, not fluid) for nav/CTA consistency.

### 3.2 Pills & chips

- **Outline label pill:** `rounded-full border border-black/15 px-4 py-2.5
  text-fluid-sm` — section eyebrows ("Об авторе", "Работала в студиях"), course
  `kind` and `startDate`.
- **Status pill:** `rounded-full px-4 py-2.5 text-fluid-sm` + emerald/amber
  fill + a `size-2 rounded-full` status dot (see §1.1).
- **Soft tag:** `rounded-lg bg-black/[0.04] px-4 py-2 text-fluid-sm
  text-black/55` — studio name tags.
- **Pricing parts switch buttons:** `grid size-9 place-items-center
  rounded-full text-fluid-sm tabular-nums` — selected: `bg-foreground text-white`;
  unselected: `border border-black/15 hover:bg-black/[0.04]`.
- **Frosted meta-pill over imagery:** `rounded-full bg-white/95 px-4 py-1.5
  text-[12px] font-medium text-foreground shadow-sm backdrop-blur` (mega-menu
  thumbs, teacher card badge).

### 3.3 Cards

- **Course card** (`CourseCard.tsx`): full-bleed two-column `<article>`, image
  half + text half, alternating left/right by `index % 2` (`md:order-*`). Image
  is always first in DOM so it stacks on top on mobile. Min heights `min-h-64`
  (mobile) / `md:min-h-full`. Hover wash on interactive cells is
  `hover:bg-brand-orange/10`. **The CTA uses `next/link` when `course.href` is
  set; otherwise it falls back to `<a href="#">`** — keep this branching so
  unlinked courses don't trigger client-side navigation. Reuse the same
  component on a course page's cross-sell (e.g. narrative page renders the
  homepage's "Гейм-дизайнеры" card via `<CourseCard course={crossSell} index={1} />`
  inside `<section className="-mx-6 -mt-20 border-y border-black/10 bg-white">`).
- **Mega-menu card** (`StickyHeader.tsx`): `rounded-xl p-3
  hover:bg-brand-orange/10`, a `16/10` image thumb (`rounded-lg`, hover
  `scale-105`) with a centered frosted meta pill, bold title, muted desc, and an
  orange "Узнать больше →" affordance whose arrow translates on hover. The
  narrative tile's `href` is `/courses/narrative` (live); the other two tiles
  are placeholders (`href: "#"`).
- **Teacher card** (`TeachersCarousel.tsx`): square portrait pinned to the
  bottom (`mt-auto aspect-square`), name + role on top in `p-6 md:p-10`,
  optional frosted badge at `bottom-4 left-4`. Three columns on `md+` separated
  by `md:border-r border-black/10` between siblings; stacks on mobile with
  `border-t border-black/10` between cards.
- **Presentation card** (narrative page): a single `relative aspect-[1160/360]
  -mx-6 -mt-20 border-y border-black/10` block with `<Image fill>` underneath
  and a centered (`absolute inset-0 flex items-center justify-center`) stack
  of title (`text-fluid-3xl font-bold text-white`), subtext (`text-fluid-sm
  text-white/85`), and the two pill CTAs. **No dark scrim** — text drops onto
  the image directly; no drop-shadows on the text.

### 3.4 Header / navigation (`StickyHeader.tsx`)

- `fixed top-0 inset-x-0 z-50`; inner uses the `max-w-[1160px] px-6 py-6`
  container.
- **Logo is a `next/link` to `/`** (`aria-label="GDD — на главную"`); its
  badge is a circular `size-14 rounded-full backdrop-blur-md` that solidifies
  on scroll. Add `logo-anim` so the SVG trembles on hover (`@keyframes
  tremble`, disabled under reduced motion).
- **Frosted glass that solidifies on scroll:** tracked via `useRafScroll` →
  `scrolled = scrollY > 40`. Unscrolled `bg-white/30 ring-white/40`; scrolled
  `bg-white/85 ring-black/5`. Applies to logo badge, nav bar, hamburger.
- Desktop nav is `hidden lg:flex`; nav links get an animated dot underline on
  hover. CTA pinned right (`ml-auto`).
- **Default home navLinks**:
  `Курсы` (mega-menu), `О школе → #about`, `Отзывы → #testimonials`,
  `Об авторе → #alla`, `Контакты → #alla`. The course page overrides these
  via the `navLinks` prop with its own section anchors
  (`Программа / Преподаватели / Стоимость / Отзывы / FAQ`).
- **Courses mega-menu:** hover-intent open/close with a 120ms close delay
  bridging the gap; an invisible `pt-7` hover bridge spans the 24px gap to the
  nav; closes on Escape; `aria-haspopup`/`aria-expanded`/`aria-controls` set.
  Panel: `rounded-2xl border border-black/10 bg-white p-3 shadow-xl`, 3-up grid.
- **Mobile (`<lg`):** hamburger toggles a full-screen overlay
  `bg-cream/95 backdrop-blur-xl`, links at `text-fluid-2xl` with `border-b
  border-black/10`, collapsible courses accordion (`grid-rows-[1fr]/[0fr]`
  transition), uses `data-lenis-prevent` so the overlay scrolls independently.

### 3.5 Footer (`Footer.tsx`)

- Full-bleed painterly night-field background (`/footer.png`, `fill object-cover`)
  with a top→bottom darkening scrim (`from-black/25 via-black/30 to-black/60`)
  for legibility. All text white/`white/70`/`white/55`.
- Same `max-w-[1160px] px-6` container, `py-16 md:py-24`, `gap-12`.
- Brand block (logo badge + name + tagline) left, nav links right; bottom row
  (white icon chips + copyright) separated by `border-t border-white/15 pt-8`.
- Social icon chips: `size-10 rounded-lg bg-white/90 hover:-translate-y-0.5
  hover:bg-white`. URLs come from `data/content.ts` (`socials` + the page
  `mailto:${contactEmail}`) — **never hard-code social URLs in components.**

### 3.6 Carousels

- **TestimonialsCarousel** (client component). 2-up on `md+`, 1-up below
  (`matchMedia`). Splits items into `perView` contiguous chunks; each slot
  translates horizontally (`translateX(-current*100%)`, `duration-500 ease-out`)
  inside a masked fixed-height viewport (`h-[22rem]`, overflow hidden so text
  hides behind the white padding). Header has heading + `current/total`
  `tabular-nums` counter + two circular nav arrows (disabled at ends,
  `disabled:opacity-25`). Outer wrapper applies the bordered card frame.
- **TeachersCarousel.** Despite the name, it's not a carousel — three cards
  laid out in a `md:grid-cols-3` and a header with the title only (no nav).
  Same `border-b border-black/10 px-6 py-5 md:px-10` header band as
  Testimonials and FAQ so the three sections share a single header rhythm.

### 3.7 FAQ accordion (`FaqAccordion.tsx`)

- One-open-at-a-time accordion. The outer wrapping section provides the
  bordered frame + header band ("Отвечаем на вопросы", `text-fluid-3xl`); the
  accordion itself is `divide-y divide-black/10` (no `border-y` of its own —
  removed so the seam against the section header is a single hairline).
- **Each row is laid out like a calendar cell**, not as an inline pill: a
  fixed-width icon column (`w-14 md:w-20`) with `border-r border-black/10`
  sits at the left edge of the row, full-height, with the `HelpCircle` icon
  centered. The question + chevron live in the middle/right columns. **When
  the row expands, the same divider column continues through the answer area**
  (an empty `w-14 md:w-20 border-r border-black/10` block precedes the answer
  text) so the vertical grid line is unbroken between question and answer.
- **Linkified answers.** `FaqAccordion` runs the answer string through a small
  `linkify()` pass that turns URLs (`https?://…`), emails (`foo@bar.tld`), and
  Telegram handles (`@username` at least 4 chars) into clickable links —
  Telegram handles become `https://t.me/handle`, emails become `mailto:…`,
  URLs open in a new tab. Links render as `text-brand-orange hover:underline`.
  Keep contact info in plain prose; the linkifier will pick it up.
- Empty answer placeholder: italic `"Текст скоро появится."` (`text-foreground/45`).

### 3.8 Pricing section (`PricingPanel.tsx` + page-level frame)

- Section: `-mx-6 -mt-20 grid scroll-mt-28 border-b border-black/10
  md:grid-cols-2 id="pricing"`. Left half = sticky title + perks list
  (`md:sticky md:top-24`, `gap-14` between heading and the three perks); right
  half = `<PricingPanel>` client component.
- Both halves are padded `p-6 md:p-14` so the pricing block reads
  visually heavy (the section is intentionally tall to slow down a scroller).
- `PricingPanel` shows the full price at `text-fluid-hero font-bold` by
  default; the "Рассчитать рассрочку" toggle reveals a switch row of
  `2–6` part buttons (see §3.2 parts-switch chip). When installments are on,
  the price re-renders as `${perMonth} × N {pluralizeParts(N)}` with the
  Russian noun declension helper. The collapsible uses the same
  `grid-rows-[0fr→1fr]` trick as `FaqAccordion`.
- Benefits list sits `mt-14` below the price block (matching the left-column
  `gap-14`); CTAs (`mt-8`) are primary dark + outlined secondary.
- Perk rows on the left mix a lucide icon with a copy line: `CreditCard`
  (`pricing.note`), `Gift` (`pricing.perk`), `ThumbsUp` ("Рекомендация в
  LinkedIn"). Icons are `mt-0.5 size-5 shrink-0 text-brand-orange
  strokeWidth={2}`.

### 3.9 Program section (`ProgramSection.tsx` + `ScheduleCalendar.tsx`)

- Two-sibling Fragment under the page's flex column:
  1. **Divider** — `-mx-6 -mt-20 aspect-[3168/470]` poppy-meadow banner with
     mouse parallax, rule-of-thirds armature, the centered title
     ("Программа курса"), and frosted glass `size-10 rounded-full` prev/next
     arrows pinned to the left/right edges (`md:px-10`).
  2. **`<section id="program" className="relative z-20 -mt-20 flex
     scroll-mt-28 flex-col bg-white">`** — calendar + CTA. The `relative z-20
     bg-white` is what masks the column guide through the calendar grid.
- The hatched CTA band under the calendar uses
  `bg-[repeating-linear-gradient(45deg,transparent_0_10px,rgba(0,0,0,0.08)_10px_11px)]`.
  The orange CTA sits on top with `href="#pricing"` (the section uses
  hash-anchor smooth scroll, see §4).
- A `fixed top-24 md:top-28` **sticky control bar** fades in once the divider
  scrolls past the top (`useRafScroll` watches the section's bounding rect),
  carrying the same prev/next arrows + `page/total` counter so users can paginate
  the schedule while reading further down.
- `ScheduleCalendar.tsx` renders a `grid grid-cols-5` schedule
  (`Неделя | Пн | Ср | Пт | Задания`). Every internal rule is `border-black/10`
  hairline. **Icon tiles in the day/tasks cells are pinned to the cell's
  top-left corner** with `border-b border-r border-black/10` — their own
  edges *are* the grid lines, so the icon reads as part of the schedule grid
  rather than a separate chip. **The FAQ icon column mirrors this pattern** —
  read both together to keep the "icon edges are grid lines" idea consistent.
- Pagination: `SCHEDULE_PAGE_SIZE = 3`, computed `SCHEDULE_PAGE_COUNT` derived
  from `programWeeks` length.

### 3.10 Course-page video lecture (`VideoLecture`)

- Replaces the old presentation card. A captioned, ready-to-play YouTube embed
  framed like the other full-content-width sections (bordered header + 16:9
  embed). Data in `content/<course>.json → videoLecture` (`{title, url}`),
  editable in Pages CMS. Layout:
  ```
  <section> -mx-6 border-x border-b border-black/10
    <div border-b> <h2 text-fluid-3xl>title</h2>
    <div p-6 md:p-10>
      <div aspect-video rounded-xl overflow-hidden bg-black>
        <iframe youtube-nocookie.com/embed/{id}?rel=0 loading="lazy" />
  ```
- `url` accepts any common YouTube link (watch/youtu.be/embed/shorts/live) or a
  bare 11-char id — `youTubeId()` normalises it, so the client can paste a
  normal link in the CMS.

### 3.11 Course-page books block (`TeacherBooks`)

- Dedicated "Книги преподавателя" section (game-design). Each of a teacher's
  `books` (`{cover, title, note}` in `content/game-design.json`, editable in
  CMS) renders as a large upright cover with a spine highlight beside a bold
  title + author line — so titles stay legible. Replaces the old cramped
  book-fan overlay that used to sit on the portrait.

---

## 4. Motion & interaction

All motion respects **`prefers-reduced-motion`** (via `usePrefersReducedMotion`
hook and `@media (prefers-reduced-motion: reduce)` CSS). Reuse the existing
primitives rather than writing new scroll/animation code:

| Primitive | File | Behavior | Key props |
|---|---|---|---|
| `SmoothScroll` | `SmoothScroll.tsx` | Lenis smooth scrolling on the document root + hash-anchor click interception | — |
| `Parallax` | `Parallax.tsx` | Vertical scroll parallax, `translateY = scrollY * speed` | `speed` (±, e.g. `0.18`, `-0.08`, `0.12`) |
| `MouseParallax` | `MouseParallax.tsx` | Eased cursor-tilt translate; measured against nearest `data-mouse-parallax-root`; skipped on touch | `strength` (px at edges, 4–22) |
| `ScrollWords` | `ScrollWords.tsx` | Word-by-word opacity reveal tied to scroll (85vh→25vh), `dim`→1.0 | `text`, `dim` (0.18) |
| `Typewriter` | `Typewriter.tsx` | Types/holds/deletes through `texts`, starts on in-view; `font-mono` | `texts`, `typeSpeed`, `deleteSpeed`, `holdMs`, `startDelay`, `loop` |
| `Marquee` | `Marquee.tsx` | Seamless ticker (2 copies, `-50%` translate, `animate-marquee` 80s linear) | `items`, `renderItem`, `repeat` |
| `Countdown` | `Countdown.tsx` | `ДД:ЧЧ:ММ:СС` countdown to `targetISO` with `tabular-nums`; renders a stable zero on the server to avoid hydration mismatch | `targetISO` |
| `ClickSpark` | `ClickSpark.jsx` | Orange spark burst on click (wraps app) | `sparkColor="#fe6911"`, `sparkSize`, `sparkRadius`, `sparkCount`, `duration` |

**Hooks:** `useRafScroll` (rAF-throttled passive scroll, optional `resize`
listener), `useInViewOnce` (IntersectionObserver, fires once),
`usePrefersReducedMotion`.

**To use `MouseParallax`/`Parallax`:** put `data-mouse-parallax-root` on the
bounding element; give the moving layer extra bleed (e.g. `absolute -inset-2`
/ `-inset-3`) so the drift never exposes an edge.

**Hash-anchor smooth scrolling.** `SmoothScroll` attaches a document-level
click handler that intercepts same-page `a[href*="#"]` clicks, calls
`event.preventDefault()`, and routes the jump through `lenis.scrollTo(target,
{ offset: -112, duration: 1.2 })`. The `-112` matches `scroll-mt-28`
(28×4 = 112px) — keep `scroll-mt-28` on every section that's a hash target so
the sticky header doesn't cover the heading. Modified clicks (⌘/Ctrl/Shift/Alt
+ click) are passed through so "open in new tab" still works. Cross-page hash
links (different pathname) are passed through too. Lenis must be initialized
before the click — if it isn't, the handler returns early and the browser does
its instant jump.

**Standard transitions:** `transition`/`transition-colors duration-200`
(hovers), `duration-300` (chevron rotate, image scale, menu reveal),
`duration-500 ease-out` (carousel slide). Hover lifts are
`hover:-translate-y-0.5`; arrow nudges `translate-x-0.5` /
`translate-y-0.5`.

**Cursor policy** (`globals.css`): default arrow cursor **everywhere** (`* {
cursor: default }`); only real links/buttons/labels/summary get `pointer`; only
inputs/textarea/contenteditable get `text`.

---

## 5. Pages

### 5.1 Home (`src/app/page.tsx`)

Shell:
```jsx
<>
  <StickyHeader />
  <Hero />
  <main className="relative bg-white text-foreground">
    {/* column guides absolute inset-0 z-10 */}
    <div className="relative max-w-[1160px] mx-auto px-6 pt-16 flex flex-col gap-20">
      {/* intro lead → courses → studios marquee → about → divider → testimonials → alla */}
    </div>
  </main>
  <Footer />
</>
```

- **Courses section** (`id="courses"`, `scroll-mt-28`) renders all
  `courses` through `CourseCard`. The hero CTA scrolls here via `#courses`.
- The home `Hero` button is now an `<a href="#courses">` (frosted CTA pattern
  with the down-arrow tile).

### 5.2 Narrative course (`src/app/courses/narrative/page.tsx`)

Shell:
```jsx
<>
  <StickyHeader navLinks={courseNavLinks} />
  <NarrativeHero />
  <main className="relative bg-white text-foreground">
    {/* column guides absolute inset-0 z-10 */}
    <div className="relative mx-auto flex max-w-[1160px] flex-col gap-20 px-6 pt-16">
      {/* intro lead → studios marquee → results → program → teachers → pricing → testimonials → presentation → faq → cross-sell */}
    </div>
  </main>
  <Footer />
</>
```

- **Course-specific nav** is passed to `StickyHeader` via `navLinks`:
  `Курсы` (mega-menu), `Программа → #program`, `Преподаватели → #teachers`,
  `Стоимость → #pricing`, `Отзывы → #testimonials`, `FAQ → #faq`.
- **Hash targets** (every one carries `scroll-mt-28`): `#program`,
  `#teachers`, `#pricing`, `#testimonials`, `#faq`. The hero CTA scrolls to
  `#pricing` via Lenis hash interception.
- **All non-first sections under the inner flex column carry `-mt-20`** so the
  flex gap collapses against the previous border. The presentation card
  ([§3.10]) and FAQ card and cross-sell follow this rule; do not introduce a
  section without it.
- **Cross-sell at the bottom** reuses `<CourseCard course={crossSell}
  index={1} />` so the narrative page's "Гейм-дизайнеры" tile is byte-equal to
  the homepage's. No `<div className="h-20" />` filler before the footer.

### 5.3 Conventions for a new page

1. Keep `StickyHeader` + `Footer` and the `<main>` shell from §5.1 / §5.2.
2. Build sections as `-mx-6` edge-bleed boxes bordered with `border-black/10`,
   chained with `-mt-20` so rules sit flush (§2.2). For any section that
   renders a solid panel, give it (or its inner card) `relative z-20 bg-white`
   so the column-guide center line doesn't bleed through (§2.1).
3. Use the fluid type scale (§1.2), opacity-based tones (§1.1), the radii
   vocabulary (§1.3), and the established button/pill/chip patterns
   (§3.1–3.2).
4. Give any image block a `data-mouse-parallax-root`, a `MouseParallax` layer
   with edge bleed, and an `aria-hidden` composition-armature SVG (§2.3).
5. Add an anchor `id` + `scroll-mt-28` to any section the nav links to.
6. Reuse motion primitives (§4); never add motion without a reduced-motion
   path. Anchor clicks are auto-smooth via Lenis — don't roll your own
   `scrollIntoView`.
7. Keep all copy in Russian; move new copy into `src/data/content.ts` (shared)
   or `src/data/narrative.ts` (course-specific) rather than hard-coding it in
   markup.
8. Social URLs + email come from `data/content.ts → socials` and `contactEmail`.
   `Footer` already wires this; replicate the pattern anywhere else you render
   contact links (e.g. inline contact rows on a course page).

---

## 6. Data conventions

- **`src/data/content.ts`** — shared site content: `Course[]` (including
  optional `href` for linked courses), `features`, `testimonials`,
  `studioLogos`, `socials`, `contactEmail`, `marqueeItems` (derived).
  `Course.href` is read by `CourseCard`; courses without an `href` render an
  inert `<a href="#">` CTA (intentional placeholder).
- **`src/data/narrative.ts`** — narrative-course content: `narrativeHero`,
  `narrativeIntro`, `resultsHeading`, `programWeeks` (+ derived
  `programTotalWeeks`), `teachers`, `pricing` (with `priceValue`,
  `installments`, perk copy, `installmentCtaLabel`), `faq` (questions +
  answers; FAQ entries with handles/emails/URLs in the answer are auto-linked
  by `FaqAccordion`), `presentation` (`title`, `subtext`, `cta` + `url`,
  `videoCta` + `videoUrl`), `banner` (used for the FAQ contact answer's
  inline copy).
- **Image assets** live under `/public`. Course imagery is referenced by
  Course `image` strings (`/img/narrators.png` etc.); teacher photos use
  bare-`/`-rooted PNGs (`/eugene.png`, `/alex.png`, `/alla-2.png`); the
  narrative-page banner is `/narrative_hero.png`; the program-section
  poppy-meadow divider is `/programm.png`; the presentation card uses
  `/presentation.png`.

---

## 7. Constraints & conventions

- **No dark mode** — light theme only.
- **Single accent** — `brand-orange` is the *only* decorative color; everything
  else is black/white/foreground at an alpha (plus emerald/amber strictly for
  status).
- **Hairlines, not shadows** — structure comes from `border-black/10` rules
  and the column grid, not drop shadows. Shadows appear only on floating glass
  (`shadow-xl` mega-menu, `shadow-sm` small chips) and inset button glows.
  **Text never carries a drop-shadow**, even over imagery — pick imagery /
  font-weight that holds its own.
- **Next.js (modified build)** — per `AGENTS.md`, this is **not** stock
  Next.js; APIs/conventions may differ from training data. **Read the relevant
  guide in `node_modules/next/dist/docs/` before writing routing/data/config
  code**, and heed deprecation notices.
- **Internal links are `next/link`** (header logo, course-card CTA when
  `href` is set). External / hash-only / unlinked-placeholder anchors stay
  as plain `<a>`.
- Always use `next/image` (`<Image>`) with explicit `width`/`height` or
  `fill` + `sizes`; decorative images get `alt="" aria-hidden`. Hero
  backgrounds use `unoptimized` to keep the painterly source crisp.
- Tailwind v4 (`@import "tailwindcss"`, `@theme inline` tokens) — extend
  tokens in `globals.css`, don't add a `tailwind.config`.

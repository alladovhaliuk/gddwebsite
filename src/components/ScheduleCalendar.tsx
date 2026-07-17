import { Video, FileText } from "lucide-react";
import type { ProgramWeek } from "@/data/types";

/**
 * Schedule grid for any course. The page-level wrapper passes the full
 * `weeks` array and the `totalWeeks` count via props; pagination state lives
 * in the parent ProgramSection so the divider above can host the arrow
 * controls. Each page renders SCHEDULE_PAGE_SIZE weeks (3).
 *
 * Desktop layout (md+): [Неделя | ПН | СР | ПТ | Задания] — week title left,
 * day topics middle, week's homework right. Full-bleed (-mx-6) so the
 * calendar's left and right edges sit on the page column guides; every
 * internal rule is the site's `border-black/10` hairline.
 *
 * Mobile layout (<md): each week renders as a stacked card — title block on
 * top, three day rows in the middle, tasks block at the bottom — so the same
 * information stays scannable without horizontal scrolling.
 */

const DAY_HEADERS = ["Пн", "Ср", "Пт"] as const;
export const SCHEDULE_PAGE_SIZE = 3;
export const schedulePageCount = (totalWeeks: number) =>
  Math.ceil(totalWeeks / SCHEDULE_PAGE_SIZE);

// Schedule copy is authored lowercase, so lift the first letter only — terms
// further in ("twine", "SDT", "Interactive Fiction") keep their own casing.
const capitalize = (s: string) =>
  s.replace(/\p{L}/u, (ch) => ch.toLocaleUpperCase("ru"));

function getDayTopic(week: ProgramWeek | undefined, dayHeader: string) {
  // ProgramWeek day labels are uppercase ("ПН"/"СР"/"ПТ"); headers are "Пн"/etc.
  const text = week?.days.find((d) => d.day === dayHeader.toUpperCase())?.text;
  return text && capitalize(text);
}

function mergedTasks(week: ProgramWeek | undefined) {
  const tasks = week?.tasks ?? [];
  const docs = tasks.filter((t) => t.kind === "doc");
  const proto = tasks.find((t) => t.kind === "proto");
  const call = tasks.find((t) => t.kind === "call");
  const merged: { kind: "doc" | "call"; text: string }[] = [];
  if (docs.length > 0 && proto) {
    // Combine the first doc with the prototyping line; any extra docs render
    // as their own list items below.
    merged.push({
      kind: "doc",
      text: `${docs[0].text} и прототипирование в twine`,
    });
    for (const d of docs.slice(1)) merged.push({ kind: "doc", text: d.text });
  } else if (docs.length > 0) {
    for (const d of docs) merged.push({ kind: "doc", text: d.text });
  } else if (proto) {
    merged.push({ kind: "doc", text: proto.text });
  }
  if (call) merged.push({ kind: "call", text: call.text });
  return merged.map((t) => ({ ...t, text: capitalize(t.text) }));
}

export default function ScheduleCalendar({
  page,
  weeks: allWeeks,
  totalWeeks,
}: {
  page: number;
  weeks: ProgramWeek[];
  totalWeeks: number;
}) {
  const getWeek = (idx: number) => allWeeks.find((w) => w.index === idx);
  const startWeek = page * SCHEDULE_PAGE_SIZE + 1;
  const weeks = Array.from(
    { length: SCHEDULE_PAGE_SIZE },
    (_, i) => startWeek + i
  ).filter((w) => w <= totalWeeks);

  return (
    <div className="-mx-6 border-y border-black/10">
      {/* ── Desktop (md+) — five-column calendar grid ───────────────── */}
      <div className="hidden md:block">
        {/* Column headers */}
        <div className="grid grid-cols-5 border-b border-black/10 text-fluid-xs uppercase tracking-[0.15em] text-foreground/55">
          <div className="border-r border-black/10 px-4 py-2 md:px-5">
            Неделя
          </div>
          {DAY_HEADERS.map((h) => (
            <div
              key={h}
              className="border-r border-black/10 px-3 py-2 text-center"
            >
              {h}
            </div>
          ))}
          <div className="px-4 py-2 md:px-5">Задания</div>
        </div>

        {/* Rows: title + 3 day cells + tasks */}
        <div className="grid grid-cols-5">
          {weeks.flatMap((weekIdx, rIdx) => {
            const week = getWeek(weekIdx);
            const title = week?.title?.replace(/^«/, "").replace(/»$/, "");
            const merged = mergedTasks(week);
            const isLastRow = rIdx === weeks.length - 1;

            return [
              // Title cell (leftmost) — number top, title pinned to bottom
              <div
                key={`${weekIdx}-title`}
                className={`flex flex-col justify-between gap-6 border-r border-black/10 bg-cream/40 p-4 md:p-5 ${
                  isLastRow ? "" : "border-b border-black/10"
                }`}
              >
                <span className="text-fluid-3xl tabular-nums leading-none text-foreground/30">
                  {weekIdx}
                </span>
                <p
                  className={`text-fluid-2xl leading-snug ${
                    title ? "text-foreground" : "italic text-foreground/45"
                  }`}
                >
                  {title ?? "Скоро"}
                </p>
              </div>,
              // Day cells (ПН/СР/ПТ)
              ...DAY_HEADERS.map((dayHeader) => {
                const topic = getDayTopic(week, dayHeader);
                return (
                  <div
                    key={`${weekIdx}-${dayHeader}`}
                    className={`relative flex min-h-64 flex-col justify-end border-r border-black/10 bg-white p-4 md:p-5 ${
                      isLastRow ? "" : "border-b border-black/10"
                    }`}
                  >
                    {/* Icon tile pinned to the top-left corner — its top+left
                        sides are the cell's own grid lines, so it reads as part
                        of the calendar grid. */}
                    <span className="absolute left-0 top-0 grid size-10 place-items-center border-b border-r border-black/10 bg-white text-brand-orange">
                      <Video className="size-4" strokeWidth={2.25} />
                    </span>
                    <p
                      className={`text-fluid-sm leading-snug ${
                        topic ? "text-foreground" : "italic text-foreground/45"
                      }`}
                    >
                      {topic ?? "Скоро"}
                    </p>
                  </div>
                );
              }),
              // Tasks cell (rightmost) — homework (doc + proto merged) + call.
              <div
                key={`${weekIdx}-tasks`}
                className={`relative flex min-h-64 flex-col justify-end bg-white p-4 md:p-5 ${
                  isLastRow ? "" : "border-b border-black/10"
                }`}
              >
                <span className="absolute left-0 top-0 grid size-10 place-items-center border-b border-r border-black/10 bg-white text-brand-orange">
                  <FileText className="size-4" strokeWidth={2.25} />
                </span>

                {merged.length ? (
                  <ul className="flex flex-col divide-y divide-black/10">
                    {merged.map((t) => (
                      <li
                        key={t.text}
                        className="py-3 text-fluid-sm leading-snug text-foreground first:pt-0 last:pb-0"
                      >
                        {t.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-fluid-sm italic leading-snug text-foreground/45">
                    Скоро
                  </p>
                )}
              </div>,
            ];
          })}
        </div>
      </div>

      {/* ── Mobile (<md) — stacked per-week cards ───────────────────── */}
      <div className="flex flex-col divide-y divide-black/10 md:hidden">
        {weeks.map((weekIdx) => {
          const week = getWeek(weekIdx);
          const title = week?.title?.replace(/^«/, "").replace(/»$/, "");
          const merged = mergedTasks(week);

          return (
            <article key={weekIdx} className="bg-white">
              {/* Week header — title on the left, number on the right, on the
                  cream stripe so the shared visual language with the desktop
                  grid stays. */}
              <div className="flex items-baseline justify-between gap-4 bg-cream/40 px-4 py-4">
                <p
                  className={`flex-1 text-fluid-2xl leading-snug ${
                    title ? "text-foreground" : "italic text-foreground/45"
                  }`}
                >
                  {title ?? "Скоро"}
                </p>
                <span className="text-fluid-3xl tabular-nums leading-none text-foreground/30">
                  {weekIdx}
                </span>
              </div>

              {/* Day rows — same icon-edge-as-grid-line pattern as desktop:
                  the icon column has a right border that doubles as a
                  vertical grid line through the card. */}
              <ul className="divide-y divide-black/10 border-t border-black/10">
                {DAY_HEADERS.map((dayHeader) => {
                  const topic = getDayTopic(week, dayHeader);
                  return (
                    <li key={dayHeader} className="flex items-stretch">
                      <span className="grid w-14 shrink-0 place-items-center border-r border-black/10 text-brand-orange">
                        <Video className="size-4" strokeWidth={2.25} />
                      </span>
                      <div className="flex-1 px-4 py-4">
                        <p className="mb-2 text-fluid-xs uppercase tracking-[0.15em] text-foreground/55">
                          {dayHeader}
                        </p>
                        <p
                          className={`text-fluid-sm leading-snug ${
                            topic
                              ? "text-foreground"
                              : "italic text-foreground/45"
                          }`}
                        >
                          {topic ?? "Скоро"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Tasks row */}
              <div className="flex items-stretch border-t border-black/10">
                <span className="grid w-14 shrink-0 place-items-center border-r border-black/10 text-brand-orange">
                  <FileText className="size-4" strokeWidth={2.25} />
                </span>
                <div className="flex-1 px-4 py-4">
                  <p className="mb-2 text-fluid-xs uppercase tracking-[0.15em] text-foreground/55">
                    Задания
                  </p>
                  {merged.length ? (
                    <ul className="flex flex-col divide-y divide-black/10">
                      {merged.map((t) => (
                        <li
                          key={t.text}
                          className="py-2 text-fluid-sm leading-snug text-foreground first:pt-0 last:pb-0"
                        >
                          {t.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-fluid-sm italic leading-snug text-foreground/45">
                      Скоро
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

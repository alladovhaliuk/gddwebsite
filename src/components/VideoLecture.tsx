/**
 * Embedded video lecture — a captioned, ready-to-play YouTube player framed
 * like the other full-content-width sections (bordered header + 16:9 embed).
 *
 * `url` accepts any common YouTube link (watch?v=, youtu.be/, embed/, shorts/)
 * or a bare 11-character video id, so the client can paste a normal link in
 * the CMS.
 */
function youTubeId(url: string): string {
  const m = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : url.trim();
}

export default function VideoLecture({
  title,
  url,
  id,
}: {
  title: string;
  url: string;
  id?: string;
}) {
  const videoId = youTubeId(url);
  return (
    <section
      id={id}
      className="relative z-20 -mx-6 scroll-mt-28 border-x border-b border-black/10 bg-white"
    >
      <div className="flex items-center gap-4 border-b border-black/10 px-6 py-5 md:px-10">
        <h2 className="text-fluid-3xl leading-tight text-foreground">{title}</h2>
      </div>
      <div className="p-6 md:p-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

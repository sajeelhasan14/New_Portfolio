import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/portfolio";

/**
 * Selected work.
 *
 * Each card is `position: sticky`, so they stack on top of one another as you
 * scroll. ScrollFx scales and dims whichever card is being covered, which is
 * what sells the depth — without it they'd just pile up flat.
 */
export function Work() {
  return (
    <section
      id="work"
      className="gutter relative -mt-px rounded-t-[clamp(28px,4vw,56px)] bg-bg pt-[clamp(60px,7vw,120px)]"
    >
      <div className="mb-[clamp(28px,3vw,52px)] flex flex-wrap items-baseline justify-between gap-6">
        <span className="eyebrow">(03) Selected work</span>
        <h2 className="m-0 text-[clamp(28px,4vw,58px)] leading-[1.05] font-medium tracking-[-0.035em]">
          Featured projects
        </h2>
        <Link
          href="/projects"
          className="border-b border-brand/34 pb-1 font-mono text-[11px] tracking-[0.18em] text-brand transition-colors hover:text-fg"
        >
          BROWSE ALL ({String(PROJECTS.length).padStart(2, "0")})
        </Link>
      </div>

      <div className="relative">
        {FEATURED_PROJECTS.map((project, i) => (
          <article
            key={project.slug}
            data-fx="card"
            className="sticky top-[110px] mb-9 overflow-hidden rounded-[26px] border border-ink/10 bg-surface"
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))]">
              <div className="relative aspect-video overflow-hidden bg-surface-2">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(237,239,240,0.055)_0_2px,transparent_2px_13px)]"
                />
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    // Fills the frame edge to edge, no letterboxing. The
                    // stored sheets are wider than 16:9, so this trims their
                    // left and right edges — export shots at 16:9 to avoid it.
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-dim">
                      {project.title.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-5.5 p-[clamp(26px,3.2vw,52px)]">
                <div className="flex justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-dim">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="m-0 text-[clamp(28px,3.6vw,52px)] leading-none font-medium tracking-[-0.035em]">
                  {project.title}
                </h3>

                <p className="m-0 max-w-[46ch] text-base leading-[1.6] text-pretty text-muted">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ink/16 px-3.5 py-1.75 font-mono text-[10px] tracking-[0.14em] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5.5 pt-1.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-fg"
                    >
                      Live demo ↗
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-2 transition-colors hover:text-fg"
                    >
                      Source ↗
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-2 transition-colors hover:text-fg"
                  >
                    Case study
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

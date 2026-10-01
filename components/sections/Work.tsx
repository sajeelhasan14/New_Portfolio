import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { FEATURED_PROJECTS, PROJECTS, type Project } from "@/data/portfolio";

/**
 * Selected work.
 *
 * Bento layout: the lead project gets a full-width 21:9 banner, the rest sit in
 * a 16:9 grid beneath it. The image is a fixed frame at the top of each card
 * with the text below — never beside it — so a screenshot is never stretched to
 * match a text column's height.
 *
 * Screenshots are served at quality 90 (see next.config.ts — Next 16 coerces
 * anything outside `images.qualities` down to 75, which mushes dense UI
 * captures) with `sizes` matching the real rendered width so the browser picks
 * a source big enough to stay sharp.
 */
export function Work() {
  const [lead, ...rest] = FEATURED_PROJECTS;

  return (
    <section
      id="work"
      className="gutter graphite-grid relative -mt-px bg-bg pt-[clamp(60px,7vw,120px)] pb-[clamp(40px,5vw,80px)]"
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

      {lead && <WorkCard project={lead} index={0} lead />}

      {rest.length > 0 && (
        /* Two across, not three: a half-width card renders the screenshot at
           ~50vw instead of ~33vw, which is the difference between legible and
           mush on a dense UI capture. */
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      )}
    </section>
  );
}

function WorkCard({
  project,
  index,
  lead = false,
}: {
  project: Project;
  index: number;
  lead?: boolean;
}) {
  return (
    <article
      data-fx="rise"
      className="group flex flex-col overflow-hidden border border-ink/10 bg-surface transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-ember-sm"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} case study`}
        /* The lead keeps a fixed 21:9 banner — a full-width 16:9 block would
           be over 700px tall. Every other card takes the screenshot's own
           ratio, so the image fills its frame exactly. */
        style={!lead && project.imageRatio ? { aspectRatio: project.imageRatio } : undefined}
        className={`relative block w-full overflow-hidden bg-surface-2 ${
          lead ? "aspect-21/9" : "aspect-video"
        }`}
      >
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            quality={90}
            sizes={lead ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            /* `object-top` on the lead: cropping a 16:9 capture to 21:9 should
               take it off the empty bottom, not the header. */
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              lead ? "object-top" : ""
            }`}
          />
        ) : (
          /* No capture yet — a deliberate panel rather than an empty box. */
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_0%,var(--brand-strong),transparent_65%)]">
            <div aria-hidden className="dot-grid absolute inset-0 opacity-50" />
            <span className="relative px-4 text-center font-mono text-[clamp(16px,2.4vw,32px)] tracking-[0.2em] text-brand/70">
              {project.title.toUpperCase()}
            </span>
          </div>
        )}
      </Link>

      <div
        className={`flex flex-1 flex-col gap-4 ${lead ? "p-[clamp(24px,3vw,44px)]" : "p-6"}`}
      >
        <div className="flex justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-dim">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>

        <Link href={`/projects/${project.slug}`}>
          <h3
            className={`m-0 leading-none font-medium tracking-[-0.035em] transition-colors group-hover:text-brand ${
              lead ? "text-[clamp(28px,3.6vw,52px)]" : "text-[clamp(22px,2.2vw,30px)]"
            }`}
          >
            {project.title}
          </h3>
        </Link>

        <p
          className={`m-0 flex-1 text-pretty text-muted ${
            lead ? "max-w-[60ch] text-base leading-[1.6]" : "text-[15px] leading-[1.55]"
          }`}
        >
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-1">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-brand/10 px-3 py-1 font-mono text-xs font-medium text-brand"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 sm:ml-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-corner inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-brand-bright"
              >
                <ExternalLink className="size-4" />
                Live Demo
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="clip-corner inline-flex items-center gap-2 border border-brand/40 bg-brand/10 px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-bg"
            >
              Case Study
              <ArrowUpRight className="size-4" />
            </Link>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-corner inline-flex items-center gap-2 border border-ink/20 px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <GithubIcon className="size-4" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

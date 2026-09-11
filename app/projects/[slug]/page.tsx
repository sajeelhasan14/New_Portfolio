import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Globe, Maximize2 } from "lucide-react";
import { PROJECTS, getProject, getProjectNeighbours } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

/** Every project is known at build time, so all pages are prerendered. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Mohammad Sajeel Hasan`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(slug);
  const index = PROJECTS.findIndex((p) => p.slug === slug) + 1;

  /* The case study shows the untrimmed original where one exists — it is
     displayed large and people pinch into it, which the card-sized crop
     cannot survive. */
  const shot = project.screenshotFull ?? project.screenshot;
  const shotRatio = project.screenshotFull
    ? project.screenshotFullRatio
    : project.imageRatio;

  return (
    <article className="pb-[clamp(60px,8vw,120px)]">
      {/* ---------------------------------------------------------------- */}
      {/* Masthead                                                          */}
      {/* ---------------------------------------------------------------- */}
      <header className="gutter relative overflow-hidden pt-32 pb-[clamp(36px,5vw,64px)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,var(--brand-wash),transparent_70%)]"
        />

        <Reveal className="relative">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-2 transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-3.5" />
            ALL PROJECTS
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-dim">
            <span className="text-brand">
              ({String(index).padStart(2, "0")})
            </span>
            <span>{project.year}</span>
            {project.featured && (
              <>
                <span aria-hidden>/</span>
                <span className="text-brand">FEATURED</span>
              </>
            )}
          </div>

          <h1 className="m-0 max-w-[14ch] text-[clamp(44px,9vw,132px)] leading-[0.88] font-medium tracking-[-0.045em]">
            {project.title}
          </h1>

          <p className="mt-8 max-w-[52ch] text-[clamp(16px,1.5vw,21px)] leading-[1.55] text-pretty text-muted">
            {project.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-corner inline-flex items-center gap-2.5 bg-brand px-6 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-brand-bright"
              >
                <Globe className="size-4" />
                Visit live site
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-corner inline-flex items-center gap-2.5 border border-brand/40 bg-brand/10 px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-bg"
              >
                <GithubIcon className="size-4" />
                View source
              </a>
            )}
          </div>
        </Reveal>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Screenshot — full bleed, full resolution, own aspect ratio        */}
      {/* ---------------------------------------------------------------- */}
      {shot && (
        <Reveal className="gutter" delay={80}>
          <figure className="group relative m-0">
            <div
              style={shotRatio ? { aspectRatio: shotRatio } : undefined}
              className="clip-corner relative w-full overflow-hidden border border-ink/10 bg-surface-2"
            >
              <Image
                src={shot}
                alt={`${project.title} screenshot`}
                fill
                quality={90}
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>

            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.16em] text-dim">
              <span>{project.title.toUpperCase()} — SCREENS</span>
              <a
                href={shot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-2 transition-colors hover:text-brand"
              >
                <Maximize2 className="size-3.5" />
                VIEW FULL SIZE
              </a>
            </figcaption>
          </figure>
        </Reveal>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Body — sticky spec rail beside the write-up                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="gutter mt-[clamp(48px,7vw,110px)] grid gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="m-0 flex flex-col">
            <div className="flex flex-col gap-2 border-t border-ink/10 py-5">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-dim">YEAR</dt>
              <dd className="m-0 text-[15px] text-fg">{project.year}</dd>
            </div>

            <div className="flex flex-col gap-2 border-t border-ink/10 py-5">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-dim">STACK</dt>
              <dd className="m-0 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-brand/10 px-2.5 py-1 font-mono text-[11px] font-medium whitespace-nowrap text-brand"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>

            <div className="flex flex-col gap-2 border-y border-ink/10 py-5">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-dim">LINKS</dt>
              <dd className="m-0 flex flex-col gap-1.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-brand transition-colors hover:text-fg"
                  >
                    Live site ↗
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-muted-2 transition-colors hover:text-fg"
                  >
                    Source ↗
                  </a>
                )}
                {!project.liveUrl && !project.repo && (
                  <span className="text-[15px] text-dim">—</span>
                )}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="flex flex-col gap-[clamp(40px,6vw,88px)]">
          <Reveal>
            <span className="eyebrow mb-5 block">(01) Overview</span>
            <p className="m-0 max-w-[68ch] text-[clamp(16px,1.4vw,20px)] leading-[1.7] text-pretty text-muted">
              {project.overview}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <span className="eyebrow mb-7 block">(02) What it does</span>
            <div className="flex flex-col">
              {project.highlights.map((highlight, i) => (
                <div
                  key={highlight}
                  className="grid grid-cols-[minmax(0,44px)_minmax(0,1fr)] items-start gap-4 border-t border-ink/10 py-6 transition-[background] duration-300 last:border-b hover:bg-[linear-gradient(90deg,var(--brand-soft),transparent_62%)] md:gap-8"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="m-0 max-w-[62ch] text-[clamp(15px,1.25vw,17px)] leading-[1.6] text-pretty text-muted">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Prev / next                                                       */}
      {/* ---------------------------------------------------------------- */}
      <nav className="gutter mt-[clamp(56px,8vw,120px)] grid gap-px border-t border-ink/10 bg-ink/10 sm:grid-cols-2">
        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-3 bg-bg p-[clamp(24px,3vw,44px)] transition-colors hover:bg-surface"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-dim">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              PREVIOUS
            </span>
            <span className="text-[clamp(22px,2.6vw,34px)] leading-none font-medium tracking-[-0.03em] transition-colors group-hover:text-brand">
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-3 bg-bg p-[clamp(24px,3vw,44px)] transition-colors hover:bg-surface sm:items-end sm:text-right"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-dim">
              NEXT
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[clamp(22px,2.6vw,34px)] leading-none font-medium tracking-[-0.03em] transition-colors group-hover:text-brand">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}

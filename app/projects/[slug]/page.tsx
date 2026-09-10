import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Globe } from "lucide-react";
import { PROJECTS, getProject, getProjectNeighbours } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { TechPill } from "@/components/ui/TechPill";
import { ProjectThumb } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

/** Every project is known at build time, so all five pages are prerendered. */
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

  return (
    <article className="section overflow-hidden pt-36">
      <GlowOrb className="-top-32 -left-24 size-112" color="deep" />

      <div className="shell-narrow relative">
        <Reveal>
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-brand-bright"
          >
            <ArrowLeft className="size-3.5" />
            All projects
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="eyebrow">
              <span aria-hidden className="text-brand-bright">
                &gt;
              </span>
              {project.year}
            </span>
            {project.featured && (
              <span className="rounded-full border border-brand/40 bg-brand/15 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-brand-bright uppercase">
                Featured
              </span>
            )}
          </div>

          <h1 className="mb-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{project.title}</h1>

          <p className="mb-7 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe />
                  Visit live site
                </a>
              </Button>
            )}
            {project.repo && (
              <Button asChild variant="secondary">
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                  View source
                </a>
              </Button>
            )}
          </div>
        </Reveal>

        {/* Screenshot, when there is one to show */}
        {project.screenshot && (
          <Reveal delay={100} className="mt-14">
            <div className="card overflow-hidden">
              <ProjectThumb project={project} className="h-104 w-full sm:h-128" />
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-2">
              {project.title} running on device
            </p>
          </Reveal>
        )}

        {/* Write-up */}
        <Reveal delay={120} className="mt-16">
          <h2 className="mb-5 text-2xl font-bold">Overview</h2>
          <p className="text-lg leading-relaxed text-muted">{project.overview}</p>
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <h2 className="mb-6 text-2xl font-bold">What it does</h2>
          <ul className="grid gap-4">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="card flex items-start gap-4 p-5">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/15 text-brand">
                  <Check className="size-3.5" />
                </span>
                <span className="leading-relaxed text-muted">{highlight}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Prev / next */}
        <nav className="mt-20 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          {prev && (
            <Link href={`/projects/${prev.slug}`} className="card card-hover group p-6">
              <span className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-wider text-muted-2 uppercase">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="font-bold transition-colors group-hover:text-brand-bright">
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="card card-hover group p-6 sm:text-right"
            >
              <span className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-wider text-muted-2 uppercase sm:justify-end">
                Next
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="font-bold transition-colors group-hover:text-brand-bright">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { TechPill } from "./TechPill";
import { GithubIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";

/**
 * The frame is 16:9 and the screenshot fills it. The stored sheets are
 * multi-phone composites wider than that (up to 2.46:1), so their left and
 * right edges are trimmed — export project shots at 16:9 to avoid the crop.
 * Projects without a screenshot get a monogram panel instead.
 */
export function ProjectThumb({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,140,255,0.35),transparent_65%)]",
        "bg-surface-2",
        className,
      )}
    >
      <div aria-hidden className="dot-grid absolute inset-0 opacity-40" />

      {project.screenshot ? (
        <Image
          src={project.screenshot}
          alt={`${project.title} app screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <span
          aria-hidden
          className="text-gradient relative font-mono text-6xl font-bold tracking-tighter transition-transform duration-500 group-hover:scale-105"
        >
          {project.title.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
      >
        <ProjectThumb project={project} className="aspect-video w-full shrink-0" />

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold transition-colors group-hover:text-brand-bright">
                {project.title}
              </h3>
              <span className="font-mono text-xs text-muted-2">{project.year}</span>
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-muted-2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
          </div>

          <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
            {project.technologies.length > 4 && (
              <TechPill className="text-muted-2">+{project.technologies.length - 4}</TechPill>
            )}
          </div>
        </div>
      </Link>

      {/* Outside the card link — nested anchors aren't valid HTML */}
      {(project.repo || project.liveUrl) && (
        <div className="flex items-center gap-5 border-t border-border px-6 py-4">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-brand-bright"
            >
              <GithubIcon className="size-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-brand-bright"
            >
              <Globe className="size-4" />
              Live site
            </a>
          )}
        </div>
      )}
    </article>
  );
}

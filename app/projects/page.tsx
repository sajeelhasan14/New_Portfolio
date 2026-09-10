import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack web and Flutter projects by Mohammad Sajeel Hasan — GeoRate, Book Finder, Daily Stories, COVID Tracker and NoteIt.",
};

export default function ProjectsIndexPage() {
  return (
    <section className="section overflow-hidden pt-36">
      <GlowOrb className="-top-32 left-1/3 size-120" color="deep" />

      <div className="shell relative">
        <Reveal className="mb-14">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-brand-bright"
          >
            <ArrowLeft className="size-3.5" />
            Back home
          </Link>

          <span className="eyebrow mb-4 block">
            <span aria-hidden className="text-brand-bright">
              &gt;
            </span>
            All projects
          </span>

          <h1 className="mb-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Everything I&apos;ve <span className="text-gradient">built so far</span>
          </h1>

          <p className="max-w-2xl leading-relaxed text-muted">
            {PROJECTS.length} projects across full-stack web and mobile. Each one has a write-up on
            what it does and what I learned building it.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

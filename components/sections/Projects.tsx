import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="mb-0"
            eyebrow="Projects"
            title={
              <>
                Things I&apos;ve <span className="text-gradient">built</span>
              </>
            }
            description="A mix of full-stack web and Flutter apps — each one taught me something the last one didn't."
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {PROJECTS.length > FEATURED_PROJECTS.length && (
          <Reveal className="mt-12 flex justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/projects">
                View all {PROJECTS.length} projects
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}

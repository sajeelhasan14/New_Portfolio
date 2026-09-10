import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="section">
      <div className="shell-narrow">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">studied</span>
            </>
          }
        />

        <div className="grid gap-5">
          {EDUCATION.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <article className="card card-hover flex gap-5 p-6 sm:p-7">
                <div
                  aria-hidden
                  className={
                    item.current
                      ? "grid size-11 shrink-0 place-items-center rounded-xl border border-brand/30 bg-brand/15 text-brand"
                      : "grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-muted-2"
                  }
                >
                  <GraduationCap className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-bold">{item.degree}</h3>
                    <span className="font-mono text-xs text-muted-2">{item.year}</span>
                  </div>

                  <p className="text-sm font-medium text-brand-bright">{item.school}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

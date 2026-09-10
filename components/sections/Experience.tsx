import { EXPERIENCE } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell-narrow">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">worked</span>
            </>
          }
        />

        <ol className="relative">
          {/* Timeline rail */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-brand via-brand/30 to-transparent"
          />

          {EXPERIENCE.map((job, i) => (
            <li key={job.id}>
              <Reveal delay={i * 100} className="relative pb-14 pl-10 last:pb-0">
                {/* Node */}
                <span
                  aria-hidden
                  className={
                    job.current
                      ? "absolute top-1.5 left-0 size-4 rounded-full border-2 border-brand bg-bg shadow-[0_0_14px_3px_rgba(155,50,250,0.85)] after:absolute after:inset-1 after:rounded-full after:bg-brand"
                      : "absolute top-1.5 left-0 size-4 rounded-full border-2 border-border-strong bg-bg"
                  }
                />

                <div className="mb-1 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold">{job.position}</h3>
                  {job.current && (
                    <span className="rounded-full border border-brand/40 bg-brand/15 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-brand-bright uppercase">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-brand-bright">{job.company}</p>
                <p className="mt-1 mb-4 font-mono text-xs text-muted-2">{job.duration}</p>

                <p className="mb-5 leading-relaxed text-muted">{job.description}</p>

                <ul className="space-y-2.5">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-muted">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

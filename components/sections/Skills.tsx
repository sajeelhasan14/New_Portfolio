import { TECHNOLOGIES } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechPill } from "@/components/ui/TechPill";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function Skills() {
  return (
    <section id="skills" className="section overflow-hidden">
      <GlowOrb className="top-1/4 -left-52 size-104" color="ink" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              The stack I <span className="text-gradient">work in</span>
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {TECHNOLOGIES.map((group, i) => (
            <Reveal key={group.category} delay={i * 80}>
              <div className="card card-hover h-full p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  <h3 className="font-mono text-xs tracking-[0.18em] text-brand uppercase">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechPill key={skill} interactive className="px-3.5 py-1.5 text-[13px]">
                      {skill}
                    </TechPill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

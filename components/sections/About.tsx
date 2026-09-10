import { PROFILE, INTERESTS } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="About me"
          title={
            <>
              Turning ideas into <span className="text-gradient">real applications</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-6">
            {/* Purple rail down the left of the bio */}
            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute top-1 left-0 h-full w-px bg-gradient-to-b from-brand via-brand/40 to-transparent"
              />
              <p className="text-lg leading-relaxed text-fg">{PROFILE.bio}</p>
            </div>
            <p className="pl-6 leading-relaxed text-muted">{PROFILE.bioSecondary}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="card h-full p-7">
              <h3 className="mb-6 font-mono text-xs tracking-[0.18em] text-muted-2 uppercase">
                Interests
              </h3>
              <ul className="space-y-4">
                {INTERESTS.map((interest) => (
                  <li key={interest} className="flex items-start gap-3 text-sm text-muted">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_8px_1px_rgba(155,50,250,0.8)]"
                    />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

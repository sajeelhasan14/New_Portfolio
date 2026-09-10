import Link from "next/link";
import { ArrowDown, ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { EDUCATION, EXPERIENCE, PROFILE } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  const currentRole = EXPERIENCE.find((e) => e.current) ?? EXPERIENCE[0];
  const currentStudy = EDUCATION.find((e) => e.current) ?? EDUCATION[0];

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      {/* Ambient purple light */}
      <GlowOrb className="-top-40 -left-32 size-136" color="deep" />
      <GlowOrb className="top-1/3 -right-40 size-120" color="brand" />
      <div aria-hidden className="dot-grid mask-fade absolute inset-0 -z-10 opacity-60" />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------- Copy ---------- */}
        <div>
          <span className="eyebrow mb-6">
            <span
              aria-hidden
              className="relative flex size-2 rounded-full bg-brand shadow-[0_0_12px_2px_rgba(155,50,250,0.9)]"
            />
            {PROFILE.availability}
          </span>

          <h1 className="mb-6 text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-bold">
            <span className="block text-muted">Mohammad</span>
            {/* clip-path wipe carried over from the previous hero */}
            <span className="text-gradient animate-wipe block">Sajeel Hasan</span>
          </h1>

          <p className="mb-4 max-w-xl text-lg font-medium text-fg sm:text-xl">{PROFILE.tagline}</p>

          <p className="mb-9 max-w-xl leading-relaxed text-muted">{PROFILE.title}</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="#projects">
                View my work
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#contact">Get in touch</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <SocialLinks />
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-2">
              <MapPin className="size-4 text-brand" />
              {PROFILE.location}
            </span>
          </div>
        </div>

        {/* ---------- "Currently" card ---------- */}
        <div className="relative hidden lg:block">
          <div className="card animate-float relative overflow-hidden p-8">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 size-48 rounded-full bg-brand/25 blur-3xl"
            />

            <div className="relative">
              <div className="mb-6 flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-2xl border border-brand/30 bg-gradient-to-br from-brand to-brand-deep font-mono text-xl font-bold text-white shadow-[0_10px_30px_-10px_rgba(155,50,250,0.9)]">
                  {PROFILE.initials}
                </div>
                <div>
                  <p className="font-bold">{PROFILE.shortName}</p>
                  <p className="font-mono text-xs text-muted-2">@sajeelhasan14</p>
                </div>
              </div>

              <dl className="space-y-5 border-t border-border pt-6">
                <div className="flex gap-3">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" />
                  <div>
                    <dt className="font-mono text-[11px] tracking-wider text-muted-2 uppercase">
                      Currently
                    </dt>
                    <dd className="mt-1 text-sm leading-snug">
                      {currentRole.position} at {currentRole.company}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-brand" />
                  <div>
                    <dt className="font-mono text-[11px] tracking-wider text-muted-2 uppercase">
                      Studying
                    </dt>
                    <dd className="mt-1 text-sm leading-snug">
                      {currentStudy.degree}
                      <span className="block text-muted-2">
                        {currentStudy.school} Â· {currentStudy.year}
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <Link
        href="#about"
        aria-label="Scroll to about section"
        className="animate-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-2 transition-colors hover:text-brand sm:block"
      >
        <ArrowDown className="size-5" />
      </Link>
    </section>
  );
}

import { PROFILE, STATS } from "@/data/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="gutter bg-cream py-[clamp(80px,10vw,180px)] text-cream-ink"
    >
      <div
        data-fx="zoom"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(32px,5vw,90px)]"
      >
        <div className="flex flex-col gap-5">
          <span className="eyebrow eyebrow-ink">(01) About</span>
          <h2 className="m-0 text-[clamp(30px,4.6vw,68px)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
            Started in Flutter. Now I own the whole stack.
          </h2>
        </div>

        <div className="flex flex-col gap-6.5">
          <p className="m-0 text-[clamp(15px,1.35vw,18px)] leading-[1.65] text-pretty text-cream-muted">
            {PROFILE.bio}
          </p>
          <p className="m-0 text-[clamp(15px,1.35vw,18px)] leading-[1.65] text-pretty text-cream-muted">
            {PROFILE.bioSecondary}
          </p>

          {/* Hairline grid: the 1px gap on a tinted parent draws the rules,
              so each cell only paints its own cream ground. */}
          <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-px overflow-hidden rounded-2xl border border-cream-ink/14 bg-cream-ink/14">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1.5 bg-cream px-4.5 py-5.5"
              >
                <span className="text-[clamp(26px,3vw,40px)] leading-none tracking-[-0.03em] text-brand-ink">
                  {stat.value}
                  {stat.suffix ?? ""}
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-cream-dim uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

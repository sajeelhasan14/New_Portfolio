import { EDUCATION } from "@/data/portfolio";

export function Education() {
  return (
    <section
      id="education"
      className="gutter border-t border-ink/8 py-[clamp(60px,7vw,120px)]"
    >
      <div className="mb-[clamp(32px,4vw,60px)] flex flex-wrap items-baseline justify-between gap-6">
        <span className="eyebrow">(06) Education</span>
        <h2 className="m-0 text-[clamp(28px,4vw,58px)] leading-[1.05] font-medium tracking-[-0.035em]">
          Where I studied
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-px overflow-hidden rounded-[20px] border border-ink/10 bg-ink/10">
        {EDUCATION.map((item, i) => (
          <div
            key={item.id}
            data-fx="zoom"
            className="flex min-h-70 flex-col gap-4 bg-bg p-[clamp(26px,3vw,44px)] transition-colors duration-300 hover:bg-surface"
          >
            <div className="flex justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-dim">
              <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
              <span>{item.year.toUpperCase()}</span>
            </div>

            <h3 className="m-0 mt-auto text-[clamp(22px,2.4vw,32px)] leading-[1.08] font-medium tracking-[-0.03em]">
              {item.degree}
            </h3>
            <span className="font-mono text-[11px] tracking-[0.14em] text-brand">
              {item.school}
            </span>

            <p className="m-0 text-[15px] leading-[1.6] text-pretty text-muted-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

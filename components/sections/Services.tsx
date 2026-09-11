import { SERVICES } from "@/data/portfolio";

export function Services() {
  return (
    <section
      id="services"
      className="gutter border-t border-cream-ink/12 bg-cream py-[clamp(60px,7vw,120px)] text-cream-ink"
    >
      <div className="mb-[clamp(32px,4vw,64px)] flex flex-wrap items-baseline justify-between gap-6">
        <span className="eyebrow eyebrow-ink">(02) Services</span>
        <h2 className="m-0 max-w-[16ch] text-[clamp(28px,4vw,58px)] leading-[1.05] font-medium tracking-[-0.035em]">
          What I actually do
        </h2>
      </div>

      <div className="flex flex-col">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            data-fx="rise"
            className="grid grid-cols-[minmax(0,44px)_minmax(0,1fr)] items-start gap-x-4 gap-y-3 border-t border-cream-ink/12 py-[clamp(22px,3vw,38px)] transition-[background] duration-300 md:grid-cols-[minmax(0,68px)_minmax(0,1.1fr)_minmax(0,1.4fr)] md:gap-[clamp(16px,3vw,48px)] hover:bg-[linear-gradient(90deg,var(--brand-wash),transparent_62%)]"
          >
            <span className="font-mono text-[11px] tracking-[0.18em] text-cream-dim">
              {String(i + 1).padStart(3, "0")}
            </span>
            <h3 className="m-0 text-[clamp(20px,2.4vw,34px)] leading-[1.1] font-medium tracking-[-0.025em]">
              {service.title}
            </h3>
            {/* Below md the body drops to its own row rather than squeezing
                into a third column barely wide enough for two words. */}
            <p className="col-start-2 m-0 max-w-[52ch] text-[15px] leading-[1.6] text-pretty text-cream-muted md:col-start-auto">
              {service.description}
            </p>
          </div>
        ))}
        <div className="border-t border-cream-ink/12" />
      </div>
    </section>
  );
}

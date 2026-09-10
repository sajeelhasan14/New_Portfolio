import Link from "next/link";
import { PROFILE } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      id="top"
      className="gutter relative flex min-h-screen flex-col justify-end pt-25 pb-12"
    >
      {/* Accent wash bleeding down from the top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_10%,rgba(91,140,255,0.12),transparent_70%)]"
      />

      <div className="relative flex flex-col gap-10">
        <div className="flex flex-wrap items-center gap-[18px] font-mono text-[11px] tracking-[0.2em] text-muted-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/[0.14] px-3.5 py-[7px]">
            {PROFILE.availability.toUpperCase()}
          </span>
          <span>{PROFILE.location.toUpperCase()}</span>
          <span aria-hidden>/</span>
          <span>B.SC. SOFTWARE ENGINEERING</span>
        </div>

        <h1
          data-fx="rise"
          // The design's ramp, with a lower floor: its 52px minimum clips
          // "systems behind" against the gutter below ~450px. Identical to
          // the design at every width where 11.5vw already clears 52px.
          className="m-0 text-[clamp(44px,11.5vw,196px)] leading-[0.86] font-medium tracking-[-0.045em] text-balance"
        >
          I build the
          <br />
          <em className="text-brand not-italic">systems</em> behind
          <br />
          the product
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-end gap-7 border-t border-ink/10 pt-7">
          <p className="m-0 max-w-[42ch] text-[clamp(15px,1.4vw,19px)] leading-[1.55] text-pretty text-muted">
            Software Engineering student in Karachi. I started out in Flutter, moved into React
            and Next.js, and now build the server side too — Node, Express and PostgreSQL.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6.5 py-[15px] text-sm font-semibold text-bg transition-colors hover:bg-fg"
            >
              See selected work →
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6.5 py-[15px] text-sm font-medium text-fg transition-colors hover:border-fg"
            >
              Get in touch
            </Link>
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-[11px] tracking-[0.16em] text-muted-2">
            <span>SCROLL TO EXPLORE</span>
            <span className="text-brand" aria-hidden>
              ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

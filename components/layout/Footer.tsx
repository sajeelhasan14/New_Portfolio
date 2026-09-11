import type React from "react";
import { PROFILE } from "@/data/portfolio";

const MARQUEE = ["Let’s work together", "—", "Available for work", "—"];

export function Footer() {
  return (
    <>
      <div className="overflow-hidden pt-[clamp(48px,7vw,110px)]">
        {/* Doubled so the -50% keyframe lands on a seam. */}
        <div
          className="marquee-track flex w-max gap-10"
          style={{ "--mq-duration": "26s" } as React.CSSProperties}
        >
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="text-[clamp(38px,7vw,110px)] leading-none tracking-[-0.04em] whitespace-nowrap text-fg"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <footer className="gutter mt-[clamp(40px,5vw,80px)] flex flex-wrap items-center justify-between gap-5 border-t border-ink/8 pt-[clamp(40px,5vw,72px)] pb-10 font-mono text-[11px] tracking-[0.16em] text-dim">
        <span>
          © {new Date().getFullYear()} {PROFILE.shortName.toUpperCase()}
        </span>
        <span>DESIGNED &amp; BUILT IN KARACHI</span>
        <a href="#top" className="text-muted-2 transition-colors hover:text-brand">
          BACK TO TOP ↑
        </a>
      </footer>
    </>
  );
}

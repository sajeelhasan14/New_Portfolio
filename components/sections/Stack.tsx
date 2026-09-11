import { TECHNOLOGIES } from "@/data/portfolio";

import type React from "react";

/**
 * Tech stack.
 *
 * Structured like the reference portfolio: hairline-ruled rows, a fixed label
 * column, and a marquee track that fades out at both edges. The fades are two
 * gradient overlays rather than a CSS mask — a mask would also eat the row
 * rule behind the track.
 *
 * The chip list is repeated four times. It has to be an EVEN number of copies:
 * the keyframe translates -50%, so the loop point lands exactly two copies in.
 * An odd count would put it mid-list and the track would visibly jump.
 */
const DURATIONS = [22, 26, 20, 28, 24];

export function Stack() {
  return (
    <section id="stack" className="gutter overflow-hidden py-[clamp(80px,9vw,160px)]">
      <div className="mb-[clamp(32px,4vw,60px)] flex flex-wrap items-baseline justify-between gap-6">
        <span className="eyebrow">(04) Technologies</span>
        <h2 className="m-0 text-[clamp(28px,4vw,58px)] leading-[1.05] font-medium tracking-[-0.035em]">
          Tech stack
        </h2>
      </div>

      {/* The cascade is driven from this container, not the rows, so all of
          them are revealed by the time the block reaches viewport centre. */}
      <div data-fx="rows">
        {TECHNOLOGIES.map((group, i) => (
          <div
            key={group.category}
            className="flex items-center border-b border-border py-4 first:border-t"
          >
            <div className="w-32 shrink-0 pr-5 sm:w-36 md:w-48 md:pr-6">
              <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-brand uppercase sm:text-xs">
                {group.category}
              </span>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-linear-to-r from-bg to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-linear-to-l from-bg to-transparent"
              />

              <div
                className="marquee-track flex w-max gap-4"
                style={
                  {
                    "--mq-duration": `${DURATIONS[i % DURATIONS.length]}s`,
                  } as React.CSSProperties
                }
              >
                {[...group.skills, ...group.skills, ...group.skills, ...group.skills].map(
                  (skill, j) => (
                    <span
                      key={`${skill}-${j}`}
                      className="shrink-0 bg-brand/5 px-3 py-1 font-mono text-sm whitespace-nowrap text-muted"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

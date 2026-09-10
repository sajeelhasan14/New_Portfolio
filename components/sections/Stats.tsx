"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/portfolio";

/** Eases to `target` once scrolled into view. Respects reduced-motion. */
function useCountUp(target: number, enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Snap straight to the final number when motion is unwelcome.
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
          setValue(target);
          return;
        }

        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(Math.round(eased * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, enabled]);

  return { ref, value };
}

function Stat({ value, label, suffix, raw }: (typeof STATS)[number]) {
  const { ref, value: display } = useCountUp(value, !raw);

  return (
    <div className="group relative px-6 py-10 text-center">
      <span
        ref={ref}
        className="text-gradient block font-mono text-4xl font-bold tabular-nums sm:text-5xl"
      >
        {display}
        {suffix}
        {!raw && "+"}
      </span>
      <span className="mt-3 block font-mono text-xs tracking-[0.16em] text-muted-2 uppercase">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="At a glance" className="relative px-5 sm:px-8">
      <div className="shell">
        <div className="card grid grid-cols-2 divide-x divide-y divide-border overflow-hidden lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Scroll-driven effects for the home page.
 *
 * Ported from the rAF loop in `design/Portfolio.dc.html`. One loop reads
 * scroll position each frame and writes inline styles onto every `[data-fx]`
 * element, rather than each section owning its own observer:
 *
 *   rise / zoom / drift  — enter-on-scroll transforms
 *   rows                 — a container whose children cascade in together,
 *                          finishing as the block reaches viewport centre
 *   card                 — the sticky work cards, scaled and dimmed as the
 *                          next one slides over them
 *   stage / grow / ui    — the statement section: words fill left to right,
 *                          then the whole line zooms through the viewport
 *                          while the ground turns from near-black to cream
 *
 * The bar colour is derived, not stored: each frame it samples whichever
 * section sits under the header and flips the header to ink-on-cream when
 * that section is light.
 */

/** Multiplier on every transform. 0 with `prefers-reduced-motion`. */
const AMP_DEFAULT = 1;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** "#4dffb8" | "#5bf" -> [77, 255, 184] */
function readAccent(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-brand")
    .trim()
    .replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? [77, 255, 184] : [r, g, b];
}

export function ScrollFx() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const amp = reduced ? 0 : AMP_DEFAULT;

    const vh = () => window.innerHeight;
    const accent = readAccent();

    /* ---- header contrast -------------------------------------------- */
    let barLight: boolean | null = null;

    const paintBar = () => {
      const bar = document.querySelector<HTMLElement>("[data-bar]");
      if (!bar) return;

      const probeY = bar.getBoundingClientRect().bottom + 8;
      let light = false;

      for (const s of document.querySelectorAll<HTMLElement>('section, [data-fx="stage"]')) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          const bg = getComputedStyle(s).backgroundColor.match(/[\d.]+/g);
          // Skip transparent grounds — they show whatever is behind them.
          if (bg && Number(bg[3] ?? 1) !== 0) {
            light = (+bg[0] * 299 + +bg[1] * 587 + +bg[2] * 114) / 1000 > 140;
          }
        }
      }

      if (barLight === light) return;
      barLight = light;

      bar.style.background = light ? "rgba(241,238,232,0.72)" : "rgba(8,9,11,0.55)";
      bar.style.borderBottomColor = light ? "rgba(12,11,10,0.14)" : "rgba(237,239,240,0.07)";

      const ink = document.querySelector<HTMLElement>("[data-bar-ink]");
      if (ink) ink.style.color = light ? "#0C0B0A" : "#EDEFF0";
      for (const a of document.querySelectorAll<HTMLElement>("[data-bar-nav]")) {
        a.style.color = light ? "#4A473F" : "#8A9299";
      }
    };

    /* ---- per-frame write pass ---------------------------------------- */
    let seen = 0;

    const apply = () => {
      paintBar();

      const els = document.querySelectorAll<HTMLElement>("[data-fx]");

      // Cheap transition only on the fade-ins; the zoom and the sticky
      // cards are driven every frame and must not lag behind the scroll.
      if (els.length !== seen) {
        seen = els.length;
        for (const el of els) {
          if (el.dataset.fx !== "grow" && el.dataset.fx !== "card") {
            el.style.transition = "opacity .12s linear";
          }
        }
      }

      for (const el of els) {
        const fx = el.dataset.fx;
        const r = el.getBoundingClientRect();

        if (fx === "grow" || fx === "stage" || fx === "ui") {
          const host = el.closest("section");
          if (!host) continue;

          const hr = host.getBoundingClientRect();
          const runway = hr.height - vh();

          // Reduced motion collapses the 440vh runway to one screen, leaving
          // no progress to read — and p=0 would leave the words unlit at
          // near-black on near-black. Park at the mid-state instead: fully
          // lit in accent on the dark stage, before the zoom would start.
          const p = reduced ? 0.5 : runway > 0 ? clamp01(-hr.top / runway) : 0;

          const fillP = clamp01((p - 0.04) / 0.42);
          const zoomP = clamp01((p - 0.54) / 0.46);
          const lightP = clamp01((zoomP - 0.62) / 0.33);

          if (fx === "stage") {
            // Near-black -> cream, so the section hands off to the cream
            // About block with no visible seam.
            const mix = (a: number, b: number) => Math.round(a + (b - a) * lightP);
            el.style.backgroundColor = `rgb(${mix(8, 241)},${mix(9, 238)},${mix(11, 232)})`;
          } else if (fx === "ui") {
            el.style.opacity = (1 - clamp01(zoomP / 0.25)).toFixed(3);
          } else {
            const words = el.querySelectorAll<HTMLElement>("[data-fill] span");

            if (words.length) {
              // Each word lights accent-first, then washes to cream as the
              // ground behind it turns light.
              const toCream = clamp01((zoomP - 0.1) / 0.35);
              const lit = fillP * (words.length + 2) - 1;

              for (let i = 0; i < words.length; i++) {
                const t = clamp01(lit - i);
                const e = t * t * (3 - 2 * t); // smoothstep
                const ch = (dim: number, target: number) => {
                  const on = accent[dim] + (target - accent[dim]) * toCream;
                  return Math.round(52 + (on - 52) * e);
                };
                words[i].style.color = `rgb(${ch(0, 241)},${ch(1, 238)},${ch(2, 232)})`;
              }
            }

            const para = el.firstElementChild as HTMLElement | null;
            if (!para) continue;

            const vw = window.innerWidth;
            const cache = el as HTMLElement & { _vw?: number; _base?: number; _w?: number };
            if (cache._vw !== vw) {
              cache._vw = vw;
              cache._base = Math.min(72, Math.max(26, 0.042 * vw));
              cache._w = Math.min(1300, vw * 0.92);
            }

            const s = 1 + Math.pow(zoomP, 2.4) * 40 * amp;
            const w = Math.round((cache._w ?? 0) * s);

            para.style.fontSize = `${Math.round((cache._base ?? 26) * s)}px`;
            el.style.width = `${w}px`;
            el.style.left = `${Math.round((vw - w) / 2)}px`;
            el.style.top = `${Math.round((vh() - el.offsetHeight) / 2)}px`;
            el.style.opacity = "1";
          }
        } else if (fx === "rows") {
          // Staggered list reveal, driven by the CONTAINER's position rather
          // than each row's own. Anchoring per-row means the cascade chases
          // the scroll: by the time the last row triggers, the first has left
          // the screen. Here one progress value runs the whole group and is
          // pinned to 1 the moment the block reaches the viewport centre, so
          // every row is revealed and visible together at that point.
          const kids = Array.from(el.children) as HTMLElement[];
          if (!kids.length) continue;

          const centre = r.top + r.height / 2;
          const t = clamp01((vh() - centre) / (vh() / 2));

          // 45% of the runway is spent fanning the rows out, the remaining
          // 55% is each row's own travel — so the last one still lands on t=1.
          const SPREAD = 0.45;
          const span = kids.length > 1 ? SPREAD / (kids.length - 1) : 0;

          kids.forEach((kid, k) => {
            const rp = clamp01((t - k * span) / (1 - SPREAD));
            const e = 1 - Math.pow(1 - rp, 3); // easeOutCubic
            kid.style.transform = `translateY(${(32 * amp * (1 - e)).toFixed(1)}px)`;
            kid.style.opacity = e.toFixed(3);
            // Sharpening out of a blur reads as the row "focusing in", which
            // sits better beside the horizontal marquee than another slide.
            kid.style.filter = amp ? `blur(${(8 * (1 - e)).toFixed(2)}px)` : "none";
          });
        } else if (fx === "card") {
          const p = clamp01((110 - r.top) / vh());
          el.style.transform = `scale(${(1 - 0.06 * p * amp).toFixed(4)})`;
          el.style.opacity = (1 - 0.35 * p * amp).toFixed(3);
        } else {
          // `data-fx-offset` pushes an element's trigger point further down the
          // page. Sibling rows sitting only ~60px apart would otherwise all
          // cross the threshold at once; an increasing offset per row makes
          // them reveal one at a time as the scroll continues.
          const offset = Number(el.dataset.fxOffset) || 0;
          const p = clamp01((vh() * 0.94 - r.top - offset) / (vh() * 0.5));
          const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

          if (fx === "zoom") {
            el.style.transform = `scale(${(1 - 0.09 * amp * (1 - e)).toFixed(4)}) translateY(${(
              34 *
              amp *
              (1 - e)
            ).toFixed(1)}px)`;
            el.style.opacity = (0.15 + 0.85 * e).toFixed(3);
          } else if (fx === "rise") {
            el.style.transform = `translateY(${(56 * amp * (1 - e)).toFixed(1)}px)`;
            el.style.opacity = (0.1 + 0.9 * e).toFixed(3);
          } else if (fx === "drift") {
            el.style.transform = `translateY(${(26 * amp * (1 - e)).toFixed(1)}px)`;
          }
        }
      }
    };

    /* ---- loop -------------------------------------------------------- */
    let raf = 0;
    let lastY: number | null = null;
    let lastH: number | null = null;
    let lastN: number | null = null;
    let beat = 0;

    const tick = () => {
      const sc = document.scrollingElement || document.documentElement;
      const y = sc.scrollTop || window.scrollY || 0;
      const h = window.innerHeight;
      const n = document.querySelectorAll("[data-fx]").length;

      beat = performance.now();

      // Only write when something actually moved.
      if (n && (y !== lastY || h !== lastH || n !== lastN)) {
        lastY = y;
        lastH = h;
        lastN = n;
        apply();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // A backgrounded tab parks rAF; on return the loop can come back with a
    // stale cache and skip the first write. Restart it if the beat stops.
    const watch = window.setInterval(() => {
      if (!document.querySelector("[data-fx]")) return;
      if (performance.now() - beat > 600) {
        cancelAnimationFrame(raf);
        lastY = lastH = lastN = null;
        raf = requestAnimationFrame(tick);
      }
    }, 700);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(watch);
    };
  }, []);

  return null;
}

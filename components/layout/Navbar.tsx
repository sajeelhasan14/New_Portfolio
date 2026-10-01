"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, PROFILE } from "@/data/portfolio";

/**
 * Fixed header from the design.
 *
 * The `data-bar*` hooks are read by ScrollFx, which samples the section
 * sitting under the header each frame and repaints the bar ink-on-cream
 * while the About/Services slab is behind it. Everything those hooks touch
 * is set as an inline style there, so the classes here only need to cover
 * the dark default.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  /* Lock body scroll while the sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes the sheet */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        data-bar=""
        className="gutter fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 border-b border-ink/[0.07] bg-bg/55 py-[18px] backdrop-blur-[14px]"
      >
        <Link
          href="/"
          data-bar-ink=""
          className="flex items-center gap-2.5 text-fg transition-opacity hover:opacity-80"
        >
          <span className="inline-block size-2.5 animate-blink rounded-full bg-brand" />
          <span className="text-[15px] font-semibold tracking-[0.14em]">
            {PROFILE.shortName.toUpperCase()}
          </span>
        </Link>

        <nav className="flex items-center gap-[clamp(14px,2.4vw,34px)] font-mono text-[11px] tracking-[0.18em]">
          <div className="hidden items-center gap-[clamp(14px,2.4vw,34px)] md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-bar-nav=""
                className="text-muted-2 transition-colors hover:!text-brand"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand px-4 py-[9px] font-medium tracking-[0.14em] text-bg transition-colors hover:bg-brand-deep hover:text-cream"
          >
            LET&apos;S TALK
          </Link>

          {/* Mobile trigger — the design has no small-screen nav, so the
              links move into a sheet rather than wrapping the bar. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex size-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span data-bar-nav="" className="block h-px w-5 bg-current text-muted-2" />
            <span data-bar-nav="" className="block h-px w-5 bg-current text-muted-2" />
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-60 flex flex-col bg-bg md:hidden">
          <div className="gutter flex items-center justify-between py-[18px]">
            <span className="flex items-center gap-2.5 text-fg">
              <span className="inline-block size-2.5 rounded-full bg-brand" />
              <span className="text-[15px] font-semibold tracking-[0.14em]">
                {PROFILE.shortName.toUpperCase()}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="font-mono text-[11px] tracking-[0.18em] text-muted-2"
            >
              CLOSE ✕
            </button>
          </div>

          <nav className="gutter flex flex-1 flex-col justify-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[clamp(34px,11vw,56px)] leading-[1.05] font-medium tracking-[-0.04em] text-fg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-fit items-center bg-brand px-7 py-4 text-sm font-semibold text-bg"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

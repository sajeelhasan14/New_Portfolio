import { PROFILE, PROJECTS, SOCIAL_LINKS } from "@/data/portfolio";
import { Terminal } from "@/components/ui/Terminal";

/**
 * Hero, after the LinkedIn cover: headline and pitch on the left, the zsh
 * terminal card on the right, all on a paper sheet whose grid fades out
 * toward the edges. Ember is kept to accents — the word, the full stop and
 * the card's offset.
 *
 * The section's own ground is cream, so ScrollFx paints the header
 * ink-on-paper while the hero sits under it.
 */
const isFlutter = (tech: string[]) => tech.includes("Flutter");

// Web projects list on their own; the Flutter apps fold into one directory.
const WEB = PROJECTS.filter((p) => !isFlutter(p.technologies)).map((p) => p.slug);
const FLUTTER = PROJECTS.filter((p) => isFlutter(p.technologies)).map((p) => p.slug);

/** The terminal's `cat links.txt` — the hero's way out, in place of buttons. */
const LINKS = [
  ...SOCIAL_LINKS.filter((link) => link.icon !== "email").map((link) => ({
    label: link.label.toLowerCase(),
    href: link.url as string,
  })),
  { label: "whatsapp", href: `https://wa.me/${PROFILE.phone.replace(/[^\d]/g, "")}` },
];

export function Hero() {
  return (
    <section
      id="top"
      className="gutter relative flex min-h-screen flex-col justify-center bg-cream pt-28 pb-16 text-cream-ink"
    >
      <div aria-hidden className="paper-grid mask-fade pointer-events-none absolute inset-0" />

      <div className="relative grid items-center gap-x-[clamp(40px,5vw,96px)] gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)]">
        <div className="flex flex-col gap-9">
          <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[clamp(12px,1vw,14px)]">
            <span aria-hidden className="size-2 animate-blink rounded-full bg-brand" />
            <span className="text-brand-ink">{PROFILE.location}</span>
            <span aria-hidden className="hidden text-cream-ink/25 sm:inline">
              ·
            </span>
            <span className="text-cream-muted">{PROFILE.availability}</span>
          </p>

          <h1
            data-fx="rise"
            // The design's ramp, with a lower floor: its 52px minimum clips
            // "systems behind" against the gutter below ~450px. Steps down at
            // lg, where the terminal takes the right-hand column.
            className="m-0 text-[clamp(44px,11.5vw,196px)] leading-[0.86] font-medium tracking-[-0.045em] text-balance lg:text-[clamp(44px,6.6vw,128px)]"
          >
            I build the
            <br />
            <em className="text-outline not-italic">systems</em> behind
            <br />
            the product
            <span
              aria-hidden
              className="ml-[0.04em] inline-block size-[0.13em] bg-brand align-baseline"
            />
          </h1>

          <p className="m-0 max-w-[44ch] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-pretty text-cream-muted">
            Software Engineering student and full-stack developer. I build multi-tenant web
            apps, the APIs and data models under them, and AI agents that do real work.
          </p>
        </div>

        <Terminal web={WEB} flutter={FLUTTER} links={LINKS} email={PROFILE.email} />
      </div>
    </section>
  );
}

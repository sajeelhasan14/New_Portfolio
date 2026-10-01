import { PROFILE, SOCIAL_LINKS } from "@/data/portfolio";

const PILLS = [
  ...SOCIAL_LINKS.filter((link) => link.icon !== "email").map((link) => ({
    label: link.label.toUpperCase(),
    url: link.url,
  })),
  { label: "WHATSAPP", url: `https://wa.me/${PROFILE.phone.replace(/[^\d]/g, "")}` },
];

export function Contact() {
  return (
    <section id="contact" className="gutter pt-[clamp(60px,7vw,110px)]">
      {/* A graphite card with one ember edge — the terminal's palette, kept
          quiet so the email is the only thing that pulls the eye. */}
      <div
        data-fx="zoom"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-[clamp(28px,4vw,64px)] border border-t-2 border-ink/10 border-t-brand bg-surface p-[clamp(32px,5vw,88px)]"
      >
        <div className="flex flex-col gap-5">
          <span className="eyebrow">(07) Contact</span>
          <h2 className="m-0 text-[clamp(32px,5.4vw,84px)] leading-[0.96] font-medium tracking-[-0.04em] text-balance">
            Have a role or a project in mind?
          </h2>
          <p className="m-0 max-w-[44ch] text-[17px] leading-[1.6] text-pretty text-muted">
            Send me a message — about a role, a project, or something you want built. I read
            everything and reply within a day.
          </p>
        </div>

        <div className="flex flex-col gap-4.5">
          <a
            href={`mailto:${PROFILE.email}`}
            className="border-b border-brand/40 pb-2.5 text-[clamp(20px,2.6vw,36px)] tracking-[-0.03em] break-all text-brand transition-colors hover:border-fg hover:text-fg"
          >
            {PROFILE.email}
          </a>

          <div className="flex flex-wrap gap-2.5 font-mono text-[11px] tracking-[0.16em]">
            {PILLS.map((pill) => (
              <a
                key={pill.label}
                href={pill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/18 px-4.5 py-2.5 text-fg transition-colors hover:border-brand hover:text-brand"
              >
                {pill.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

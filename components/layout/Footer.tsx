import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      {/* Purple hairline glow along the top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />

      <div className="shell px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="font-mono text-xl font-bold tracking-tight">
              {PROFILE.shortName.split(" ")[0].toUpperCase()}
              <span className="text-brand">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {PROFILE.title} based in {PROFILE.location}.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 font-mono text-xs tracking-[0.18em] text-muted-2 uppercase">
              Navigate
            </h2>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {[...NAV_LINKS, { label: "Contact", href: "/#contact" }].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-center font-mono text-xs text-muted-2 sm:text-left">
            © {year} {PROFILE.name}. Designed &amp; built by hand.
          </p>

          <Link
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-brand-bright"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

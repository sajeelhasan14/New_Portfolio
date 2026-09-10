import { Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail } as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.icon];
        const external = link.url.startsWith("http");
        return (
          <li key={link.label}>
            <a
              href={link.url}
              aria-label={link.label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "group grid size-11 place-items-center rounded-full border border-border bg-surface/60",
                "text-muted transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-brand hover:bg-brand/15 hover:text-white",
                "hover:shadow-[0_8px_24px_-8px_rgba(155,50,250,0.7)]",
              )}
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

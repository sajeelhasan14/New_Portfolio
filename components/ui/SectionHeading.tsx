import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Mono label rendered after a "//" marker. */
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="eyebrow">
        <span aria-hidden className="text-brand-bright">
          {"//"}
        </span>
        {eyebrow}
      </span>

      <h2 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>

      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

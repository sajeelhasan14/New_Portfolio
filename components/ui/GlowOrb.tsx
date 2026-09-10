import { cn } from "@/lib/utils";

/**
 * Blurred purple radial light. Purely decorative — always aria-hidden, and
 * `overflow-x: clip` on body keeps it from widening the page on mobile.
 */
export function GlowOrb({
  className,
  color = "brand",
  float = true,
}: {
  className?: string;
  color?: "brand" | "deep" | "ink";
  float?: boolean;
}) {
  const fill = {
    brand: "bg-brand/25",
    deep: "bg-brand-deep/40",
    ink: "bg-brand-ink/50",
  }[color];

  return (
    <div
      aria-hidden
      className={cn("orb", fill, float && "animate-float-slow", className)}
    />
  );
}

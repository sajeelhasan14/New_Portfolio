import { cn } from "@/lib/utils";

/** Mono chip used for tech stacks: accent text on an accent tint. */
export function TechPill({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-brand/10 px-3 py-1",
        "font-mono text-xs font-medium text-brand transition-colors duration-200",
        interactive && "hover:bg-brand hover:text-bg",
        className,
      )}
    >
      {children}
    </span>
  );
}

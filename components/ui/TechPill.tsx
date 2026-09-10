import { cn } from "@/lib/utils";

/** Mono chip used for tech stacks. `interactive` adds the purple hover fill. */
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
        "inline-flex items-center rounded-full border border-border bg-surface-2/60 px-3 py-1",
        "font-mono text-xs text-muted transition-colors duration-200",
        interactive && "hover:border-brand hover:bg-brand/15 hover:text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

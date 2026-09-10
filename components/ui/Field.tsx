import * as React from "react";
import { cn } from "@/lib/utils";

const base = [
  "w-full rounded-xl border border-border bg-surface-2/60 px-4 text-sm text-fg",
  "placeholder:text-muted-2 transition-all duration-200",
  "hover:border-border-strong",
  "focus:border-brand focus:bg-surface-2 focus:outline-none focus:ring-4 focus:ring-brand/20",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-[invalid=true]:border-red-500/70 aria-[invalid=true]:ring-red-500/20",
];

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(base, "h-12 py-2", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(base, "min-h-32 resize-y py-3", className)} {...props} />;
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-2 block font-mono text-xs tracking-wider text-muted uppercase", className)}
      {...props}
    />
  );
}

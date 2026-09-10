import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Same cva + asChild structure as the previous app's Button, retinted to the
 * blue palette. Rounded now (the old global `border-radius: 0` rule is gone).
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-medium transition-all duration-200 outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        /* Solid blue with a glow that intensifies on hover */
        primary: [
          "bg-brand text-bg shadow-[0_8px_30px_-8px_rgba(91,140,255,0.7)]",
          "hover:bg-brand-bright hover:shadow-[0_10px_40px_-6px_rgba(91,140,255,0.9)]",
          "active:scale-[0.97]",
        ],
        /* Hairline outline that warms to blue */
        secondary: [
          "border border-border-strong bg-transparent text-fg",
          "hover:border-brand hover:bg-brand/10 hover:text-white",
          "active:scale-[0.97]",
        ],
        /* Frosted surface, for use over glows and imagery */
        glass: [
          "border border-white/10 bg-white/5 text-fg backdrop-blur-md",
          "hover:border-brand/60 hover:bg-brand/15 hover:text-white",
          "active:scale-[0.97]",
        ],
        ghost: [
          "border border-transparent bg-transparent text-muted",
          "hover:bg-surface-2 hover:text-fg",
          "active:scale-[0.97]",
        ],
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };

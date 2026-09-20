import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * Design System Button component
 * Implements:
 * - high-intent (Relay Orange #F97316)
 * - authoritative (Deep Charcoal #171F2C)
 * - monochrome (Pure Black #000000)
 * - outline (White with precision border #E2E8F0)
 * - ghost (Transparent with hover)
 * - destructive (#DC2626)
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-sans text-xs font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F97316]/30 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        // High-intent affirmative trigger (Relay Orange)
        "high-intent":
          "bg-[#F97316] hover:bg-[#EA580C] text-white shadow-xs font-semibold",
        // Deep Charcoal authoritative trigger
        authoritative:
          "bg-[#171F2C] hover:bg-[#334155] text-white shadow-xs font-medium",
        // Pure Black monochrome trigger
        monochrome:
          "bg-[#000000] hover:bg-[#171F2C] text-white shadow-xs font-medium",
        // Precision Outline button
        outline:
          "bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] text-[#171F2C] shadow-2xs",
        // Ghost button
        ghost:
          "bg-transparent hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#171F2C]",
        // Destructive / Retract button
        destructive:
          "bg-white border border-[#FECACA] hover:bg-[#FEF2F2] text-[#DC2626] font-medium shadow-2xs",
        // Filled Destructive
        "destructive-filled":
          "bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold shadow-xs",
        // Light White Button on Dark Surface
        "surface-dark":
          "bg-white hover:bg-[#F8FAFC] text-[#000000] font-semibold shadow-xs",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs md:text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-sm",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "monochrome",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref as any}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

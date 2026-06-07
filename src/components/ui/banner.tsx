import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "w-full flex items-center justify-between gap-4 p-4 text-xs font-mono font-semibold uppercase tracking-wider border rounded-[2px] transition-all",
  {
    variants: {
      variant: {
        default: "bg-slate-50 text-slate-700 border-[#1f25301f]",
        success: "bg-green-500/10 text-green-700 border-green-500/20",
        warning: "bg-amber-500/10 text-amber-700 border-amber-500/20",
        danger: "bg-red-500/10 text-red-700 border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant }), className)}
        role="alert"
        {...props}
      />
    );
  }
);
Banner.displayName = "Banner";

export { Banner, bannerVariants };

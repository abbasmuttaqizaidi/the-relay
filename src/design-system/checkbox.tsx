import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Checkbox Component
 * 16x16px box, rounded-[2px], border 1px solid #CBD5E1, checked fill #000000 or #171F2C with crisp white check
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    accent?: "black" | "orange";
  }
>(({ className, accent = "black", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-[2px] border border-[#CBD5E1] bg-white cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#000000]/20 disabled:cursor-not-allowed disabled:opacity-50",
      accent === "black"
        ? "data-[state=checked]:bg-[#000000] data-[state=checked]:border-[#000000] data-[state=checked]:text-white"
        : "data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316] data-[state=checked]:text-white",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-3 w-3 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

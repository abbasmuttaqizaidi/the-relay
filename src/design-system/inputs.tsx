import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Base Input Component
 * Height 40px, background #FFFFFF, border 1px solid #E2E8F0, text #171F2C, font body-md, rounded-[4px]
 * Focus state: border shifts to #000000 or #F97316 with 1px ring
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  focusAccent?: "black" | "orange";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", focusAccent = "black", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-[4px] border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs md:text-sm text-[#171F2C] placeholder-[#94A3B8] transition-colors outline-none",
          "hover:border-[#CBD5E1]",
          focusAccent === "black"
            ? "focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20"
            : "focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

/**
 * SearchInput Component
 * Dedicated search field with leading Search icon and optional clear button
 */
export interface SearchInputProps extends Omit<InputProps, "type"> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, focusAccent = "black", ...props }, ref) => {
    return (
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
        <input
          type="text"
          ref={ref}
          value={value}
          className={cn(
            "w-full h-10 pl-9 pr-8 text-xs md:text-sm bg-white text-[#171F2C] placeholder-[#94A3B8] rounded-[4px] border border-[#E2E8F0] outline-none transition-colors",
            "hover:border-[#CBD5E1]",
            focusAccent === "black"
              ? "focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20"
              : "focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20",
            className,
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#171F2C] p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

/**
 * Textarea Component
 * Multi-line field styled with design system perimeter and focus rings
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  focusAccent?: "black" | "orange";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, focusAccent = "black", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-[4px] border border-[#E2E8F0] bg-white p-3.5 text-xs md:text-sm text-[#171F2C] placeholder-[#94A3B8] leading-relaxed transition-colors outline-none",
          "hover:border-[#CBD5E1]",
          focusAccent === "black"
            ? "focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20"
            : "focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC]",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

/**
 * FormLabel Component
 * Formatted in body-sm-medium (#171F2C or #64748B)
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-xs font-semibold text-[#171F2C] select-none block", className)}
      {...props}
    >
      {children}
      {required && <span className="text-[#DC2626] ml-0.5">*</span>}
    </label>
  );
}

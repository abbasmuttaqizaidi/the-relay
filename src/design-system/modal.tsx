import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void | Promise<void>;
  footer?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick?: () => void | Promise<void>;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit";
    variant?: "authoritative" | "high-intent" | "destructive" | "monochrome";
  };
  secondaryAction?: {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
  };
  maxWidth?: string;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  footer,
  primaryAction,
  secondaryAction,
  maxWidth = "max-w-[620px]",
  className,
}: ModalProps) {
  const contentBody = (
    <>
      {/* Modal Body with crisp, clean container padding */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 space-y-4 text-left">
        {children}
      </div>

      {/* Modal Footer with compact buttons and reduced height */}
      {(footer || primaryAction || secondaryAction) && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 sm:px-6 sm:py-2.5 flex flex-row items-center justify-end gap-2.5 shrink-0">
          {footer ? (
            footer
          ) : (
            <>
              {secondaryAction && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={secondaryAction.onClick || (() => onOpenChange(false))}
                  disabled={secondaryAction.disabled}
                >
                  {secondaryAction.label || "Cancel"}
                </Button>
              )}
              {primaryAction && (
                <Button
                  type={primaryAction.type || (onSubmit ? "submit" : "button")}
                  variant={primaryAction.variant || "authoritative"}
                  size="sm"
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled || primaryAction.loading}
                  className="hover:bg-[#F97316] transition-all gap-1.5 font-semibold"
                >
                  {primaryAction.loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {primaryAction.label}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] w-[calc(100vw-1.5rem)] flex-col bg-white text-left font-sans shadow-xl rounded-[4px] border border-slate-200 overflow-hidden duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            maxWidth,
            className,
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {/* Header Bar: Left Title & Subtitle, Right Center-Aligned Close Button */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 sm:px-6 sm:py-3.5 bg-white shrink-0">
            <div className="space-y-0.5 pr-4 min-w-0">
              <DialogPrimitive.Title className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-xs text-slate-500 font-sans leading-relaxed">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>

            {/* Right Center-Aligned Cross Button */}
            <DialogPrimitive.Close className="rounded-[2px] p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center justify-center">
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Form wrapper if onSubmit is passed */}
          {onSubmit ? (
            <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
              {contentBody}
            </form>
          ) : (
            contentBody
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

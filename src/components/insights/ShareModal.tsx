import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Check,
  Share2,
  Globe,
  Mail,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

export interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  topic?: string;
  authorName?: string;
  urlPath: string;
  type?: "insight" | "question";
}

export function ShareModal({
  open,
  onOpenChange,
  title,
  topic,
  authorName,
  urlPath,
  type = "insight",
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Compute full URL
  const origin = typeof window !== "undefined" ? window.location.origin : "https://therelay.app";
  const shareUrl = `${origin}${urlPath}`;

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      toast.success(
        `Public link copied! Anyone with this link can view this ${
          type === "question" ? "question" : "insight"
        }.`,
      );
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link to clipboard.");
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} — The Relay`,
          text: `Check out this business ${
            type === "question" ? "question" : "insight"
          } on The Relay: "${title}"`,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Native share error:", err);
        }
      }
    }
  };

  const shareText = `Check out this business ${
    type === "question" ? "question" : "insight"
  } on The Relay: "${title}"`;

  const openSocialWindow = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer,width=640,height=560");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 p-6 shadow-xl">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-orange-600" />
            Share this {type === "question" ? "Question" : "Insight"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            This is a publicly accessible link. Anyone with this link can read this without needing to log in.
          </DialogDescription>
        </DialogHeader>

        {/* Public Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
          <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold">Public Link:</span>
          <span>No login required to view</span>
        </div>

        {/* Content Snippet Preview */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded space-y-1.5 text-left">
          {topic && (
            <span className="inline-block text-[9.5px] font-mono uppercase tracking-wider font-semibold text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
              {topic}
            </span>
          )}
          <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug">
            {title}
          </p>
          {authorName && (
            <p className="text-[11px] text-slate-500 font-sans">
              Shared by <span className="font-medium text-slate-700">{authorName}</span>
            </p>
          )}
        </div>

        {/* Copy Link Input & Button */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Public URL
          </label>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={shareUrl}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="h-9 text-xs font-mono bg-slate-50 border-slate-200 text-slate-700 select-all"
            />
            <Button
              type="button"
              onClick={handleCopyLink}
              className={`h-9 px-3.5 text-xs font-mono uppercase tracking-wider font-bold shrink-0 transition-all ${
                copied
                  ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Social Share Channels */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Share directly via
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* LinkedIn */}
            <button
              type="button"
              onClick={() =>
                openSocialWindow(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl,
                  )}`,
                )
              }
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded border border-slate-200 bg-white hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 text-slate-700 hover:text-[#0077b5] text-xs font-sans font-medium transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              <span>LinkedIn</span>
            </button>

            {/* X / Twitter */}
            <button
              type="button"
              onClick={() =>
                openSocialWindow(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareUrl,
                  )}&text=${encodeURIComponent(shareText)}`,
                )
              }
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-sans font-medium transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-slate-800" />
              <span>X / Twitter</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={() =>
                openSocialWindow(
                  `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${shareText}\n${shareUrl}`,
                  )}`,
                )
              }
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded border border-slate-200 bg-white hover:bg-[#25D366]/10 hover:border-[#25D366]/30 text-slate-700 hover:text-[#25D366] text-xs font-sans font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            {/* Email */}
            <a
              href={`mailto:?subject=${encodeURIComponent(
                `${type === "question" ? "Question" : "Insight"} on The Relay: ${title}`,
              )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-sans font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span>Email</span>
            </a>
          </div>

          {/* Native System Share (Mobile / Mac Safari) */}
          {canNativeShare && (
            <div className="pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleNativeShare}
                className="w-full text-xs font-mono uppercase tracking-wider h-8 text-slate-600 border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                More options (System Share)
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

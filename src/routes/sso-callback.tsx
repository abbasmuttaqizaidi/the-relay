import { createFileRoute } from "@tanstack/react-router";
import { AuthenticateWithRedirectCallback } from "@clerk/tanstack-react-start";
import { Loader2 } from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

export const Route = createFileRoute("/sso-callback")({
  head: () => ({
    meta: [
      { title: "Authenticating — The Relay" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SSOCallbackPage,
});

function SSOCallbackPage() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] w-full bg-white flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={logoUrl}
          alt="The Relay"
          className="h-10 w-auto object-contain mix-blend-multiply"
        />
        <div className="flex items-center gap-2.5">
          <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-600 font-semibold">
            Completing Google Authentication...
          </span>
        </div>
        <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
          Please wait while we establish your secure session...
        </p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}

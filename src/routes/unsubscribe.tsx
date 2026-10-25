import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, MailCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { unsubscribeFromMarketing } from "@/functions/unsubscribeFromMarketing";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: z.object({ token: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Email preferences — The Relay" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<"ready" | "submitting" | "done" | "error">(
    token ? "ready" : "error",
  );

  const unsubscribe = async () => {
    if (!token) {
      setState("error");
      return;
    }
    setState("submitting");
    try {
      await unsubscribeFromMarketing({ data: { token } });
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-5 py-12 text-slate-900">
      <section className="w-full max-w-lg border border-slate-200 p-7 sm:p-9">
        <MailCheck className="mb-5 h-6 w-6 text-orange-700" />
        <h1 className="font-display text-2xl font-bold">
          {state === "done" ? "You’re unsubscribed" : "Marketing email preferences"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600" aria-live="polite">
          {state === "done"
            ? "This email address has been added to our marketing suppression list. Transactional account emails are unaffected."
            : state === "error"
              ? "This unsubscribe link is invalid. No preferences were changed."
              : "Confirm to stop receiving marketing emails from The Relay. This does not affect transactional account messages."}
        </p>
        {state !== "done" && state !== "error" && (
          <Button
            type="button"
            onClick={unsubscribe}
            disabled={state === "submitting" || !token}
            className="mt-6 h-10 rounded-[2px] bg-slate-900 px-4 text-xs font-semibold text-white hover:bg-slate-800"
          >
            {state === "submitting" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Unsubscribe
          </Button>
        )}
      </section>
    </main>
  );
}

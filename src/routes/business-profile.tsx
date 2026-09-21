import { createFileRoute, redirect } from "@tanstack/react-router";
import { createPrivateMeta } from "@/lib/seo";

export const Route = createFileRoute("/business-profile")({
  beforeLoad: () => {
    throw redirect({ to: "/onboarding", replace: true });
  },
  head: () => ({
    meta: createPrivateMeta("Business Profile — The Relay"),
  }),
  component: () => null,
});

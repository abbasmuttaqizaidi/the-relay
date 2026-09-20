import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/business-profile")({
  beforeLoad: () => {
    throw redirect({ to: "/onboarding", replace: true });
  },
  component: () => null,
});

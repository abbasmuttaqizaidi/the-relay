import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";

export const Route = createFileRoute("/opportunities")({
  beforeLoad: async () => {
    try {
      const status = await checkOnboardingStatus();
      if (status.isAuthenticated && !status.hasBusiness) {
        throw redirect({
          to: "/onboarding",
          replace: true,
        });
      }
    } catch (err) {
      // Re-throw TanStack Router redirect objects so they are processed
      if (err && typeof err === "object" && ("to" in err || "isRedirect" in err)) {
        throw err;
      }
      console.error("Error verifying onboarding in beforeLoad:", err);
    }
  },
  component: () => <Outlet />,
});

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/eight-step-journey")({
  beforeLoad: () => {
    throw redirect({
      to: "/8-step-journey",
      statusCode: 301,
    });
  },
  component: () => null,
});

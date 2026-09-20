import { createFileRoute } from "@tanstack/react-router";
import { EightStepJourneyPage } from "./8-step-journey";

export const Route = createFileRoute("/eight-step-journey")({
  head: () => ({
    meta: [
      { title: "The Relay — 8-Step Journey" },
      {
        name: "description",
        content:
          "Step through the 8 stages of consent-driven bilateral exchange. Relay gives verified enterprises complete control at every milestone without identity exposure.",
      },
    ],
  }),
  component: EightStepJourneyPage,
});

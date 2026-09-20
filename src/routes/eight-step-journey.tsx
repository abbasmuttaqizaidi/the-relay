import { createFileRoute } from "@tanstack/react-router";
import { EightStepJourneyPage } from "./8-step-journey";

export const Route = createFileRoute("/eight-step-journey")({
  head: () => ({
    meta: [
      { title: "How The Relay Works — 8-Step B2B Opportunity Exchange | The Relay" },
      {
        name: "description",
        content:
          "See how businesses move from opportunity discovery to interest, negotiation, agreement, consent, and a completed handshake on The Relay.",
      },
      {
        property: "og:title",
        content: "How The Relay Works — 8-Step B2B Opportunity Exchange | The Relay",
      },
      {
        property: "og:description",
        content:
          "See how businesses move from opportunity discovery to interest, negotiation, agreement, consent, and a completed handshake on The Relay.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EightStepJourneyPage,
});

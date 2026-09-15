import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeEditorWorkspace } from "@/components/insights/KnowledgeEditorWorkspace";

export const Route = createFileRoute("/insights/knowledge/new")({
  head: () => ({
    meta: [
      { title: "Write Knowledge Article — The Relay" },
      {
        name: "description",
        content:
          "Publish operational lessons, practical advice, and experiments for verified businesses on The Relay.",
      },
    ],
  }),
  component: NewKnowledgePage,
});

function NewKnowledgePage() {
  return <KnowledgeEditorWorkspace />;
}

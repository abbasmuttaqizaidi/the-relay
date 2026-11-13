import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeEditorWorkspace } from "@/components/insights/KnowledgeEditorWorkspace";
import { createPrivateMeta } from "@/lib/seo";

export const Route = createFileRoute("/insights/knowledge/new")({
  head: () => createPrivateMeta("Write Knowledge Article — The Relay"),
  component: NewKnowledgePage,
});

function NewKnowledgePage() {
  return <KnowledgeEditorWorkspace />;
}

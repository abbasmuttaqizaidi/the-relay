import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeEditorWorkspace } from "@/components/insights/KnowledgeEditorWorkspace";
import { getKnowledgeInsightById } from "@/functions/getKnowledgeInsightById";

export const Route = createFileRoute("/insights/knowledge/$id/edit")({
  loader: async ({ params }) => {
    try {
      const insight = await getKnowledgeInsightById({
        data: { id: params.id },
      });
      return { insight };
    } catch {
      return { insight: null };
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.insight?.title
          ? `Edit: ${loaderData.insight.title} — The Relay`
          : "Edit Knowledge Article — The Relay",
      },
    ],
  }),
  component: EditKnowledgePage,
});

function EditKnowledgePage() {
  const { id } = Route.useParams();
  const { insight } = Route.useLoaderData();

  return (
    <KnowledgeEditorWorkspace
      knowledgeId={id}
      initialData={
        insight
          ? {
              title: insight.title,
              topic: insight.topic,
              based_on: insight.based_on,
              content: insight.content,
              content_json: insight.content_json,
              status: insight.status,
            }
          : undefined
      }
    />
  );
}

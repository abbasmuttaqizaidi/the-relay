import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { PostTypeSelection } from "@/components/post/PostTypeSelection";
import { OpportunityFormFlow } from "@/components/post/OpportunityFormFlow";
import { OfferFormFlow } from "@/components/post/OfferFormFlow";

const postSearchSchema = z.object({
  type: fallback(z.enum(["opportunity", "offer"]).optional(), undefined).default(undefined),
});

export const Route = createFileRoute("/post")({
  validateSearch: zodValidator(postSearchSchema),
  head: () => ({
    meta: [
      { title: "Post to The Relay — Business Exchange" },
      {
        name: "description",
        content:
          "Create a new business opportunity brief or share a product/service offer with verified operators.",
      },
      { property: "og:title", content: "Post to The Relay — Business Exchange" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const { isSignedIn } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate();

  // Active view: "selection" | "opportunity" | "offer"
  const [activeType, setActiveType] = useState<"selection" | "opportunity" | "offer">(
    search.type === "opportunity" || search.type === "offer"
      ? search.type
      : "selection"
  );

  // Prefill state (preserves title & description if user converts between forms)
  const [prefillTitle, setPrefillTitle] = useState("");
  const [prefillDescription, setPrefillDescription] = useState("");

  // Business profile state
  const [business, setBusiness] = useState<any>(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      try {
        const res = await checkOnboardingStatus();
        if (mounted && res?.business) {
          setBusiness(res.business);
        }
      } catch (err) {
        console.error("Error loading profile for post page:", err);
      } finally {
        if (mounted) {
          setLoadingBusiness(false);
        }
      }
    }
    loadProfile();
    return () => {
      mounted = false;
    };
  }, [isSignedIn]);

  // Handle type selection from the initial cards
  const handleSelectType = (type: "opportunity" | "offer") => {
    setActiveType(type);
    navigate({
      to: "/post",
      search: { type },
      replace: true,
    });
  };

  // Handle returning to selection screen
  const handleBackToSelection = () => {
    setActiveType("selection");
    navigate({
      to: "/post",
      search: { type: undefined },
      replace: true,
    });
  };

  // Handle switching from Opportunity to Offer (e.g. from offer detection warning)
  const handleSwitchToOffer = (title: string, description: string) => {
    setPrefillTitle(title);
    setPrefillDescription(description);
    setActiveType("offer");
    navigate({
      to: "/post",
      search: { type: "offer" },
      replace: true,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/40 text-slate-900 flex flex-col font-sans antialiased">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {activeType === "selection" && (
          <PostTypeSelection onSelect={handleSelectType} />
        )}

        {activeType === "opportunity" && (
          <OpportunityFormFlow
            business={business}
            isSignedIn={!!isSignedIn}
            initialTitle={prefillTitle}
            initialDescription={prefillDescription}
            onBack={handleBackToSelection}
            onSwitchToOffer={handleSwitchToOffer}
          />
        )}

        {activeType === "offer" && (
          <OfferFormFlow
            initialTitle={prefillTitle}
            initialDescription={prefillDescription}
            onBack={handleBackToSelection}
          />
        )}
      </main>
    </div>
  );
}

export default PostPage;

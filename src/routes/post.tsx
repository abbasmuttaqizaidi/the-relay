import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { PostTypeSelection } from "@/components/post/PostTypeSelection";
import { OpportunityFormFlow } from "@/components/post/OpportunityFormFlow";
import { OfferFormFlow } from "@/components/post/OfferFormFlow";

const postSearchSchema = z.object({
  type: fallback(z.enum(["opportunity", "offer"]).optional(), undefined).default(undefined),
  edit: fallback(z.string().optional(), undefined).default(undefined),
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
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Post to The Relay — Business Exchange" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate();

  // Active view: "selection" | "opportunity" | "offer"
  const [activeType, setActiveType] = useState<"selection" | "opportunity" | "offer">(
    search.edit
      ? "opportunity"
      : search.type === "opportunity" || search.type === "offer"
        ? search.type
        : "selection"
  );

  // Prefill state (preserves title & description if user converts between forms)
  const [prefillTitle, setPrefillTitle] = useState("");
  const [prefillDescription, setPrefillDescription] = useState("");

  // Business profile state via React Query cache
  const { data: onboardingData, isLoading: loadingBusiness } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 1, // 1 minute fresh window
  });

  const business = onboardingData?.business || null;

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
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] text-[#171F2C] flex flex-col font-sans antialiased">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {activeType === "selection" && (
          <PostTypeSelection onSelect={handleSelectType} />
        )}

        {activeType === "opportunity" && (
          <OpportunityFormFlow
            business={business}
            isSignedIn={!!isSignedIn}
            isLoadingBusiness={!isLoaded || loadingBusiness}
            initialTitle={prefillTitle}
            initialDescription={prefillDescription}
            editId={search.edit}
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

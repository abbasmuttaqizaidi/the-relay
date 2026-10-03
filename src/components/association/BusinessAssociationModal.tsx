import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Building2,
  Search,
  X,
  Clock,
  CheckCircle2,
  Loader2,
  MapPin,
  Globe,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CompanyLogo } from "@/components/company-logo";
import {
  searchApprovedBusinesses,
  getMyAssociationStatus,
  requestBusinessAssociation,
  cancelAssociationRequest,
} from "@/functions/association";
import { useBusinessAssociationModalState } from "@/lib/association-modal-store";
import { cn } from "@/lib/utils";

export function BusinessAssociationModal() {
  const { isSignedIn, isLoaded } = useAuth();
  const queryClient = useQueryClient();
  const { isOpen, closeModal } = useBusinessAssociationModalState();

  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [submittingBusinessId, setSubmittingBusinessId] = useState<string | null>(null);

  // Clean up search query when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSubmittedQuery("");
      setHasSearched(false);
    }
  }, [isOpen]);

  // 1. Current user's active/pending association status
  const { data: associationData } = useQuery({
    queryKey: ["my-association-status"],
    queryFn: async () => {
      return await getMyAssociationStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn && isOpen),
  });

  // 2. Search approved businesses - ONLY executes when user searches!
  const { data: searchResults = [], isLoading: searching } = useQuery({
    queryKey: ["search-approved-businesses", submittedQuery],
    queryFn: async () => {
      if (!submittedQuery.trim()) return [];
      return await searchApprovedBusinesses({ data: { query: submittedQuery.trim() } });
    },
    enabled: Boolean(isLoaded && isSignedIn && isOpen && hasSearched && submittedQuery.trim().length > 0),
    staleTime: 1000 * 30,
  });

  // 3. Mutation: Request / Switch Association
  const requestMutation = useMutation({
    mutationFn: async ({ businessId, companyName }: { businessId: string; companyName: string }) => {
      setSubmittingBusinessId(businessId);
      const res = await requestBusinessAssociation({ data: { businessId } });
      return { ...res, companyName };
    },
    onSuccess: (data) => {
      const isSwitch = associationData?.status === "pending" && associationData.business.id !== submittingBusinessId;
      if (isSwitch) {
        toast.success(`Association request updated to ${data.companyName}!`);
      } else {
        toast.success(`Association request sent to ${data.companyName}! The business administrator has been notified.`);
      }
      queryClient.invalidateQueries({ queryKey: ["my-association-status"] });
      closeModal();
      setSearchQuery("");
      setSubmittedQuery("");
      setHasSearched(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to submit association request.");
    },
    onSettled: () => {
      setSubmittingBusinessId(null);
    },
  });

  // 4. Mutation: Cancel Pending Association
  const cancelMutation = useMutation({
    mutationFn: async (businessId: string) => {
      return await cancelAssociationRequest({ data: { businessId } });
    },
    onSuccess: () => {
      toast.info("Association request cancelled.");
      queryClient.invalidateQueries({ queryKey: ["my-association-status"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to cancel request.");
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSubmittedQuery("");
      setHasSearched(false);
      return;
    }
    setSubmittedQuery(searchQuery.trim());
    setHasSearched(true);
  };

  const isPending = associationData?.status === "pending";
  const currentPendingBusinessId = isPending ? associationData?.business.id : null;
  const isApproved = associationData?.status === "approved";
  const currentApprovedBusinessId = isApproved ? associationData?.business.id : null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
            "w-[calc(100vw-1.5rem)] max-w-[600px] max-h-[calc(100dvh-2rem)] sm:max-h-[85vh]",
            "flex flex-col bg-white text-left font-sans shadow-2xl rounded-lg border border-slate-200 overflow-hidden",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 sm:px-6 sm:py-3.5 bg-white shrink-0">
            <div className="flex items-center gap-2.5 min-w-0 pr-3">
              <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <DialogPrimitive.Title className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug truncate">
                  {isPending ? "Edit Business Association" : "Associate with a Business"}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-[11px] text-slate-500 font-sans leading-tight mt-0.5 truncate">
                  Find your company below to request verified associate access.
                </DialogPrimitive.Description>
              </div>
            </div>

            {/* Top-Right Close Button */}
            <DialogPrimitive.Close
              className="rounded p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Pending Alert Banner (if pending) */}
          {isPending && associationData?.business && (
            <div className="px-5 py-2.5 sm:px-6 sm:py-2.5 bg-amber-50/90 border-b border-amber-200/80 flex items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-amber-950 truncate">
                  Current request: <strong className="font-bold">{associationData.business.company_name}</strong> (select another below to switch)
                </span>
              </div>
              <button
                type="button"
                onClick={() => cancelMutation.mutate(associationData.business.id)}
                disabled={cancelMutation.isPending}
                className="shrink-0 text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer disabled:opacity-50"
              >
                {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
              </button>
            </div>
          )}

          {/* Search Input Bar - Matches Questions & Knowledge search */}
          <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-b border-slate-100 bg-slate-50/40 shrink-0">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search business by name, industry, or domain (e.g. A H Mobile)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full h-9 pl-9 pr-9 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] placeholder:text-[#94A3B8] text-xs focus:outline-none focus:border-[#0F172A] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSubmittedQuery("");
                      setHasSearched(false);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="h-9 px-3.5 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                <Search className="w-3 h-3" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Results List */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3 sm:px-6 sm:py-3.5 space-y-2 max-h-[340px]">
            {searching ? (
              <div className="py-10 flex flex-col items-center justify-center gap-2 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
                <span className="text-xs font-medium">Searching verified businesses...</span>
              </div>
            ) : !hasSearched ? (
              <div className="py-10 px-4 text-center">
                <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <div className="text-xs font-semibold text-slate-700">Search for Your Business</div>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                  Type your company&apos;s name, domain, or industry above and click Search to find matching businesses.
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-10 px-4 text-center">
                <Building2 className="w-7 h-7 text-slate-300 mx-auto mb-1.5" />
                <div className="text-xs font-semibold text-slate-700">No matching businesses found</div>
                <p className="text-[11px] text-slate-400 mt-0.5 max-w-sm mx-auto">
                  No verified entities matched &ldquo;{submittedQuery}&rdquo;. Check the spelling or try searching by core words.
                </p>
              </div>
            ) : (
              searchResults.map((business) => {
                const isCurrentPending = business.id === currentPendingBusinessId;
                const isCurrentApproved = business.id === currentApprovedBusinessId;
                const isSubmittingThis = submittingBusinessId === business.id && requestMutation.isPending;

                return (
                  <div
                    key={business.id}
                    className={`p-2.5 sm:p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                      isCurrentPending
                        ? "bg-amber-50/50 border-amber-200"
                        : isCurrentApproved
                          ? "bg-emerald-50/50 border-emerald-200"
                          : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-2xs"
                    }`}
                  >
                    {/* Business Details */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <CompanyLogo
                        src={business.logo_url}
                        name={business.company_name}
                        className="w-9 h-9 rounded object-contain shrink-0 border border-slate-200 bg-white"
                      />
                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {business.company_name}
                          </span>
                          <span className="text-[9px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {business.industry}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 mt-0.5 text-[11px] text-slate-400 font-sans">
                          {business.hq_location && (
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{business.hq_location}</span>
                            </span>
                          )}
                          {business.website && (
                            <span className="hidden sm:flex items-center gap-1 truncate">
                              <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{business.website.replace(/^https?:\/\//, "")}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Request Button */}
                    <div className="shrink-0 ml-1">
                      {isCurrentPending ? (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-amber-100 text-amber-900 border border-amber-300/80 cursor-not-allowed opacity-90 shadow-2xs"
                        >
                          <Clock className="w-3 h-3 text-amber-700" />
                          <span>Pending</span>
                        </button>
                      ) : isCurrentApproved ? (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-950 border border-emerald-300/80 cursor-not-allowed opacity-90 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>Active</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            requestMutation.mutate({
                              businessId: business.id,
                              companyName: business.company_name,
                            })
                          }
                          disabled={requestMutation.isPending || isCurrentApproved}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0F172A] hover:bg-[#1E293B] active:bg-[#020617] text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
                        >
                          {isSubmittingThis ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Requesting...</span>
                            </>
                          ) : isPending ? (
                            <>
                              <span>Switch</span>
                              <ArrowRight className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              <span>Request</span>
                              <ArrowRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-2.5 sm:px-6 sm:py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-500 font-sans shrink-0">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Requests require business administrator verification.</span>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

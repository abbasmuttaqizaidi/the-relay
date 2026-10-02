import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import {
  Building2,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Users,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardTitle,
  CardDescription,
  Button,
  Input,
  ExecutiveAlertBanner,
} from "@/design-system";
import { CompanyLogo } from "@/components/company-logo";
import {
  searchApprovedBusinesses,
  getMyAssociationStatus,
  requestBusinessAssociation,
  cancelAssociationRequest,
  type BusinessSearchResult,
} from "@/functions/association";
import { createPrivateMeta } from "@/lib/seo";

export const Route = createFileRoute("/association")({
  head: () => ({
    ...createPrivateMeta("Business Association — The Relay"),
  }),
  component: AssociationPage,
});

function AssociationPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessSearchResult | null>(null);

  // 1. Current user's association status
  const { data: associationData, isLoading: loadingStatus } = useQuery({
    queryKey: ["my-association-status"],
    queryFn: async () => {
      return await getMyAssociationStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
  });

  // 2. Search approved businesses
  const { data: searchResults = [], isLoading: searching } = useQuery({
    queryKey: ["search-approved-businesses", searchQuery],
    queryFn: async () => {
      return await searchApprovedBusinesses({ data: { query: searchQuery } });
    },
    enabled: Boolean(isLoaded && isSignedIn && !associationData),
  });

  // 3. Mutation: Request Association
  const requestMutation = useMutation({
    mutationFn: async (businessId: string) => {
      return await requestBusinessAssociation({ data: { businessId } });
    },
    onSuccess: () => {
      toast.success("Association request sent successfully! The organization administrator has been notified.");
      setSelectedBusiness(null);
      queryClient.invalidateQueries({ queryKey: ["my-association-status"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to submit association request.");
    },
  });

  // 4. Mutation: Cancel Association
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

  if (!isLoaded || loadingStatus) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900 font-display">Sign In to Request Association</h1>
        <p className="text-xs text-slate-500">
          Connect your account with your organization's approved business on The Relay.
        </p>
        <Button onClick={() => navigate({ to: "/login" })} className="bg-slate-950 text-white hover:bg-slate-800">
          Sign In
        </Button>
      </div>
    );
  }

  const isPending = associationData?.status === "pending";
  const isApproved = associationData?.status === "approved";

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-slate-900 font-sans pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Header Title Section */}
        <div className="space-y-1.5 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Operator Affiliation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-display">
            Business Association
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Connect your individual profile to an established, verified business already active on The Relay.
          </p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            STATE 1: APPROVED ASSOCIATE
            ═════════════════════════════════════════════════════════════════════ */}
        {isApproved && associationData?.business && (
          <Card className="bg-white border-slate-200 p-6 space-y-5 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CompanyLogo
                  src={associationData.business.logo_url}
                  name={associationData.business.company_name}
                  className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                  fallbackClassName="w-14 h-14 rounded-lg bg-slate-950 text-white font-bold text-sm flex items-center justify-center shrink-0"
                  textClassName="font-mono text-sm font-bold"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-950 font-display">
                      {associationData.business.company_name}
                    </h2>
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified Associate
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {associationData.business.industry} • {associationData.business.hq_location || "Headquarters Verified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Active Organizational Connection</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your profile is officially associated with <strong>{associationData.business.company_name}</strong>. Your comments and contributions across Insights and Questions display your verified entity association.
              </p>
            </div>
          </Card>
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            STATE 2: PENDING ASSOCIATION REQUEST (Continuous Alert & Banner)
            ═════════════════════════════════════════════════════════════════════ */}
        {isPending && associationData?.business && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Status Alert Banner */}
            <div className="p-4 sm:p-5 rounded-lg bg-amber-50/60 border border-amber-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-amber-100/80 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-950 font-sans uppercase tracking-wider">
                      Request Pending Approval
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 font-bold border border-amber-300">
                      In Review
                    </span>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Aapki request abhi <strong>pending</strong> hai. Your request to connect with <strong>{associationData.business.company_name}</strong> has been submitted to their administrator.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => cancelMutation.mutate(associationData.business.id)}
                disabled={cancelMutation.isPending}
                className="shrink-0 text-xs border-amber-300 text-amber-900 hover:bg-amber-100 hover:text-amber-950"
              >
                {cancelMutation.isPending ? "Cancelling..." : "Cancel Request"}
              </Button>
            </div>

            {/* Requested Organization Details Card */}
            <Card className="bg-white border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Requested Entity
              </div>
              <div className="flex items-center gap-3.5">
                <CompanyLogo
                  src={associationData.business.logo_url}
                  name={associationData.business.company_name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                  fallbackClassName="w-12 h-12 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0"
                  textClassName="font-mono text-xs font-bold"
                />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-950 font-display">
                    {associationData.business.company_name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {associationData.business.industry} • {associationData.business.hq_location || "Headquarters Registered"}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Jaise hi request approve hogi, fauran notification generate hoga.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Approval hote hi aapke registered email par confirmation mail bheja jayega.</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            STATE 3: NO PENDING/APPROVED ASSOCIATION (Search & Connect Flow)
            ═════════════════════════════════════════════════════════════════════ */}
        {!associationData && (
          <div className="space-y-6">
            {/* 3 Simple Steps Information Card */}
            <Card className="bg-white border-slate-200 p-6 space-y-5 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-950 font-display">
                  How Association Works
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Aap khud ko kisi existing business se associate/connect kar sakte ho jo ke The Relay par already approved hai. Steps bahut hi simple hain:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Step 01</div>
                  <h3 className="text-xs font-bold text-slate-900 font-sans">Search Business</h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Apne business ka name search box mein type karo aur unki profile locate karo.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Step 02</div>
                  <h3 className="text-xs font-bold text-slate-900 font-sans">Send Request</h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    "Send Request" par click karo. Request us business ke administrators tak pahunch jayegi.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Step 03</div>
                  <h3 className="text-xs font-bold text-slate-900 font-sans">Instant Confirmation</h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Approve hote hi platform notification aayega aur aapko confirmation mail milega.
                  </p>
                </div>
              </div>
            </Card>

            {/* Search Input Box */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-900 font-sans uppercase tracking-wider">
                Search Approved Businesses on The Relay
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type company name (e.g. Acme Corp, Apex Logistics)..."
                  className="pl-10 h-11 bg-white border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 shadow-2xs font-sans"
                />
                {searching && (
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  {searchQuery.trim() ? "Search Results" : "Verified Businesses Available for Association"}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {searchResults.length} {searchResults.length === 1 ? "entity" : "entities"} found
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-lg space-y-2">
                  <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">No approved businesses found matching &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-[11px] text-slate-400">
                    Make sure the business is already registered and approved on The Relay.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {searchResults.map((biz) => {
                    const isSelected = selectedBusiness?.id === biz.id;
                    const isSubmittingThis = requestMutation.isPending && isSelected;

                    return (
                      <div
                        key={biz.id}
                        className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors shadow-2xs"
                      >
                        <div className="flex items-start gap-3">
                          <CompanyLogo
                            src={biz.logo_url}
                            name={biz.company_name}
                            className="w-10 h-10 rounded-md object-cover border border-slate-200 shrink-0"
                            fallbackClassName="w-10 h-10 rounded-md bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0"
                            textClassName="font-mono text-xs font-bold"
                          />
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate font-sans">
                              {biz.company_name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">
                              {biz.industry}
                            </p>
                            {biz.hq_location && (
                              <p className="text-[10px] font-mono text-slate-400 truncate">
                                {biz.hq_location}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                            Approved Entity
                          </span>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedBusiness(biz);
                              requestMutation.mutate(biz.id);
                            }}
                            disabled={isSubmittingThis}
                            className="text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-colors cursor-pointer h-8 px-3 rounded"
                          >
                            {isSubmittingThis ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-3 h-3 mr-1.5" />
                                Send Request
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

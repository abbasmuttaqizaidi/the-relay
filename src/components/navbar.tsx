import { Link, useMatchRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth, useUser, useClerk, SignInButton } from "@clerk/tanstack-react-start";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Menu,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Inbox,
  Send,
  FileText,
  Bookmark,
  ArrowLeftRight,
  MessageSquare,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Search,
  Plus,
  Settings,
  LogOut,
  Building2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { SolutionsDropdown, SolutionsMobileSection } from "@/design-system";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getIncomingRequestsCount } from "@/functions/getIncomingRequestsCount";
import { getSentRequests } from "@/functions/getSentRequests";
import { getMyOpportunities } from "@/functions/getMyOpportunities";
import { getSavedOpportunities } from "@/functions/getSavedOpportunities";
import { getCompanyInitials } from "@/lib/utils";
import { PostTypeSelectionModal } from "@/components/post/PostTypeSelectionModal";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

interface NavbarProps {
  incomingCount?: number;
}

export function Navbar({ incomingCount: propCount = 0 }: NavbarProps) {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const currentSearch = routerState.location.search as any;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [postTypeModalOpen, setPostTypeModalOpen] = useState(false);
  const [isMyOppsExpanded, setIsMyOppsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Automatically close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // 1. Onboarding / Business Profile Query
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 1,
  });

  const business = onboardingData?.business || null;
  const isApproved = business?.status === "approved";

  // 2. Incoming Proposals Count
  const { data: incomingCountData } = useQuery({
    queryKey: ["incoming-requests-count", userId],
    queryFn: async () => {
      if (!isSignedIn) return { count: 0 };
      const res = await getIncomingRequestsCount();
      return res || { count: 0 };
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 30,
    refetchInterval: 30000,
  });
  const incomingCount = incomingCountData?.count ?? propCount;

  // 3. Sent Proposals Query
  const { data: sentRequests = [] } = useQuery({
    queryKey: ["sent-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getSentRequests();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });
  const sentCount = sentRequests.filter((r: any) => r.status !== "withdrawn").length;

  // 4. My Listings Count
  const { data: myListings = [] } = useQuery({
    queryKey: ["my-opportunities", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getMyOpportunities();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });
  const listingsCount = myListings.length;

  // 5. Saved Opportunities Count
  const { data: savedItems = [] } = useQuery({
    queryKey: ["saved-opportunities-list", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const items = await getSavedOpportunities();
      return items || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });
  const savedCount = savedItems.length;

  // Active route detections
  const isHome = !!matchRoute({ to: "/", fuzzy: false });
  const isDashboard = !!matchRoute({ to: "/dashboard", fuzzy: true });
  const isOpportunities = !!matchRoute({ to: "/opportunities", fuzzy: true });
  const isProposals = !!matchRoute({ to: "/proposals", fuzzy: true });
  const isMyRelay = !!matchRoute({ to: "/my-relay", fuzzy: true });
  const isNetwork = !!matchRoute({ to: "/network", fuzzy: true });
  const isInsights = !!matchRoute({ to: "/insights", fuzzy: true });
  const isFaq = !!matchRoute({ to: "/faq", fuzzy: true });
  const isBusinessProfile = !!matchRoute({ to: "/business-profile", fuzzy: true });

  // Proposal Sub-tab detections
  const isProposalsReceived = isProposals && (currentSearch?.tab === "received" || !currentSearch?.tab);
  const isProposalsSent = isProposals && currentSearch?.tab === "sent";

  // My Relay Sub-tab detections
  const isMyRelayInbound = isMyRelay && currentSearch?.tab === "inbound";
  const isMyRelayOutbound = isMyRelay && currentSearch?.tab === "outbound";
  const isMyRelaySaved = isMyRelay && currentSearch?.tab === "saved";
  const isMyRelayListings = isMyRelay && currentSearch?.tab === "listings";
  const isMyRelayRequests = isMyRelay && (currentSearch?.tab === "requests" || isMyRelayInbound || isMyRelayOutbound);

  // Breadcrumb Title Helper
  const breadcrumbTitle = useMemo(() => {
    if (isDashboard) return "Exchange Command Center";
    if (isOpportunities) return "Commercial Board";
    if (isProposals) return currentSearch?.tab === "sent" ? "Sent History" : "Received History";
    if (isMyRelay) {
      if (currentSearch?.tab === "saved") return "Saved Opportunities";
      if (currentSearch?.tab === "inbound") return "Inbound Deals Pipeline";
      if (currentSearch?.tab === "outbound") return "Outbound Deals Pipeline";
      if (currentSearch?.tab === "requests") return "Opportunities & Request Pipeline";
      return "My Listings";
    }
    if (isInsights) return "Knowledge & Peer Insights";
    if (isNetwork) return "Verified Network";
    if (isFaq) return "Frequently Asked Questions";
    if (isBusinessProfile) return "Entity Settings";
    return "Opportunity Exchange";
  }, [isOpportunities, isProposals, isMyRelay, isInsights, isNetwork, isFaq, isBusinessProfile, currentSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/opportunities",
        search: { q: searchQuery.trim(), page: 1 } as any,
      });
    }
  };

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("relay-global-search-input");
        if (searchInput) {
          searchInput.focus();
        } else {
          navigate({ to: "/opportunities" });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGGED-OUT PUBLIC NAVBAR
  // ═══════════════════════════════════════════════════════════════════════════
  if (!isSignedIn) {
    return (
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 shrink-0">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <img
                src={logoUrl}
                alt="The Relay Logo"
                className="h-10 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="hidden md:flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
              <SolutionsDropdown />
              <Link
                to="/opportunities"
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                Opportunities
              </Link>
              <Link
                to="/insights"
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                Insights
              </Link>
              <Link
                to="/faq"
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition-colors hidden sm:inline-block"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-slate-950 text-white hover:bg-slate-800 font-semibold text-xs px-4 py-2 rounded transition-all shadow-xs"
            >
              Join The Relay
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-slate-100 text-slate-600 md:hidden"
                  aria-label="Toggle Navigation Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-6 pt-4">
                  <Link to="/" className="flex items-center gap-2">
                    <img src={logoUrl} alt="The Relay" className="h-8 w-auto object-contain" />
                  </Link>
                  <div className="flex flex-col gap-3 font-medium text-sm text-slate-700">
                    <Link to="/opportunities" className="py-2 border-b border-slate-100">
                      Opportunities
                    </Link>
                    <Link to="/insights" className="py-2 border-b border-slate-100">
                      Insights
                    </Link>
                    <Link to="/faq" className="py-2 border-b border-slate-100">
                      FAQ
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-6 border-t border-slate-100">
                  <Link
                    to="/login"
                    className="w-full py-2.5 text-center text-sm font-semibold border border-slate-200 rounded text-slate-800 hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full py-2.5 text-center text-sm font-semibold bg-slate-950 text-white rounded hover:bg-slate-800 shadow-xs"
                  >
                    Get Started
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGGED-IN NAVIGATION: LEFT SIDEBAR + TOP HEADER (Matching seo_code_guide.md)
  // ═══════════════════════════════════════════════════════════════════════════
  const companyName = business?.company_name || user?.fullName || "Your Business";
  const userInitials = getCompanyInitials(companyName);

  const sidebarContent = (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center bg-white flex-shrink-0 border-b border-slate-100">
        <Link to="/opportunities" className="flex items-center group">
          <img
            src={logoUrl}
            alt="The Relay Logo"
            className="h-9 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      {/* Nav Menu Items */}
      <div className="overflow-y-auto flex-1 px-4 py-4 flex flex-col gap-4 scrollbar-none font-sans text-xs">
        {/* 0. COMMAND CENTER */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Exchange
          </div>
          <Link
            to="/dashboard"
            className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isDashboard
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className={`w-4 h-4 ${isDashboard ? "text-slate-950" : "text-slate-500"}`} />
              <span>Dashboard</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-white font-bold">
              Hub
            </span>
          </Link>
        </nav>

        {/* 1. MARKETPLACE */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Marketplace
          </div>
          <Link
            to="/opportunities"
            className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isOpportunities
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className={`w-4 h-4 ${isOpportunities ? "text-slate-950" : "text-slate-500"}`} />
              <span>Opportunities</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-bold">
              Explore
            </span>
          </Link>
        </nav>

        {/* 2. HISTORY */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            History
          </div>
          <Link
            to="/proposals"
            search={{ tab: "received" } as any}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isProposalsReceived
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className={`w-4 h-4 ${isProposalsReceived ? "text-slate-950" : "text-slate-500"}`} />
              <span>Received</span>
            </div>
            {incomingCount > 0 && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                {incomingCount}
              </span>
            )}
          </Link>
          <Link
            to="/proposals"
            search={{ tab: "sent" } as any}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isProposalsSent
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Send className={`w-4 h-4 ${isProposalsSent ? "text-slate-950" : "text-slate-500"}`} />
              <span>Sent</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
              {sentCount}
            </span>
          </Link>
        </nav>

        {/* 3. MY RELAY */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            My Relay
          </div>
          <Link
            to="/my-relay"
            search={{ tab: "listings" } as any}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isMyRelayListings
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${isMyRelayListings ? "text-slate-950" : "text-slate-500"}`} />
              <span>Listings</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
              {listingsCount}
            </span>
          </Link>
          <Link
            to="/my-relay"
            search={{ tab: "saved" } as any}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isMyRelaySaved
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bookmark className={`w-4 h-4 ${isMyRelaySaved ? "text-slate-950" : "text-slate-500"}`} />
              <span>Saved</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
              {savedCount}
            </span>
          </Link>

          {/* Collapsible My Opportunities Sub-Menu */}
          <div className="flex flex-col gap-0.5 pt-1">
            <button
              type="button"
              onClick={() => {
                setIsMyOppsExpanded(!isMyOppsExpanded);
                if (!isMyRelayInbound && !isMyRelayOutbound && !isMyRelayRequests) {
                  navigate({ to: "/my-relay", search: { tab: "inbound" } as any });
                }
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium cursor-pointer w-full text-left ${
                isMyRelayRequests
                  ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ArrowLeftRight className={`w-4 h-4 ${isMyRelayRequests ? "text-slate-950" : "text-slate-500"}`} />
                <span>My Opportunities</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  isMyOppsExpanded ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {isMyOppsExpanded && (
              <div className="pl-6 flex flex-col gap-1 border-l-2 border-slate-200 ml-4 my-1">
                <Link
                  to="/my-relay"
                  search={{ tab: "inbound" } as any}
                  className={`flex items-center justify-between pl-3 pr-3 py-1.5 rounded-md text-xs transition-colors ${
                    isMyRelayInbound
                      ? "text-slate-950 font-bold bg-slate-100/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  <span>Inbound</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-medium">
                    {incomingCount}
                  </span>
                </Link>
                <Link
                  to="/my-relay"
                  search={{ tab: "outbound" } as any}
                  className={`flex items-center justify-between pl-3 pr-3 py-1.5 rounded-md text-xs transition-colors ${
                    isMyRelayOutbound
                      ? "text-slate-950 font-bold bg-slate-100/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  <span>Outbound</span>
                  <span className="font-mono text-[9px] px-1 rounded bg-slate-100 text-slate-500 font-medium">
                    {sentCount}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* 4. INSIGHTS */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Insights
          </div>
          <Link
            to="/insights"
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isInsights
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className={`w-4 h-4 ${isInsights ? "text-slate-950" : "text-slate-500"}`} />
              <span>Questions</span>
            </div>
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold">
              Q&A
            </span>
          </Link>
          <Link
            to="/insights"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors font-medium"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Knowledge Articles</span>
            </div>
          </Link>
          <Link
            to="/faq"
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isFaq
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className={`w-4 h-4 ${isFaq ? "text-slate-950" : "text-slate-500"}`} />
              <span>FAQ</span>
            </div>
          </Link>
        </nav>

        {/* 5. ECOSYSTEM */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Ecosystem
          </div>
          <Link
            to="/network"
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isNetwork
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className={`w-4 h-4 ${isNetwork ? "text-slate-950" : "text-slate-500"}`} />
              <span>Verified Network</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/design-system"
            search={{ tab: "overview" } as any}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors font-medium"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Design System</span>
            </div>
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold">
              Storybook
            </span>
          </Link>
        </nav>
      </div>

      {/* Bottom Profile Footer Strip */}
      <div className="p-3 bg-white border-t border-slate-200/80">
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-xs text-slate-900 truncate">
                {companyName}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-700 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                {isApproved ? "Verified Member" : "Profile Pending"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to="/business-profile"
              title="Entity Settings"
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-200/70 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => signOut(() => navigate({ to: "/" }))}
              title="Sign Out"
              className="p-1.5 text-slate-500 hover:text-red-600 rounded-md hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════════════
          1. DESKTOP LEFT SIDEBAR (fixed left-0 top-0 w-60)
          ═════════════════════════════════════════════════════════════════════ */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none hidden md:flex border-r border-slate-200/80">
        {sidebarContent}
      </aside>

      {/* ═════════════════════════════════════════════════════════════════════
          2. TOP HEADER BAR (Desktop fixed top-0 left-60 right-0 h-16)
          ═════════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 md:left-60 h-16 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200/80">
        {/* Left: Mobile Drawer Trigger + Breadcrumb + Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-slate-100 text-slate-700 md:hidden"
                aria-label="Open Navigation Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0 flex flex-col">
              {sidebarContent}
            </SheetContent>
          </Sheet>

          {/* Breadcrumb Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold shrink-0">
            <span className="text-slate-500">Relay B2B</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-extrabold">{breadcrumbTitle}</span>
          </div>

          {/* Search Input Div (Retained design with ⌘K) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 w-72 xl:w-80 gap-2 text-slate-500 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all shadow-2xs"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              id="relay-global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunities, NAICS, partner..."
              className="bg-transparent font-sans text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full"
            />
            <kbd className="text-[9px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shrink-0 font-bold">
              ⌘K
            </kbd>
          </form>
        </div>

        {/* Right Actions: Post Opportunity + Notification Bell + User Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setPostTypeModalOpen(true)}
            id="global-post-opportunity-btn"
            className="inline-flex items-center gap-1.5 bg-slate-950 text-white hover:bg-slate-800 font-semibold text-xs px-3 sm:px-3.5 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Post Opportunity</span>
            <span className="sm:hidden">Post</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

          <NotificationsDropdown />
          <UserAvatarDropdown />
        </div>
      </header>

      {/* Global Post Type Selection Modal */}
      <PostTypeSelectionModal
        open={postTypeModalOpen}
        onOpenChange={setPostTypeModalOpen}
      />
    </>
  );
}

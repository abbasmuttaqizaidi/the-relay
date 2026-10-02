import { Link, useMatchRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth, useUser, useClerk, SignInButton } from "@clerk/tanstack-react-start";
import { useEffect, useState, useMemo, useRef } from "react";
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
  User as UserIcon,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { SolutionsDropdown, SolutionsMobileSection } from "@/design-system";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getCommunityProfile } from "@/functions/communityProfile";
import { getIncomingRequests } from "@/functions/getIncomingRequests";
import { getSentRequests } from "@/functions/getSentRequests";
import { getMyOpportunities } from "@/functions/getMyOpportunities";
import { getSavedOpportunities } from "@/functions/getSavedOpportunities";
import { getKnowledgeInsights } from "@/functions/getKnowledgeInsights";
import { getCompanyInitials } from "@/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import { PostTypeSelectionModal } from "@/components/post/PostTypeSelectionModal";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

interface NavHoverItem {
  title: string;
  to: string;
  search?: Record<string, unknown>;
  icon: React.ReactNode;
}

function NavHoverDropdown({
  label,
  to,
  search,
  isActive,
  items,
  onItemClick,
}: {
  label: string;
  to?: string;
  search?: Record<string, unknown>;
  isActive?: boolean;
  items: NavHoverItem[];
  onItemClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {to ? (
        <Link
          to={to as any}
          search={search as any}
          className={`flex items-center gap-1.5 py-1 text-xs font-mono uppercase tracking-[0.12em] font-bold transition-colors ${
            isActive
              ? "text-slate-950 font-extrabold"
              : "text-slate-500 hover:text-slate-950"
          }`}
        >
          <span>{label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-slate-900" : "text-slate-400"
            }`}
          />
        </Link>
      ) : (
        <button
          type="button"
          className={`flex items-center gap-1.5 py-1 text-xs font-mono uppercase tracking-[0.12em] font-bold transition-colors cursor-pointer ${
            isActive
              ? "text-slate-950 font-extrabold"
              : "text-slate-500 hover:text-slate-950"
          }`}
        >
          <span>{label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-slate-900" : "text-slate-400"
            }`}
          />
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-1.5 min-w-[210px] flex flex-col gap-0.5">
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.to as any}
                search={item.search as any}
                onClick={() => {
                  setIsOpen(false);
                  onItemClick?.();
                }}
                className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-100/80 transition-colors text-slate-700 hover:text-slate-950 font-sans cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-slate-400 group-hover:text-slate-900 transition-colors shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-slate-950 truncate transition-colors">
                    {item.title}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const currentHref = routerState.location.href;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [postTypeModalOpen, setPostTypeModalOpen] = useState(false);
  const [isMyOppsExpanded, setIsMyOppsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Automatically close mobile menu whenever location changes
  const prevHrefRef = useRef(currentHref);
  useEffect(() => {
    if (prevHrefRef.current !== currentHref) {
      prevHrefRef.current = currentHref;
      setMobileMenuOpen(false);
    }
  }, [currentHref]);

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

  const { data: communityProfile } = useQuery({
    queryKey: ["community-profile", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await getCommunityProfile();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  const business = onboardingData?.business || null;
  const isApproved = business?.status === "approved";

  // 2. Incoming Proposals Query
  const { data: incomingRequests = [] } = useQuery({
    queryKey: ["incoming-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getIncomingRequests();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });
  const incomingCount = incomingRequests.length || propCount;

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

  // 6. My Knowledge Articles Count
  const { data: myKnowledgeItems = [] } = useQuery({
    queryKey: ["my-knowledge-articles-count", business?.id],
    queryFn: async () => {
      if (!isSignedIn || !business?.id) return [];
      const data = await getKnowledgeInsights({ data: { business_id: business.id } });
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn && business?.id),
    staleTime: 1000 * 60 * 2,
  });
  const myKnowledgeCount = myKnowledgeItems.length;

  // 7. Saved Knowledge Articles Count
  const [savedArticlesCount, setSavedArticlesCount] = useState(0);
  useEffect(() => {
    const updateSavedCount = () => {
      try {
        const saved = localStorage.getItem("relay_saved_insights");
        if (saved) {
          const parsed = JSON.parse(saved);
          setSavedArticlesCount(Array.isArray(parsed) ? parsed.length : 0);
        } else {
          setSavedArticlesCount(0);
        }
      } catch (_) {
        setSavedArticlesCount(0);
      }
    };
    updateSavedCount();
    window.addEventListener("storage", updateSavedCount);
    window.addEventListener("relay:saved_insights", updateSavedCount);
    return () => {
      window.removeEventListener("storage", updateSavedCount);
      window.removeEventListener("relay:saved_insights", updateSavedCount);
    };
  }, [currentPath]);

  // Active route detections
  const isHome = !!matchRoute({ to: "/", fuzzy: false });
  const isDashboard = !!matchRoute({ to: "/dashboard", fuzzy: true });
  const isOpportunities = !!matchRoute({ to: "/opportunities", fuzzy: true });
  const isConnections = !!matchRoute({ to: "/connections", fuzzy: true });
  const isProposals = !!matchRoute({ to: "/proposals", fuzzy: true });
  const isMyRelay = !!matchRoute({ to: "/my-relay", fuzzy: true });
  const isNetwork = !!matchRoute({ to: "/network", fuzzy: true });
  const isInsights = !!matchRoute({ to: "/insights", fuzzy: true });
  const isFaq = !!matchRoute({ to: "/faq", fuzzy: true });
  const isAbout = !!matchRoute({ to: "/about", fuzzy: true });
  const isBusinessProfile = !!matchRoute({ to: "/business-profile", fuzzy: true });

  // Platform Route detections
  const isJourney = !!matchRoute({ to: "/8-step-journey", fuzzy: true });
  const isPillars = !!matchRoute({ to: "/core-pillars", fuzzy: true });
  const isTrust = !!matchRoute({ to: "/trust-and-safety", fuzzy: true });
  const isPlatformActive = isJourney || isPillars || isTrust;

  // Proposal Sub-tab detections
  const isProposalsReceived = isProposals && (currentSearch?.tab === "received" || !currentSearch?.tab);
  const isProposalsSent = isProposals && currentSearch?.tab === "sent";

  // My Relay Sub-tab detections
  const isMyRelayInbound = isMyRelay && currentSearch?.tab === "inbound";
  const isMyRelayOutbound = isMyRelay && currentSearch?.tab === "outbound";
  const isMyRelaySaved = isMyRelay && currentSearch?.tab === "saved";
  const isMyRelayListings = isMyRelay && currentSearch?.tab === "listings";
  const isMyRelayRequests = isMyRelay && (currentSearch?.tab === "requests" || isMyRelayInbound || isMyRelayOutbound);

  // Insights Sub-tab detections
  const isInsightsQuestions = isInsights && (currentSearch?.tab === "questions" || !currentSearch?.tab);
  const isInsightsKnowledge = isInsights && currentSearch?.tab === "knowledge";
  const isMyArticles = isInsightsKnowledge && currentSearch?.filter === "my";
  const isSavedArticles = isInsightsKnowledge && currentSearch?.filter === "saved";
  const isAllKnowledge = isInsightsKnowledge && !isMyArticles && !isSavedArticles;

  // Breadcrumb Title Helper
  const breadcrumbTitle = useMemo(() => {
    if (isDashboard) return "Exchange Command Center";
    if (isConnections) return "Exchange Hub";
    if (isOpportunities) return "Commercial Board";
    if (isProposals) return currentSearch?.tab === "sent" ? "Sent History" : "Received History";
    if (isMyRelay) {
      if (currentSearch?.tab === "saved") return "Saved Opportunities";
      if (currentSearch?.tab === "inbound") return "Inbound Deals Pipeline";
      if (currentSearch?.tab === "outbound") return "Outbound Deals Pipeline";
      if (currentSearch?.tab === "requests") return "Opportunities & Request Pipeline";
      return "My Listings";
    }
    if (isInsights) {
      if (isMyArticles) return "My Knowledge Articles";
      if (isSavedArticles) return "Saved Articles";
      return isInsightsKnowledge ? "Knowledge Articles & Playbooks" : "Questions & Peer Advisory";
    }
    if (isNetwork) return "Verified Network";
    if (isFaq) return "Frequently Asked Questions";
    if (isBusinessProfile) return "Entity Settings";
    return "Opportunity Exchange";
  }, [isDashboard, isConnections, isOpportunities, isProposals, isMyRelay, isInsights, isInsightsKnowledge, isMyArticles, isSavedArticles, isNetwork, isFaq, isBusinessProfile, currentSearch]);

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
                  className="p-2 rounded-md hover:bg-slate-100 text-slate-700 md:hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Toggle Navigation Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-6 flex flex-col justify-between z-[100] h-full">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Public Mobile Navigation Drawer</SheetDescription>
                <div className="flex flex-col gap-6 pt-4">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <img src={logoUrl} alt="The Relay" className="h-8 w-auto object-contain" />
                  </Link>
                  <div className="flex flex-col gap-3 font-medium text-sm text-slate-700">
                    <Link to="/opportunities" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 hover:text-slate-900 transition-colors">
                      Opportunities
                    </Link>
                    <Link to="/insights" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 hover:text-slate-900 transition-colors">
                      Insights & Knowledge
                    </Link>
                    <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 hover:text-slate-900 transition-colors">
                      FAQ
                    </Link>
                    <Link to="/network" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 hover:text-slate-900 transition-colors">
                      Verified Network
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-6 border-t border-slate-100">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold border border-slate-200 rounded text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold bg-slate-950 text-white rounded hover:bg-slate-800 shadow-xs transition-colors"
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
  const companyName = business?.company_name || "Your Business";
  const userInitials = getCompanyInitials(companyName);
  const isCommunityMember = !business || communityProfile?.type === "community_member";

  const renderDisabledItem = (icon: React.ReactNode, label: string, badge?: string) => (
    <div
      onClick={() => {
        setMobileMenuOpen(false);
        toast.info(
          "Business verification required to access this feature. Please upgrade to a Verified Business Account.",
          {
            action: {
              label: "Upgrade",
              onClick: () => navigate({ to: "/onboarding" }),
            },
          }
        );
      }}
      className="group flex items-center justify-between px-3 py-2 rounded-lg opacity-40 hover:opacity-60 transition-opacity cursor-pointer select-none text-slate-500 font-medium"
      title="Verified Business Account required"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Lock className="w-3 h-3 text-slate-400" />
        {badge && (
          <span className="font-mono text-[9px] uppercase px-1 py-0.2 rounded bg-slate-100 text-slate-400 font-bold">
            {badge}
          </span>
        )}
      </div>
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center bg-white flex-shrink-0 border-b border-slate-100">
        <Link
          to={isCommunityMember ? "/insights" : "/opportunities"}
          search={isCommunityMember ? ({ tab: "knowledge" } as any) : undefined}
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center group"
        >
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
          {isCommunityMember ? (
            renderDisabledItem(
              <Sparkles className="w-4 h-4 text-slate-400" />,
              "Dashboard",
              "Hub"
            )
          ) : (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
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
          )}
        </nav>

        {/* 1. MARKETPLACE */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Marketplace
          </div>
          {/* Opportunities: PUBLIC ROUTE, fully enabled for everyone */}
          <Link
            to="/opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isOpportunities && !isConnections
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className={`w-4 h-4 ${isOpportunities && !isConnections ? "text-slate-950" : "text-slate-500"}`} />
              <span>Opportunities</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-bold">
              Explore
            </span>
          </Link>

          {/* Exchange Hub: Requires verified business account */}
          {isCommunityMember ? (
            renderDisabledItem(
              <ArrowLeftRight className="w-4 h-4 text-slate-400" />,
              "Exchange Hub",
              "Live"
            )
          ) : (
            <Link
              to="/connections"
              onClick={() => setMobileMenuOpen(false)}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                isConnections
                  ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ArrowLeftRight className={`w-4 h-4 ${isConnections ? "text-slate-950" : "text-slate-500"}`} />
                <span>Exchange Hub</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-white font-bold">
                Live
              </span>
            </Link>
          )}
        </nav>

        {/* 2. HISTORY */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            History
          </div>
          {isCommunityMember ? (
            <>
              {renderDisabledItem(
                <Inbox className="w-4 h-4 text-slate-400" />,
                "Received"
              )}
              {renderDisabledItem(
                <Send className="w-4 h-4 text-slate-400" />,
                "Sent"
              )}
            </>
          ) : (
            <>
              <Link
                to="/proposals"
                search={{ tab: "received" } as any}
                onClick={() => setMobileMenuOpen(false)}
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
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {incomingCount ?? 0}
                </span>
              </Link>
              <Link
                to="/proposals"
                search={{ tab: "sent" } as any}
                onClick={() => setMobileMenuOpen(false)}
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
            </>
          )}
        </nav>

        {/* 3. MY RELAY */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            My Relay
          </div>
          {isCommunityMember ? (
            <>
              {renderDisabledItem(
                <FileText className="w-4 h-4 text-slate-400" />,
                "Listings"
              )}
              {renderDisabledItem(
                <Bookmark className="w-4 h-4 text-slate-400" />,
                "Saved"
              )}
              {renderDisabledItem(
                <ArrowLeftRight className="w-4 h-4 text-slate-400" />,
                "My Opportunities"
              )}
            </>
          ) : (
            <>
              <Link
                to="/my-relay"
                search={{ tab: "listings" } as any}
                onClick={() => setMobileMenuOpen(false)}
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
                onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
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
            </>
          )}
        </nav>

        {/* 4. INSIGHTS */}
        <nav className="flex flex-col gap-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Insights
          </div>
          {/* Questions: PUBLIC Q&A FOR ALL MEMBERS */}
          <Link
            to="/insights"
            search={{ tab: "questions" } as any}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isInsightsQuestions
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className={`w-4 h-4 ${isInsightsQuestions ? "text-slate-950" : "text-slate-500"}`} />
              <span>Questions</span>
            </div>
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold">
              Q&A
            </span>
          </Link>

          {/* KNOWLEDGE ARTICLES: FULLY ACCESSIBLE TO ALL MEMBERS */}
          <Link
            to="/insights"
            search={{ tab: "knowledge" } as any}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
              isAllKnowledge
                ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className={`w-4 h-4 ${isAllKnowledge ? "text-slate-950" : "text-slate-500"}`} />
              <span>Knowledge Articles</span>
            </div>
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold">
              Docs
            </span>
          </Link>

          {/* Sub-items for Knowledge Articles */}
          <div className="pl-6 flex flex-col gap-1 border-l-2 border-slate-200 ml-4 my-0.5">
            {!isCommunityMember && (
              <Link
                to="/insights"
                search={{ tab: "knowledge", filter: "my" } as any}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between pl-3 pr-3 py-1.5 rounded-md text-xs transition-colors ${
                  isMyArticles
                    ? "text-slate-950 font-bold bg-slate-100/80"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <span>My Articles</span>
                {myKnowledgeCount > 0 && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-medium">
                    {myKnowledgeCount}
                  </span>
                )}
              </Link>
            )}
            <Link
              to="/insights"
              search={{ tab: "knowledge", filter: "saved" } as any}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between pl-3 pr-3 py-1.5 rounded-md text-xs transition-colors ${
                isSavedArticles
                  ? "text-slate-950 font-bold bg-slate-100/80"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              <span>Saved Articles</span>
              {savedArticlesCount > 0 && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {savedArticlesCount}
                </span>
              )}
            </Link>
          </div>

          {/* FAQ: PUBLIC ROUTE ACCESSIBLE TO ALL MEMBERS */}
          <Link
            to="/faq"
            onClick={() => setMobileMenuOpen(false)}
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
            onClick={() => setMobileMenuOpen(false)}
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
        </nav>
      </div>

      {/* Bottom Profile Footer Strip */}
      {(() => {
        const hasBusiness = Boolean(business);
        const footerDisplayName = hasBusiness
          ? business?.company_name || "Your Business"
          : communityProfile?.name || user?.fullName || "Community Contributor";
        const footerBadge = hasBusiness
          ? isApproved
            ? "Verified Member"
            : "Profile Pending"
          : "Community Member";
        const footerSettingsTo = hasBusiness ? "/onboarding" : "/profile";

        return (
          <div className="p-3 bg-white border-t border-slate-200/80">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {hasBusiness ? (
                  <CompanyLogo
                    src={business?.logo_url}
                    name={footerDisplayName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                    fallbackClassName="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0"
                    textClassName="font-mono text-xs font-bold"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                    {user?.imageUrl || communityProfile?.avatar_url ? (
                      <img
                        src={(user?.imageUrl || communityProfile?.avatar_url) || undefined}
                        alt={footerDisplayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-xs text-slate-900 truncate">
                    {footerDisplayName}
                  </span>
                  <span className={`font-mono text-[9px] uppercase tracking-wider flex items-center gap-1 font-bold ${
                    hasBusiness ? "text-emerald-700" : "text-[#505f76]"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                      hasBusiness ? "bg-emerald-500" : "bg-[#010611]"
                    }`} />
                    {footerBadge}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  to={footerSettingsTo}
                  onClick={() => setMobileMenuOpen(false)}
                  title={hasBusiness ? "Entity Settings" : "Contributor Profile"}
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
        );
      })()}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMUNITY MEMBER NAVIGATION (Desktop Top Bar + Mobile Top-Right Hamburger)
  // ═══════════════════════════════════════════════════════════════════════════
  if (isCommunityMember) {
    const memberDisplayName = communityProfile?.name || user?.fullName || "Community Contributor";
    const memberInitial = (
      memberDisplayName
        .trim()
        .split(/\s+/)[0]
        ?.charAt(0)
        .toUpperCase() || "U"
    );

    const insightsDropdownItems: NavHoverItem[] = [
      {
        title: "Knowledge Articles",
        to: "/insights",
        search: { tab: "knowledge" },
        icon: <BookOpen className="w-4 h-4 text-slate-500" />,
      },
      {
        title: "Questions",
        to: "/insights",
        search: { tab: "questions" },
        icon: <MessageSquare className="w-4 h-4 text-slate-500" />,
      },
      {
        title: "Saved",
        to: "/insights",
        search: { tab: "knowledge", filter: "saved" },
        icon: <Bookmark className="w-4 h-4 text-slate-500" />,
      },
    ];

    const platformDropdownItems: NavHoverItem[] = [
      {
        title: "8-Step Journey",
        to: "/8-step-journey",
        icon: <Layers className="w-4 h-4 text-slate-500" />,
      },
      {
        title: "Core Pillars",
        to: "/core-pillars",
        icon: <ShieldCheck className="w-4 h-4 text-slate-500" />,
      },
      {
        title: "Trust & Safety",
        to: "/trust-and-safety",
        icon: <Lock className="w-4 h-4 text-slate-500" />,
      },
      {
        title: "Platform FAQ",
        to: "/faq",
        icon: <HelpCircle className="w-4 h-4 text-slate-500" />,
      },
    ];

    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 border-b border-slate-200/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-8 shrink-0">
            <Link
              to="/insights"
              search={{ tab: "knowledge" } as any}
              className="flex items-center group shrink-0"
            >
              <img
                src={logoUrl}
                alt="The Relay Logo"
                className="h-9 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation Links (Hover sub-menus + direct links) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans">
              <NavHoverDropdown
                label="Insights"
                to="/insights"
                search={{ tab: "knowledge" }}
                isActive={isInsights}
                items={insightsDropdownItems}
              />

              <Link
                to="/faq"
                className={`py-1 text-xs font-mono uppercase tracking-[0.12em] font-bold transition-colors ${
                  isFaq
                    ? "text-slate-950 font-extrabold"
                    : "text-slate-500 hover:text-slate-950"
                }`}
              >
                FAQ
              </Link>

              <Link
                to="/about"
                className={`py-1 text-xs font-mono uppercase tracking-[0.12em] font-bold transition-colors ${
                  isAbout
                    ? "text-slate-950 font-extrabold"
                    : "text-slate-500 hover:text-slate-950"
                }`}
              >
                About
              </Link>

              <NavHoverDropdown
                label="Platform"
                isActive={isPlatformActive}
                items={platformDropdownItems}
              />
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Upgrade CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300 transition-colors shadow-2xs font-sans"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Upgrade to Business</span>
              </Link>
            </div>

            {/* Profile Avatar Dropdown (First word initial only) */}
            <UserAvatarDropdown />

            {/* Mobile View Navigation Hamburger (Strictly Top Right) */}
            <div className="md:hidden flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="p-2 text-slate-700 hover:text-slate-950 rounded hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                    aria-label="Open Mobile Navigation"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 sm:w-80 p-0 flex flex-col z-[100] h-full bg-white border-l border-slate-200"
                >
                  <SheetTitle className="sr-only">Community Member Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Mobile Navigation Drawer</SheetDescription>
                  
                  {/* Drawer Header */}
                  <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
                    <Link
                      to="/insights"
                      search={{ tab: "knowledge" } as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center"
                    >
                      <img
                        src={logoUrl}
                        alt="The Relay Logo"
                        className="h-8 w-auto object-contain mix-blend-multiply"
                      />
                    </Link>
                    <SheetClose asChild>
                      <button
                        type="button"
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                        aria-label="Close Navigation Menu"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </SheetClose>
                  </div>

                  {/* Drawer Nav Body (Scrollable) */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5 text-xs font-sans">
                    {/* Insights Navigation Section */}
                    <div className="flex flex-col gap-1">
                      <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        Insights
                      </div>
                      <Link
                        to="/insights"
                        search={{ tab: "knowledge" } as any}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isAllKnowledge
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-slate-500" />
                          <span>Knowledge Articles</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <Link
                        to="/insights"
                        search={{ tab: "questions" } as any}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isInsightsQuestions
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <MessageSquare className="w-4 h-4 text-slate-500" />
                          <span>Questions</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <Link
                        to="/insights"
                        search={{ tab: "knowledge", filter: "saved" } as any}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isSavedArticles
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Bookmark className="w-4 h-4 text-slate-500" />
                          <span>Saved Articles</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </div>

                    {/* FAQ & About Section */}
                    <div className="flex flex-col gap-1">
                      <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        General
                      </div>
                      <Link
                        to="/faq"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isFaq
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-slate-500" />
                          <span>FAQ</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isAbout
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span>About</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </div>

                    {/* Account Routes: Business Account & Association */}
                    <div className="flex flex-col gap-1">
                      <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        Account & Affiliation
                      </div>
                      <Link
                        to="/onboarding"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      >
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-slate-600" />
                          <span>Business Account</span>
                        </div>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                          Upgrade
                        </span>
                      </Link>
                      <Link
                        to="/association"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      >
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-slate-600" />
                          <span>Association</span>
                        </div>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                          Connect
                        </span>
                      </Link>
                    </div>

                    {/* Platform Links */}
                    <div className="flex flex-col gap-1">
                      <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        Platform
                      </div>
                      <Link
                        to="/8-step-journey"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isJourney
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Layers className="w-4 h-4 text-slate-500" />
                          <span>8-Step Journey</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <Link
                        to="/core-pillars"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isPillars
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-slate-500" />
                          <span>Core Pillars</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <Link
                        to="/trust-and-safety"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium ${
                          isTrust
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Lock className="w-4 h-4 text-slate-500" />
                          <span>Trust & Safety</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </div>
                  </div>

                  {/* Drawer Profile Footer */}
                  <div className="p-3 bg-white border-t border-slate-200/80">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#010611] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {memberInitial}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-xs text-slate-900 truncate">
                            {memberDisplayName}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 flex items-center gap-1 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#010611] inline-block" />
                            Community Member
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link
                          to="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          title="Contributor Profile"
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
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    );
  }

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
                className="p-2 rounded-md hover:bg-slate-100 text-slate-700 md:hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label="Open Navigation Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:w-60 p-0 flex flex-col z-[100] h-full">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Mobile Navigation Drawer</SheetDescription>
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
          {isCommunityMember ? (
            <button
              type="button"
              onClick={() => {
                toast.info("Posting commercial opportunities requires a Verified Business Account.", {
                  action: {
                    label: "Upgrade",
                    onClick: () => navigate({ to: "/onboarding" }),
                  },
                });
              }}
              className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-400 hover:bg-slate-200 font-semibold text-xs px-3 sm:px-3.5 py-2 rounded-lg transition-colors shadow-2xs cursor-not-allowed border border-slate-200/80"
              title="Verified Business Account required"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Post Opportunity</span>
              <span className="sm:hidden">Post</span>
            </button>
          ) : (
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
          )}

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

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useAuth, useUser } from "@clerk/tanstack-react-start";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { listOpportunities } from "../functions/listOpportunities";
import { createOpportunity } from "../functions/createOpportunity";
import { expressInterest } from "../functions/expressInterest";
import { saveOpportunity } from "../functions/saveOpportunity";
import { removeSavedOpportunity } from "../functions/removeSavedOpportunity";
import { getSavedOpportunities } from "../functions/getSavedOpportunities";
import { withdrawInterest } from "../functions/withdrawInterest";
import { getSentRequests } from "../functions/getSentRequests";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  Loader2,
  BadgeCheck,
  Check,
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Building,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Trash2,
  Lock,
  Bookmark,
  Menu,
  ChevronRight,
  Sparkles,
  X,
  Plus,
  Tag,
  HelpCircle,
  Clock,
  CheckCircle2,
  Info,
  ArrowRight,
} from "lucide-react";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ReciprocityBadge } from "@/components/reciprocity-badge";
import { TooltipSimple } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useInterestStore,
  useReciprocity,
  RECIPROCITY_WEIGHTS,
  type InterestRecord,
} from "@/lib/interest-store";

function mockContact(company: string): NonNullable<InterestRecord["contact"]> {
  const first = company.split(/\s+/)[0] ?? "Ops";
  const slug = company.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    name: `${first} Partnerships`,
    role: "BD Lead",
    email: `partnerships@${slug}.com`,
  };
}

const INDUSTRIES = [
  "All",
  "SaaS",
  "Marketing Agency",
  "Development Agency",
  "AI & Automation",
  "Recruitment",
  "D2C Brand",
  "Legal",
  "Healthcare",
  "Logistics",
  "E-commerce",
  "Real Estate",
  "Fintech",
  "Cybersecurity",
  "Cloud & DevOps",
  "Edtech",
  "Consulting & Advisory",
  "Web3 & Blockchain",
  "HR Tech",
  "Manufacturing",
  "Media & Adtech",
] as const;

const GEOGRAPHIES = [
  "All",
  "India",
  "UAE",
  "United States",
  "United Kingdom",
  "DACH",
  "Singapore",
  "Remote / Global",
] as const;

const TYPES = [
  "All",
  "Partnership",
  "Referral",
  "Distribution",
  "Vendor",
  "Hiring",
  "Strategic Advice",
  "Investment",
] as const;

const searchSchema = z.object({
  industry: fallback(z.string(), "All").default("All"),
  geo: fallback(z.string(), "All").default("All"),
  type: fallback(z.enum(TYPES), "All").default("All"),
  q: fallback(z.string(), "").default(""),
  minInterested: fallback(z.number(), 0).default(0),
  maxInterested: fallback(z.number(), 15).default(15),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/opportunities/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Opportunities — The Relay" },
      {
        name: "description",
        content:
          "Browse live business opportunities from verified operators — partnerships, referrals, vendors, hiring and distribution. Filter by industry, geography and type.",
      },
      { property: "og:title", content: "Opportunities — The Relay" },
      {
        property: "og:description",
        content:
          "Live opportunity feed from verified businesses. Filter by industry, geography and type.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

type Opportunity = {
  id: string;
  opportunity_number?: string;
  type: (typeof TYPES)[number];
  industry: (typeof INDUSTRIES)[number];
  geo: (typeof GEOGRAPHIES)[number];
  company: string;
  title: string;
  description: string;
  trustLevel: "Basic" | "Applied" | "Approved";
  postedAt: string;
  interested: number;
  business_id?: string;
  hide_company_name?: boolean;
  status?: string;
  expires_at?: string;
  promotion_status?: string;
};

const TYPE_ACCENT: Record<string, string> = {
  Partnership: "bg-primary/10 text-primary",
  Referral: "bg-indigo-500/10 text-indigo-600",
  Distribution: "bg-emerald-500/10 text-emerald-700",
  Vendor: "bg-purple-500/10 text-purple-700",
  Hiring: "bg-amber-500/10 text-amber-700",
  "Strategic Advice": "bg-slate-500/10 text-slate-700",
  Investment: "bg-rose-500/10 text-rose-700",
};

function formatPostedAt(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function OpportunitiesPage() {
  const { industry, geo, type, q, minInterested, maxInterested } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const isSignedInRef = useRef(isSignedIn);
  isSignedInRef.current = isSignedIn;
  const [isValidating, setIsValidating] = useState(true);
  const [dbOpps, setDbOpps] = useState<any[]>([]);
  const [loadingOpps, setLoadingOpps] = useState(true);
  const [myBusinessId, setMyBusinessId] = useState<string | null>(null);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  const startTour = () => {
    const isMobileViewport = typeof window !== "undefined" && window.innerWidth < 768;

    const desktopSteps = [
      {
        element: "#opportunity-board-info",
        popover: {
          title: "Welcome to The Relay",
          description:
            "Ye live B2B opportunity exchange hub hai verified operators aur founders ke liye. Yahan se partnerships, referrals, vendors, aur warm intros trade hote hain.",
          side: "bottom" as const,
          align: "start" as const,
        },
      },
      {
        element: "#category-tabs-row",
        popover: {
          title: "Opportunity Categories",
          description:
            "Alag-alag opportunities types jaise Partnerships, Referrals, Vendors, ya Hiring browse karne ke liye in tabs par switch karein.",
          side: "bottom" as const,
          align: "start" as const,
        },
      },
      {
        element: "#advanced-filters-btn",
        popover: {
          title: "Advanced Filters",
          description:
            "Geographies, target industries, aur interested operator limits select karne ke liye advanced filters use karein.",
          side: "bottom" as const,
          align: "start" as const,
        },
      },
      {
        element: "#post-opportunity-btn",
        popover: {
          title: "Create Listings",
          description:
            "Directly in-place form se platform par apni requirement list karein taaki interested partners pitch kar sakein.",
          side: "bottom" as const,
          align: "end" as const,
        },
      },
      /* Score functionality tour step commented out for now
      {
        element: "#reciprocity-badge-nav",
        popover: {
          title: "Network Score (Reciprocity)",
          description:
            "Apna score maintain karein. Naye opportunity post karne par aur connections establish karne par score grow hota hai. Contact details unlock karne mein score mandatory hai.",
          side: "bottom" as const,
          align: "end" as const,
        },
      },
      */
      {
        element: "#notifications-nav-btn",
        popover: {
          title: "Real-Time Alerts",
          description:
            "Jab koi user aapki list par interest show karega ya pitch request accept hogi, aapko notification alerts yahan milenge.",
          side: "bottom" as const,
          align: "end" as const,
        },
      },
      {
        element: "#user-avatar-nav-btn",
        popover: {
          title: "Business Profile & Verification",
          description:
            "Apne business verification level ko track karein (Approved, Applied, Basic), profile manage karein, ya sign out karein.",
          side: "bottom" as const,
          align: "end" as const,
        },
      },
    ];

    const mobileSteps = [
      {
        element: "#opportunity-board-info",
        popover: {
          title: "Welcome to The Relay",
          description:
            "Ye live B2B opportunity exchange hub hai verified operators aur founders ke liye. Yahan se partnerships, referrals, vendors, aur warm intros trade hote hain.",
          side: "bottom" as const,
          align: "start" as const,
        },
      },
      {
        element: "#category-tabs-row",
        popover: {
          title: "Opportunity Categories",
          description:
            "Alag-alag opportunities types jaise Partnerships, Referrals, Vendors, ya Hiring browse karne ke liye in tabs par switch karein.",
          side: "bottom" as const,
          align: "start" as const,
        },
      },
      {
        element: "#advanced-filters-btn",
        popover: {
          title: "Advanced Filters",
          description:
            "Geographies, target industries, aur interested operator limits select karne ke liye advanced filters use karein.",
          side: "bottom" as const,
          align: "start" as const,
        },
      },
      {
        element: "#post-opportunity-btn",
        popover: {
          title: "Create Listings",
          description:
            "Directly in-place form se platform par apni requirement list karein taaki interested partners pitch kar sakein.",
          side: "bottom" as const,
          align: "center" as const,
        },
      },
    ];

    const driverObj = driver({
      showProgress: true,
      popoverClass: "relay-tour-popover",
      steps: isMobileViewport ? mobileSteps : desktopSteps,
    });
    driverObj.drive();
  };

  useEffect(() => {
    // 1. Listen for navbar manual tour trigger event
    const handleStartTourEvent = () => {
      startTour();
    };
    window.addEventListener("relay:start-tour:opportunities", handleStartTourEvent);

    // 2. Auto-run tour ONLY for brand-new first-time signups (NEVER on routine sign-ins)
    let timer: any = null;
    if (isLoaded && isSignedIn && user) {
      const userTourKey = `relay.tour_completed_${user.id}`;
      const isTourCompleted =
        Boolean(user.unsafeMetadata?.tour_completed) ||
        localStorage.getItem(userTourKey) === "true" ||
        localStorage.getItem("relay.tour_completed") === "true";

      // Check if user has just completed onboarding/signup
      let justSignedUp = false;
      try {
        justSignedUp = sessionStorage.getItem("relay.just_signed_up") === "true";
      } catch (e) {}

      // Consider it brand new only if account was created in last 10 minutes
      const isBrandNewAccount =
        user.createdAt ? Date.now() - new Date(user.createdAt).getTime() < 10 * 60 * 1000 : false;

      // Only run if specifically a fresh signup and never completed
      if (justSignedUp && isBrandNewAccount && !isTourCompleted) {
        try {
          sessionStorage.removeItem("relay.just_signed_up");
        } catch (e) {}

        localStorage.setItem(userTourKey, "true");
        localStorage.setItem("relay.tour_completed", "true");

        try {
          user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              tour_completed: true,
            },
          }).catch(() => {});
        } catch (e) {}

        timer = setTimeout(() => {
          startTour();
        }, 1200);
      } else if (!isTourCompleted && !isBrandNewAccount) {
        // Returning user logging in: mark tour completed so it never fires
        localStorage.setItem(userTourKey, "true");
        localStorage.setItem("relay.tour_completed", "true");
        try {
          user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              tour_completed: true,
            },
          }).catch(() => {});
        } catch (e) {}
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("relay:start-tour:opportunities", handleStartTourEvent);
    };
  }, [isLoaded, isSignedIn, user]);

  const [searchInputVal, setSearchInputVal] = useState(q);

  // Form Dialog States for Create Opportunity (in-place modal)
  const [business, setBusiness] = useState<any>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    | "partnership"
    | "referral"
    | "distribution"
    | "vendor"
    | "hiring"
    | "strategic_advice"
    | "investment"
  >("partnership");
  const [formIndustry, setFormIndustry] = useState("SaaS");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [offerText, setOfferText] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [submitting, setSubmitting] = useState(false);
  const [hideCompanyName, setHideCompanyName] = useState(false);
  const [promote, setPromote] = useState(false);

  useEffect(() => {
    setSearchInputVal(q);
  }, [q]);

  const handleSearchSubmit = () => {
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        q: searchInputVal,
      }),
    });
  };

  // Local drawer filter states (buffered until 'Apply Filters' is clicked)
  const [localQ, setLocalQ] = useState(q);
  const [localMinInterested, setLocalMinInterested] = useState(minInterested);
  const [localMaxInterested, setLocalMaxInterested] = useState(maxInterested);
  const [localActiveIndustries, setLocalActiveIndustries] = useState<string[]>([]);
  const [localActiveGeos, setLocalActiveGeos] = useState<string[]>([]);

  const handleApplyFilters = () => {
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        q: localQ,
        minInterested: localMinInterested,
        maxInterested: localMaxInterested,
        industry: localActiveIndustries.length === 0 ? "All" : localActiveIndustries.join(","),
        geo: localActiveGeos.length === 0 ? "All" : localActiveGeos.join(","),
      }),
    });
  };

  // Open Create Dialog
  const handleOpenCreate = () => {
    if (!business || business.status !== "approved") {
      toast.error(
        `Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`,
        {
          duration: 5000,
        },
      );
      return;
    }
    setTitle("");
    setCategory("partnership");
    setFormIndustry(business?.industry || "SaaS");
    setDescription("");
    setLocation("");
    setOfferText("");
    setExpiryDays("30");
    setHideCompanyName(false);
    setPromote(false);
    setCreateOpen(true);
  };

  // Submit Create Opportunity
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(
        `Description must be between 50 and 3000 characters. Currently: ${description.length}`,
      );
      return;
    }

    if (promote && hideCompanyName) {
      toast.error(
        "Promoted opportunities cannot be confidential. Please uncheck 'Hide company name' or 'Promote this listing'.",
      );
      return;
    }

    try {
      setSubmitting(true);
      // Calculate expires_at Date
      let expires_at: string | null = null;
      if (expiryDays !== "never") {
        const days = parseInt(expiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      }

      await createOpportunity({
        data: {
          title,
          category,
          industry: formIndustry,
          description,
          location: location.trim() || null,
          offer_text: offerText.trim() || null,
          expires_at,
          hide_company_name: hideCompanyName,
          promote,
        },
      });

      toast.success("Opportunity Created Successfully");
      setCreateOpen(false);
      await loadData();
    } catch (err: any) {
      console.error("Create opportunity error:", err);
      toast.error(err.message || "Failed to create opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  const loadData = async () => {
    try {
      setLoadingOpps(true);
      let mapped: any[] = [];
      try {
        const data = await listOpportunities({});
        mapped = (data || []).map((opp: any) => ({
          id: opp.id,
          opportunity_number: opp.opportunity_number,
          type: (opp.category === "strategic_advice"
            ? "Strategic Advice"
            : opp.category.charAt(0).toUpperCase() + opp.category.slice(1)) as any,
          industry: opp.industry || opp.business?.industry || "SaaS",
          geo: opp.location || "Remote",
          company: opp.business?.company_name || "Demo",
          title: opp.title,
          description: opp.description,
          trustLevel:
            opp.business?.status === "approved"
              ? "Approved"
              : opp.business?.status === "rejected"
                ? "Basic"
                : "Applied",
          postedAt: formatPostedAt(opp.created_at),
          interested: opp.interestedCount || 0,
          business_id: opp.business_id,
          hide_company_name: opp.hide_company_name ?? false,
          status: opp.status,
          expires_at: opp.expires_at,
          promotion_status: opp.promotion_status || "none",
        }));
      } catch (dbErr) {
        console.error("Failed to query opportunities from database, falling back to mock data:", dbErr);
        toast.error("Database connection failed. Displaying cached/mock opportunities.", {
          id: "opportunities-db-offline-toast",
        });
      }
      setDbOpps([...mapped, ...OPPORTUNITIES]);
    } catch (err) {
      console.error("Critical error in loadData:", err);
    } finally {
      setLoadingOpps(false);
    }
  };

  const [myBusinessStatus, setMyBusinessStatus] = useState<
    "applied" | "approved" | "rejected" | null
  >(null);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<Set<string>>(new Set());

  const mockStorageKey = userId ? `relay_saved_mocks_${userId}` : "relay_saved_mocks";

  const loadSaved = async () => {
    if (isSignedIn) {
      try {
        const saved = await getSavedOpportunities();
        const dbIds = (saved || []).map((item: any) => item.opportunity_id);

        let mockIds: string[] = [];
        try {
          console.log("[Explore Page] Reading mock saves from key:", mockStorageKey);
          const stored = localStorage.getItem(mockStorageKey);
          console.log("[Explore Page] Raw stored value in localStorage:", stored);
          if (stored) {
            mockIds = JSON.parse(stored);
          }
        } catch (err) {
          console.error("[Explore Page] Error reading mock saves:", err);
        }
        console.log("[Explore Page] Resolved mock IDs:", mockIds);

        setSavedOpportunityIds(new Set([...dbIds, ...mockIds]));
      } catch (err) {
        console.error("Failed to load saved opportunities:", err);
      }
    }
  };

  const handleSaveToggle = async (oppId: string, shouldSave: boolean) => {
    const isMock = oppId.startsWith("RY-");
    try {
      if (shouldSave) {
        if (!isMock) {
          await saveOpportunity({ data: { opportunity_id: oppId } });
        } else {
          let mockIds: string[] = [];
          try {
            const stored = localStorage.getItem(mockStorageKey);
            if (stored) mockIds = JSON.parse(stored);
          } catch (_) {}
          if (!mockIds.includes(oppId)) {
            mockIds.push(oppId);
            localStorage.setItem(mockStorageKey, JSON.stringify(mockIds));
          }
        }
        setSavedOpportunityIds((prev) => {
          const next = new Set(prev);
          next.add(oppId);
          return next;
        });
        if (myBusinessStatus === "approved") {
          toast.success("Opportunity saved to your bookmarks.", {
            action: {
              label: "View",
              onClick: () => navigate({ to: "/opportunities/my", search: { tab: "saved" } }),
            },
          });
        } else {
          toast.success(
            "Opportunity Saved. You can review this opportunity after your business is approved.",
            {
              action: {
                label: "View",
                onClick: () => navigate({ to: "/opportunities/my", search: { tab: "saved" } }),
              },
            },
          );
        }
      } else {
        if (!isMock) {
          await removeSavedOpportunity({ data: { opportunity_id: oppId } });
        } else {
          let mockIds: string[] = [];
          try {
            const stored = localStorage.getItem(mockStorageKey);
            if (stored) mockIds = JSON.parse(stored);
          } catch (_) {}
          mockIds = mockIds.filter((id) => id !== oppId);
          localStorage.setItem(mockStorageKey, JSON.stringify(mockIds));
        }
        setSavedOpportunityIds((prev) => {
          const next = new Set(prev);
          next.delete(oppId);
          return next;
        });
        toast.success("Opportunity removed from saved.");
      }
    } catch (err: any) {
      console.error("Failed to toggle save opportunity:", err);
      toast.error(err.message || "Failed to update saved opportunity.");
    }
  };

  useEffect(() => {
    let active = true;

    // Safety timeout to show troubleshooting helper if network/Clerk hangs
    const safetyTimeout = setTimeout(() => {
      if (active) {
        console.warn("[Opportunities] Onboarding verification safety timeout triggered.");
        setShowTroubleshoot(true);
      }
    }, 4500);

    const proceedWithStatus = async (status: any) => {
      if (!active) return;

      if (status.isAuthenticated && !status.hasBusiness) {
        toast.error(
          "Please register your business profile to access the opportunities board.",
          {
            id: "opportunities-onboarding-redirect",
          },
        );
        clearTimeout(safetyTimeout);
        navigate({ to: "/onboarding", replace: true });
      } else {
        if (status.business) {
          setBusiness(status.business);
          setMyBusinessId(status.business.id);
          const s = status.business.status as string;
          setMyBusinessStatus(s === "pending" || s === "applied" ? "applied" : (s as any));

          try {
            const sentRequests = await getSentRequests();
            const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
            for (const req of sentRequests) {
              const isAccepted = req.status === "accepted";
              localStore[req.opportunity_id] = {
                id: req.id,
                status: req.status,
                pitch: req.message || "",
                requestedAt: req.created_at,
                respondedAt: req.updated_at,
                contact: isAccepted
                  ? {
                      name: req.opportunity.business.company_name,
                      role: "Owner",
                      email:
                        req.opportunity.business.contact_email ||
                        req.opportunity.business.owner?.email ||
                        "",
                      website: req.opportunity.business.website || "",
                      linkedin: req.opportunity.business.linkedin_url || "",
                      description: req.opportunity.business.description || "",
                    }
                  : undefined,
              };
            }
            localStorage.setItem("relay.interest.v1", JSON.stringify(localStore));
            window.dispatchEvent(new Event("relay:interest"));
          } catch (syncErr) {
            console.error("Failed to sync interests:", syncErr);
          }

          let score = 0;
          try {
            const stored = localStorage.getItem("relay.profile.v1");
            if (stored) {
              score = JSON.parse(stored).score || 0;
            }
          } catch (_) {}

          const mappedProfile = {
            companyName: status.business.company_name,
            verificationLevel: status.business.status === "approved" ? "Approved" : "Applied",
            logoUrl: status.business.logo_url || undefined,
            score,
          };
          localStorage.setItem("relay.profile.v1", JSON.stringify(mappedProfile));
          window.dispatchEvent(new Event("relay:profile"));
        }
        await loadData();
        await loadSaved();
        clearTimeout(safetyTimeout);
        setIsValidating(false);
      }
    };

    // 1. If signed in, verify onboarding and load feed immediately
    if (isSignedIn) {
      async function verifyUserAndLoad() {
        try {
          const status = await checkOnboardingStatus();
          if (!active) return;
          if (status.isAuthenticated) {
            await proceedWithStatus(status);
            return;
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
          await loadData();
          clearTimeout(safetyTimeout);
          setIsValidating(false);
        }
      }
      verifyUserAndLoad();

      return () => {
        active = false;
        clearTimeout(safetyTimeout);
      };
    }

    // 2. If !isSignedIn, allow a grace period of 2.5s for Clerk OAuth/cookie hydration before redirecting
    const unauthenticatedRedirectTimer = setTimeout(async () => {
      if (!active) return;
      if (isSignedInRef.current) return;

      // Final server session fallback check
      try {
        const status = await checkOnboardingStatus();
        if (!active) return;
        if (status.isAuthenticated) {
          await proceedWithStatus(status);
          return;
        }
      } catch (error) {
        console.error("Fallback server auth check error:", error);
      }

      if (!isSignedInRef.current && active) {
        toast.error("Please sign in or sign up to access the opportunities board.", {
          id: "opportunities-auth-required",
        });
        clearTimeout(safetyTimeout);
        navigate({ to: "/login", replace: true });
      }
    }, 2500);

    return () => {
      active = false;
      clearTimeout(safetyTimeout);
      clearTimeout(unauthenticatedRedirectTimer);
    };
  }, [isLoaded, isSignedIn, navigate]);

  const activeIndustries = useMemo<string[]>(() => {
    return industry === "All" || !industry ? [] : industry.split(",");
  }, [industry]);

  const activeGeos = useMemo<string[]>(() => {
    return geo === "All" || !geo ? [] : geo.split(",");
  }, [geo]);

  const toggleIndustry = (val: string) => {
    let next: string[];
    if (activeIndustries.includes(val)) {
      next = activeIndustries.filter((item: string) => item !== val);
    } else {
      next = [...activeIndustries, val];
    }
    const searchStr = next.length === 0 ? "All" : next.join(",");
    navigate({ search: (prev: SearchParams) => ({ ...prev, industry: searchStr }) });
  };

  const toggleGeo = (val: string) => {
    let next: string[];
    if (activeGeos.includes(val)) {
      next = activeGeos.filter((item: string) => item !== val);
    } else {
      next = [...activeGeos, val];
    }
    const searchStr = next.length === 0 ? "All" : next.join(",");
    navigate({ search: (prev: SearchParams) => ({ ...prev, geo: searchStr }) });
  };

  const { promotedOpps, regularOpps, totalCount } = useMemo(() => {
    const query = (q || "").trim().toLowerCase();
    const result = dbOpps.filter((o) => {
      if (activeIndustries.length > 0 && !activeIndustries.includes(o.industry)) return false;
      if (activeGeos.length > 0 && !activeGeos.includes(o.geo)) return false;
      if (type !== "All" && o.type !== type) return false;
      if (o.interested < minInterested || o.interested > maxInterested) return false;
      if (query) {
        const oppNum = o.opportunity_number || "";
        const shortId = o.id ? o.id.substring(0, 8) : "";
        const hay =
          `${o.company} ${o.title} ${o.description} ${oppNum} #${oppNum} ${shortId} #${shortId}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    const promoted = result.filter((o) => o.promotion_status === "promoted");
    const regular = result.filter((o) => o.promotion_status !== "promoted");

    return { promotedOpps: promoted, regularOpps: regular, totalCount: result.length };
  }, [dbOpps, activeIndustries, activeGeos, type, q, minInterested, maxInterested]);

  const reset = () => {
    setLocalQ("");
    setLocalMinInterested(0);
    setLocalMaxInterested(15);
    setLocalActiveIndustries([]);
    setLocalActiveGeos([]);
    navigate({
      search: {
        industry: "All",
        geo: "All",
        type: "All",
        q: "",
        minInterested: 0,
        maxInterested: 15,
      },
    });
  };

  const activeCount =
    (industry !== "All" ? 1 : 0) +
    (geo !== "All" ? 1 : 0) +
    (q ? 1 : 0) +
    (minInterested !== 0 || maxInterested !== 15 ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full max-w-full overflow-x-hidden">
      {isValidating || loadingOpps ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-900/5 rounded-full blur-xl animate-pulse" />
              <img
                src={logoUrl}
                alt="The Relay Logo"
                className="relative h-12 w-auto object-contain mix-blend-multiply transition-transform hover:scale-105 duration-300"
              />
            </div>
            <div className="flex flex-col items-center space-y-2 pt-2">
              <div className="flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
                  Verifying Operator Identity
                </span>
              </div>
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest animate-pulse">
                Connecting to secure router...
              </span>
            </div>

            {showTroubleshoot && (
              <div className="border border-slate-200 bg-white p-5 rounded-[4px] max-w-sm text-center space-y-3.5 shadow-lg animate-momentum z-10">
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Authentication check is taking longer than expected. On production, this might be
                  due to database connection limits or browser cookie restrictions.
                </p>
                <div className="flex gap-2.5 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      loadData().finally(() => {
                        setIsValidating(false);
                      });
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase tracking-widest rounded-[2px] cursor-pointer font-bold shadow-sm"
                  >
                    Force Load Board
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-mono text-[9.5px] uppercase tracking-widest rounded-[2px] cursor-pointer font-bold shadow-xs"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-16 md:pt-6 md:pb-24">
          {/* Header Hero Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-200/80">
            <div id="opportunity-board-info" className="space-y-2">
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl uppercase">
                Opportunity Board
              </h1>
              <p className="text-slate-500 text-xs md:text-[13px] max-w-[55ch] leading-relaxed">
                Direct collaboration hub for verified founders and partners. Handshake directly,
                lock intros, and share network capital.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              {isSignedIn && (
                <button
                  id="post-opportunity-btn"
                  onClick={handleOpenCreate}
                  className="bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest px-5 py-3 md:py-2.5 border border-slate-900 transition-all rounded-[2px] font-bold shadow-sm hover:shadow text-center cursor-pointer"
                >
                  Post Opportunity
                </button>
              )}
              {/* Listings Curated badge commented out for now
              <div className="flex items-center justify-between sm:justify-end gap-3 border border-slate-200/80 bg-white p-3 md:p-2.5 rounded-[2px] shrink-0">
                <span className="text-slate-400 font-mono text-[9px] uppercase tracking-widest font-bold">
                  Listings Curated
                </span>
                <span className="font-display text-xl md:text-2xl font-black text-slate-950">
                  {totalCount}
                </span>
              </div>
              */}
            </div>
          </header>

          {/* Quick Filter Bar */}
          <div className="flex items-center justify-start mb-6">
            {/* Filter Slider Sheet Trigger */}
            <Sheet
              onOpenChange={(open) => {
                if (open) {
                  setLocalQ(q);
                  setLocalMinInterested(minInterested);
                  setLocalMaxInterested(maxInterested);
                  setLocalActiveIndustries(activeIndustries);
                  setLocalActiveGeos(activeGeos);
                }
              }}
            >
              <SheetTrigger asChild>
                <button
                  id="advanced-filters-btn"
                  className="w-full sm:w-auto cursor-pointer group flex items-center justify-center gap-2 border border-slate-200/80 hover:border-slate-350 rounded-[3px] px-5 py-2.5 transition-all bg-white hover:shadow-sm font-mono text-[9px] uppercase tracking-widest font-bold text-slate-700"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span>Advanced Filters</span>
                  {activeCount > 0 && (
                    <span className="w-4.5 h-4.5 rounded-full bg-primary text-white text-[9px] font-sans flex items-center justify-center font-bold">
                      {activeCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md bg-white border-l border-slate-200/50 flex flex-col h-full p-0 shadow-2xl">
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                    <span className="font-display font-extrabold text-slate-900">Filters</span>
                  </div>
                  {activeCount > 0 && (
                    <button
                      onClick={reset}
                      className="font-mono text-[10px] uppercase tracking-widest text-primary hover:text-slate-950 transition-colors flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Drawer Body (Flipkart style accordions) */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                  {/* Range Slider for interested operators */}
                  <div className="space-y-4 border-b border-slate-100 pb-6">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                        Interested Businesses
                      </label>
                      <span className="font-mono text-[10px] text-primary font-bold">
                        {localMinInterested} -{" "}
                        {localMaxInterested === 15 ? "15+" : localMaxInterested}
                      </span>
                    </div>

                    <div className="px-2">
                      <Slider
                        min={0}
                        max={15}
                        step={1}
                        value={[localMinInterested, localMaxInterested]}
                        onValueChange={([min, max]) => {
                          setLocalMinInterested(min);
                          setLocalMaxInterested(max);
                        }}
                        className="my-2"
                      />
                    </div>

                    {/* Flipkart-style Min/Max displays */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className="flex-1 border border-slate-200 rounded-[2px] p-2 bg-slate-50 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">
                          Min Operators
                        </span>
                        <span className="text-sm font-mono font-bold text-slate-900">
                          {localMinInterested}
                        </span>
                      </div>
                      <div className="text-slate-400 font-mono text-xs">—</div>
                      <div className="flex-1 border border-slate-200 rounded-[2px] p-2 bg-slate-50 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">
                          Max Operators
                        </span>
                        <span className="text-sm font-mono font-bold text-slate-900">
                          {localMaxInterested === 15 ? "15+" : localMaxInterested}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Panels */}
                  <Accordion
                    type="multiple"
                    defaultValue={["industry", "geography"]}
                    className="w-full"
                  >
                    <AccordionItem value="industry" className="border-b border-slate-100 py-1">
                      <AccordionTrigger className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold hover:no-underline hover:text-slate-900 py-3 cursor-pointer">
                        Industry
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                          {INDUSTRIES.filter((opt) => opt !== "All").map((opt) => {
                            const active = localActiveIndustries.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-3 px-1 py-1.5 hover:bg-slate-50/50 rounded cursor-pointer transition-colors"
                              >
                                <Checkbox
                                  checked={active}
                                  onCheckedChange={() => {
                                    if (active) {
                                      setLocalActiveIndustries((prev) =>
                                        prev.filter((item) => item !== opt),
                                      );
                                    } else {
                                      setLocalActiveIndustries((prev) => [...prev, opt]);
                                    }
                                  }}
                                />
                                <span
                                  className={`text-xs font-medium font-sans ${active ? "text-slate-900 font-bold" : "text-slate-600"}`}
                                >
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="geography" className="border-b border-slate-100 py-1">
                      <AccordionTrigger className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold hover:no-underline hover:text-slate-900 py-3 cursor-pointer">
                        Geography
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                          {GEOGRAPHIES.filter((opt) => opt !== "All").map((opt) => {
                            const active = localActiveGeos.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-3 px-1 py-1.5 hover:bg-slate-50/50 rounded cursor-pointer transition-colors"
                              >
                                <Checkbox
                                  checked={active}
                                  onCheckedChange={() => {
                                    if (active) {
                                      setLocalActiveGeos((prev) =>
                                        prev.filter((item) => item !== opt),
                                      );
                                    } else {
                                      setLocalActiveGeos((prev) => [...prev, opt]);
                                    }
                                  }}
                                />
                                <span
                                  className={`text-xs font-medium font-sans ${active ? "text-slate-900 font-bold" : "text-slate-600"}`}
                                >
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Drawer Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
                  <SheetClose asChild>
                    <button
                      onClick={handleApplyFilters}
                      className="w-full py-2.5 bg-slate-950 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer text-center font-bold"
                    >
                      Apply Filters
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Opportunity Types Tabs & Filter Row */}
          <div
            id="category-tabs-row"
            className="border-b border-slate-200 mb-8 w-full overflow-hidden"
          >
            <div className="overflow-x-auto scrollbar-none flex flex-nowrap gap-2 md:gap-6 pb-px w-full">
              {TYPES.map((t) => {
                const active = t === type;
                return (
                  <button
                    key={t}
                    onClick={() =>
                      navigate({ search: (prev: SearchParams) => ({ ...prev, type: t }) })
                    }
                    className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest px-1 pb-3.5 border-b-2 transition-all shrink-0 cursor-pointer ${
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opportunity Card List (Full-Width) */}
          {totalCount === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <div className="space-y-8">
              {promotedOpps.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-orange-200/60 pb-2.5">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-600">
                      Featured Partnerships & Opportunities
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-orange-200/60 to-transparent ml-2" />
                  </div>
                  <div
                    className={
                      promotedOpps.length === 1
                        ? "grid grid-cols-1 gap-4"
                        : "grid grid-cols-1 lg:grid-cols-2 gap-6"
                    }
                  >
                    {promotedOpps.map((opp, i) => (
                      <ResultCard
                        key={opp.id}
                        opp={opp}
                        delay={i * 40}
                        myBusinessId={myBusinessId}
                        myBusinessStatus={myBusinessStatus}
                        isSaved={savedOpportunityIds.has(opp.id)}
                        onSaveToggle={handleSaveToggle}
                        promotedCount={promotedOpps.length}
                      />
                    ))}
                  </div>
                </div>
              )}

              {regularOpps.length > 0 && (
                <div className="space-y-4">
                  {promotedOpps.length > 0 && (
                    <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2.5 pt-4">
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                        Standard Listings
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-2" />
                    </div>
                  )}
                  <div className="space-y-4">
                    {regularOpps.map((opp, i) => (
                      <ResultCard
                        key={opp.id}
                        opp={opp}
                        delay={(promotedOpps.length + i) * 40}
                        myBusinessId={myBusinessId}
                        myBusinessStatus={myBusinessStatus}
                        isSaved={savedOpportunityIds.has(opp.id)}
                        onSaveToggle={handleSaveToggle}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* CREATE DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="flex w-[calc(100vw-1rem)] max-w-[680px] h-[85dvh] sm:h-auto max-h-[88dvh] flex-col gap-0 overflow-hidden bg-white p-0 sm:p-0 text-left font-sans shadow-xl rounded-[4px] border border-slate-200">
          <DialogHeader className="border-b border-slate-100 px-4 pb-3 pt-5 pr-12 sm:px-4 sm:pt-4 sm:pr-10">
            <DialogTitle className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-slate-950 leading-tight">
              Post Opportunity Brief
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs leading-relaxed">
              Outline your requirements. Memos are distributed to verified operators matches.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleCreateSubmit}
            className="min-h-0 flex-1 flex flex-col gap-0 overflow-hidden"
          >
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-4 sm:py-3 space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Tag className="w-3 h-3" /> Opportunity Title *
                  </span>
                  <TooltipSimple content="Write a short, clear summary of what you are looking for (e.g. 'Looking for SEO Agency').">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Looking for SEO Agency / Shopify Dev Shop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                />
              </div>

              {/* Category selection */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Exchange Category *
                  </span>
                  <TooltipSimple content="Select the type of partnership layout (e.g. client referral exchange, distribution partner, or vendor).">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-405 hover:text-slate-905 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <Select value={category} onValueChange={(val) => setCategory(val as any)}>
                  <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="partnership">
                      Partnership (Integrations, API merges)
                    </SelectItem>
                    <SelectItem value="referral">
                      Referral (Client exchanges, Mutual handoffs)
                    </SelectItem>
                    <SelectItem value="distribution">
                      Distribution (IT Consultancies, Resellers)
                    </SelectItem>
                    <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
                    <SelectItem value="hiring">
                      Hiring (Recruitment, Talent pipeline requests)
                    </SelectItem>
                    <SelectItem value="strategic_advice">
                      Strategic Advice (Advisory, Board positions, Mentorship)
                    </SelectItem>
                    <SelectItem value="investment">
                      Investment (Funding requests, Capital raises)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Industry selection */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Tag className="w-3 h-3" /> Industry Type *
                  </span>
                  <TooltipSimple content="Select the industry that fits this opportunity best.">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <Select value={formIndustry} onValueChange={setFormIndustry}>
                  <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60 overflow-y-auto">
                    {INDUSTRIES.filter((ind) => ind !== "All").map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5 justify-between">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="flex flex-wrap items-center gap-1">
                      <Info className="w-3 h-3" /> Brief Description *
                    </span>
                    <TooltipSimple content="Provide detailed context, scope, requirements, and target timeline for this growth request (50 to 3000 chars).">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                    </TooltipSimple>
                  </span>
                  <span className="text-[8px] text-slate-400 font-normal lowercase">
                    {description.length} / 50 min chars
                  </span>
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={3000}
                  placeholder="Describe your request in detail. Provide background context, scope of work, timeline, and expectations. Min 50 characters required."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-w-0 p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y outline-none"
                />
              </div>

              <div className="grid min-w-0 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                    <span className="flex flex-wrap items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Location Target (Optional)
                    </span>
                    <TooltipSimple content="Optionally restrict your target partners to a specific country, region, or specify 'Remote' / 'Global'.">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                    </TooltipSimple>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. India, USA, Global, Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                  />
                </div>

                {/* Expiry */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                    <span className="flex flex-wrap items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Expiry Period (Optional)
                    </span>
                    <TooltipSimple content="Select when this listing will be automatically closed and hidden from the public feed.">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                    </TooltipSimple>
                  </label>
                  <Select value={expiryDays} onValueChange={setExpiryDays}>
                    <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                      <SelectValue placeholder="Select Expiry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="never">No Expiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* What Can You Offer */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> What Can You Offer in Return?
                    (Optional)
                  </span>
                  <TooltipSimple content="Explain what value, referral pipeline, or resources you can provide to the partner in return.">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                />
              </div>

              {/* Post Anonymously Checkbox */}
              <div className="flex items-start space-x-2.5 pt-2 pb-1">
                <Checkbox
                  id="hide_company_name_create"
                  checked={hideCompanyName}
                  onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                  className="mt-0.5"
                  disabled={promote}
                />
                <label
                  htmlFor="hide_company_name_create"
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer flex flex-wrap items-center gap-1.5 select-none ${
                    promote ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                  }`}
                >
                  <span>Post anonymously (Hide company name from public feed)</span>
                  <TooltipSimple content="If checked, your company name is displayed as 'Confidential' and logo/LinkedIn links are hidden from non-owners in the public directories.">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
              </div>

              {/* Promote Opportunity Banner */}
              <div
                className={`p-3.5 border rounded-[4px] transition-all flex items-start space-x-3 mt-2 ${
                  hideCompanyName
                    ? "bg-slate-50 border-slate-200/60 opacity-60 cursor-not-allowed"
                    : promote
                      ? "bg-orange-50/40 border-orange-200/80 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <Checkbox
                  id="promote_create"
                  checked={promote}
                  onCheckedChange={(checked) => setPromote(!!checked)}
                  className="mt-1 cursor-pointer"
                  disabled={hideCompanyName}
                />
                <div className="space-y-1 select-none flex-1">
                  <label
                    htmlFor="promote_create"
                    className={`text-[10px] font-mono font-extrabold uppercase tracking-wider block ${
                      hideCompanyName
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-orange-600 cursor-pointer"
                    }`}
                  >
                    Promote listing for 10x visibility
                  </label>
                  <p
                    className={`text-[11px] font-sans leading-relaxed ${
                      hideCompanyName ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {hideCompanyName
                      ? "Featured listings must show your company name and cannot be posted anonymously."
                      : "Requests superadmin verification. Once approved, this listing is pinned to the Featured section in dark-theme with orange highlight."}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-100 bg-white px-4 py-3 sm:px-4 flex flex-row items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="h-10 flex-1 px-4 py-2 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-colors cursor-pointer bg-white sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="h-10 flex-1 px-5 py-2 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest rounded-[2px] font-bold shadow-xs hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 sm:flex-none"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Publish
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TierTooltipContent({ level }: { level: string }) {
  const levelKey = level === "Approved" ? "Approved" : level === "Applied" ? "Applied" : "Basic";

  const details = {
    Basic: {
      title: "Verified Business",
      badge: "Basic",
      body: "Domain email check, SSL validation, and core founder verification. Surfaces basic referral, vendor, and warm intro requests with standard priority.",
      req: "Email domain & Website lookup",
    },
    Applied: {
      title: "Trusted Operator",
      badge: "Applied",
      body: "Founder identity & company LinkedIn registration validated manually. Unlocks direct connection unlocks, score boosts, and full access to private protocols.",
      req: "LinkedIn + Founder Identity Match",
    },
    Approved: {
      title: "Established Entity",
      badge: "Approved",
      body: "Corporate registry (CIN/GST/Tax certificate) or revenue proof checked. Highest trust, priority concierge matchmaking, and active surfacing top-tier listings.",
      req: "Tax registration / Active Revenue proof",
    },
  }[levelKey];

  return (
    <div className="p-2.5 max-w-[260px] space-y-2 text-left font-sans leading-normal">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 gap-4">
        <span className="font-display font-extrabold text-[12px] text-white">{details.title}</span>
        <span
          className={`font-mono text-[8px] px-1.5 py-0.5 rounded-[2px] font-bold uppercase tracking-wider border ${
            levelKey === "Approved"
              ? "bg-primary/20 text-primary border-primary/30"
              : levelKey === "Applied"
                ? "bg-amber-500/15 text-amber-600 border-amber-500/25"
                : "bg-slate-700/20 text-slate-400 border-slate-600/30"
          }`}
        >
          {details.badge}
        </span>
      </div>
      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{details.body}</p>
      <div className="pt-1.5 border-t border-slate-800 flex flex-col gap-0.5 font-mono text-[8px] text-slate-500">
        <span className="uppercase text-[7.5px] font-bold text-slate-400">Requirement:</span>
        <span>{details.req}</span>
      </div>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2.5">
      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
        Search
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Company, title, keyword…"
          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:outline-none pl-9 pr-3 py-2 text-sm font-mono placeholder:text-slate-400/80 transition-all rounded-[2px]"
        />
      </div>
    </div>
  );
}

function FilterGroup<T extends readonly string[]>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T;
  value: T[number];
  onChange: (v: T[number]) => void;
}) {
  return (
    <div className="space-y-2.5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        {label}
      </div>
      <div className="flex flex-col border border-slate-100 rounded-[2px] overflow-hidden">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`text-left px-3 py-2 text-xs border-l-2 transition-all ${
                active
                  ? "border-primary text-primary font-bold bg-primary/5"
                  : "border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50/50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({
  opp,
  delay,
  myBusinessId,
  myBusinessStatus,
  isSaved,
  onSaveToggle,
  promotedCount = 0,
}: {
  opp: Opportunity;
  delay: number;
  myBusinessId: string | null;
  myBusinessStatus: "applied" | "approved" | "rejected" | null;
  isSaved: boolean;
  onSaveToggle: (oppId: string, shouldSave: boolean) => void;
  promotedCount?: number;
}) {
  const { store, request, respond, withdraw } = useInterestStore();
  const record = store[opp.id];
  const status = record?.status ?? "idle";

  const [open, setOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [pitch, setPitch] = useState("");

  const submit = async () => {
    const trimmed = pitch.trim();
    try {
      const res = await expressInterest({ data: { opportunity_id: opp.id, message: trimmed } });
      request(opp.id, trimmed || "No context note provided.");
      // Store the real interest ID in the client store so we can withdraw it later if needed
      const currentStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
      if (currentStore[opp.id]) {
        currentStore[opp.id].id = res.id;
        localStorage.setItem("relay.interest.v1", JSON.stringify(currentStore));
      }
      setOpen(false);
      setPitch("");
      toast.success("Interest Sent Successfully", {
        description: "The business owner will review your request.",
      });
    } catch (err: any) {
      console.error("Failed to express interest:", err);
      toast.error(err.message || "Failed to express interest.");
    }
  };

  const onWithdraw = async () => {
    try {
      if (record?.id) {
        await withdrawInterest({ data: { interest_id: record.id } });
      }
      withdraw(opp.id);
      toast.success("Interest request withdrawn successfully.");
    } catch (err: any) {
      console.error("Failed to withdraw interest:", err);
      toast.error(err.message || "Failed to withdraw interest.");
    }
  };

  const onAccept = () => {
    respond(opp.id, "accepted", mockContact(opp.company));
    toast.success(`${opp.company} accepted. Contact unlocked.`);
  };

  const onDecline = () => {
    respond(opp.id, "declined");
    toast(`${opp.company} declined this introduction.`);
  };

  const isConnected = opp.business_id === myBusinessId || status === "accepted";
  const shouldHide = opp.hide_company_name && !isConnected;
  const displayName = shouldHide ? "Confidential" : opp.company;

  // Compute initials for building avatar logo placeholder
  const initials = shouldHide
    ? "🔒"
    : displayName
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

  const isPromoted = opp.promotion_status === "promoted";

  const isMultiPromoted = isPromoted && promotedCount > 1;

  const cardClasses = isPromoted
    ? "bg-slate-950 border-orange-500/40 hover:border-orange-400 text-slate-100 shadow-lg hover:shadow-orange-950/20 hover:shadow-xl border-l-[4.5px] border-l-orange-500 bg-gradient-to-br from-slate-900 to-slate-950"
    : opp.trustLevel === "Approved"
      ? "bg-white border-slate-300/80 hover:border-primary border-l-[3.5px] border-l-slate-900 bg-gradient-to-br from-slate-50/20 via-white to-white hover:shadow-md"
      : "bg-white border-slate-200 hover:border-primary hover:shadow-md";

  const typeTagClass = isPromoted
    ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
    : (TYPE_ACCENT[opp.type] ?? "bg-slate-100 text-slate-600");

  const articleLayoutClass = isMultiPromoted
    ? "flex flex-col xl:flex-row gap-3.5 sm:gap-6"
    : "flex flex-col md:flex-row gap-3.5 sm:gap-6";

  const rightColClass = isMultiPromoted
    ? `xl:w-40 flex flex-row xl:flex-col items-center xl:items-stretch justify-between xl:justify-center gap-2.5 sm:gap-4 border-t xl:border-t-0 xl:border-l pt-2.5 sm:pt-4 xl:pt-0 xl:pl-6 ${
        isPromoted ? "border-slate-900" : "border-slate-100"
      }`
    : `md:w-40 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-2.5 sm:gap-4 border-t md:border-t-0 md:border-l pt-2.5 sm:pt-4 md:pt-0 md:pl-6 ${
        isPromoted ? "border-slate-900" : "border-slate-100"
      }`;

  return (
    <article
      className={`border p-3.5 sm:p-5 md:p-6 rounded-[4px] transition-all duration-300 animate-momentum relative overflow-hidden ${articleLayoutClass} ${cardClasses}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top-Right Bookmark Button */}
      {opp.business_id !== myBusinessId && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onSaveToggle(opp.id, !isSaved);
          }}
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-1 sm:p-1.5 rounded-full transition-colors focus:outline-none cursor-pointer z-10 ${
            isPromoted
              ? "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
              : "hover:bg-slate-50 text-slate-400 hover:text-slate-600"
          }`}
          title={isSaved ? "Remove from saved" : "Save opportunity"}
        >
          <Bookmark
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200 ${
              isSaved
                ? "fill-orange-500 text-orange-500 scale-110"
                : isPromoted
                  ? "text-slate-600 hover:text-slate-400"
                  : "text-slate-300 hover:text-slate-500"
            }`}
          />
        </button>
      )}

      <div className="flex-1 space-y-2.5 sm:space-y-3.5">
        {/* Top bar tags */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap pr-7 sm:pr-8">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={`px-2 sm:px-2.5 py-0.5 text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${typeTagClass}`}
            >
              {opp.type}
            </span>

            {isPromoted && (
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-[2px] bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-sm shadow-orange-950/50">
                Featured
              </span>
            )}

            <span
              className={`font-mono text-[8.5px] sm:text-[9px] font-medium ${isPromoted ? "text-slate-500" : "text-slate-400"}`}
            >
              #{opp.opportunity_number || opp.id}
            </span>
          </div>
          <span
            className={`font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest font-bold flex items-center gap-1 ${isPromoted ? "text-slate-400" : "text-slate-400"}`}
          >
            <Calendar className="w-3 h-3" />
            {opp.postedAt}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1 sm:space-y-1.5">
          <h3
            className={`font-display text-base sm:text-lg md:text-xl font-bold leading-snug sm:leading-tight transition-colors ${
              isPromoted
                ? "text-slate-50 hover:text-orange-400"
                : "text-slate-900 hover:text-primary"
            }`}
          >
            {opp.title}
          </h3>
          <p
            className={`text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-none leading-relaxed font-sans ${isPromoted ? "text-slate-300" : "text-slate-600"}`}
          >
            {opp.description}
          </p>
        </div>

        {/* Company & Meta Info Row */}
        <div
          className={`flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[10px] border-t pt-2 sm:pt-3 flex-wrap ${
            isPromoted ? "border-slate-900 text-slate-400" : "border-slate-50 text-slate-400"
          }`}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Minimal company logo placeholder */}
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[2px] flex items-center justify-center font-sans text-[7.5px] sm:text-[8px] font-bold uppercase ${
                isPromoted
                  ? "bg-slate-900 border border-slate-800 text-orange-400"
                  : "bg-slate-100 border border-slate-200 text-slate-600"
              }`}
            >
              {initials}
            </div>
            <span
              className={`font-bold flex items-center gap-1 sm:gap-1.5 ${isPromoted ? "text-white" : "text-slate-900"}`}
            >
              {displayName}
              {opp.trustLevel === "Approved" && !shouldHide && (
                <TooltipSimple content="Approved with Relay">
                  <BadgeCheck className="w-3.5 h-3.5 text-white fill-[#1877f2] shrink-0 cursor-default animate-badge-shine" />
                </TooltipSimple>
              )}
            </span>
          </div>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Briefcase
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPromoted ? "text-slate-500" : "text-slate-300"}`}
            />
            {opp.industry}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MapPin className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPromoted ? "text-slate-500" : "text-slate-300"}`} />
            {opp.geo}
          </span>
        </div>

        {/* Connection unlocked area */}
        {status === "accepted" && record?.contact && (
          <div
            className={`mt-4 border p-4 space-y-2 rounded-[2px] shadow-sm animate-momentum ${
              isPromoted
                ? "border-emerald-500/30 bg-emerald-950/20"
                : "border-emerald-500/20 bg-emerald-50/5"
            }`}
          >
            <div
              className={`flex items-center justify-between gap-4 flex-wrap border-b pb-1.5 ${
                isPromoted ? "border-emerald-500/20" : "border-emerald-500/10"
              }`}
            >
              <div
                className={`font-mono text-[9px] uppercase tracking-widest font-bold ${
                  isPromoted ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                [ Handshake Complete · Qualified Introduction ]
              </div>
              {record?.id && (
                <Link
                  to="/connections/$id"
                  params={{ id: record.id }}
                  className={`font-mono text-[9.5px] uppercase tracking-widest font-bold flex items-center gap-1 hover:underline ${
                    isPromoted ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-700 hover:text-emerald-900"
                  }`}
                >
                  View Handshake <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className={`font-display text-sm font-bold ${isPromoted ? "text-slate-100" : "text-slate-900"}`}
              >
                {record.contact.name}
              </span>
              <span className="font-mono text-[10px] text-slate-400 font-bold">
                · {record.contact.role}
              </span>
            </div>
            <a
              href={`mailto:${record.contact.email}`}
              className={`font-mono text-[11px] hover:underline transition-colors break-all flex items-center gap-1.5 ${
                isPromoted ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600"
              }`}
            >
              {record.contact.email}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Demo Pitch and Simulators */}
        {status === "pending" && (
          <div
            className={`mt-4 border border-dashed p-4 space-y-3 rounded-[2px] ${
              isPromoted ? "border-slate-800 bg-slate-900/30" : "border-slate-200 bg-slate-50/50"
            }`}
          >
            <div
              className={`font-mono text-[9px] uppercase tracking-widest font-bold ${
                isPromoted ? "text-slate-500" : "text-slate-400"
              }`}
            >
              [ Pitch sent · awaiting {opp.company} ]
            </div>
            <p
              className={`text-xs italic font-mono border px-3 py-2 rounded-[2px] ${
                isPromoted
                  ? "bg-slate-950 border-slate-900 text-slate-350"
                  : "bg-white border-slate-100 text-slate-600"
              }`}
            >
              &ldquo;{record?.pitch}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-1 font-mono text-[9px]">
              <span className={isPromoted ? "text-slate-500" : "text-slate-400"}>
                Demo actions:
              </span>
              <button
                onClick={onAccept}
                className={`font-bold hover:underline ${
                  isPromoted ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600"
                }`}
              >
                Accept introduction
              </button>
              <span className={isPromoted ? "text-slate-700" : "text-slate-300"}>·</span>
              <button
                onClick={onDecline}
                className={`transition-colors ${
                  isPromoted
                    ? "text-slate-400 hover:text-red-400"
                    : "text-slate-50 hover:text-red-600"
                }`}
              >
                Decline introduction
              </button>
            </div>
          </div>
        )}

        {/* Declined Status */}
        {status === "declined" && (
          <div
            className={`mt-4 border p-4 space-y-2 rounded-[2px] ${
              isPromoted
                ? "border-red-500/30 bg-red-950/20 text-slate-300"
                : "border-red-200 bg-red-50/30 text-slate-600"
            }`}
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-red-500 font-bold">
              [ Handoff declined ]
            </div>
            <p className="text-xs">
              {opp.company} chose not to accept this introduction. You can withdraw this pitch and
              try again later.
            </p>
          </div>
        )}

        {/* Bottom meta stats */}
        <div
          className={`flex items-center justify-between pt-2 sm:pt-3 border-t ${isPromoted ? "border-slate-900" : "border-slate-100"}`}
        >
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
            <Users className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPromoted ? "text-slate-600" : "text-slate-350"}`} />
            {opp.interested + (status !== "idle" ? 1 : 0)} verified businesses interested
          </span>
        </div>
      </div>

      {/* Right Column: Actions */}
      <div className={rightColClass}>
        {opp.business_id === myBusinessId ? (
          <div
            className={`flex-1 md:flex-none md:w-full text-center py-2 sm:py-2.5 px-3 border text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider sm:tracking-widest font-bold rounded-[2px] cursor-default flex items-center justify-center gap-1.5 ${
              isPromoted
                ? "border-slate-800 text-slate-500 bg-slate-900/50"
                : "border-slate-200 text-slate-400 bg-slate-50/50"
            }`}
          >
            {opp.hide_company_name && <Lock className="w-3 h-3 text-amber-500" />}
            <span>Your Listing {opp.hide_company_name && "(Private)"}</span>
          </div>
        ) : opp.status === "closed" ||
          (opp.expires_at ? new Date(opp.expires_at) < new Date() : false) ? (
          <div
            className={`flex-1 md:flex-none md:w-full text-center py-2 px-3 border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest font-bold rounded-[2px] ${
              isPromoted
                ? "border-red-500/30 bg-red-950/20 text-red-400"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {opp.status === "closed" ? "Closed" : "Expired"}
          </div>
        ) : (
          <div className="flex-1 md:flex-none md:w-full flex flex-col gap-2">
            {status === "idle" && (
              <button
                onClick={() => {
                  if (myBusinessStatus === "approved") {
                    setOpen(true);
                  } else {
                    setVerificationOpen(true);
                  }
                }}
                className={`w-full py-2 sm:py-2.5 px-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer font-bold ${
                  isPromoted
                    ? "bg-orange-600 hover:bg-orange-500 text-white border border-orange-500/30"
                    : "bg-slate-900 hover:bg-primary text-white border border-slate-900"
                }`}
              >
                Express Interest
              </button>
            )}

            {status === "pending" && (
              <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
                <div
                  className={`text-center py-1.5 sm:py-2 px-3 border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest font-bold rounded-[2px] ${
                    isPromoted
                      ? "border-amber-500/30 bg-amber-950/20 text-amber-400"
                      : "border-amber-500/30 bg-amber-50/50 text-amber-600"
                  }`}
                >
                  Pending
                </div>
                <button
                  onClick={onWithdraw}
                  className={`text-[9px] font-mono uppercase tracking-widest transition-colors font-bold cursor-pointer ${
                    isPromoted
                      ? "text-slate-500 hover:text-red-450"
                      : "text-slate-400 hover:text-red-600"
                  }`}
                >
                  Withdraw
                </button>
              </div>
            )}

            {status === "accepted" && (
              <div
                className={`text-center py-2 px-3 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] shadow-sm ${
                  isPromoted ? "bg-orange-600 text-white" : "bg-primary text-white"
                }`}
              >
                Connected
              </div>
            )}

            {status === "declined" && (
              <button
                onClick={onWithdraw}
                className={`py-2 px-3 border text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm cursor-pointer ${
                  isPromoted
                    ? "border-slate-800 text-slate-350 hover:border-orange-500 hover:text-orange-400 bg-slate-900/30"
                    : "border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-800 bg-white"
                }`}
              >
                Reset Card
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
              Express Interest
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 leading-relaxed font-sans">
              Contact info will be unlocked only after{" "}
              <span className="text-slate-900 font-bold">{opp.company}</span> accepts your handshake
              request.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold border-b border-slate-100 pb-1">
              <span>Selected Handoff</span>
              <span>#{opp.id}</span>
            </div>
            <div className="text-sm font-bold text-slate-800 break-words">{opp.title}</div>

            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-450 font-bold block">
                Why are you interested?
              </label>
              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Tell the business why you are a good fit for this opportunity."
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-950 focus:outline-none px-3.5 py-3 text-xs font-mono placeholder:text-slate-400/80 resize-none rounded-[2px] transition-all"
              />
              <span className="text-[10px] text-slate-400 block italic leading-normal">
                Example: We already work with 150 healthcare clinics across North India and can help
                expand distribution quickly.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold">
              <span>Operator network verification active</span>
              <span className="text-slate-400">{pitch.length}/500 chars (optional)</span>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-slate-450 hover:text-slate-950 transition-colors font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow font-bold cursor-pointer"
            >
              Send Interest
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Business Verification Required Dialog */}
      <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
              Business Verification Required
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 leading-relaxed font-sans">
              Your business is currently under review.
              <br />
              <br />
              You can save this opportunity and return after approval.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setVerificationOpen(false)}
              className="px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await onSaveToggle(opp.id, true);
                setVerificationOpen(false);
              }}
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow font-bold cursor-pointer"
            >
              Save Opportunity
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-slate-200 bg-white p-6 sm:p-10 md:p-16 text-center space-y-5 rounded-[4px]">
      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <Building className="w-6 h-6" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-xl md:text-2xl font-bold text-slate-800">
          No opportunities found
        </h3>
        <p className="text-slate-400 max-w-[40ch] mx-auto text-xs font-mono uppercase tracking-wider">
          Try adjusting or resetting your filter configurations.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}

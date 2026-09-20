import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth, useUser, useClerk } from "@clerk/tanstack-react-start";
import { getAdminUsers } from "../functions/getAdminUsers";
import { deleteUserFromAdmin } from "../functions/deleteUserFromAdmin";
import { updateBusinessStatus } from "../functions/updateBusinessStatus";
import { getAdminOpportunities } from "../functions/getAdminOpportunities";
import { updatePromotionStatus } from "../functions/updatePromotionStatus";
import { getAdminInsights } from "../functions/getAdminInsights";
import { deleteAdminInsightItem } from "../functions/deleteAdminInsightItem";
import { adminLogin } from "../functions/adminLogin";
import { checkAdminSession } from "../functions/checkAdminSession";
import { AdminCreateQuestionDialog } from "@/components/admin/AdminCreateQuestionDialog";
import { AdminCreateKnowledgeDialog } from "@/components/admin/AdminCreateKnowledgeDialog";
import { CompanyLogo } from "@/components/company-logo";
import { toast } from "@/components/ui/sonner";
import {
  ShieldAlert,
  Trash2,
  Loader2,
  Building2,
  ExternalLink,
  ShieldCheck,
  UserX,
  RefreshCw,
  Search,
  Users,
  Building,
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Megaphone,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Plus,
} from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Super Admin Control Center — The Relay" },
      { name: "description", content: "Hidden dashboard for platform operator administration." },
    ],
  }),
  component: AdminDashboard,
});

const clerkAppearance = {
  layout: { shadow: "none" },
  variables: {
    colorPrimary: "hsl(24 95% 45%)", // Operator Orange
    colorBackground: "white",
    colorText: "hsl(215 25% 12%)",
    colorTextSecondary: "hsl(215 25% 40%)",
    colorInputText: "hsl(215 25% 12%)",
    colorInputBackground: "hsl(210 15% 98%)",
    borderRadius: "2px", // Sharp Swiss edges
  },
  elements: {
    rootBox: "w-full shadow-none",
    card: "shadow-none border border-[#1f25301f] bg-white p-8 w-full rounded-[2px]",
    headerTitle: "text-2xl font-display font-extrabold tracking-tight text-[#111827]",
    headerSubtitle: "text-slate-500 font-sans mt-1 text-sm leading-relaxed",
    socialButtonsBlockButton:
      "rounded-[2px] border border-[#1f25301f] bg-[#fafafa] hover:bg-[#f3f3f3] transition-all h-12 shadow-none font-mono text-xs uppercase tracking-wider text-slate-700",
    socialButtonsBlockButtonText: "font-bold tracking-wide",
    formButtonPrimary:
      "bg-[hsl(24_95%_45%)] hover:bg-orange-700 text-white rounded-[2px] h-12 text-xs font-mono font-bold uppercase tracking-widest shadow-none transition-all active:scale-[0.98]",
    formFieldInput:
      "h-12 rounded-[2px] border border-[#1f25301f] bg-slate-50 focus:bg-white focus:border-[hsl(24_95%_45%)] focus:ring-1 focus:ring-[hsl(24_95%_45%)] transition-all text-slate-800 font-mono text-sm",
    formFieldLabel:
      "text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1 ml-0.5",
    footerActionLink:
      "text-[hsl(24_95%_45%)] font-bold hover:text-orange-700 transition-colors font-mono text-xs",
    dividerLine: "bg-[#1f25300d]",
    dividerText: "text-slate-400 font-mono text-[9px] uppercase tracking-wider",
    footer: "hidden",
  },
};

type AdminUser = {
  id: string;
  clerk_user_id: string;
  name: string;
  email: string;
  created_at: string;
  business: {
    id: string;
    company_name: string;
    website: string;
    industry: string;
    status: string;
  } | null;
};

type AdminOpportunity = {
  id: string;
  opportunity_number: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  offer_text: string | null;
  status: string;
  hide_company_name: boolean;
  promotion_status: string;
  created_at: string;
  business: {
    id: string;
    company_name: string;
    website: string;
    industry: string;
  };
};

type AdminQuestion = {
  id: string;
  business_id: string;
  title: string;
  description: string;
  topic: string;
  desired_perspective: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  business: {
    id: string;
    company_name: string;
    logo_url: string | null;
    status: string;
    industry: string;
  };
  perspectives_count: number;
};

type AdminKnowledgeInsight = {
  id: string;
  business_id: string;
  title: string;
  content: string;
  topic: string;
  based_on: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  business: {
    id: string;
    company_name: string;
    logo_url: string | null;
    status: string;
    industry: string;
  };
};

type AdminBusinessOption = {
  id: string;
  company_name: string;
  status: string;
  industry?: string | null;
  logo_url?: string | null;
};

const getAdminToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/relay_admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

function AdminLoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setFormError(null);
    try {
      const res = await adminLogin({
        data: {
          email: emailInput.trim(),
          password: passwordInput,
        },
      });

      if (res?.success && res.token) {
        document.cookie = `relay_admin_token=${encodeURIComponent(res.token)}; path=/; max-age=86400; SameSite=Strict`;
        toast.success("Authenticated as Super Admin successfully!");
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.reload();
        }
      } else {
        throw new Error("Authentication failed.");
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.message || "Authentication failed.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {formError && <Banner variant="danger">{formError}</Banner>}
      <div className="space-y-1">
        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="operator@therelay.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
          className="w-full h-12 px-4 rounded-[2px] border border-slate-800 bg-[#1a1f26] text-white font-mono text-xs focus:border-[hsl(24_95%_45%)] focus:ring-1 focus:ring-[hsl(24_95%_45%)] transition-all outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
          Password
        </label>
        <Input
          type="password"
          placeholder="••••••••••••"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
          className="w-full h-12 px-4 rounded-[2px] border border-slate-800 bg-[#1a1f26] text-white font-mono text-xs focus:border-[hsl(24_95%_45%)] focus:ring-1 focus:ring-[hsl(24_95%_45%)] transition-all outline-none"
        />
      </div>

      <Button
        type="submit"
        disabled={loginLoading}
        className="w-full h-12 bg-[hsl(24_95%_45%)] hover:bg-orange-700 text-white rounded-[2px] font-mono font-bold uppercase tracking-widest text-xs shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loginLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
          </>
        ) : (
          "Authenticate"
        )}
      </Button>
    </form>
  );
}

function AdminDashboard() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [isClient, setIsClient] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "promotions" | "insights">("users");
  const [insightsSubTab, setInsightsSubTab] = useState<"questions" | "knowledge">("questions");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [opportunities, setOpportunities] = useState<AdminOpportunity[]>([]);
  const [adminQuestions, setAdminQuestions] = useState<AdminQuestion[]>([]);
  const [adminKnowledge, setAdminKnowledge] = useState<AdminKnowledgeInsight[]>([]);
  const [adminBusinesses, setAdminBusinesses] = useState<AdminBusinessOption[]>([]);
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [isCreateKnowledgeOpen, setIsCreateKnowledgeOpen] = useState(false);
  const [deletingInsightId, setDeletingInsightId] = useState<string | null>(null);
  const [insightsSearchQuery, setInsightsSearchQuery] = useState("");
  const [insightsTopicFilter, setInsightsTopicFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [oppsSearchQuery, setOppsSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [updatingPromotionId, setUpdatingPromotionId] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, oppsRes, insightsRes] = await Promise.all([
        getAdminUsers(),
        getAdminOpportunities(),
        getAdminInsights(),
      ]);
      setUsers(usersRes.users);
      setOpportunities(oppsRes.opportunities);
      setAdminQuestions(insightsRes.questions);
      setAdminKnowledge(insightsRes.knowledgeInsights);
      setAdminBusinesses(insightsRes.businesses);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load admin panel data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInsightsData = async () => {
    try {
      const res = await getAdminInsights();
      setAdminQuestions(res.questions);
      setAdminKnowledge(res.knowledgeInsights);
      setAdminBusinesses(res.businesses);
    } catch (err: any) {
      console.error("[Admin] Failed to reload insights:", err);
    }
  };

  const handleDeleteInsight = async (type: "question" | "knowledge", id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to permanently delete this ${
          type === "question" ? "question" : "knowledge insight"
        } ("${title}")?`,
      )
    ) {
      return;
    }

    setDeletingInsightId(id);
    try {
      await deleteAdminInsightItem({ data: { type, id } });
      toast.success(
        `${type === "question" ? "Question" : "Knowledge insight"} deleted successfully.`,
      );
      await fetchInsightsData();
    } catch (err: any) {
      console.error("[Admin] Delete insight error:", err);
      toast.error(err?.message || "Failed to delete item.");
    } finally {
      setDeletingInsightId(null);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const token = getAdminToken();
    if (token) {
      checkAdminSession()
        .then((res) => {
          if (res?.isAdmin) {
            setIsAdminAuthenticated(true);
            fetchAdminData();
          } else {
            setIsAdminAuthenticated(false);
            setLoading(false);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
          setLoading(false);
        });
    } else {
      setIsAdminAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const handleAdminLogout = () => {
    document.cookie =
      "relay_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    toast.success("Admin session terminated.");
    window.location.reload();
  };

  const handleDeleteUser = async (dbId: string, clerkId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this user? This will remove all their data from Clerk and Supabase, cascading to delete their businesses and opportunities. This action CANNOT be undone.",
      )
    ) {
      return;
    }

    const actionKey = clerkId || dbId;
    setDeletingId(actionKey);
    try {
      console.log("[Admin] Initiating delete for user:", { dbId, clerkId });
      const res = await deleteUserFromAdmin({
        data: {
          id: dbId,
          clerk_user_id: clerkId,
        },
      });
      console.log("[Admin] Delete result:", res);
      toast.success("User and all associated business data permanently deleted.");
      setUsers((prev) => prev.filter((u) => u.id !== dbId && u.clerk_user_id !== clerkId));
      fetchAdminData();
    } catch (err: any) {
      console.error("[Admin] Delete failed error:", err);
      toast.error(err?.message || "Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (
    userId: string,
    businessId: string | undefined | null,
    newStatus: "pending" | "approved" | "rejected",
    ownerEmail: string,
    companyName: string,
  ) => {
    const actionKey = businessId || userId;
    setUpdatingStatusId(actionKey);
    try {
      const res = await updateBusinessStatus({
        data: {
          business_id: businessId || undefined,
          user_id: userId,
          status: newStatus,
          owner_email: ownerEmail,
          company_name: companyName,
        },
      });
      toast.success(`${companyName} status changed to ${newStatus}.`);
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === userId || (businessId && u.business?.id === businessId)) {
            return {
              ...u,
              business: {
                id: res.business?.id || u.business?.id || "temp-biz-id",
                company_name:
                  res.business?.company_name || u.business?.company_name || companyName,
                website: res.business?.website || u.business?.website || "",
                industry: res.business?.industry || u.business?.industry || "SaaS",
                status: newStatus,
              },
            };
          }
          return u;
        }),
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update business status.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handlePromotionStatusChange = async (
    opportunityId: string,
    newStatus: "none" | "pending_promotion" | "promoted",
    title: string,
  ) => {
    setUpdatingPromotionId(opportunityId);
    try {
      await updatePromotionStatus({
        data: { opportunity_id: opportunityId, promotion_status: newStatus },
      });
      toast.success(`Opportunity "${title}" promotion status set to ${newStatus}.`);
      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === opportunityId ? { ...opp, promotion_status: newStatus } : opp,
        ),
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update promotion status.");
    } finally {
      setUpdatingPromotionId(null);
    }
  };

  // Filtered Users list based on search query
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.clerk_user_id.toLowerCase().includes(q) ||
      user.id.toLowerCase().includes(q) ||
      (user.business && user.business.company_name.toLowerCase().includes(q))
    );
  });

  // Filtered Opportunities based on search query
  const filteredOpportunities = opportunities.filter((opp) => {
    const q = oppsSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      opp.opportunity_number.toLowerCase().includes(q) ||
      opp.title.toLowerCase().includes(q) ||
      opp.description.toLowerCase().includes(q) ||
      opp.category.toLowerCase().includes(q) ||
      (opp.location && opp.location.toLowerCase().includes(q)) ||
      opp.business.company_name.toLowerCase().includes(q)
    );
  });

  // Filtered Questions based on search query
  const filteredQuestions = adminQuestions.filter((q) => {
    const s = insightsSearchQuery.toLowerCase().trim();
    if (!s) return true;
    return (
      q.title.toLowerCase().includes(s) ||
      q.description.toLowerCase().includes(s) ||
      q.topic.toLowerCase().includes(s) ||
      q.business.company_name.toLowerCase().includes(s)
    );
  });

  // Filtered Knowledge Insights based on search query
  const filteredKnowledge = adminKnowledge.filter((k) => {
    const s = insightsSearchQuery.toLowerCase().trim();
    if (!s) return true;
    return (
      k.title.toLowerCase().includes(s) ||
      k.content.toLowerCase().includes(s) ||
      k.topic.toLowerCase().includes(s) ||
      k.business.company_name.toLowerCase().includes(s)
    );
  });

  const totalUsersCount = users.length;
  const onboardedCount = users.filter((u) => u.business !== null).length;
  const pendingVettingCount = users.filter(
    (u) => u.business !== null && u.business.status === "pending",
  ).length;
  const pendingPromotionsCount = opportunities.filter(
    (opp) => opp.promotion_status === "pending_promotion",
  ).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-800">
        <Loader2 className="w-10 h-10 animate-spin text-[hsl(24_95%_45%)]" />
        <span className="font-mono text-xs uppercase tracking-widest mt-4 text-slate-500">
          Loading Control Center...
        </span>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0f12] flex items-center justify-center p-6 text-white selection:bg-primary selection:text-white">
        <div className="max-w-md w-full border border-slate-800 bg-[#14171c] p-8 rounded-[2px] space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-8 w-auto mx-auto object-contain brightness-0 invert"
            />
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white mt-4">
              Control Center
            </h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              [ Authorized Operators Only ]
            </p>
          </div>

          {isClient ? (
            <AdminLoginForm
              onSuccess={() => {
                setIsAdminAuthenticated(true);
                fetchAdminData();
              }}
            />
          ) : (
            <div className="flex justify-center p-4">
              <Loader2 className="w-6 h-6 animate-spin text-[hsl(24_95%_45%)]" />
            </div>
          )}

          <div className="text-center pt-4 border-t border-slate-800">
            <Link
              to="/"
              className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading && users.length === 0 && opportunities.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-800">
        <Loader2 className="w-10 h-10 animate-spin text-[hsl(24_95%_45%)]" />
        <span className="font-mono text-xs uppercase tracking-widest mt-4 text-slate-500">
          Fetching Database Directory...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full border border-red-500/20 bg-red-950/10 p-8 text-center rounded-[2px] space-y-6">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-red-400">
              Access Forbidden
            </h1>
            <p className="text-sm font-mono text-slate-400 leading-relaxed">
              {error.includes("Forbidden")
                ? "This panel is strictly restricted. Only the super admin account can access this resource."
                : error}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[hsl(24_95%_45%)] hover:text-orange-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Exit Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-sans flex flex-col justify-between">
      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-8 animate-momentum">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1f25301f] pb-6">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="font-mono text-[9px] text-primary border border-primary/10 bg-primary/5 uppercase tracking-widest font-bold rounded-[2px] px-2 py-0.5"
            >
              [ System Admin Dashboard ]
            </Badge>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              Control Center Dashboard
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage operators, verify businesses, and moderate listing promotions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchAdminData}
              variant="outline"
              size="icon"
              className="w-8 h-8 border border-[#1f25301f] rounded-[2px] bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 cursor-pointer"
              title="Refresh Directory"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleAdminLogout}
              variant="ghost"
              className="h-8 text-xs font-mono font-bold uppercase tracking-widest text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer rounded-[2px] px-3"
            >
              Logout Admin
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="grid sm:grid-cols-4 gap-6">
          <div className="border border-[#1f25301f] bg-white p-6 rounded-[2px] flex items-center gap-4">
            <div className="p-3 bg-slate-100 rounded-[2px]">
              <Users className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                Total Registrations
              </div>
              <div className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                {totalUsersCount}
              </div>
            </div>
          </div>

          <div className="border border-[#1f25301f] bg-white p-6 rounded-[2px] flex items-center gap-4">
            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-[2px]">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                Onboarded Profiles
              </div>
              <div className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                {onboardedCount}
              </div>
            </div>
          </div>

          <div className="border border-[#1f25301f] bg-white p-6 rounded-[2px] flex items-center gap-4">
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-[2px]">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                Pending Vetting
              </div>
              <div className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                {pendingVettingCount}
              </div>
            </div>
          </div>

          <div className="border border-[#1f25301f] bg-white p-6 rounded-[2px] flex items-center gap-4">
            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-[2px]">
              <Megaphone className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                Pending Promotions
              </div>
              <div className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                {pendingPromotionsCount}
              </div>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#1f25301f] font-mono text-xs uppercase tracking-wider gap-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 border-b-2 font-bold transition-all -mb-px cursor-pointer ${
              activeTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            User Directory & Vetting
          </button>
          <button
            onClick={() => setActiveTab("promotions")}
            className={`pb-3 border-b-2 font-bold transition-all -mb-px cursor-pointer flex items-center gap-1.5 ${
              activeTab === "promotions"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Promotion Requests
            {pendingPromotionsCount > 0 && (
              <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold rounded-full font-sans tracking-normal leading-none flex items-center justify-center">
                {pendingPromotionsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`pb-3 border-b-2 font-bold transition-all -mb-px cursor-pointer flex items-center gap-1.5 ${
              activeTab === "insights"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Insights & Knowledge
            {adminQuestions.length + adminKnowledge.length > 0 && (
              <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-full font-sans tracking-normal leading-none flex items-center justify-center">
                {adminQuestions.length + adminKnowledge.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "users" && (
          /* Directory Controls */
          <section className="border border-[#1f25301f] bg-white rounded-[2px] overflow-hidden">
            <div className="p-5 border-b border-[#1f25300d] flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by Name, Email, Clerk ID, or Company Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-[2px] border border-[#1f25301f] bg-white text-slate-800 font-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                Showing {filteredUsers.length} of {totalUsersCount} Users
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <Table className="w-full border-collapse text-left text-xs">
                <TableHeader className="bg-[#fafbfc] border-b border-[#1f253012] font-mono font-bold uppercase text-[9px] tracking-wider text-slate-500">
                  <TableRow>
                    <TableHead className="p-4 pl-6">Operator Name & Email</TableHead>
                    <TableHead className="p-4">Identities (Clerk / DB)</TableHead>
                    <TableHead className="p-4">Business Credentials</TableHead>
                    <TableHead className="p-4">Status</TableHead>
                    <TableHead className="p-4">Joined At</TableHead>
                    <TableHead className="p-4 pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-[#1f25300a]">
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="p-12 text-center text-slate-400 font-mono">
                        No matching records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="p-4 pl-6">
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell className="p-4">
                          <div className="font-mono text-[10px] text-slate-600">
                            <span className="text-[9px] font-bold text-slate-400 uppercase select-none mr-1">
                              Clerk:
                            </span>
                            {user.clerk_user_id}
                          </div>
                          <div className="font-mono text-[10px] text-slate-600 mt-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase select-none mr-1">
                              DB:
                            </span>
                            {user.id}
                          </div>
                        </TableCell>
                        <TableCell className="p-4">
                          {user.business ? (
                            <div className="space-y-1">
                              <div className="font-bold text-slate-800 flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-primary" />
                                {user.business.company_name}
                              </div>
                              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                                <span>{user.business.industry}</span>
                                <span>·</span>
                                <a
                                  href={user.business.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-primary hover:underline flex items-center gap-0.5"
                                >
                                  {user.business.website.replace(/^https?:\/\//i, "")}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                              Not Onboarded
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="p-4">
                          {user.business ? (
                            <Badge
                              variant={
                                user.business.status === "approved"
                                  ? "success"
                                  : user.business.status === "rejected"
                                    ? "danger"
                                    : "warning"
                              }
                              className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5"
                            >
                              {user.business.status === "approved" && (
                                <RelayVerificationSeal className="w-3 h-3 shrink-0" />
                              )}
                              {user.business.status}
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5 text-slate-500 border-slate-300 bg-slate-50"
                            >
                              Not Onboarded
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="p-4 font-mono text-[10px] text-slate-500">
                          {new Date(user.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-3 flex-wrap">
                            {/* Status Change Dropdown — Always Available & 100% Consistent UI */}
                            <Select
                              value={user.business?.status || ""}
                              onValueChange={(val) => {
                                handleStatusChange(
                                  user.id,
                                  user.business?.id,
                                  val as "pending" | "approved" | "rejected",
                                  user.email,
                                  user.business?.company_name || user.name || "Operator",
                                );
                              }}
                              disabled={updatingStatusId === (user.business?.id || user.id)}
                            >
                              <SelectTrigger className="w-[125px] h-8 text-[10px] font-mono font-bold uppercase rounded-[2px] border-[#1f25301f] bg-slate-50 hover:bg-slate-100 transition-all focus:ring-0 focus:ring-offset-0 text-slate-800">
                                {updatingStatusId === (user.business?.id || user.id) ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-slate-500" />
                                ) : (
                                  <span className="truncate">
                                    {user.business ? user.business.status : "Not Onboarded"}
                                  </span>
                                )}
                              </SelectTrigger>
                              <SelectContent className="rounded-[2px] font-mono text-[10px] uppercase">
                                <SelectItem
                                  value="pending"
                                  className="cursor-pointer text-amber-600 focus:text-amber-700 font-bold"
                                >
                                  Pending
                                </SelectItem>
                                <SelectItem
                                  value="approved"
                                  className="cursor-pointer text-emerald-600 focus:text-emerald-700 font-bold"
                                >
                                  Approved
                                </SelectItem>
                                <SelectItem
                                  value="rejected"
                                  className="cursor-pointer text-red-600 focus:text-red-700 font-bold"
                                >
                                  Rejected
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            {/* Delete button — always shown */}
                            <Button
                              onClick={() => handleDeleteUser(user.id, user.clerk_user_id)}
                              disabled={deletingId === user.clerk_user_id || deletingId === user.id}
                              variant="destructive"
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-red-500/10 rounded-[2px] bg-red-500/5 hover:bg-red-500 hover:text-white transition-all text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
                            >
                              {deletingId === user.clerk_user_id || deletingId === user.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-[#1f25300a] bg-white border border-slate-200 rounded-[4px] shadow-xs">
              {filteredUsers.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-mono text-xs">
                  No matching records found.
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user.id} className="p-4 space-y-4 text-xs">
                    {/* Operator Name & Email */}
                    <div className="border-b border-slate-100 pb-2">
                      <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {user.email}
                      </div>
                    </div>

                    {/* Identities */}
                    <div className="space-y-1 font-mono text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-[2px] border border-slate-100/50">
                      <div>
                        <span className="font-bold text-slate-400 uppercase select-none mr-1">
                          Clerk:
                        </span>
                        {user.clerk_user_id}
                      </div>
                      <div>
                        <span className="font-bold text-slate-400 uppercase select-none mr-1">
                          DB:
                        </span>
                        {user.id}
                      </div>
                    </div>

                    {/* Business Credentials */}
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                        Business:
                      </div>
                      {user.business ? (
                        <div className="space-y-1 bg-slate-50/50 p-2.5 rounded-[2px] border border-slate-100">
                          <div className="font-bold text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-primary" />
                            {user.business.company_name}
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                            <span>{user.business.industry}</span>
                            <span>·</span>
                            <a
                              href={user.business.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline flex items-center gap-0.5"
                            >
                              {user.business.website.replace(/^https?:\/\//i, "")}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                          Not Onboarded
                        </span>
                      )}
                    </div>

                    {/* Status & Joined date */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div>
                        <span className="text-slate-400 mr-1.5">Status:</span>
                        {user.business ? (
                          <Badge
                            variant={
                              user.business.status === "approved"
                                ? "success"
                                : user.business.status === "rejected"
                                  ? "danger"
                                  : "warning"
                            }
                            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5"
                          >
                            {user.business.status === "approved" && (
                              <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" />
                            )}
                            {user.business.status}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5 text-slate-500 border-slate-300 bg-slate-50"
                          >
                            Not Onboarded
                          </Badge>
                        )}
                      </div>
                      <div className="text-slate-500">
                        <span className="text-slate-400 mr-1.5">Joined:</span>
                        {new Date(user.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 flex-wrap">
                      {/* Status Change Dropdown — Always Available & 100% Consistent UI */}
                      <Select
                        value={user.business?.status || ""}
                        onValueChange={(val) => {
                          handleStatusChange(
                            user.id,
                            user.business?.id,
                            val as "pending" | "approved" | "rejected",
                            user.email,
                            user.business?.company_name || user.name || "Operator",
                          );
                        }}
                        disabled={updatingStatusId === (user.business?.id || user.id)}
                      >
                        <SelectTrigger className="w-[125px] h-8 text-[10px] font-mono font-bold uppercase rounded-[2px] border-[#1f25301f] bg-slate-50 hover:bg-slate-100 transition-all focus:ring-0 focus:ring-offset-0 text-slate-800">
                          {updatingStatusId === (user.business?.id || user.id) ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-slate-500" />
                          ) : (
                            <span className="truncate">
                              {user.business ? user.business.status : "Not Onboarded"}
                            </span>
                          )}
                        </SelectTrigger>
                        <SelectContent className="rounded-[2px] font-mono text-[10px] uppercase">
                          <SelectItem
                            value="pending"
                            className="cursor-pointer text-amber-600 focus:text-amber-700 font-bold"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem
                            value="approved"
                            className="cursor-pointer text-emerald-600 focus:text-emerald-700 font-bold"
                          >
                            Approved
                          </SelectItem>
                          <SelectItem
                            value="rejected"
                            className="cursor-pointer text-red-600 focus:text-red-700 font-bold"
                          >
                            Rejected
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() => handleDeleteUser(user.id, user.clerk_user_id)}
                        disabled={deletingId === user.clerk_user_id || deletingId === user.id}
                        variant="destructive"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-red-500/10 rounded-[2px] bg-red-500/5 hover:bg-red-500 hover:text-white transition-all text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
                      >
                        {deletingId === user.clerk_user_id || deletingId === user.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "promotions" && (
          /* Promotion Requests Controls */
          <section className="border border-[#1f25301f] bg-white rounded-[2px] overflow-hidden">
            <div className="p-5 border-b border-[#1f25300d] flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by Opp#, Title, Category, or Company..."
                  value={oppsSearchQuery}
                  onChange={(e) => setOppsSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-[2px] border border-[#1f25301f] bg-white text-slate-800 font-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                Showing {filteredOpportunities.length} of {opportunities.length} Opportunities
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <Table className="w-full border-collapse text-left text-xs">
                <TableHeader className="bg-[#fafbfc] border-b border-[#1f253012] font-mono font-bold uppercase text-[9px] tracking-wider text-slate-500">
                  <TableRow>
                    <TableHead className="p-4 pl-6">Opp ID & Title</TableHead>
                    <TableHead className="p-4">Owner Business</TableHead>
                    <TableHead className="p-4">Category</TableHead>
                    <TableHead className="p-4">Promotion Status</TableHead>
                    <TableHead className="p-4">Created At</TableHead>
                    <TableHead className="p-4 pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-[#1f25300a]">
                  {filteredOpportunities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="p-12 text-center text-slate-400 font-mono">
                        No matching records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOpportunities.map((opp) => (
                      <TableRow key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="p-4 pl-6">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-1 py-0.5 rounded-[2px] select-none font-medium">
                              {opp.opportunity_number}
                            </span>
                            {opp.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-1 font-sans">
                            {opp.description}
                          </div>
                        </TableCell>
                        <TableCell className="p-4">
                          <div className="font-bold text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {opp.business.company_name}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                            <a
                              href={opp.business.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline flex items-center gap-0.5"
                            >
                              {opp.business.website.replace(/^https?:\/\//i, "")}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="p-4 font-mono text-[10px] uppercase text-slate-600">
                          {opp.category}
                        </TableCell>
                        <TableCell className="p-4">
                          <Badge
                            variant={
                              opp.promotion_status === "promoted"
                                ? "success"
                                : opp.promotion_status === "pending_promotion"
                                  ? "warning"
                                  : "secondary"
                            }
                            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5"
                          >
                            {opp.promotion_status === "promoted" && (
                              <Sparkles className="w-3 h-3" />
                            )}
                            {opp.promotion_status === "pending_promotion" && (
                              <Clock className="w-3 h-3" />
                            )}
                            {opp.promotion_status === "none" ? "none" : opp.promotion_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="p-4 font-mono text-[10px] text-slate-500">
                          {new Date(opp.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2.5 flex-wrap">
                            {opp.promotion_status === "pending_promotion" && (
                              <>
                                <Button
                                  onClick={() =>
                                    handlePromotionStatusChange(opp.id, "promoted", opp.title)
                                  }
                                  disabled={updatingPromotionId === opp.id}
                                  className="h-8 px-3 rounded-[2px] bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  Approve
                                </Button>
                                <Button
                                  onClick={() =>
                                    handlePromotionStatusChange(opp.id, "none", opp.title)
                                  }
                                  disabled={updatingPromotionId === opp.id}
                                  variant="outline"
                                  className="h-8 px-3 rounded-[2px] border-red-200 bg-red-50/20 hover:bg-red-50 text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  Reject
                                </Button>
                              </>
                            )}

                            {opp.promotion_status === "promoted" && (
                              <Button
                                onClick={() =>
                                  handlePromotionStatusChange(opp.id, "none", opp.title)
                                }
                                disabled={updatingPromotionId === opp.id}
                                variant="outline"
                                className="h-8 px-3 rounded-[2px] border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                              >
                                Revoke Promotion
                              </Button>
                            )}

                            <Select
                              value={opp.promotion_status}
                              onValueChange={(val) =>
                                handlePromotionStatusChange(
                                  opp.id,
                                  val as "none" | "pending_promotion" | "promoted",
                                  opp.title,
                                )
                              }
                              disabled={updatingPromotionId === opp.id}
                            >
                              <SelectTrigger className="w-[130px] h-8 text-[10px] font-mono font-bold uppercase rounded-[2px] border-[#1f25301f] bg-slate-50 hover:bg-slate-100 transition-all focus:ring-0 focus:ring-offset-0">
                                {updatingPromotionId === opp.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-slate-500" />
                                ) : (
                                  <SelectValue />
                                )}
                              </SelectTrigger>
                              <SelectContent className="rounded-[2px] font-mono text-[10px] uppercase">
                                <SelectItem value="none" className="cursor-pointer text-slate-600">
                                  None
                                </SelectItem>
                                <SelectItem
                                  value="pending_promotion"
                                  className="cursor-pointer text-amber-600"
                                >
                                  Pending
                                </SelectItem>
                                <SelectItem
                                  value="promoted"
                                  className="cursor-pointer text-emerald-600"
                                >
                                  Promoted
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-[#1f25300a] bg-white border border-slate-200 rounded-[4px] shadow-xs">
              {filteredOpportunities.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-mono text-xs">
                  No matching records found.
                </div>
              ) : (
                filteredOpportunities.map((opp) => (
                  <div key={opp.id} className="p-4 space-y-4 text-xs">
                    <div className="border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] text-slate-400 bg-slate-100 border border-slate-200 px-1 py-0.5 rounded-[2px]">
                          {opp.opportunity_number}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{opp.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans mt-1">
                        {opp.description}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                        Business:
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-[2px] border border-slate-100">
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {opp.business.company_name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          <a
                            href={opp.business.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline"
                          >
                            {opp.business.website.replace(/^https?:\/\//i, "")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div>
                        <span className="text-slate-400 mr-1.5">Category:</span>
                        <span className="text-slate-700 uppercase font-semibold">
                          {opp.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 mr-1.5">Created:</span>
                        {new Date(opp.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                      <div>
                        <span className="text-slate-400 mr-1.5">Promotion:</span>
                        <Badge
                          variant={
                            opp.promotion_status === "promoted"
                              ? "success"
                              : opp.promotion_status === "pending_promotion"
                                ? "warning"
                                : "secondary"
                          }
                          className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5"
                        >
                          {opp.promotion_status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 flex-wrap">
                      {opp.promotion_status === "pending_promotion" && (
                        <>
                          <Button
                            onClick={() =>
                              handlePromotionStatusChange(opp.id, "promoted", opp.title)
                            }
                            disabled={updatingPromotionId === opp.id}
                            className="h-8 px-3 rounded-[2px] bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handlePromotionStatusChange(opp.id, "none", opp.title)}
                            disabled={updatingPromotionId === opp.id}
                            variant="outline"
                            className="h-8 px-3 rounded-[2px] border-red-200 bg-red-50/20 hover:bg-red-50 text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {opp.promotion_status === "promoted" && (
                        <Button
                          onClick={() => handlePromotionStatusChange(opp.id, "none", opp.title)}
                          disabled={updatingPromotionId === opp.id}
                          variant="outline"
                          className="h-8 px-3 rounded-[2px] border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Revoke
                        </Button>
                      )}

                      <Select
                        value={opp.promotion_status}
                        onValueChange={(val) =>
                          handlePromotionStatusChange(
                            opp.id,
                            val as "none" | "pending_promotion" | "promoted",
                            opp.title,
                          )
                        }
                        disabled={updatingPromotionId === opp.id}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-[10px] font-mono font-bold uppercase rounded-[2px] border-[#1f25301f] bg-slate-50 hover:bg-slate-100 transition-all focus:ring-0 focus:ring-offset-0">
                          {updatingPromotionId === opp.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-slate-500" />
                          ) : (
                            <SelectValue />
                          )}
                        </SelectTrigger>
                        <SelectContent className="rounded-[2px] font-mono text-[10px] uppercase">
                          <SelectItem value="none" className="cursor-pointer text-slate-600">
                            None
                          </SelectItem>
                          <SelectItem
                            value="pending_promotion"
                            className="cursor-pointer text-amber-600"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem value="promoted" className="cursor-pointer text-emerald-600">
                            Promoted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "insights" && (
          <section className="space-y-6">
            {/* Insights Overview Card with Action CTAs */}
            <div className="border border-[#1f25301f] bg-white p-6 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-display font-black text-slate-900 uppercase tracking-tight">
                    Insights & Practical Knowledge
                  </h3>
                  <Badge className="bg-slate-100 text-slate-700 text-[10px] font-mono uppercase tracking-wider border-slate-200">
                    Operator Queries
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed font-sans">
                  Manually create and publish business questions (Use Case 1) and practical lessons (Use Case 2) on behalf of any verified company.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <Button
                  onClick={() => setIsCreateQuestionOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-10 px-4 rounded-[2px] shadow-sm flex items-center gap-2 cursor-pointer font-bold transition-all hover:-translate-y-0.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  + Create Question
                </Button>
                <Button
                  onClick={() => setIsCreateKnowledgeOpen(true)}
                  className="bg-[hsl(24_95%_45%)] hover:bg-orange-700 text-white text-xs font-mono uppercase tracking-wider h-10 px-4 rounded-[2px] shadow-sm flex items-center gap-2 cursor-pointer font-bold transition-all hover:-translate-y-0.5"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  + Publish Knowledge
                </Button>
              </div>
            </div>

            {/* Content Table Container */}
            <div className="border border-[#1f25301f] bg-white rounded-[2px] overflow-hidden">
              {/* Inner Tabs + Search & Filters */}
              <div className="p-4 border-b border-[#1f25300d] bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Sub-Tabs: Questions vs Knowledge */}
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
                  <button
                    onClick={() => setInsightsSubTab("questions")}
                    className={`pb-2 border-b-2 font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      insightsSubTab === "questions"
                        ? "border-slate-900 text-slate-900"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Questions ({adminQuestions.length})</span>
                  </button>

                  <button
                    onClick={() => setInsightsSubTab("knowledge")}
                    className={`pb-2 border-b-2 font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      insightsSubTab === "knowledge"
                        ? "border-slate-900 text-slate-900"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Knowledge ({adminKnowledge.length})</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder={`Search ${insightsSubTab === "questions" ? "questions..." : "knowledge..."}`}
                    value={insightsSearchQuery}
                    onChange={(e) => setInsightsSearchQuery(e.target.value)}
                    className="h-9 pl-9 text-xs bg-white border border-[#1f25301f] rounded-[2px] focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Questions Table */}
              {insightsSubTab === "questions" ? (
                filteredQuestions.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 font-mono text-xs">
                    No questions found. Click "+ Create Question" to manually post one.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="w-full border-collapse text-left text-xs">
                      <TableHeader className="bg-[#fafbfc] border-b border-[#1f253012] font-mono font-bold uppercase text-[9px] tracking-wider text-slate-500">
                        <TableRow>
                          <TableHead className="p-4 pl-6">Question & Topic</TableHead>
                          <TableHead className="p-4">Author Business</TableHead>
                          <TableHead className="p-4">Status</TableHead>
                          <TableHead className="p-4">Perspectives</TableHead>
                          <TableHead className="p-4">Created</TableHead>
                          <TableHead className="p-4 pr-6 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-[#1f25300a]">
                        {filteredQuestions.map((q) => (
                          <TableRow key={q.id} className="hover:bg-slate-50/60 transition-colors">
                            <TableCell className="p-4 pl-6 max-w-sm">
                              <div className="font-semibold text-slate-900 line-clamp-1">{q.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                                  {q.topic}
                                </span>
                                <span className="text-slate-400 text-[11px] line-clamp-1">
                                  {q.description}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="p-4">
                              <div className="flex items-center gap-2">
                                <CompanyLogo
                                  src={q.business.logo_url}
                                  name={q.business.company_name}
                                  className="w-5 h-5 rounded object-contain border border-slate-200"
                                />
                                <div>
                                  <div className="font-medium text-slate-800">{q.business.company_name}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    {q.business.industry || "B2B"}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="p-4">
                              <span
                                className={`font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 rounded ${
                                  q.status === "open"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {q.status}
                              </span>
                            </TableCell>
                            <TableCell className="p-4">
                              <span className="font-mono text-xs font-bold text-slate-700">
                                {q.perspectives_count}
                              </span>
                            </TableCell>
                            <TableCell className="p-4 text-slate-500 font-mono text-[11px]">
                              {new Date(q.created_at).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell className="p-4 pr-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`/insights/${q.id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                                  title="View on site"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={deletingInsightId === q.id}
                                  onClick={() => handleDeleteInsight("question", q.id, q.title)}
                                  className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                  title="Delete question"
                                >
                                  {deletingInsightId === q.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )
              ) : (
                /* Knowledge Table */
                filteredKnowledge.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 font-mono text-xs">
                    No knowledge insights found. Click "+ Publish Knowledge" to manually post one.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="w-full border-collapse text-left text-xs">
                      <TableHeader className="bg-[#fafbfc] border-b border-[#1f253012] font-mono font-bold uppercase text-[9px] tracking-wider text-slate-500">
                        <TableRow>
                          <TableHead className="p-4 pl-6">Insight Title & Content</TableHead>
                          <TableHead className="p-4">Author Business</TableHead>
                          <TableHead className="p-4">Basis / Transparency</TableHead>
                          <TableHead className="p-4">Status</TableHead>
                          <TableHead className="p-4">Published</TableHead>
                          <TableHead className="p-4 pr-6 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-[#1f25300a]">
                        {filteredKnowledge.map((k) => (
                          <TableRow key={k.id} className="hover:bg-slate-50/60 transition-colors">
                            <TableCell className="p-4 pl-6 max-w-sm">
                              <div className="font-semibold text-slate-900 line-clamp-1">{k.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                                  {k.topic}
                                </span>
                                <span className="text-slate-400 text-[11px] line-clamp-1">
                                  {k.content}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="p-4">
                              <div className="flex items-center gap-2">
                                <CompanyLogo
                                  src={k.business.logo_url}
                                  name={k.business.company_name}
                                  className="w-5 h-5 rounded object-contain border border-slate-200"
                                />
                                <div>
                                  <div className="font-medium text-slate-800">{k.business.company_name}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    {k.business.industry || "B2B"}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="p-4">
                              <span className="font-mono text-[10px] text-slate-600 capitalize">
                                {k.based_on ? k.based_on.replace(/_/g, " ") : "—"}
                              </span>
                            </TableCell>
                            <TableCell className="p-4">
                              <span className="font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {k.status}
                              </span>
                            </TableCell>
                            <TableCell className="p-4 text-slate-500 font-mono text-[11px]">
                              {new Date(k.created_at).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell className="p-4 pr-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`/insights/knowledge/${k.id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                                  title="View on site"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={deletingInsightId === k.id}
                                  onClick={() => handleDeleteInsight("knowledge", k.id, k.title)}
                                  className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                  title="Delete insight"
                                >
                                  {deletingInsightId === k.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Dialogs for Admin creation of Questions & Knowledge Insights */}
        <AdminCreateQuestionDialog
          open={isCreateQuestionOpen}
          onOpenChange={setIsCreateQuestionOpen}
          onSuccess={fetchInsightsData}
          businesses={adminBusinesses}
        />
        <AdminCreateKnowledgeDialog
          open={isCreateKnowledgeOpen}
          onOpenChange={setIsCreateKnowledgeOpen}
          onSuccess={fetchInsightsData}
          businesses={adminBusinesses}
        />
      </main>

      {/* Admin Footer */}
      <footer className="py-8 border-t border-[#1f253012] text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest bg-white">
        <span>© 2026 The Relay Protocol · Administrative Access Layer</span>
      </footer>
    </div>
  );
}

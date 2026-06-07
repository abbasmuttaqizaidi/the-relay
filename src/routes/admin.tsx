import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth, useUser, useClerk } from "@clerk/tanstack-react-start";
import { getAdminUsers } from "../functions/getAdminUsers";
import { deleteUserFromAdmin } from "../functions/deleteUserFromAdmin";
import { toast } from "sonner";
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
} from "lucide-react";
import logoUrl from "../../assets/icons/logo-white-bg.png";

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

const getAdminToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/relay_admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

function AdminLoginForm() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setFormError(null);
    try {
      // Simulate small delay for premium feels
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (
        emailInput.toLowerCase().trim() === "nexorembws@gmail.com" &&
        passwordInput === "PP@password110"
      ) {
        document.cookie = "relay_admin_token=PP@password110; path=/; max-age=86400; SameSite=Strict";
        toast.success("Authenticated as Super Admin successfully!");
        window.location.reload();
      } else {
        throw new Error("Invalid admin credentials.");
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
      {formError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] uppercase rounded-[2px] leading-relaxed">
          {formError}
        </div>
      )}
      <div className="space-y-1">
        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
          Email Address
        </label>
        <input
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
        <input
          type="password"
          placeholder="••••••••••••"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
          className="w-full h-12 px-4 rounded-[2px] border border-slate-800 bg-[#1a1f26] text-white font-mono text-xs focus:border-[hsl(24_95%_45%)] focus:ring-1 focus:ring-[hsl(24_95%_45%)] transition-all outline-none"
        />
      </div>

      <button
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
      </button>
    </form>
  );
}

function AdminDashboard() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [isClient, setIsClient] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminUsers();
      setUsers(res.users);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load admin panel data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        toast.error("Access restricted: Redirected to home.");
        navigate({ to: "/home" });
      } else {
        const token = getAdminToken();
        if (token === "PP@password110") {
          setIsAdminAuthenticated(true);
          fetchUsers();
        } else {
          setIsAdminAuthenticated(false);
          setLoading(false);
        }
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  const handleAdminLogout = () => {
    document.cookie = "relay_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    toast.success("Admin session terminated.");
    window.location.reload();
  };

  const handleDeleteUser = async (dbId: string, clerkId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this user? This will remove all their data from Clerk and Supabase, cascading to delete their businesses and opportunities. This action CANNOT be undone.")) {
      return;
    }

    setDeletingId(dbId);
    try {
      await deleteUserFromAdmin({
        data: {
          id: dbId,
          clerk_user_id: clerkId,
        },
      });
      toast.success("User successfully deleted from both systems.");
      setUsers(users.filter((u) => u.id !== dbId));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete user.");
    } finally {
      setDeletingId(null);
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

  const totalUsersCount = users.length;
  const onboardedCount = users.filter((u) => u.business !== null).length;
  const pendingVettingCount = users.filter(
    (u) => u.business !== null && u.business.status === "pending"
  ).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 text-slate-800">
        <Loader2 className="w-10 h-10 animate-spin text-[hsl(24_95%_45%)]" />
        <span className="font-mono text-xs uppercase tracking-widest mt-4 text-slate-500">
          Loading Control Center...
        </span>
      </div>
    );
  }

  if (isSignedIn && user) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 text-slate-800">
        <Loader2 className="w-10 h-10 animate-spin text-[hsl(24_95%_45%)]" />
        <span className="font-mono text-xs uppercase tracking-widest mt-4 text-slate-500">
          Redirecting to Home...
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
            <AdminLoginForm />
          ) : (
            <div className="flex justify-center p-4">
              <Loader2 className="w-6 h-6 animate-spin text-[hsl(24_95%_45%)]" />
            </div>
          )}

          <div className="text-center pt-4 border-t border-slate-800">
            <Link
              to="/home"
              className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 text-slate-800">
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
              to="/home"
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
    <div className="min-h-screen bg-[#f8f9fa] text-foreground font-sans flex flex-col justify-between">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#1f25301f] bg-white">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="The Relay Logo" className="h-7 w-auto mix-blend-multiply" />
            <span className="h-5 w-px bg-slate-200" />
            <span className="font-mono text-[10px] bg-red-500/10 text-red-600 px-2 py-0.5 border border-red-500/10 font-bold uppercase rounded-[2px] tracking-wider">
              Control Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchUsers}
              className="p-2 border border-[#1f25301f] rounded-[2px] bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 cursor-pointer"
              title="Refresh Directory"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleAdminLogout}
              className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              Logout Admin
            </button>
            <Link
              to="/opportunities"
              className="text-xs font-mono font-bold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors"
            >
              Go to Feed
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-8 animate-momentum">
        {/* Header Title */}
        <div className="space-y-2">
          <span className="font-mono text-[9px] text-primary uppercase tracking-widest font-bold">
            [ System Admin Dashboard ]
          </span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            User Directory & Access Control
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage the lifecycle of operators, purge bad actors, and monitor onboarding. Database
            actions trigger automatic cascades.
          </p>
        </div>

        {/* Stats Grid */}
        <section className="grid sm:grid-cols-3 gap-6">
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
        </section>

        {/* Directory Controls */}
        <section className="border border-[#1f25301f] bg-white rounded-[2px] overflow-hidden">
          <div className="p-5 border-b border-[#1f25300d] flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-[#fafbfc] border-b border-[#1f253012] font-mono font-bold uppercase text-[9px] tracking-wider text-slate-500">
                <tr>
                  <th className="p-4 pl-6">Operator Name & Email</th>
                  <th className="p-4">Identities (Clerk / DB)</th>
                  <th className="p-4">Business Credentials</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Joined At</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f25300a]">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 font-mono">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{user.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-[10px] text-slate-600">
                          <span className="text-[9px] font-bold text-slate-400 uppercase select-none mr-1">Clerk:</span>
                          {user.clerk_user_id}
                        </div>
                        <div className="font-mono text-[10px] text-slate-600 mt-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase select-none mr-1">DB:</span>
                          {user.id}
                        </div>
                      </td>
                      <td className="p-4">
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
                      </td>
                      <td className="p-4">
                        {user.business ? (
                          <span
                            className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase rounded-[2px] px-2 py-0.5 border ${
                              user.business.status === "approved"
                                ? "bg-green-500/10 text-green-600 border-green-500/10"
                                : user.business.status === "rejected"
                                ? "bg-red-500/10 text-red-600 border-red-500/10"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/10"
                            }`}
                          >
                            {user.business.status === "approved" && (
                              <ShieldCheck className="w-3 h-3" />
                            )}
                            {user.business.status}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-[10px] text-slate-500">
                        {new Date(user.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => handleDeleteUser(user.id, user.clerk_user_id)}
                          disabled={deletingId === user.id}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-red-500/10 rounded-[2px] bg-red-500/5 hover:bg-red-500 hover:text-white transition-all text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === user.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Admin Footer */}
      <footer className="py-8 border-t border-[#1f253012] text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest bg-white">
        <span>© 2026 The Relay Protocol · Administrative Access Layer</span>
      </footer>
    </div>
  );
}

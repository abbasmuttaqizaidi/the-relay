import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { updateBusiness } from "../functions/updateBusiness";
import { verifyWebsite } from "../functions/verifyWebsite";
import { toast } from "sonner";
import {
  Building2,
  Globe,
  Tag,
  FileText,
  Linkedin,
  Loader2,
  Lock,
  Save,
  ExternalLink,
  Check,
  CalendarDays,
  ShieldCheck,
  CircleDot,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/business-profile")({
  head: () => ({
    meta: [
      { title: "Business Profile — The Relay" },
      {
        name: "description",
        content: "View and manage your business profile on The Relay.",
      },
    ],
  }),
  component: BusinessProfilePage,
});

const INDUSTRIES = [
  "SaaS",
  "Marketing Agency",
  "Development Agency",
  "AI & Automation",
  "Recruitment",
  "D2C Brand",
  "Legal",
  "Healthcare",
  "Logistics",
];

interface BusinessData {
  id: string;
  company_name: string;
  website: string;
  industry: string;
  description?: string | null;
  linkedin_url?: string | null;
  logo_url?: string | null;
  status: string;
  website_verified: boolean;
  website_verified_at: string | null;
  website_verified_domain: string | null;
  created_at: string;
  updated_at: string;
}

function BusinessProfilePage() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const navigate = useNavigate();

  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Website verification state
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    domain: string;
    resolvedUrl?: string;
    error?: string;
    checks: { dns: boolean; reachable: boolean; ssl: boolean };
  } | null>(null);

  // Editable form fields
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Track original values for dirty check
  const [originals, setOriginals] = useState({
    industry: "",
    description: "",
    linkedinUrl: "",
  });

  // Auth guard
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign in to view your business profile.", {
        id: "profile-auth-required",
      });
      navigate({ to: "/signup" });
    }
  }, [isLoaded, isSignedIn]);

  // Load business data
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const loadBusiness = async () => {
      try {
        const status = await checkOnboardingStatus();
        if (!status.hasBusiness || !status.business) {
          toast.info("Please complete onboarding first.", {
            id: "profile-needs-onboarding",
          });
          navigate({ to: "/onboarding" });
          return;
        }

        const biz = status.business as BusinessData;
        setBusiness(biz);

        // Initialize form fields
        const ind = biz.industry || "SaaS";
        const desc = biz.description || "";
        const lin = biz.linkedin_url || "";

        setIndustry(ind);
        setDescription(desc);
        setLinkedinUrl(lin);
        setOriginals({
          industry: ind,
          description: desc,
          linkedinUrl: lin,
        });

        // Restore verification state from DB if already verified
        if (biz.website_verified && biz.website_verified_domain) {
          setVerificationResult({
            valid: true,
            domain: biz.website_verified_domain,
            checks: { dns: true, reachable: true, ssl: true },
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load business profile.");
      } finally {
        setPageLoading(false);
      }
    };

    loadBusiness();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!business) return null;

  // Dirty check
  const hasChanges =
    industry !== originals.industry ||
    description !== originals.description ||
    linkedinUrl !== originals.linkedinUrl;

  // Tier mapping
  const tierMap: Record<string, string> = {
    pending: "Applied",
    approved: "Approved",
    rejected: "Basic",
  };
  const tierLabel = tierMap[business.status] || "Applied";

  // Format date
  const memberSince = new Date(business.created_at).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateBusiness({
        data: {
          business_id: business.id,
          industry,
          description: description || undefined,
          linkedin_url: linkedinUrl || undefined,
        },
      });

      // Update localStorage profile cache
      try {
        const stored = localStorage.getItem("relay.profile.v1");
        const profile = stored ? JSON.parse(stored) : {};
        profile.companyName = business.company_name;
        profile.verificationLevel =
          business.status === "approved" ? "Approved" : "Applied";
        localStorage.setItem("relay.profile.v1", JSON.stringify(profile));
        window.dispatchEvent(new Event("relay:profile"));
      } catch (_) {}

      // Update originals
      setOriginals({
        industry,
        description,
        linkedinUrl,
      });

      toast.success("Profile updated successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-foreground font-sans flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#1f25301f] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 md:h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-10 md:h-14 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/opportunities"
              className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Board
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-12 gap-16 items-start">
        {/* Left: Identity Card */}
        <section className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="border border-[#1f25301f] bg-white p-8 rounded-[2px] space-y-6">
            {/* Logo + Name */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 border border-border rounded-[2px] bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                <Building2 className="w-8 h-8 text-slate-300" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-900 truncate">
                  {business.company_name}
                </h1>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-primary hover:underline flex items-center gap-1 truncate"
                >
                  {business.website.replace(/^https?:\/\//, "")}
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>

            {/* Status + Member since */}
            <div className="border-t border-[#1f253012] pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Verification Tier
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5">
                  {tierLabel === "Approved" && (
                    <Check className="w-2.5 h-2.5" />
                  )}
                  {tierLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Account Status
                </span>
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border rounded-[2px] ${
                    business.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/10"
                      : business.status === "rejected"
                        ? "bg-red-500/10 text-red-600 border-red-500/10"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/10"
                  }`}
                >
                  {business.status === "approved"
                    ? "Verified"
                    : business.status === "rejected"
                      ? "Rejected"
                      : "Pending Review"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Member Since
                </span>
                <span className="text-xs font-mono text-slate-600 flex items-center gap-1.5">
                  <CalendarDays className="w-3 h-3 text-slate-400" />
                  {memberSince}
                </span>
              </div>
            </div>

            {/* Locked notice */}
            <div className="border border-border bg-slate-50 p-4 rounded-[2px] flex items-start gap-3">
              <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Company name and website cannot be changed after registration.
                Contact{" "}
                <span className="font-mono text-primary">
                  support@therelay.co
                </span>{" "}
                for changes.
              </p>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="border border-[#1f25301f] bg-white p-6 rounded-[2px] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f25300d] pb-3">
              <h3 className="font-display text-sm font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Verification Steps
              </h3>
              <span className="text-[8px] font-mono uppercase tracking-widest text-slate-400">
                {verificationResult?.valid ? "1" : "0"} / 1 Complete
              </span>
            </div>

            {/* Step 1: Website & Domain */}
            <div className="border border-border rounded-[2px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Website & Domain
                  </span>
                </div>
                {verificationResult === null ? (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Not Verified</span>
                ) : verificationResult.valid ? (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-red-500 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Failed
                  </span>
                )}
              </div>

              {/* Individual checks */}
              {verificationResult && (
                <div className="space-y-1.5 pl-5.5">
                  {["dns", "reachable", "ssl"].map((checkKey) => {
                    const passed = verificationResult.checks[checkKey as keyof typeof verificationResult.checks];
                    const labels: Record<string, string> = {
                      dns: "DNS Resolution",
                      reachable: "Website Reachable",
                      ssl: "SSL Certificate",
                    };
                    return (
                      <div key={checkKey} className="flex items-center gap-2">
                        {passed ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        <span className={`text-[10px] font-mono ${passed ? "text-slate-600" : "text-red-500"}`}>
                          {labels[checkKey]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Resolved via different URL note */}
              {verificationResult && verificationResult.valid && verificationResult.resolvedUrl && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 p-2.5 rounded-[2px]">
                  <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-600 leading-relaxed">
                    Verified via <span className="font-mono font-bold">{verificationResult.resolvedUrl}</span>
                  </p>
                </div>
              )}

              {/* Error message */}
              {verificationResult && !verificationResult.valid && verificationResult.error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 p-2.5 rounded-[2px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-600 leading-relaxed">
                    {verificationResult.error}
                  </p>
                </div>
              )}

              {/* Verify button */}
              <button
                type="button"
                disabled={verifying}
                onClick={async () => {
                  setVerifying(true);
                  setVerificationResult(null);
                  try {
                    const result = await verifyWebsite({ data: { url: business.website, business_id: business.id } });
                    setVerificationResult(result);
                    if (result.valid) {
                      toast.success(`Domain ${result.domain} verified successfully.`);
                    } else {
                      toast.error(result.error || "Website verification failed.");
                    }
                  } catch (err: any) {
                    toast.error("Verification request failed.");
                    setVerificationResult({
                      valid: false,
                      domain: "",
                      error: err?.message || "Unexpected error",
                      checks: { dns: false, reachable: false, ssl: false },
                    });
                  } finally {
                    setVerifying(false);
                  }
                }}
                className="w-full h-9 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all rounded-[2px] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" /> Verifying...
                  </>
                ) : verificationResult?.valid ? (
                  <>
                    <Check className="w-3 h-3" /> Re-verify Domain
                  </>
                ) : (
                  <>
                    <Globe className="w-3 h-3" /> Verify Website
                  </>
                )}
              </button>
            </div>

            {/* Future steps placeholder */}
            <div className="flex items-center gap-2 px-1">
              <CircleDot className="w-3 h-3 text-slate-300" />
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                More steps coming soon
              </span>
            </div>
          </div>
        </section>

        {/* Right: Edit Form */}
        <section className="lg:col-span-7">
          <form
            onSubmit={handleSave}
            className="border border-[#1f25301f] bg-white p-8 rounded-[2px] space-y-6"
          >
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 border-b border-[#1f25300d] pb-3">
              Edit Profile
            </h3>

            {/* Industry */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Primary Industry
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full h-11 px-4 border border-border bg-slate-50 text-slate-800 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono cursor-pointer flex items-center justify-between">
                  <SelectValue placeholder="Select primary industry" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border rounded-[2px] font-mono max-h-60 overflow-y-auto">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem
                      key={ind}
                      value={ind}
                      className="cursor-pointer font-mono hover:bg-slate-50 focus:bg-slate-50"
                    >
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Company Description
              </label>
              <textarea
                rows={5}
                maxLength={1000}
                placeholder="Describe what your business does, your core audience, and value proposition..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y"
              />
              <div className="text-right font-mono text-[9px] text-muted-foreground uppercase">
                {description.length} / 1000 Chars
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-primary" /> Corporate
                LinkedIn Page URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/company/acme"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
              />
            </div>


            {/* Save Button */}
            <button
              type="submit"
              disabled={saving || !hasChanges}
              className="w-full h-13 bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-700 transition-all rounded-[2px] font-bold flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving
                  changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1f253012] text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
        <span>
          © 2026 The Relay Protocol · Double Opt-In Verified B2B Network
        </span>
      </footer>
    </div>
  );
}

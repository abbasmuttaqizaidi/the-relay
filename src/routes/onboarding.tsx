import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { createBusiness } from "../functions/createBusiness";
import { toast } from "sonner";
import {
  Building2,
  Globe,
  Tag,
  FileText,
  Linkedin,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Register Business Profile — The Relay" },
      {
        name: "description",
        content: "Complete your onboarding by registering your business profile on The Relay.",
      },
    ],
  }),
  component: OnboardingPage,
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

function OnboardingPage() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("SaaS");
  const [description, setDescription] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [logoUrlInput, setLogoUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirection guard if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign up or sign in to register your business.", {
        id: "onboarding-auth-required",
      });
      navigate({ to: "/signup" });
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }
    if (!website.trim() || !website.startsWith("http")) {
      toast.error("Please enter a valid website starting with http:// or https://");
      return;
    }
    if (linkedinUrl.trim() && !linkedinUrl.toLowerCase().includes("linkedin.com/")) {
      toast.error("Please enter a valid LinkedIn URL.");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();

      // Resolve logo URL from website domain if no custom logo is entered
      let finalLogoUrl = logoUrlInput?.trim() || undefined;
      if (!finalLogoUrl && website.trim()) {
        try {
          let hostname = website.trim();
          if (!/^https?:\/\//i.test(hostname)) {
            hostname = "http://" + hostname;
          }
          const parsed = new URL(hostname);
          const domain = parsed.hostname.replace(/^www\./i, "");
          if (domain) {
            finalLogoUrl = `https://logo.clearbit.com/${domain}`;
          }
        } catch (_) {}
      }

      // Call the TanStack Server Function
      await createBusiness({
        data: {
          company_name: companyName,
          website,
          industry,
          description: description || undefined,
          linkedin_url: linkedinUrl || undefined,
          logo_url: finalLogoUrl,
        },
        headers: {
          // Pass Clerk token to authorize mapping creation
          "x-clerk-user-id": token || undefined,
          Authorization: `Bearer ${token}`,
        },
      });

      const mappedProfile = {
        companyName,
        verificationLevel: "Applied",
        logoUrl: finalLogoUrl,
        score: 0,
      };
      localStorage.setItem("relay.profile.v1", JSON.stringify(mappedProfile));
      window.dispatchEvent(new Event("relay:profile"));

      toast.success("Business profile registered successfully! Vetting pending.");

      // Redirect to opportunities feed
      navigate({ to: "/opportunities" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit profile. Please try again.");
    } finally {
      setLoading(false);
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
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Lock className="w-3.5 h-3.5" /> Secure Onboarding
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Editorial Banner */}
        <section className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 animate-momentum">
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">
              [ Setup Your Operator Account ]
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-none text-slate-900">
              Register your <span className="italic text-primary">Business Profile</span>.
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[44ch]">
              Before participating in opportunity exchanges, you must establish your corporate
              identity. Your profile is automatically queued in our manual verification router upon
              creation.
            </p>
          </div>

          <div className="border border-border bg-[#fafbfc] p-5 font-mono rounded-[2px] space-y-2">
            <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
              Verification State
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-700">Account status</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 border border-amber-500/10 font-bold uppercase rounded-[2px]">
                Pending Review
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-border">
              Pending profiles can browse other listings but require manual 'approved' status to
              post opportunities or express interest.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1f253012] space-y-4">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-primary flex-none" />
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Verified B2B Directory
                </h4>
                <p className="text-[11px] text-slate-500">
                  Profiles are manually vetted to keep quality high and eliminate sales spam.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Form Layout */}
        <section className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="border border-[#1f25301f] bg-white p-8 rounded-[2px] space-y-6"
          >
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 border-b border-[#1f25300d] pb-3">
              Corporate Credentials
            </h3>

            {/* Row: Company Name & Website */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Website URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://acme.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                />
              </div>
            </div>

            {/* Row: Industry Selection & Logo URL */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Primary Industry *
                </label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select primary industry" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Company Logo URL
                </label>
                <input
                  type="url"
                  placeholder="https://acme.com/logo.png"
                  value={logoUrlInput}
                  onChange={(e) => setLogoUrlInput(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                />
              </div>
            </div>

            {/* Field: Description */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Company Description
              </label>
              <textarea
                rows={4}
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

            {/* Field: LinkedIn */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-primary" /> Corporate LinkedIn Page URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/company/acme"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-700 transition-all rounded-[2px] font-bold flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting credentials...
                </>
              ) : (
                <>
                  Submit Profile For Review{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1f253012] text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
        <span>© 2026 The Relay Protocol · Double Opt-In Verified B2B Network</span>
      </footer>
    </div>
  );
}

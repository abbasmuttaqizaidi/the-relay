import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { updateBusiness } from "../functions/updateBusiness";
import { verifyWebsite } from "../functions/verifyWebsite";
import { uploadBusinessLogo } from "../functions/uploadBusinessLogo";
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
  Upload,
  ImageIcon,
  BadgeCheck,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Coins,
  Twitter,
  Mail,
} from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const COMPANY_TYPES = ["SaaS / Product", "Service Agency", "Consulting", "Enterprise", "Investor"];
const FUNDING_STAGES = ["Bootstrapped", "Pre-Seed", "Seed", "Series A+", "Self-Sustaining"];

interface BusinessData {
  id: string;
  company_name: string;
  website: string;
  industry: string;
  description?: string | null;
  linkedin_url?: string | null;
  logo_url?: string | null;
  hq_location?: string | null;
  founded_year?: number | null;
  company_size?: string | null;
  company_type?: string | null;
  funding_stage?: string | null;
  twitter_url?: string | null;
  contact_email?: string | null;
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

  // Logo upload state
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

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
  const [hqLocation, setHqLocation] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Track original values for dirty check
  const [originals, setOriginals] = useState({
    industry: "",
    description: "",
    linkedinUrl: "",
    hqLocation: "",
    foundedYear: "",
    companySize: "",
    companyType: "",
    fundingStage: "",
    twitterUrl: "",
    contactEmail: "",
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
        const hq = biz.hq_location || "";
        const year = biz.founded_year ? String(biz.founded_year) : "";
        const size = biz.company_size || "";
        const type = biz.company_type || "";
        const funding = biz.funding_stage || "";
        const twit = biz.twitter_url || "";
        const email = biz.contact_email || "";

        setIndustry(ind);
        setDescription(desc);
        setLinkedinUrl(lin);
        setHqLocation(hq);
        setFoundedYear(year);
        setCompanySize(size);
        setCompanyType(type);
        setFundingStage(funding);
        setTwitterUrl(twit);
        setContactEmail(email);

        setOriginals({
          industry: ind,
          description: desc,
          linkedinUrl: lin,
          hqLocation: hq,
          foundedYear: year,
          companySize: size,
          companyType: type,
          fundingStage: funding,
          twitterUrl: twit,
          contactEmail: email,
        });

        // Restore verification state from DB if already verified
        if (biz.website_verified && biz.website_verified_domain) {
          setVerificationResult({
            valid: true,
            domain: biz.website_verified_domain,
            checks: { dns: true, reachable: true, ssl: true },
          });
        }

        // Restore logo preview from DB
        if (biz.logo_url) {
          setLogoPreview(biz.logo_url);
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
    linkedinUrl !== originals.linkedinUrl ||
    hqLocation !== originals.hqLocation ||
    foundedYear !== originals.foundedYear ||
    companySize !== originals.companySize ||
    companyType !== originals.companyType ||
    fundingStage !== originals.fundingStage ||
    twitterUrl !== originals.twitterUrl ||
    contactEmail !== originals.contactEmail;

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

  const handleLogoUpload = async (file: File) => {
    // Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2MB.");
      return;
    }

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setUploadingLogo(true);
    try {
      // Convert file to base64 for server fn
      const base64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => {
          const result = r.result as string;
          // Strip the data:image/...;base64, prefix
          resolve(result.split(",")[1]);
        };
        r.onerror = reject;
        r.readAsDataURL(file);
      });

      const result = await uploadBusinessLogo({
        data: {
          business_id: business!.id,
          fileBase64: base64,
          mimeType: file.type,
          fileName: file.name,
        },
      });

      // Update local state with the permanent URL
      setLogoPreview(result.logoUrl);
      setBusiness((prev) => prev ? { ...prev, logo_url: result.logoUrl } : prev);
      toast.success("Logo updated successfully.");
    } catch (err: any) {
      toast.error(err.message || "Logo upload failed.");
      // Revert preview to previous logo
      setLogoPreview(business?.logo_url ?? null);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const parsedYear = foundedYear ? parseInt(foundedYear, 10) : null;
    if (foundedYear && (isNaN(parsedYear!) || parsedYear! < 1800 || parsedYear! > 2100)) {
      toast.error("Please enter a valid founded year (between 1800 and 2100).");
      setSaving(false);
      return;
    }

    try {
      await updateBusiness({
        data: {
          business_id: business.id,
          industry,
          description: description || undefined,
          linkedin_url: linkedinUrl || undefined,
          hq_location: hqLocation || undefined,
          founded_year: parsedYear || undefined,
          company_size: companySize || undefined,
          company_type: companyType || undefined,
          funding_stage: fundingStage || undefined,
          twitter_url: twitterUrl || undefined,
          contact_email: contactEmail || undefined,
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
        hqLocation,
        foundedYear,
        companySize,
        companyType,
        fundingStage,
        twitterUrl,
        contactEmail,
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
              {/* Clickable logo avatar with upload overlay */}
              <div
                className="relative w-16 h-16 border border-border rounded-[2px] bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 group cursor-pointer"
                onClick={() => logoInputRef.current?.click()}
                title="Click to update logo"
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt={business.company_name}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-slate-300" />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploadingLogo ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              {/* Hidden file input */}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                  e.target.value = "";
                }}
              />
              <div className="space-y-1.5 min-w-0">
                <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 truncate">
                  <span className="truncate">{business.company_name}</span>
                  {business.status === "approved" && (
                    <BadgeCheck
                      className="w-5 h-5 text-white fill-[#1877f2] shrink-0 animate-badge-shine"
                    />
                  )}
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

          </div>
        </section>

        {/* Right: Tabs containing Edit Form and Verification */}
        <section className="lg:col-span-7">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="verification">Website Verification</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Details Form */}
            <TabsContent value="basic">
              <form
                onSubmit={handleSave}
                className="border border-[#1f25301f] bg-white p-8 rounded-[2px] space-y-6"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 border-b border-[#1f25300d] pb-3">
                  Basic Details
                </h3>

                {/* 2-column Grid for metadata fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Industry */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Primary Industry
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

                  {/* HQ Location */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> HQ Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Zurich, Switzerland"
                      value={hqLocation}
                      onChange={(e) => setHqLocation(e.target.value)}
                      className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                    />
                  </div>

                  {/* Founded Year */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Founded Year
                    </label>
                    <input
                      type="number"
                      min="1800"
                      max="2100"
                      placeholder="e.g. 2021"
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                    />
                  </div>

                  {/* Company Size */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Company Size
                    </label>
                    <Select value={companySize} onValueChange={setCompanySize}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} Employees
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Company Type */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Company Type
                    </label>
                    <Select value={companyType} onValueChange={setCompanyType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {COMPANY_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Funding Stage */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Coins className="w-3 h-3" /> Funding Stage
                    </label>
                    <Select value={fundingStage} onValueChange={setFundingStage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select funding stage" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {FUNDING_STAGES.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
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

                {/* Grid for LinkedIn, Twitter, Email */}
                <div className="grid sm:grid-cols-2 gap-6 border-t border-[#1f25300d] pt-6">
                  {/* LinkedIn */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Linkedin className="w-3 h-3 text-primary" /> Corporate LinkedIn
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/company/acme"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Twitter className="w-3 h-3 text-sky-500" /> Corporate Twitter / X
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/acme"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                    />
                  </div>

                  {/* Public Contact Email */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="contact@acme.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono"
                    />
                  </div>
                </div>

                {/* Company Logo Section */}
                <div className="space-y-1.5 border-t border-[#1f25300d] pt-6">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Company Logo
                  </label>
                  <div
                    className="border-2 border-dashed border-border rounded-[2px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary hover:bg-orange-50/30 transition-all group"
                    onClick={() => logoInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleLogoUpload(file);
                    }}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-20 h-20 object-contain rounded-[2px] border border-border bg-slate-50 p-2"
                      />
                    ) : (
                      <div className="w-20 h-20 border border-border rounded-[2px] bg-slate-50 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                    <div className="text-center space-y-1">
                      {uploadingLogo ? (
                        <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Uploading...
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-mono text-slate-600 group-hover:text-primary transition-colors flex items-center gap-1.5 justify-center">
                            <Upload className="w-3.5 h-3.5" />
                            {logoPreview ? "Click or drag to replace logo" : "Click or drag to upload logo"}
                          </p>
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                            PNG, JPG, SVG, WEBP · Max 2MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving || !hasChanges}
                  className="w-full h-13 bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-700 transition-all rounded-[2px] font-bold flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </form>
            </TabsContent>

            {/* Tab 2: Website Verification Checklist */}
            <TabsContent value="verification">
              <div className="border border-[#1f25301f] bg-white p-8 rounded-[2px] space-y-6">
                <div className="flex items-center justify-between border-b border-[#1f25300d] pb-3">
                  <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Website Verification
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {verificationResult?.valid ? "1" : "0"} / 1 Complete
                  </span>
                </div>

                <div className="border border-border rounded-[2px] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700">
                        Domain Verification
                      </span>
                    </div>
                    {verificationResult === null ? (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Not Verified</span>
                    ) : verificationResult.valid ? (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 flex items-center gap-1 font-bold">
                        <Check className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 flex items-center gap-1 font-bold">
                        <XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
                  </div>

                  {/* Individual checks */}
                  {verificationResult && (
                    <div className="space-y-2 pl-6.5">
                      {["dns", "reachable", "ssl"].map((checkKey) => {
                        const passed = verificationResult.checks[checkKey as keyof typeof verificationResult.checks];
                        const labels: Record<string, string> = {
                          dns: "DNS Resolution",
                          reachable: "Website Reachable",
                          ssl: "SSL Certificate Check",
                        };
                        return (
                          <div key={checkKey} className="flex items-center gap-2.5">
                            {passed ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-red-400" />
                            )}
                            <span className={`text-xs font-mono ${passed ? "text-slate-600" : "text-red-500"}`}>
                              {labels[checkKey]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Resolved via different URL note */}
                  {verificationResult && verificationResult.valid && verificationResult.resolvedUrl && (
                    <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 p-3 rounded-[2px]">
                      <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-600 leading-relaxed">
                        Verified via <span className="font-mono font-bold">{verificationResult.resolvedUrl}</span>
                      </p>
                    </div>
                  )}

                  {/* Error message */}
                  {verificationResult && !verificationResult.valid && verificationResult.error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-100 p-3 rounded-[2px]">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-600 leading-relaxed">
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
                    className="w-full h-11 bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-slate-800 transition-all rounded-[2px] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                  >
                    {verifying ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying...
                      </>
                    ) : verificationResult?.valid ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Re-verify Domain
                      </>
                    ) : (
                      <>
                        <Globe className="w-3.5 h-3.5" /> Verify Website
                      </>
                    )}
                  </button>
                </div>

                {/* Future steps placeholder */}
                <div className="flex items-center gap-2 px-1">
                  <CircleDot className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                    More verification methods coming soon
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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

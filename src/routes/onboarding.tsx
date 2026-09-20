import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { createBusiness } from "../functions/createBusiness";
import { updateBusiness } from "../functions/updateBusiness";
import { uploadBusinessLogo } from "../functions/uploadBusinessLogo";
import { deleteBusinessLogo } from "../functions/deleteBusinessLogo";
import {
  Button,
  Input,
  Textarea,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  RegistrationMark,
  VerifiedMark,
  PendingMark,
  DynamicRegistrationMark,
  RegistrationPendingMark,
  RegistrationVerifiedMark,
} from "@/design-system";
import { LegalAcknowledgementModal } from "@/components/LegalAcknowledgementModal";
import { toast } from "@/components/ui/sonner";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  EyeOff,
  Handshake,
  Zap,
  Loader2,
  Clock,
  AlertCircle,
  Upload,
  Trash2,
  Camera,
} from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Business Profile — The Relay" },
      {
        name: "description",
        content: "Manage your company details and verified enterprise credentials on The Relay.",
      },
    ],
  }),
  component: OnboardingPage,
});

const INDUSTRIES = [
  "Enterprise Freight & Supply Chain Systems",
  "B2B Logistics & Transport Orchestration",
  "FinTech & Bilateral Settlement",
  "Enterprise SaaS Platforms",
  "SaaS",
  "Marketing Agency",
  "Development Agency",
  "AI & Automation",
  "Recruitment",
  "D2C Brand",
  "Legal",
  "Healthcare",
  "Logistics",
  "Fintech",
  "E-commerce",
  "Real Estate",
  "Cybersecurity",
  "Cloud & DevOps",
  "Edtech",
  "Consulting & Advisory",
  "Web3 & Blockchain",
  "HR Tech",
  "Manufacturing",
  "Media & Adtech",
];

const COMPANY_SIZES = [
  "1 - 10 Employees",
  "11 - 50 Employees",
  "51 - 200 Employees",
  "250 - 500 Employees",
  "500+ Employees",
];

const COMPANY_TYPES = [
  "Privately Held / B2B SaaS",
  "Service Agency",
  "Agency / Service Provider",
  "Consulting",
  "Enterprise",
  "Joint Venture",
  "Public Corporation",
  "Early-Stage Startup",
];

const FUNDING_STAGES = [
  "Bootstrapped",
  "Pre-Seed / Seed",
  "Seed / Angel",
  "Series A",
  "Series B",
  "Series B ($38M Raised)",
  "Series C+",
  "Profitable / Established",
  "Self-Sustaining",
];

function getInitials(name: string) {
  if (!name || !name.trim()) return "ASG";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function OnboardingPage() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const navigate = useNavigate();

  // Dynamic Business Record & Status
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [businessStatus, setBusinessStatus] = useState<"unregistered" | "pending" | "approved" | "rejected">("unregistered");
  const [memberSinceDate, setMemberSinceDate] = useState<string>("");
  const [exchangeCount, setExchangeCount] = useState<number>(0);
  const [reciprocalParity, setReciprocalParity] = useState<string>("100%");
  const [fetchingProfile, setFetchingProfile] = useState<boolean>(true);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("SaaS");
  const [hqLocation, setHqLocation] = useState("");
  const [foundedYear, setFoundedYear] = useState<number | string>("");
  const [companySize, setCompanySize] = useState("1 - 10 Employees");
  const [companyType, setCompanyType] = useState("Privately Held / B2B SaaS");
  const [fundingStage, setFundingStage] = useState("Bootstrapped");
  const [website, setWebsite] = useState("");
  const [logoUrlInput, setLogoUrlInput] = useState("");
  const [description, setDescription] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [crunchbaseUrl, setCrunchbaseUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const openFileExplorer = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (uploadingLogo || deletingLogo) return;
    if (logoFileInputRef.current) {
      logoFileInputRef.current.click();
    } else {
      const input = document.getElementById("relay-company-logo-input") as HTMLInputElement;
      if (input) input.click();
    }
  };

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 5MB.");
      return;
    }

    // Validate image format
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, SVG, WebP).");
      return;
    }

    setUploadingLogo(true);
    const toastId = toast.loading("Uploading logo to storage...");
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = (err) => reject(err);
      });
      reader.readAsDataURL(file);

      const fileBase64 = await base64Promise;
      const res = await uploadBusinessLogo({
        data: {
          business_id: businessId || undefined,
          fileBase64,
          mimeType: file.type,
          fileName: file.name,
        },
      });

      if (res?.logoUrl) {
        setLogoUrlInput(res.logoUrl);
        toast.dismiss(toastId);
        toast.success("Logo uploaded successfully!");
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      console.error("[Logo Upload Error]:", err);
      toast.error(err.message || "Failed to upload logo.");
    } finally {
      setUploadingLogo(false);
      if (e.target) e.target.value = "";
    }
  };

  const [deletingLogo, setDeletingLogo] = useState(false);

  const handleRemoveLogo = async () => {
    if (!logoUrlInput && !businessId) return;

    setDeletingLogo(true);
    try {
      await deleteBusinessLogo({
        data: {
          business_id: businessId || undefined,
          logo_url: logoUrlInput || undefined,
        },
      });
      setLogoUrlInput("");
      toast.success("Logo removed from database and storage.");
    } catch (err: any) {
      console.error("[Remove Logo Error]:", err);
      toast.error(err.message || "Failed to remove logo.");
    } finally {
      setDeletingLogo(false);
    }
  };

  // Fetch initial profile & dynamic status
  useEffect(() => {
    let isMounted = true;
    async function loadStatus() {
      if (!isLoaded || !isSignedIn) {
        if (isMounted) setFetchingProfile(false);
        return;
      }

      try {
        const res = await checkOnboardingStatus();
        if (!isMounted) return;

        // Check if legal acknowledgement is already accepted on backend or business exists
        let isAckAccepted = false;
        try {
          const localAck = localStorage.getItem("relay.legal_ack_accepted.v1");
          if (localAck) isAckAccepted = true;
        } catch (_) {}

        if (res && (res.legalAckAccepted || res.hasBusiness || res.business)) {
          isAckAccepted = true;
          try {
            localStorage.setItem(
              "relay.legal_ack_accepted.v1",
              JSON.stringify({ acceptedAt: new Date().toISOString(), version: "1.0.0" })
            );
          } catch (_) {}
        }

        if (!isAckAccepted) {
          setIsLegalModalOpen(true);
        } else {
          setIsLegalModalOpen(false);
        }

        if (res && res.hasBusiness && res.business) {
          const biz = res.business;
          setBusinessId(biz.id);
          setBusinessStatus((biz.status as any) || "pending");
          setCompanyName(biz.company_name || "");
          setWebsite(biz.website || "");
          setIndustry(biz.industry || "SaaS");
          setHqLocation(biz.hq_location || "");
          setFoundedYear(biz.founded_year || "");
          setCompanySize(biz.company_size || "1 - 10 Employees");
          setCompanyType(biz.company_type || "Privately Held / B2B SaaS");
          setFundingStage(biz.funding_stage || "Bootstrapped");
          setLogoUrlInput(biz.logo_url || "");
          setDescription(biz.description || "");
          setLinkedinUrl(biz.linkedin_url || "");
          setTwitterUrl(biz.twitter_url || "");

          if (biz.created_at) {
            const date = new Date(biz.created_at);
            setMemberSinceDate(
              date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
            );
          }

          // Use real live exchange telemetry from database
          const telemetry = (res as any).telemetry;
          const completed = telemetry?.completedExchanges ?? 0;
          setExchangeCount(completed);
          setReciprocalParity(
            telemetry?.reciprocalParity ?? (completed > 0 ? "100%" : "—")
          );
        } else {
          setBusinessStatus("unregistered");
          setMemberSinceDate(
            new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
          );
          setExchangeCount(0);
          setReciprocalParity("—");
        }
      } catch (err) {
        console.error("Failed to fetch onboarding status:", err);
      } finally {
        if (isMounted) setFetchingProfile(false);
      }
    }

    loadStatus();
    return () => {
      isMounted = false;
    };
  }, [isLoaded, isSignedIn]);

  // Redirection guard if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign up or sign in to register your business.", {
        id: "onboarding-auth-required",
      });
      navigate({ to: "/login" });
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || fetchingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#9d4300]" />
      </div>
    );
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }
    if (website.trim() && !website.startsWith("http")) {
      toast.error("Please enter a valid website starting with http:// or https://");
      return;
    }
    if (linkedinUrl.trim() && !linkedinUrl.toLowerCase().includes("linkedin.com/")) {
      toast.error("Please enter a valid LinkedIn URL.");
      return;
    }

    setLoading(true);
    try {
      await getToken();

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

      if (businessId) {
        // Update existing business profile
        await updateBusiness({
          data: {
            business_id: businessId,
            company_name: companyName.trim(),
            website: website.trim(),
            industry,
            description: description.trim() || undefined,
            linkedin_url: linkedinUrl.trim() || undefined,
            logo_url: finalLogoUrl,
            hq_location: hqLocation.trim() || undefined,
            founded_year: foundedYear ? Number(foundedYear) : undefined,
            company_size: companySize || undefined,
            company_type: companyType || undefined,
            funding_stage: fundingStage || undefined,
            twitter_url: twitterUrl.trim() || undefined,
          },
        });
        toast.success("Business profile updated successfully!");
      } else {
        // Register new business profile
        const createdBiz = await createBusiness({
          data: {
            company_name: companyName.trim(),
            website: website.trim(),
            industry,
            description: description.trim() || undefined,
            linkedin_url: linkedinUrl.trim() || undefined,
            logo_url: finalLogoUrl,
            hq_location: hqLocation.trim() || undefined,
            founded_year: foundedYear ? Number(foundedYear) : undefined,
            company_size: companySize || undefined,
            company_type: companyType || undefined,
            funding_stage: fundingStage || undefined,
            twitter_url: twitterUrl.trim() || undefined,
          },
        });
        if (createdBiz?.id) {
          setBusinessId(createdBiz.id);
        }
        setBusinessStatus("pending");
        toast.success("Business profile registered successfully! Vetting pending.");
      }

      const mappedProfile = {
        companyName: companyName.trim(),
        verificationLevel: businessStatus === "approved" ? "Approved" : "Applied",
        logoUrl: finalLogoUrl,
        score: businessStatus === "approved" ? 100 : 0,
      };
      localStorage.setItem("relay.profile.v1", JSON.stringify(mappedProfile));
      window.dispatchEvent(new Event("relay:profile"));

      try {
        sessionStorage.setItem("relay.just_signed_up", "true");
      } catch (e) {}

      navigate({ to: "/opportunities" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const memberYear = memberSinceDate || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const initials = getInitials(companyName);
  const dealCode = businessId
    ? `RELAY-ENT-${businessId.slice(0, 4).toUpperCase()}`
    : "RELAY-ENT-QUEUED";

  return (
    <div className="bg-white font-sans text-[#0b1c30] antialiased min-h-screen flex flex-col justify-between selection:bg-[#9d4300] selection:text-white">
      <main className="w-full pt-1 sm:pt-6 bg-white">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-1 pb-6 sm:py-6 flex flex-col gap-4 sm:gap-6">
            
            {/* Top Page Banner */}
            <div id="business-profile-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#e2e8f0]">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[#0b1c30] font-display">
                  Business Profile
                </h1>
                <p className="text-xs sm:text-sm text-[#575f6e] mt-0.5 sm:mt-1">
                  Manage your company details and verified enterprise credentials.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/network">
                    <span>View Public Listing</span>
                  </Link>
                </Button>
                <Button
                  id="btn-save-profile"
                  type="button"
                  variant="monochrome"
                  size="sm"
                  onClick={() => handleSubmit()}
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />}
                  <span>{loading ? "Saving..." : businessId ? "Save Changes" : "Complete Registration"}</span>
                </Button>
              </div>
            </div>

            {/* Hero Profile Identity Card (Dynamic Badge & Status) */}
            <div className="p-4 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                <input
                  id="relay-company-logo-input"
                  type="file"
                  ref={logoFileInputRef}
                  onChange={handleLogoFileUpload}
                  accept="image/*"
                  style={{
                    position: "fixed",
                    left: "-9999px",
                    top: "-9999px",
                    opacity: 0,
                    width: "1px",
                    height: "1px",
                  }}
                  disabled={uploadingLogo || deletingLogo}
                />
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={openFileExplorer}
                    disabled={uploadingLogo || deletingLogo}
                    className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-mono text-lg sm:text-xl font-bold text-slate-800 shrink-0 overflow-hidden cursor-pointer hover:border-slate-900 transition-all select-none shadow-xs disabled:opacity-50"
                    title="Click to choose / change photo"
                  >
                    {logoUrlInput ? (
                      <img
                        src={logoUrlInput}
                        alt="Logo preview"
                        className="w-full h-full object-contain p-1 pointer-events-none"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="pointer-events-none">{initials}</span>
                    )}
                    {/* Visual hover indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                    </div>
                  </button>
                  {/* Mobile Camera Badge */}
                  <div className="absolute -bottom-1 -right-1 sm:hidden w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs pointer-events-none">
                    <Camera className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display truncate">
                    {companyName || "Your Company Name"}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap min-w-0 pt-0.5">
                    <span className="font-mono text-[10.5px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold shrink-0">
                      {dealCode}
                    </span>
                    <RegistrationMark status={businessStatus} />
                    <span className="text-slate-300 hidden xs:inline">•</span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      Member since {memberYear}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                <button
                  type="button"
                  id="btn-hero-change-logo"
                  onClick={openFileExplorer}
                  disabled={uploadingLogo || deletingLogo}
                  className="flex-1 sm:flex-initial relative inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 h-9 px-3.5 text-xs font-semibold gap-1.5 cursor-pointer overflow-hidden shadow-2xs select-none transition-all disabled:opacity-50"
                >
                  {uploadingLogo ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-900" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 pointer-events-none text-slate-600" />
                  )}
                  <span className="pointer-events-none">
                    {uploadingLogo ? "Uploading..." : (logoUrlInput ? "Change Photo" : "Upload Logo")}
                  </span>
                </button>
                {logoUrlInput && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveLogo}
                    disabled={uploadingLogo || deletingLogo}
                    className="flex-1 sm:flex-initial h-9 px-3 gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 border-red-200 transition-all"
                  >
                    {deletingLogo ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>Remove</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Grid Layout (12 columns) */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Main Column (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Section 1: Company Details */}
                <section id="company-details-section" className="p-4 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-4">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      Company Details
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Institutional background and core business parameters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    {/* Company Legal Name */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="company-name" required>
                        Company Legal Name
                      </Label>
                      <Input
                        id="company-name"
                        type="text"
                        required
                        placeholder="Apex Services Group, LLC"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    {/* Primary Industry */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="industry" required>
                        Primary Industry
                      </Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select primary industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industry && !INDUSTRIES.includes(industry) && (
                            <SelectItem value={industry}>
                              {industry}
                            </SelectItem>
                          )}
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* HQ Location */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="hq-location">
                        HQ Location
                      </Label>
                      <Input
                        id="hq-location"
                        type="text"
                        placeholder="Chicago, IL, United States"
                        value={hqLocation}
                        onChange={(e) => setHqLocation(e.target.value)}
                      />
                    </div>

                    {/* Founded Year */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="founded-year">
                        Founded Year
                      </Label>
                      <Input
                        id="founded-year"
                        type="number"
                        placeholder="2018"
                        value={foundedYear}
                        onChange={(e) => setFoundedYear(e.target.value ? parseInt(e.target.value) : "")}
                      />
                    </div>

                    {/* Company Size */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="company-size">
                        Company Size
                      </Label>
                      <Select value={companySize} onValueChange={setCompanySize}>
                        <SelectTrigger id="company-size">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySize && !COMPANY_SIZES.includes(companySize) && (
                            <SelectItem value={companySize}>
                              {companySize}
                            </SelectItem>
                          )}
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Company Type */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="company-type">
                        Company Type
                      </Label>
                      <Select value={companyType} onValueChange={setCompanyType}>
                        <SelectTrigger id="company-type">
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                        <SelectContent>
                          {companyType && !COMPANY_TYPES.includes(companyType) && (
                            <SelectItem value={companyType}>
                              {companyType}
                            </SelectItem>
                          )}
                          {COMPANY_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Funding Stage */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="funding-stage">
                        Funding Stage
                      </Label>
                      <Select value={fundingStage} onValueChange={setFundingStage}>
                        <SelectTrigger id="funding-stage">
                          <SelectValue placeholder="Select funding stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {fundingStage && !FUNDING_STAGES.includes(fundingStage) && (
                            <SelectItem value={fundingStage}>
                              {fundingStage}
                            </SelectItem>
                          )}
                          {FUNDING_STAGES.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Website URL (Optional) */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="website-url">
                        Website URL (Optional)
                      </Label>
                      <div className="relative flex items-center">
                        <Input
                          id="website-url"
                          type="url"
                          placeholder="https://apexlogistics.de"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="pr-20"
                        />
                        {website.trim() && (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="absolute right-1.5 h-7 px-2.5 text-xs bg-slate-50 hover:bg-slate-100 border border-[#e2e8f0] text-[#0b1c30]"
                          >
                            <a
                              href={website.startsWith("http") ? website : `https://${website}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span>Test</span>
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Logo URL & Upload (Optional field) */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="logo-url-field">
                          Company Logo (Optional)
                        </Label>
                        <span className="text-[11px] text-[#575f6e]">
                          Max 5MB • PNG, JPG, WebP, SVG
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            id="logo-url-field"
                            type="url"
                            placeholder="https://example.com/logo.png or upload image file"
                            value={logoUrlInput}
                            onChange={(e) => setLogoUrlInput(e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          id="btn-form-upload-logo"
                          onClick={openFileExplorer}
                          disabled={uploadingLogo || deletingLogo}
                          className="relative inline-flex items-center justify-center rounded-md border border-[#e2e8f0] bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0b1c30] h-10 px-3 text-xs font-semibold gap-1.5 cursor-pointer overflow-hidden shadow-xs shrink-0 select-none disabled:opacity-50"
                        >
                          {uploadingLogo ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#9d4300]" />
                          ) : (
                            <Upload className="w-3.5 h-3.5 pointer-events-none" />
                          )}
                          <span className="pointer-events-none">{uploadingLogo ? "Uploading..." : "Choose Photo"}</span>
                        </button>
                        {logoUrlInput && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveLogo}
                            disabled={uploadingLogo || deletingLogo}
                            className="shrink-0 gap-1.5 h-10 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            {deletingLogo ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            <span>Remove</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Market Positioning & Objectives */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="description">
                          Market Positioning & Objectives
                        </Label>
                        <span className="font-mono text-[11px] text-[#575f6e]" id="char-counter">
                          {description.length} / 1000
                        </span>
                      </div>
                      <Textarea
                        id="description"
                        maxLength={1000}
                        rows={3}
                        placeholder="Apex Services manages enterprise freight logistics & tracking integrations for 450+ managed fleets across North America. We actively exchange mid-market CRM implementation dealflow for enterprise marketing automation partnerships."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                  </div>
                </section>

                {/* Section 2: Executive & Network Visibility */}
                <section className="p-4 sm:p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col gap-4">
                  <div className="border-b border-[#e2e8f0] pb-3">
                    <h3 className="text-base font-bold text-[#0b1c30] font-display">
                      Connected Accounts & Profiles
                    </h3>
                    <p className="text-xs text-[#575f6e] mt-0.5">
                      External registry links and developer endpoints.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="linkedin" className="text-[#575f6e]">
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        type="text"
                        placeholder="linkedin.com/company/apex-services-group"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="x-handle" className="text-[#575f6e]">
                        X / Twitter
                      </Label>
                      <Input
                        id="x-handle"
                        type="text"
                        placeholder="x.com/apexservices_hq"
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="github-handle" className="text-[#575f6e]">
                        GitHub / API Documentation
                      </Label>
                      <Input
                        id="github-handle"
                        type="text"
                        placeholder="github.com/apex-services"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="crunchbase-url" className="text-[#575f6e]">
                        Crunchbase
                      </Label>
                      <Input
                        id="crunchbase-url"
                        type="text"
                        placeholder="crunchbase.com/organization/apex-services"
                        value={crunchbaseUrl}
                        onChange={(e) => setCrunchbaseUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                {/* Bottom Submit Action */}
                <div className="flex items-center justify-end pt-2">
                  <Button
                    type="submit"
                    variant="monochrome"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto px-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-1" /> Submitting credentials...
                      </>
                    ) : (
                      <span>{businessId ? "Save Profile Changes" : "Save & Complete Registration"}</span>
                    )}
                  </Button>
                </div>

              </div>

              {/* Right Sidebar (4 cols) - Dynamic Verification & Status */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Section 1: Verification & Status */}
                <section className="p-4 sm:p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col gap-4">
                  <div className="border-b border-[#e2e8f0] pb-3">
                    <h3 className="text-base font-bold text-[#0b1c30] font-display">
                      Verification & Status
                    </h3>
                    <p className="text-xs text-[#575f6e] mt-0.5">
                      Network trust settings and active permissions.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-1">
                    
                    {/* Status Item */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#e2e8f0]">
                      <div className="flex items-center gap-3">
                        <DynamicRegistrationMark status={businessStatus} size={28} className="shrink-0 drop-shadow-xs" />
                        <div>
                          <div className="text-xs font-semibold text-[#0b1c30]">Status</div>
                          <div className="text-[11px] text-[#575f6e]">
                            {businessStatus === "approved"
                              ? "Identity Level 4 Active"
                              : "Identity Level 1 (Pending Review)"}
                          </div>
                        </div>
                      </div>
                      <RegistrationMark status={businessStatus} variant="subtle" />
                    </div>

                    {/* Bilateral Masking Item */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#e2e8f0]">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-50 border border-[#e2e8f0] flex items-center justify-center">
                          <EyeOff className={`w-4 h-4 ${businessStatus === "approved" ? "text-[#047857]" : "text-[#575f6e]"}`} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#0b1c30]">Bilateral Masking</div>
                          <div className="text-[11px] text-[#575f6e]">
                            {businessStatus === "approved"
                              ? "Stage 4 Blinded"
                              : businessStatus === "pending"
                              ? "Stage 1 Blinded (Pre-Approval)"
                              : "Blinded until Stage 4 Approval"}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold border ${
                        businessStatus === "approved"
                          ? "bg-white text-[#047857] border-[#a7f3d0]"
                          : "bg-white text-[#575f6e] border-slate-200"
                      }`}>
                        {businessStatus === "approved" ? "Active" : "Protected"}
                      </span>
                    </div>

                  </div>
                </section>

                {/* Section 2: Exchange Activity */}
                <section className="p-4 sm:p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col gap-4">
                  <div className="border-b border-[#e2e8f0] pb-3">
                    <h3 className="text-base font-bold text-[#0b1c30] font-display">
                      Exchange Activity
                    </h3>
                    <p className="text-xs text-[#575f6e] mt-0.5">
                      Real-time network telemetry summary.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-1">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#e2e8f0]">
                      <div>
                        <span className="text-xs text-[#575f6e]">Completed Exchanges</span>
                        <div className="font-mono text-xl text-[#0b1c30] font-bold mt-0.5">
                          {exchangeCount}
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-[#e2e8f0] flex items-center justify-center text-[#0b1c30]">
                        <Handshake className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#e2e8f0]">
                      <div>
                        <span className="text-xs text-[#575f6e]">Reciprocal Parity</span>
                        <div className="font-mono text-xl text-[#006c49] font-bold mt-0.5">
                          {reciprocalParity}
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-[#e2e8f0] flex items-center justify-center text-[#006c49]">
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </form>
          </div>

          {/* Footer */}
          <footer className="w-full bg-white border-t border-[#e2e8f0] mt-12">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2">
                  <img alt="The Relay Wordmark Logo" className="h-6 w-auto object-contain" src={logoUrl} />
                  <span className="font-bold text-[#0b1c30] font-display">The Relay</span>
                  <span className="text-xs text-[#575f6e] ml-2 hidden sm:inline">
                    B2B Reciprocal Exchange Architecture
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#584237]">
                  <Link to="/opportunities" className="hover:text-[#9d4300] transition-colors">
                    Opportunity Board
                  </Link>
                  <Link to="/network" className="hover:text-[#9d4300] transition-colors">
                    Directory
                  </Link>
                  <Link to="/protocol" className="hover:text-[#9d4300] transition-colors">
                    Exchange Protocol
                  </Link>
                  <Link to="/terms" className="hover:text-[#9d4300] transition-colors">
                    Privacy Framework
                  </Link>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-4 text-xs text-[#575f6e]">
                <p>Privacy by Default • Bilateral Contact Release in Stage 4 • Verified Enterprise Identity</p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#575f6e]">
                  <span>SECURED PROTOCOL</span>
                  <span className="w-2 h-2 rounded-full bg-[#00b07a]"></span>
                  <span>STATUS 200 OK</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* First-time Onboarding Legal Terms Modal */}
      <LegalAcknowledgementModal
        open={isLegalModalOpen && !fetchingProfile && !businessId && businessStatus === "unregistered"}
        onOpenChange={setIsLegalModalOpen}
        onAgree={() => toast.success("Legal framework acknowledged.")}
      />
    </div>
  );
}

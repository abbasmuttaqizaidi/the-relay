export type MockOpportunity = {
  id: string;
  type: "Vendor" | "Referral" | "Hiring" | "Investment" | "Strategic Advice" | "Distribution";
  industry: string;
  geo: string;
  company: string;
  title: string;
  description: string;
  trustLevel: "Approved" | "Applied" | "Basic";
  postedAt: string;
  interested: number;
  hide_company_name: boolean;
  business_id?: string;
  status?: string;
  expires_at?: string;
};

export const OPPORTUNITIES: MockOpportunity[] = [
  {
    id: "RY-9021",
    type: "Vendor",
    industry: "E-commerce",
    geo: "India",
    company: "Velvet & Co",
    title: "GOTS-certified organic cotton apparel manufacturer",
    description:
      "Scaling sustainable premium clothing line. Seeking a GOTS-certified contract manufacturer in India for low-minimum runs of activewear and loungewear.",
    trustLevel: "Approved",
    postedAt: "2h ago",
    interested: 4,
    hide_company_name: true,
  },
  {
    id: "RY-8842",
    type: "Distribution",
    industry: "E-commerce",
    geo: "UAE",
    company: "Sol Sunglasses",
    title: "Boutique retail distribution partners in GCC",
    description:
      "Premium polarized eyewear brand looking for retail distributors, boutique chain contacts, and resort partners across UAE, Qatar, and Saudi.",
    trustLevel: "Approved",
    postedAt: "5h ago",
    interested: 9,
    hide_company_name: false,
  },
  {
    id: "RY-8721",
    type: "Vendor",
    industry: "SaaS",
    geo: "United States",
    company: "Metric Flow",
    title: "Performance marketing agency for vertical SaaS",
    description:
      "Looking for a specialist B2B growth agency to manage paid social and search pipeline scaling from $20k to $100k MRR. ROI attribution setup required.",
    trustLevel: "Approved",
    postedAt: "1d ago",
    interested: 6,
    hide_company_name: true,
  },
  {
    id: "RY-8612",
    type: "Referral",
    industry: "Marketing Agency",
    geo: "India",
    company: "Stratos Design",
    title: "Mutual referral: Shopify Plus dev shop",
    description:
      "We frequently turn away development-only requests from Shopify Plus brands. Looking for a high-quality dev partner for ongoing handoffs.",
    trustLevel: "Applied",
    postedAt: "1d ago",
    interested: 11,
    hide_company_name: false,
  },
  {
    id: "RY-8540",
    type: "Hiring",
    industry: "Marketing Agency",
    geo: "Remote / Global",
    company: "Apex Media",
    title: "Senior Paid Media Buyer & DTC Growth Marketer",
    description:
      "Hiring a contract senior buyer with $5M+ spent on Meta/TikTok. Responsible for scaling DTC e-commerce accounts. Remote work available.",
    trustLevel: "Applied",
    postedAt: "1d ago",
    interested: 11,
    hide_company_name: false,
  },
  {
    id: "RY-8311",
    type: "Strategic Advice",
    industry: "SaaS",
    geo: "Remote / Global",
    company: "Scale Ventures",
    title: "Founder mentor: Seed-stage SaaS pricing model",
    description:
      "Mentorship and advice on moving from utility-based pricing to tiered user licensing. Specifically seeking input from founders who scaled past $5M ARR.",
    trustLevel: "Basic",
    postedAt: "2d ago",
    interested: 7,
    hide_company_name: true,
  },
  {
    id: "RY-8204",
    type: "Investment",
    industry: "Fintech",
    geo: "United Kingdom",
    company: "Banyan Capital",
    title: "Co-investors for £2M Seed Round in cross-border payments",
    description:
      "FCA-regulated corridor aggregator infrastructure. Ledger orchestration built. Partnering with leads for distribution syndication.",
    trustLevel: "Approved",
    postedAt: "3d ago",
    interested: 8,
    hide_company_name: false,
  },
];

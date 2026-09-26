import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { DashboardCommandCenterPage } from "../src/routes/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { mockIncomingRequests, mockSentRequests, mockMyListings } = vi.hoisted(() => ({
  mockIncomingRequests: [
    {
      id: "inc-1",
      direction: "inbound",
      status: "pending",
      message: "Interested in expanding distribution rails.",
      created_at: new Date(Date.now() - 3600 * 1000).toISOString(),
      workflow: {
        partnerName: "Global Trade Ltd",
        isVerified: true,
        stageNum: 1,
        turnText: "Your Turn: Review and accept initial NDA terms",
        slaText: "4h SLA remaining",
        urgent: true,
      },
      opportunity: {
        id: "opp-101",
        opportunity_number: "RY-0089",
        title: "Cross-Border Logistics Network Expansion",
        category: "commercial_trade",
        industry: "Supply Chain",
        deal_size_formatted: "$250,000",
        description: "Seeking logistics partner for transatlantic freight.",
      },
    },
    {
      id: "inc-new-1",
      direction: "inbound",
      status: "pending",
      message: "We would like to introduce our high-throughput payment routing platform.",
      created_at: new Date().toISOString(),
      workflow: null, // No stage yet (Pre-Stage 1)
      opportunity: {
        id: "opp-103",
        opportunity_number: "RY-0077",
        title: "Pan-European Payment Gateway Routing Inbound Pitch",
        category: "partnership",
        industry: "Fintech",
        deal_size_formatted: "$180,000 / yr",
      },
    },
  ],
  mockSentRequests: [
    {
      id: "sent-1",
      direction: "outbound",
      status: "in_progress",
      message: "Our engineering squad is ready to integrate.",
      created_at: new Date(Date.now() - 7200 * 1000).toISOString(),
      workflow: {
        partnerName: "FinTech Prime",
        isVerified: true,
        stageNum: 2,
        turnText: "Waiting on counterparty review",
        slaText: "18h SLA remaining",
        urgent: false,
      },
      opportunity: {
        id: "opp-102",
        opportunity_number: "RY-0042",
        title: "Next-Gen BaaS Core Banking Deployment",
        category: "technology",
        industry: "Financial Services",
        deal_size_formatted: "$500,000",
        description: "Implementing headless core banking ledger.",
      },
    },
  ],
  mockMyListings: [
    {
      id: "list-1",
      title: "AI-Powered Compliance Screening API",
      status: "active",
      category: "technology",
      created_at: new Date().toISOString(),
    },
  ],
}));

// Mock TanStack Router
const mockNavigate = vi.fn();
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    createFileRoute: () => (opts: any) => opts,
  };
});

// Mock Clerk
vi.mock("@clerk/tanstack-react-start", () => ({
  useAuth: () => ({
    isSignedIn: true,
    isLoaded: true,
    userId: "user_test_123",
  }),
  useUser: () => ({
    user: {
      id: "user_test_123",
      fullName: "Acme Corp Admin",
    },
  }),
}));

vi.mock("@/functions/checkOnboardingStatus", () => ({
  checkOnboardingStatus: vi.fn().mockResolvedValue({
    isAuthenticated: true,
    hasBusiness: true,
    business: {
      company_name: "Acme Corp Global",
      status: "approved",
    },
  }),
}));

vi.mock("@/functions/getIncomingRequests", () => ({
  getIncomingRequests: vi.fn().mockResolvedValue(mockIncomingRequests),
}));

vi.mock("@/functions/getSentRequests", () => ({
  getSentRequests: vi.fn().mockResolvedValue(mockSentRequests),
}));

vi.mock("@/functions/getMyOpportunities", () => ({
  getMyOpportunities: vi.fn().mockResolvedValue(mockMyListings),
}));

vi.mock("@/functions/getSavedOpportunities", () => ({
  getSavedOpportunities: vi.fn().mockResolvedValue([]),
}));

vi.mock("@/functions/listOpportunities", () => ({
  listOpportunities: vi.fn().mockResolvedValue([
    {
      id: "disc-1",
      opportunity_number: "RY-0055",
      title: "Maritime Freight Terminal Operations Joint Venture",
      category: "commercial_trade",
      industry: "Maritime Transport",
      deal_size_formatted: "$1,200,000",
      description: "Bespoke joint venture on transatlantic routes.",
    },
  ]),
}));

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Dashboard Command Center (/dashboard)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all 5 operational tiers of the business exchange command center", async () => {
    renderWithQueryClient(<DashboardCommandCenterPage />);

    // 0. Header & Telemetry
    expect(screen.getByText("Exchange Command Center")).toBeInTheDocument();
    expect(screen.getByText("Action Required")).toBeInTheDocument();
    expect(screen.getByText("In Flight")).toBeInTheDocument();
    expect(screen.getByText("Median SLA")).toBeInTheDocument();
    expect(screen.getByText("Parity Rating")).toBeInTheDocument();

    // 1. Attention Required Section
    expect(screen.getByText("Attention Required")).toBeInTheDocument();

    // 2. New Requests Section (Fresh unstaged inquiries)
    expect(screen.getAllByText("New Requests")[0]).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText("Pan-European Payment Gateway Routing Inbound Pitch")).toBeInTheDocument();
      expect(screen.getAllByText("New Request").length).toBeGreaterThan(0);
    });

    // 3. Active Exchanges Pipeline
    expect(screen.getByText("Active Exchanges Pipeline")).toBeInTheDocument();

    // 4. Discover Mandates
    expect(screen.getByText("Discover Network Mandates")).toBeInTheDocument();

    // 5. Manage Mandates & Inventory
    expect(screen.getByText("Manage Mandates & Inventory")).toBeInTheDocument();

    // 6. Settlement & History
    expect(screen.getByText("Settlement & Inquiry History")).toBeInTheDocument();
  });

  it("opens Memorandum sheet when 'View Memorandum' is clicked", async () => {
    renderWithQueryClient(<DashboardCommandCenterPage />);

    await waitFor(() => {
      expect(screen.getAllByText("View Memorandum")[0]).toBeInTheDocument();
    });

    const viewMemoBtn = screen.getAllByText("View Memorandum")[0];
    fireEvent.click(viewMemoBtn);

    // Bottom sheet should open and display the bilateral stepper
    await waitFor(() => {
      expect(screen.getByText("Stage 1: Acknowledgement")).toBeInTheDocument();
      expect(screen.getByText("Stage 4: Handshake")).toBeInTheDocument();
    });
  });

  it("opens Post Mandate modal when 'Post Mandate' is clicked", async () => {
    renderWithQueryClient(<DashboardCommandCenterPage />);

    const postBtn = screen.getByText("Post Mandate");
    expect(postBtn).toBeInTheDocument();
    fireEvent.click(postBtn);

    await waitFor(() => {
      expect(screen.getByText("What Do You Want to Post?")).toBeInTheDocument();
    });
  });
});

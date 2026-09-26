import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { BilateralOpportunityDetailSheet } from "../src/components/exchange/BilateralOpportunityDetailSheet";

describe("BilateralOpportunityDetailSheet Component", () => {
  const mockDeal = {
    id: "deal-101",
    direction: "inbound",
    status: "pending",
    message: "We would like to introduce a leading fintech client looking for enterprise payments.",
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    workflow: {
      partnerName: "Apex Global FinTech",
      isVerified: true,
      stageNum: 1,
    },
    opportunity: {
      title: "Tier-1 Enterprise Payment Gateway Integration",
      category: "strategic_advice",
      industry: "FinTech & Banking",
      location: "New York, USA",
      deal_size_formatted: "$100,000 - $250,000",
      description: "Seeking high-throughput payment routing and gateway infrastructure.",
      offer_text: "Can offer direct banking sponsorship and merchant acquiring rails.",
    },
  };

  it("renders opportunity details, 4-stage lifecycle stepper, and metadata in bottom sheet", () => {
    render(
      <BilateralOpportunityDetailSheet
        deal={mockDeal}
        open={true}
        onClose={vi.fn()}
      />
    );

    // Title & partner
    expect(screen.getAllByText("Tier-1 Enterprise Payment Gateway Integration")[0]).toBeInTheDocument();
    expect(screen.getByText("Apex Global FinTech")).toBeInTheDocument();
    expect(screen.getByText(/Verified Enterprise/i)).toBeInTheDocument();
    expect(screen.getByText(/Inbound/i)).toBeInTheDocument();

    // Attributes
    expect(screen.getAllByText("Strategic Advice")[0]).toBeInTheDocument();
    expect(screen.getAllByText("FinTech & Banking")[0]).toBeInTheDocument();
    expect(screen.getAllByText("New York, USA")[0]).toBeInTheDocument();
    expect(screen.getAllByText("$100,000 - $250,000")[0]).toBeInTheDocument();

    // Content sections
    expect(screen.getByText(/Seeking high-throughput payment routing/i)).toBeInTheDocument();
    expect(screen.getByText(/Can offer direct banking sponsorship/i)).toBeInTheDocument();
    expect(screen.getByText(/We would like to introduce a leading fintech client/i)).toBeInTheDocument();

    // 4-Stage Stepper
    expect(screen.getByText("Stage 1: Acknowledgement")).toBeInTheDocument();
    expect(screen.getByText("Stage 2: Negotiation")).toBeInTheDocument();
    expect(screen.getByText("Stage 3: Agreement")).toBeInTheDocument();
    expect(screen.getByText("Stage 4: Handshake")).toBeInTheDocument();

    // Action buttons
    expect(screen.getByText(/Close Sheet/i)).toBeInTheDocument();
    expect(screen.getByText(/Exchange Hub >/i)).toBeInTheDocument();
  });

  it("handles onClose when Close Sheet button is clicked", () => {
    const onClose = vi.fn();
    render(
      <BilateralOpportunityDetailSheet
        deal={mockDeal}
        open={true}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByText(/Close Sheet/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("handles onOpenExchangeHub callback", () => {
    const onOpenExchangeHub = vi.fn();
    render(
      <BilateralOpportunityDetailSheet
        deal={mockDeal}
        open={true}
        onClose={vi.fn()}
        onOpenExchangeHub={onOpenExchangeHub}
      />
    );

    fireEvent.click(screen.getByText(/Exchange Hub >/i));
    expect(onOpenExchangeHub).toHaveBeenCalledWith("deal-101");
  });
});

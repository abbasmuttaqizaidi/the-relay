import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FloatingTurnDock, type TurnDeckDeal } from "../src/design-system/floating-turn-dock";

describe("FloatingTurnDock Component (seo_code_guide.md implementation)", () => {
  const mockDeals: TurnDeckDeal[] = [
    {
      id: "deal-1",
      partnerName: "Aplex LLMP",
      isVerified: true,
      stageNum: 1,
      stageName: "Stage 1 · Acknowledgement",
      direction: "inbound",
      headline: "Tier-1 Enterprise CRM Suite",
      description: "Can introduce tier-1 institutional client seeking enterprise CRM suite.",
      created_at: new Date(Date.now() - 44 * 3600 * 1000).toISOString(), // ~4h left -> urgent
      primaryActionLabel: "Review Request",
    },
    {
      id: "deal-2",
      partnerName: "Maple AI Infrastructure",
      isVerified: true,
      stageNum: 2,
      stageName: "Stage 2 · Mutual NDA Approval",
      direction: "inbound",
      headline: "Secondary Carveout Release Token",
      description: "Requires your GP execution token for secondary carveout release.",
      created_at: new Date(Date.now() - 10 * 3600 * 1000).toISOString(), // ~38h left
      primaryActionLabel: "Review Terms",
    },
  ];

  it("renders in expanded state with header, deals carousel, SLA timer, and exclusive Exchange Hub button", () => {
    render(<FloatingTurnDock deals={mockDeals} />);

    expect(screen.getByText(/YOUR TURN PENDING/i)).toBeInTheDocument();
    expect(screen.getByText("Aplex LLMP")).toBeInTheDocument();
    expect(screen.getByText(/Stage 1 · Acknowledgement/i)).toBeInTheDocument();
    expect(screen.getByText(/Turn in Hand/i)).toBeInTheDocument();
    expect(screen.getByText(/Exchange Hub >/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/2/)).toBeInTheDocument();
  });

  it("minimizes to floating pill on close/minus and expands back upon click", () => {
    render(<FloatingTurnDock deals={mockDeals} />);

    // Click close/minimize button
    const closeBtn = screen.getByTitle("Close to Pill");
    fireEvent.click(closeBtn);

    // Should now show Turn-Deck minimized pill
    expect(screen.getByText(/TURN-DECK/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Pending/i)).toBeInTheDocument();

    // Click to expand again
    fireEvent.click(screen.getByText(/TURN-DECK/i));
    expect(screen.getByText(/YOUR TURN PENDING/i)).toBeInTheDocument();
  });

  it("navigates slides through carousel pill tabs and next/prev buttons", () => {
    render(<FloatingTurnDock deals={mockDeals} />);

    // Click Next slide
    const nextBtn = screen.getByTitle("Next turn");
    fireEvent.click(nextBtn);

    expect(screen.getByText("Maple AI Infrastructure")).toBeInTheDocument();
    expect(screen.getByText(/2\/2/)).toBeInTheDocument();

    // Click Previous slide
    const prevBtn = screen.getByTitle("Previous turn");
    fireEvent.click(prevBtn);

    expect(screen.getByText("Aplex LLMP")).toBeInTheDocument();
    expect(screen.getByText(/1\/2/)).toBeInTheDocument();
  });

  it("calls onOpenExchangeHub when Exchange Hub > is clicked", () => {
    const onOpenExchangeHub = vi.fn();

    render(
      <FloatingTurnDock
        deals={mockDeals}
        onOpenExchangeHub={onOpenExchangeHub}
      />
    );

    fireEvent.click(screen.getByText(/Exchange Hub >/i));
    expect(onOpenExchangeHub).toHaveBeenCalledWith(mockDeals[0]);
  });

  it("renders clean Empty State when deals array is empty", () => {
    render(<FloatingTurnDock deals={[]} />);

    expect(screen.getByText(/YOUR TURN PENDING/i)).toBeInTheDocument();
    expect(screen.getByText(/0 Total · All Clear/i)).toBeInTheDocument();
    expect(screen.getByText(/No Pending Turns Awaiting Action/i)).toBeInTheDocument();
    expect(screen.getByText(/You are all caught up!/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimize to Dock/i)).toBeInTheDocument();
  });

  it("renders minimized All Caught Up pill when empty and minimized", () => {
    render(<FloatingTurnDock deals={[]} defaultMinimized={true} />);

    expect(screen.getByText(/TURN-DECK/i)).toBeInTheDocument();
    expect(screen.getByText(/All Caught Up/i)).toBeInTheDocument();
    expect(screen.getByText(/0 Pending/i)).toBeInTheDocument();
  });
});

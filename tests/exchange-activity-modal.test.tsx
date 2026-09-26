import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import {
  ExchangeActivityModal,
  parseNotificationToExchangeActivity,
  type ExchangeActivityModalData,
} from "../src/design-system";

describe("ExchangeActivityModal Component", () => {
  const mockInterestData: ExchangeActivityModalData = {
    eventType: "interest_received",
    partnerName: "Apex Global FinTech",
    partnerIsVerified: true,
    opportunityTitle: "Tier-1 Enterprise Payment Gateway Integration",
    stageNum: 1,
    details: "We have 12 enterprise clients needing payment processing rails.",
    timestamp: "Just now",
  };

  const mockAckData: ExchangeActivityModalData = {
    eventType: "acknowledged",
    partnerName: "Nexus Enterprise Solutions",
    partnerIsVerified: true,
    opportunityTitle: "Tier-1 Enterprise Payment Gateway Integration",
    stageNum: 2,
    details: "Both parties have acknowledged protocol clearance. Negotiation is unlocked.",
    timestamp: "Just now",
  };

  it("renders Stage 1 New Interest modal with partner name, opportunity title, details, and exact 2 action buttons", () => {
    const handleClose = vi.fn();
    const handleOpenExchangeHub = vi.fn();

    render(
      <ExchangeActivityModal
        open={true}
        onOpenChange={vi.fn()}
        data={mockInterestData}
        onClose={handleClose}
        onOpenExchangeHub={handleOpenExchangeHub}
      />
    );

    // Title & badge
    expect(screen.getByText(/New Interest Received/i)).toBeInTheDocument();
    expect(screen.getByText(/STAGE 1 · PROTOCOL CLEARANCE/i)).toBeInTheDocument();

    // Partner info
    expect(screen.getByText("Apex Global FinTech")).toBeInTheDocument();
    expect(screen.getByText("Tier-1 Enterprise Payment Gateway Integration")).toBeInTheDocument();

    // Details
    expect(screen.getByText(/We have 12 enterprise clients needing payment processing rails/i)).toBeInTheDocument();

    // 4-stage mini stepper
    expect(screen.getByText(/1. Clearance/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Negotiate/i)).toBeInTheDocument();

    // Exactly 2 action buttons in footer
    const closeBtn = screen.getByRole("button", { name: /^Close$/i });
    const hubBtn = screen.getByRole("button", { name: /Exchange Hub >/i });
    expect(closeBtn).toBeInTheDocument();
    expect(hubBtn).toBeInTheDocument();

    // Trigger actions
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();

    fireEvent.click(hubBtn);
    expect(handleOpenExchangeHub).toHaveBeenCalledWith(undefined, mockInterestData);
  });

  it("renders Stage 2 Protocol Acknowledged modal when Party B acknowledges", () => {
    render(
      <ExchangeActivityModal
        open={true}
        onOpenChange={vi.fn()}
        data={mockAckData}
      />
    );

    expect(screen.getByText(/Protocol Acknowledged — Stage 2 Unlocked/i)).toBeInTheDocument();
    expect(screen.getByText(/STAGE 2 · NEGOTIATION UNLOCKED/i)).toBeInTheDocument();
    expect(screen.getByText("Nexus Enterprise Solutions")).toBeInTheDocument();
  });

  it("parses notifications accurately into structured exchange activity metadata", () => {
    const interestNotif = parseNotificationToExchangeActivity(
      "New Interest Received",
      'Apex FinTech is interested in your opportunity: "Global Gateway"'
    );
    expect(interestNotif.eventType).toBe("interest_received");
    expect(interestNotif.stageNum).toBe(1);
    expect(interestNotif.opportunityTitle).toBe("Global Gateway");

    const ackNotif = parseNotificationToExchangeActivity(
      "Exchange Negotiation Unlocked",
      'Both parties have acknowledged the exchange process for "Global Gateway".'
    );
    expect(ackNotif.eventType).toBe("acknowledged");
    expect(ackNotif.stageNum).toBe(2);

    const proposalNotif = parseNotificationToExchangeActivity(
      "Counter Proposal Received",
      'Apex sent a counter-proposal for "Global Gateway".'
    );
    expect(proposalNotif.eventType).toBe("proposal_received");
    expect(proposalNotif.stageNum).toBe(2);

    const declinedNotif = parseNotificationToExchangeActivity(
      "Proposal Declined",
      'Apex declined the exchange proposal for "Global Gateway". Reason: Terms not aligned'
    );
    expect(declinedNotif.eventType).toBe("proposal_declined");

    const contactNotif = parseNotificationToExchangeActivity(
      "Contact Exchange Completed",
      'Apex approved the phone exchange for "Global Gateway".'
    );
    expect(contactNotif.eventType).toBe("contact_approved");
    expect(contactNotif.stageNum).toBe(4);
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import {
  DESIGN_TOKENS,
  SemanticStatusPill,
  ExecutiveDarkBadge,
  SolidStatusChip,
  ExecutiveAlertBanner,
  TopicFilterPills,
  executiveToast,
  ExecutiveToastContainer,
  ExecutiveDealTable,
} from "../src/design-system";

describe("Semantic Status System & Tokens (seo_code_guide.md)", () => {
  it("exports approved semantic triad tokens", () => {
    expect(DESIGN_TOKENS.colors.semantic.success.ink).toBe("#15803D");
    expect(DESIGN_TOKENS.colors.semantic.warning.ink).toBe("#B45309");
    expect(DESIGN_TOKENS.colors.semantic.danger.ink).toBe("#991B1B");
    expect(DESIGN_TOKENS.colors.semantic.danger.terracotta.ink).toBe("#9A3412");
  });

  describe("Specification 01: Badges, Status Pills & Topic Filters", () => {
    it("renders Level 1 SemanticStatusPill in different formats", () => {
      render(
        <div>
          <SemanticStatusPill variant="success" showDot pulseDot>
            Verified Corporate
          </SemanticStatusPill>
          <SemanticStatusPill variant="warning" format="rounded">
            Response SLA: 41h remaining
          </SemanticStatusPill>
          <SemanticStatusPill variant="danger" format="mono">
            SLA Breached
          </SemanticStatusPill>
        </div>
      );

      expect(screen.getByText("Verified Corporate")).toBeInTheDocument();
      expect(screen.getByText("Response SLA: 41h remaining")).toBeInTheDocument();
      expect(screen.getByText("SLA Breached")).toBeInTheDocument();
    });

    it("renders Level 2 ExecutiveDarkBadge", () => {
      render(
        <ExecutiveDarkBadge variant="success" format="mono" showDot>
          KYC Validated
        </ExecutiveDarkBadge>
      );
      expect(screen.getByText("KYC Validated")).toBeInTheDocument();
    });

    it("renders Level 3 SolidStatusChip", () => {
      render(
        <SolidStatusChip variant="success">
          Solid Mineral Sage #16A34A
        </SolidStatusChip>
      );
      expect(screen.getByText("Solid Mineral Sage #16A34A")).toBeInTheDocument();
    });

    it("renders TopicFilterPills and handles tab changes", () => {
      const onFilterChange = vi.fn();
      const filters = [
        { id: "all", label: "All Deals", count: 14, variant: "all" as const },
        { id: "verified", label: "Verified", count: 8, variant: "success" as const },
        { id: "action", label: "Action Required", count: 3, variant: "warning" as const },
        { id: "expired", label: "Expired", count: 1, variant: "danger" as const },
      ];

      render(
        <TopicFilterPills
          filters={filters}
          activeFilter="all"
          onFilterChange={onFilterChange}
        />
      );

      expect(screen.getByText("All Deals")).toBeInTheDocument();
      expect(screen.getByText("14")).toBeInTheDocument();
      expect(screen.getByText("Verified")).toBeInTheDocument();
      expect(screen.getByText("8")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Action Required"));
      expect(onFilterChange).toHaveBeenCalledWith("action");
    });
  });

  describe("Specification 02: In-App Contextual Alert Banners", () => {
    it("renders Success, Warning, and Danger banners with actions", () => {
      const onPrimary = vi.fn();
      const onDismiss = vi.fn();

      render(
        <ExecutiveAlertBanner
          variant="warning"
          title="Bilateral Turn Active: Counter-Offer Awaiting Your Review"
          badgeText="18:14:02 SLA Remaining"
          badgeFormat="mono"
          description="Synthetix AI proposed an adjustment to Clause 8.2."
          primaryAction={{ label: "Review Counter-Terms", onClick: onPrimary }}
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByText("Bilateral Turn Active: Counter-Offer Awaiting Your Review")).toBeInTheDocument();
      expect(screen.getByText("18:14:02 SLA Remaining")).toBeInTheDocument();
      expect(screen.getByText("Synthetix AI proposed an adjustment to Clause 8.2.")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Review Counter-Terms"));
      expect(onPrimary).toHaveBeenCalled();

      fireEvent.click(screen.getByText("Dismiss Alert"));
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe("Specification 03: Executive Toast Notification System", () => {
    it("dispatches and renders toasts inside ExecutiveToastContainer", () => {
      render(<ExecutiveToastContainer />);

      act(() => {
        executiveToast.success("Interest Proposal Dispatched", {
          description: "Transmitted to Synthetix AI under strict CDOE bilateral covenant.",
          badge: "Encrypted",
        });
      });

      expect(screen.getByText("Interest Proposal Dispatched")).toBeInTheDocument();
      expect(screen.getByText("Encrypted")).toBeInTheDocument();
      expect(
        screen.getByText(/Transmitted to Synthetix AI under strict CDOE bilateral covenant/i)
      ).toBeInTheDocument();
    });
  });

  describe("Specification 04: High-Density Deal Table", () => {
    it("renders table rows with references, counterparties, commercial terms and badges", () => {
      const deals = [
        {
          id: "deal-1",
          reference: "RY-0024",
          title: "European Cloud Distribution & DACH Access",
          counterparty: "Synthetix AI",
          location: "Zurich, CH",
          commercialTerm: "€420,000 / YR",
          statusBadge: (
            <SemanticStatusPill variant="success" showDot>
              Handshake Ratified (Stage 4)
            </SemanticStatusPill>
          ),
          action: { label: "View Dealroom", onClick: vi.fn() },
        },
      ];

      render(<ExecutiveDealTable deals={deals} />);

      expect(screen.getByText("RY-0024")).toBeInTheDocument();
      expect(screen.getByText("European Cloud Distribution & DACH Access")).toBeInTheDocument();
      expect(screen.getByText(/Synthetix AI • Zurich, CH/i)).toBeInTheDocument();
      expect(screen.getByText("€420,000 / YR")).toBeInTheDocument();
      expect(screen.getByText("Handshake Ratified (Stage 4)")).toBeInTheDocument();
      expect(screen.getByText("View Dealroom")).toBeInTheDocument();
    });
  });
});

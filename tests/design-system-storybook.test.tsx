import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { DesignSystemStorybookPage } from "../src/routes/design-system";

// Mock tanstack router hooks
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Design System Storybook Route (/design-system)", () => {
  it("renders storybook header and foundation navigation groups", () => {
    render(<DesignSystemStorybookPage />);

    expect(screen.getAllByText("The Relay Design System")[0]).toBeInTheDocument();
    expect(screen.getByText("v2.4.0 • Interactive Showcase")).toBeInTheDocument();
    expect(screen.getByText("Foundations")).toBeInTheDocument();
    expect(screen.getByText("Actions & Indicators")).toBeInTheDocument();
    expect(screen.getByText("Contextual Alerts & Feedback")).toBeInTheDocument();
    expect(screen.getByText("Forms & Data Display")).toBeInTheDocument();
    expect(screen.getByText("Complex Overlays")).toBeInTheDocument();
  });

  it("switches tabs and renders interactive component playground", () => {
    render(<DesignSystemStorybookPage initialTab="buttons" />);

    expect(screen.getByText("Button Component")).toBeInTheDocument();
    expect(screen.getByText("Interactive Playground")).toBeInTheDocument();
    expect(screen.getByText("Execute Commercial Action")).toBeInTheDocument();
  });
});

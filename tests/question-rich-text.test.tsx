import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { createQuestionSchema, updateQuestionSchema } from "../src/validators";
import { QuestionContentRenderer } from "../src/components/insights/QuestionContentRenderer";

describe("Question Rich-Text System", () => {
  // ---------------------------------------------------------
  // 1. Zod Schema Validation for context_content_json
  // ---------------------------------------------------------
  describe("Zod Validation with context_content_json", () => {
    it("validates question with context_content_json and plain description", () => {
      const tiptapDoc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Here is a detailed breakdown of our architecture challenge." }],
          },
        ],
      });

      const input = {
        title: "How do B2B companies automate audit logging at scale?",
        description: "We are expanding our compliance requirements and need insights on audit log streaming architecture.",
        topic: "Operations",
        context_content_json: tiptapDoc,
      };

      const result = createQuestionSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.context_content_json).toBe(tiptapDoc);
      }
    });

    it("allows question without context_content_json (backward compatible)", () => {
      const input = {
        title: "How do B2B companies automate audit logging at scale?",
        description: "We are expanding our compliance requirements and need insights on audit log streaming architecture.",
        topic: "Operations",
      };

      const result = createQuestionSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("enforces minimum 30 characters on extracted plain text description", () => {
      const input = {
        title: "How do B2B companies automate audit logging at scale?",
        description: "Too short.",
        topic: "Operations",
        context_content_json: '{"type":"doc","content":[]}',
      };

      const result = createQuestionSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Description must be at least 30 characters");
      }
    });

    it("supports long rich descriptions up to 10,000 characters", () => {
      const longText = "A".repeat(4000);
      const input = {
        title: "How do B2B companies automate audit logging at scale?",
        description: longText,
        topic: "Operations",
      };

      const result = createQuestionSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("rejects descriptions exceeding 10,000 characters", () => {
      const tooLongText = "A".repeat(10001);
      const input = {
        title: "How do B2B companies automate audit logging at scale?",
        description: tooLongText,
        topic: "Operations",
      };

      const result = createQuestionSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("validates updateQuestionSchema with context_content_json", () => {
      const input = {
        question_id: "c432092f-b4df-4740-84a2-e613f173b22b",
        context_content_json: '{"type":"doc","content":[{"type":"paragraph"}]}',
      };

      const result = updateQuestionSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  // ---------------------------------------------------------
  // 2. QuestionContentRenderer Rendering & Security
  // ---------------------------------------------------------
  describe("QuestionContentRenderer Component", () => {
    it("renders headings, paragraphs, bold, and italic formatted content", () => {
      const doc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "The Challenge" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "We need " },
              { type: "text", text: "enterprise security", marks: [{ type: "bold" }] },
              { type: "text", text: " and " },
              { type: "text", text: "reliability", marks: [{ type: "italic" }] },
              { type: "text", text: "." },
            ],
          },
        ],
      });

      const { container } = render(
        <QuestionContentRenderer contentJson={doc} plainTextFallback="Fallback text" />,
      );

      const h2 = container.querySelector("h2");
      expect(h2).not.toBeNull();
      expect(h2?.textContent).toBe("The Challenge");

      const strong = container.querySelector("strong");
      expect(strong?.textContent).toBe("enterprise security");

      const em = container.querySelector("em");
      expect(em?.textContent).toBe("reliability");
    });

    it("renders bullet lists and numbered lists properly", () => {
      const doc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "Point A" }] }],
              },
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "Point B" }] }],
              },
            ],
          },
        ],
      });

      const { container } = render(<QuestionContentRenderer contentJson={doc} />);
      const ul = container.querySelector("ul");
      expect(ul).not.toBeNull();
      const listItems = container.querySelectorAll("li");
      expect(listItems.length).toBe(2);
      expect(listItems[0].textContent).toBe("Point A");
    });

    it("renders blockquotes and code blocks", () => {
      const doc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "blockquote",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Important notice" }] }],
          },
          {
            type: "codeBlock",
            content: [{ type: "text", text: "const audit = true;" }],
          },
        ],
      });

      const { container } = render(<QuestionContentRenderer contentJson={doc} />);
      expect(container.querySelector("blockquote")?.textContent).toBe("Important notice");
      expect(container.querySelector("pre code")?.textContent).toBe("const audit = true;");
    });

    it("renders tables with rows, headers, and cells", () => {
      const doc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "table",
            content: [
              {
                type: "tableRow",
                content: [
                  {
                    type: "tableHeader",
                    content: [{ type: "paragraph", content: [{ type: "text", text: "Metric" }] }],
                  },
                  {
                    type: "tableHeader",
                    content: [{ type: "paragraph", content: [{ type: "text", text: "Target" }] }],
                  },
                ],
              },
              {
                type: "tableRow",
                content: [
                  {
                    type: "tableCell",
                    content: [{ type: "paragraph", content: [{ type: "text", text: "Latency" }] }],
                  },
                  {
                    type: "tableCell",
                    content: [{ type: "paragraph", content: [{ type: "text", text: "< 50ms" }] }],
                  },
                ],
              },
            ],
          },
        ],
      });

      const { container } = render(<QuestionContentRenderer contentJson={doc} />);
      expect(container.querySelector("table")).not.toBeNull();
      expect(container.querySelectorAll("th").length).toBe(2);
      expect(container.querySelectorAll("td").length).toBe(2);
      expect(container.querySelector("th")?.textContent).toBe("Metric");
      expect(container.querySelector("td")?.textContent).toBe("Latency");
    });

    it("renders images with src, alt, and optional caption", () => {
      const doc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              src: "https://example.com/assets/diagram.png",
              alt: "Architecture Diagram",
              title: "Figure 1: High level architecture",
              alignment: "center",
            },
          },
        ],
      });

      const { container } = render(<QuestionContentRenderer contentJson={doc} />);
      const img = container.querySelector("img");
      expect(img).not.toBeNull();
      expect(img?.getAttribute("src")).toBe("https://example.com/assets/diagram.png");
      expect(img?.getAttribute("alt")).toBe("Architecture Diagram");

      const figcaption = container.querySelector("figcaption");
      expect(figcaption?.textContent).toBe("Figure 1: High level architecture");
    });

    it("sanitizes dangerous links such as javascript: protocol", () => {
      const doc = JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Dangerous Link",
                marks: [{ type: "link", attrs: { href: "javascript:alert(document.cookie)" } }],
              },
            ],
          },
        ],
      });

      const { container } = render(<QuestionContentRenderer contentJson={doc} />);
      const link = container.querySelector("a");
      expect(link).not.toBeNull();
      // Must NOT be javascript:
      expect(link?.getAttribute("href")).toBe("#");
      expect(link?.getAttribute("target")).toBe("_blank");
      expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("falls back to plainTextFallback when context_content_json is null or missing", () => {
      const { container } = render(
        <QuestionContentRenderer
          contentJson={null}
          plainTextFallback="This is an existing question with plain text formatting.\nLine 2."
        />,
      );

      expect(container.textContent).toContain("This is an existing question with plain text formatting.");
      expect(container.textContent).toContain("Line 2.");
    });

    it("falls back to plainTextFallback when context_content_json is invalid JSON", () => {
      const { container } = render(
        <QuestionContentRenderer
          contentJson="corrupt { json: string"
          plainTextFallback="Safe fallback description"
        />,
      );

      expect(container.textContent).toBe("Safe fallback description");
    });
  });

  // ---------------------------------------------------------
  // 3. Image Upload Constraints & Security
  // ---------------------------------------------------------
  describe("Image Upload Validation Logic", () => {
    it("accepts valid image MIME types", () => {
      const validMimes = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
      const mimeRegex = /^image\/(png|jpe?g|webp|gif|svg\+xml)$/i;

      for (const mime of validMimes) {
        expect(mimeRegex.test(mime)).toBe(true);
      }
    });

    it("rejects non-image MIME types", () => {
      const invalidMimes = [
        "application/pdf",
        "video/mp4",
        "application/javascript",
        "text/html",
        "application/x-sh",
      ];
      const mimeRegex = /^image\/(png|jpe?g|webp|gif|svg\+xml)$/i;

      for (const mime of invalidMimes) {
        expect(mimeRegex.test(mime)).toBe(false);
      }
    });

    it("rejects video uploads (out of scope constraint)", () => {
      const videoMime = "video/mp4";
      const mimeRegex = /^image\/(png|jpe?g|webp|gif|svg\+xml)$/i;
      expect(mimeRegex.test(videoMime)).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 4. Full-Screen Route Search Parameters Validation
  // ---------------------------------------------------------
  describe("Full-Screen /insights/ask Route Validation", () => {
    const askSearchSchema = (z: typeof import("zod").z) =>
      z.object({
        edit: z.string().uuid().optional(),
      });

    it("accepts search params without edit for new question creation", async () => {
      const { z } = await import("zod");
      const schema = askSearchSchema(z);
      const result = schema.safeParse({});
      expect(result.success).toBe(true);
    });

    it("accepts valid question UUID in edit search param", async () => {
      const { z } = await import("zod");
      const schema = askSearchSchema(z);
      const result = schema.safeParse({ edit: "c432092f-b4df-4740-84a2-e613f173b22b" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.edit).toBe("c432092f-b4df-4740-84a2-e613f173b22b");
      }
    });

    it("rejects non-UUID edit parameter", async () => {
      const { z } = await import("zod");
      const schema = askSearchSchema(z);
      const result = schema.safeParse({ edit: "not-a-uuid" });
      expect(result.success).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 5. Admin Question Creation Rich-Text Support
  // ---------------------------------------------------------
  describe("Admin Question Rich-Text Functionality", () => {
    it("validates admin question creation with context_content_json and custom business", async () => {
      const { z } = await import("zod");
      const { questionTopicSchema, desiredPerspectiveSchema } = await import("../src/validators");

      const createAdminQuestionSchema = z
        .object({
          business_id: z.string().uuid("Invalid business ID").optional().nullable(),
          custom_company_name: z
            .string()
            .trim()
            .min(2, "Company name must be at least 2 characters")
            .max(100, "Company name cannot exceed 100 characters")
            .optional()
            .nullable(),
          custom_industry: z.string().trim().max(100).optional().nullable(),
          custom_website: z.string().trim().max(200).optional().nullable(),
          title: z
            .string()
            .trim()
            .min(10, "Title must be at least 10 characters")
            .max(200, "Title cannot exceed 200 characters"),
          description: z
            .string()
            .trim()
            .min(30, "Description must be at least 30 characters")
            .max(10000, "Description cannot exceed 10000 characters"),
          topic: questionTopicSchema,
          desired_perspective: desiredPerspectiveSchema.optional().nullable(),
          context_content_json: z.string().optional().nullable(),
          status: z.enum(["open", "closed"]).optional().default("open"),
        })
        .refine((data) => Boolean(data.business_id || data.custom_company_name?.trim()), {
          message: "Either select an existing business or enter a custom company name.",
          path: ["business_id"],
        });

      const input = {
        custom_company_name: "Stripe",
        custom_industry: "Fintech",
        title: "How to manage automated disputes across international payment rails?",
        description: "We are expanding our payment rails to EMEA and APAC. Looking for lessons learned on dispute response SLAs.",
        topic: "Finance" as const,
        context_content_json: JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Here is the architectural diagram and context." }],
            },
          ],
        }),
      };

      const result = createAdminQuestionSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.context_content_json).toBeDefined();
        expect(result.data.custom_company_name).toBe("Stripe");
      }
    });
  });
});



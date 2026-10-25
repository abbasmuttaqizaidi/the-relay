import { describe, expect, it } from "vitest";
import { parseDirectEmailRecipients } from "../src/lib/direct-email.server";

describe("direct email recipients", () => {
  it("splits common separators, normalizes addresses, and removes duplicates", () => {
    expect(
      parseDirectEmailRecipients(" Jane@example.com, alex@example.com\nJANE@example.com "),
    ).toEqual(["jane@example.com", "alex@example.com"]);
  });

  it("rejects invalid email addresses", () => {
    expect(() => parseDirectEmailRecipients("valid@example.com, not-an-email")).toThrow(
      "Invalid email address(es): not-an-email",
    );
  });

  it("limits a send to 100 distinct email addresses", () => {
    const recipients = Array.from({ length: 101 }, (_, index) => `person${index}@example.com`);
    expect(() => parseDirectEmailRecipients(recipients.join("\n"))).toThrow(
      "Send to at most 100 addresses at a time.",
    );
  });
});
import { describe, expect, it } from "vitest";
import { parseMarketingContactsCsv } from "../src/lib/marketing-contacts.server";

describe("marketing address book CSV", () => {
  it("parses quoted fields and normalizes email and tags", () => {
    const [row] = parseMarketingContactsCsv(
      'email,name,company,phone,notes,tags,marketing_consent,consent_source,consent_at\n' +
        'JANE@example.com,Jane Doe,"Relay, Inc.",+12025550123,"Asked, follow up",partners;events,false,,',
    );

    expect(row.contact.email).toBe("jane@example.com");
    expect(row.contact.company).toBe("Relay, Inc.");
    expect(row.contact.notes).toBe("Asked, follow up");
    expect(row.contact.tags).toEqual(["partners", "events"]);
    expect(row.contact.marketingConsent).toBe(false);
  });

  it("requires consent source and timestamp before importing an opted-in contact", () => {
    expect(() =>
      parseMarketingContactsCsv(
        "email,marketing_consent,consent_source,consent_at\n" +
          "jane@example.com,true,,",
      ),
    ).toThrow("subscribed contacts need a consent_source");
  });

  it("rejects duplicate normalized addresses and malformed consent flags", () => {
    expect(() =>
      parseMarketingContactsCsv(
        "email,marketing_consent\nJane@example.com,false\njane@example.com,false",
      ),
    ).toThrow("duplicate email address");

    expect(() =>
      parseMarketingContactsCsv("email,marketing_consent\njane@example.com,yes-ish"),
    ).toThrow("marketing_consent must be true, false, or blank");
  });
});
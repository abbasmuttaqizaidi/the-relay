import { parse } from "csv-parse/sync";
import { z } from "zod";

export const marketingContactInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    email: z.string().trim().email().max(320).transform((value) => value.toLowerCase()),
    name: z.string().trim().max(120).optional().default(""),
    company: z.string().trim().max(160).optional().default(""),
    phone: z.string().trim().max(60).optional().default(""),
    notes: z.string().trim().max(2000).optional().default(""),
    tags: z.array(z.string().trim().min(1).max(40)).max(20).optional().default([]),
    marketingConsent: z.boolean(),
    consentSource: z.string().trim().max(200).optional().default(""),
  })
  .refine((contact) => !contact.marketingConsent || contact.consentSource.length >= 3, {
    message: "Record how and when this contact gave marketing consent.",
    path: ["consentSource"],
  });

export type ParsedMarketingContact = {
  contact: z.infer<typeof marketingContactInputSchema>;
  consentSpecified: boolean;
  consentAt?: Date;
};

export function parseMarketingContactsCsv(csv: string): ParsedMarketingContact[] {
  let records: Record<string, string>[];
  try {
    records = parse(csv, {
      bom: true,
      columns: (headers: string[]) => headers.map((header) => header.trim().toLowerCase()),
      skip_empty_lines: true,
      trim: true,
      max_record_size: 20_000,
    });
  } catch {
    throw new Error("CSV could not be parsed. Check its quoting and column headers.");
  }

  if (records.length === 0) throw new Error("CSV contains no contact rows.");
  if (records.length > 500) throw new Error("Import up to 500 contacts per CSV file.");

  const seen = new Set<string>();
  return records.map((record, index) => {
    const line = index + 2;
    const consentCell = (record.marketing_consent || "").toLowerCase();
    const marketingConsent =
      consentCell === "true" || consentCell === "yes"
        ? true
        : consentCell === "false" || consentCell === "no"
          ? false
          : undefined;
    if (consentCell && marketingConsent === undefined) {
      throw new Error(`CSV row ${line}: marketing_consent must be true, false, or blank.`);
    }

    let consentAt: Date | undefined;
    if (marketingConsent) {
      const source = (record.consent_source || "").trim();
      consentAt = new Date(record.consent_at || "");
      if (source.length < 3 || Number.isNaN(consentAt.getTime()) || consentAt > new Date()) {
        throw new Error(
          `CSV row ${line}: subscribed contacts need a consent_source and a valid past consent_at timestamp.`,
        );
      }
    }

    const parsed = marketingContactInputSchema.safeParse({
      email: record.email,
      name: record.name || "",
      company: record.company || "",
      phone: record.phone || "",
      notes: record.notes || "",
      tags: (record.tags || "")
        .split(";")
        .map((tag) => tag.trim())
        .filter(Boolean),
      marketingConsent: marketingConsent ?? false,
      consentSource: record.consent_source || "",
    });
    if (!parsed.success) {
      throw new Error(`CSV row ${line}: ${parsed.error.issues[0]?.message || "Invalid contact."}`);
    }

    const contact = parsed.data;
    if (seen.has(contact.email)) throw new Error(`CSV row ${line}: duplicate email address.`);
    seen.add(contact.email);
    return { contact, consentSpecified: consentCell !== "", consentAt };
  });
}
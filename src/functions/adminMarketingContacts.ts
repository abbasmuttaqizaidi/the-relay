import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { prisma } from "../db/prisma.server";
import { verifyAdminSession } from "../lib/admin-auth.server";
import {
  marketingContactInputSchema,
  parseMarketingContactsCsv,
} from "../lib/marketing-contacts.server";

const contactSchema = marketingContactInputSchema;

const listSchema = z.object({
  query: z.string().trim().max(120).optional().default(""),
  offset: z.number().int().min(0).max(100_000).optional().default(0),
  includeArchived: z.boolean().optional().default(false),
});

const importSchema = z.object({ csv: z.string().min(1).max(1_000_000) });
const contactIdSchema = z.object({ contactId: z.string().uuid() });

function requireAdmin() {
  const cookieHeader = getRequestHeaders().get("cookie") || "";
  if (!verifyAdminSession(cookieHeader)) {
    throw new Error("Forbidden: Only the super admin can manage marketing contacts.");
  }
}

function contactFields(contact: z.infer<typeof contactSchema>) {
  return {
    email: contact.email,
    name: contact.name || null,
    company: contact.company || null,
    phone: contact.phone || null,
    notes: contact.notes || null,
    tags: [...new Set(contact.tags.map((tag) => tag.trim()).filter(Boolean))],
  };
}

async function saveContact(
  contact: z.infer<typeof contactSchema>,
  importedConsentAt?: Date,
) {
  return prisma.$transaction(async (transaction) => {
    const existing = contact.id
      ? await transaction.marketingContact.findUnique({ where: { id: contact.id } })
      : await transaction.marketingContact.findUnique({ where: { email: contact.email } });
    if (contact.id && !existing) throw new Error("Contact not found.");
    if (existing?.archived_at) throw new Error("Archived contacts must be restored before editing.");

    const emailOwner = await transaction.marketingContact.findUnique({
      where: { email: contact.email },
    });
    if (emailOwner && emailOwner.id !== existing?.id) {
      throw new Error("That email address is already in the address book.");
    }

    const isNewConsent =
      contact.marketingConsent &&
      (!existing?.marketing_consent ||
        existing.email !== contact.email ||
        importedConsentAt !== undefined);
    const consentAt = contact.marketingConsent
      ? importedConsentAt || (isNewConsent ? new Date() : existing?.consent_at) || new Date()
      : existing?.consent_at;
    const consentSource = contact.marketingConsent
      ? isNewConsent
        ? contact.consentSource
        : existing?.consent_source || contact.consentSource
      : existing?.consent_source;
    const fields = contactFields(contact);

    const saved = existing
      ? await transaction.marketingContact.update({
          where: { id: existing.id },
          data: {
            ...fields,
            marketing_consent: contact.marketingConsent,
            consent_source: consentSource || null,
            consent_at: consentAt || null,
          },
        })
      : await transaction.marketingContact.create({
          data: {
            ...fields,
            marketing_consent: contact.marketingConsent,
            consent_source: consentSource || null,
            consent_at: consentAt || null,
          },
        });

    if (!contact.marketingConsent && existing?.marketing_consent) {
      await transaction.marketingSuppression.upsert({
        where: { email: existing.email },
        create: { email: existing.email, reason: "contact_book_opt_out" },
        update: { reason: "contact_book_opt_out" },
      });
    } else if (contact.marketingConsent && isNewConsent && consentAt) {
      const suppression = await transaction.marketingSuppression.findUnique({
        where: { email: contact.email },
      });
      if (suppression && consentAt > suppression.created_at) {
        await transaction.marketingSuppression.delete({ where: { email: contact.email } });
      }
    }

    return saved;
  });
}

export const getAdminMarketingContacts = createServerFn({ method: "GET" })
  .inputValidator(listSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    const query = data.query;
    const where = {
      archived_at: data.includeArchived ? { not: null } : null,
      ...(query
        ? {
            OR: [
              { email: { contains: query, mode: "insensitive" as const } },
              { name: { contains: query, mode: "insensitive" as const } },
              { company: { contains: query, mode: "insensitive" as const } },
              { phone: { contains: query } },
              { tags: { has: query } },
            ],
          }
        : {}),
    };
    const [contacts, totalCount, subscribedCount, suppressionCount] = await Promise.all([
      prisma.marketingContact.findMany({
        where,
        orderBy: [{ name: "asc" }, { email: "asc" }],
        skip: data.offset,
        take: 50,
      }),
      prisma.marketingContact.count({ where }),
      prisma.marketingContact.count({ where: { archived_at: null, marketing_consent: true } }),
      prisma.marketingSuppression.count(),
    ]);
    const suppressions = await prisma.marketingSuppression.findMany({
      where: { email: { in: contacts.map((contact) => contact.email) } },
      select: { email: true },
    });
    const suppressedEmails = new Set(suppressions.map((item) => item.email));

    return {
      contacts: contacts.map((contact) => ({
        ...contact,
        consent_at: contact.consent_at?.toISOString() || null,
        created_at: contact.created_at.toISOString(),
        archived_at: contact.archived_at?.toISOString() || null,
        is_suppressed: suppressedEmails.has(contact.email),
      })),
      totalCount,
      subscribedCount,
      suppressionCount,
      offset: data.offset,
      pageSize: 50,
    };
  });

export const saveAdminMarketingContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    const contact = await saveContact(data);
    return { id: contact.id, email: contact.email };
  });

export const archiveAdminMarketingContact = createServerFn({ method: "POST" })
  .inputValidator(contactIdSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    const contact = await prisma.marketingContact.findUnique({
      where: { id: data.contactId },
    });
    if (!contact) throw new Error("Contact not found.");
    if (contact.archived_at) {
      await prisma.marketingContact.update({
        where: { id: contact.id },
        data: { archived_at: null },
      });
      return { archived: false };
    }

    await prisma.$transaction(async (transaction) => {
      if (contact.marketing_consent) {
        await transaction.marketingSuppression.upsert({
          where: { email: contact.email },
          create: { email: contact.email, reason: "contact_archived" },
          update: { reason: "contact_archived" },
        });
      }
      await transaction.marketingContact.update({
        where: { id: contact.id },
        data: {
          archived_at: new Date(),
          marketing_consent: false,
        },
      });
    });
    return { archived: true };
  });

export const importAdminMarketingContacts = createServerFn({ method: "POST" })
  .inputValidator(importSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    const validated = parseMarketingContactsCsv(data.csv);

    let importedCount = 0;
    let subscribedCount = 0;
    for (let offset = 0; offset < validated.length; offset += 25) {
      const batch = validated.slice(offset, offset + 25);
      await Promise.all(
        batch.map(async ({ contact, consentSpecified, consentAt }) => {
          const existing = await prisma.marketingContact.findUnique({
            where: { email: contact.email },
          });
          const effectiveConsent = consentSpecified
            ? contact.marketingConsent
            : existing?.marketing_consent ?? false;
          const merged = { ...contact, marketingConsent: effectiveConsent };
          if (effectiveConsent && !merged.consentSource && existing?.consent_source) {
            merged.consentSource = existing.consent_source;
          }
          const saved = await saveContact(
            merged,
            consentSpecified && contact.marketingConsent ? consentAt : undefined,
          );
          if (saved.marketing_consent) subscribedCount += 1;
          importedCount += 1;
        }),
      );
    }

    return { importedCount, subscribedCount };
  });
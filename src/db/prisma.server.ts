import pkg from "@prisma/client";
import type { PrismaClient as TPrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;

declare global {
  // Prevent multiple instances of Prisma Client in development HMR
  var prisma: TPrismaClient | undefined;
}

const getPrismaClient = () => {
  // Read database connection string from environment variables
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "CRITICAL: DATABASE_URL is missing in environment variables. " +
        "Please configure your Postgres connection string in your .env file.",
    );
  }

  // Create the PostgreSQL pool and driver adapter for Prisma 7
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

const isStalePrisma = Boolean(
  globalThis.prisma &&
    (!(globalThis.prisma as any).customContactDetail ||
      !(globalThis.prisma as any).knowledgeInsight ||
      !(globalThis.prisma as any).contactSharingConsent ||
      !(globalThis.prisma as any).exchangeProposal ||
      !(globalThis.prisma as any).exchangeAgreement ||
      !(globalThis.prisma as any).reliabilityEvent),
);

export const prisma =
  (!isStalePrisma && globalThis.prisma) ? globalThis.prisma : getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}


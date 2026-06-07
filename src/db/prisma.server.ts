import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  // Prevent multiple instances of Prisma Client in development HMR
  var prisma: PrismaClient | undefined;
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

export const prisma = globalThis.prisma || getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

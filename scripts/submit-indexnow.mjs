#!/usr/bin/env node
/**
 * Manual IndexNow submission script for The Relay.
 * Submits all public canonical URLs from sitemap to IndexNow API.
 *
 * Usage:
 *   node --env-file=.env scripts/submit-indexnow.mjs
 */

const INDEXNOW_HOST = "www.usetherelay.com";
const INDEXNOW_KEY = "0cdb24a0857f4d83bf7839b1b83e5833";
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const STATIC_CANONICAL_ROUTES = [
  "/",
  "/solutions",
  "/about",
  "/8-step-journey",
  "/core-pillars",
  "/trust-and-safety",
  "/faq",
  "/b2b-opportunity-exchange",
  "/b2b-lead-exchange",
  "/b2b-referral-network",
  "/b2b-partnership-network",
  "/referral-partnerships",
  "/channel-partnerships",
  "/distribution-partners",
  "/agency-lead-exchange",
  "/what-to-do-with-unqualified-leads",
  "/how-to-monetize-unqualified-leads",
  "/how-to-find-b2b-referral-partners",
  "/how-to-find-distribution-partners",
  "/how-to-exchange-business-leads",
  "/insights",
];

async function run() {
  console.log("🚀 Gathering public canonical URLs for IndexNow submission...");

  const staticUrls = STATIC_CANONICAL_ROUTES.map((route) =>
    route === "/" ? `https://${INDEXNOW_HOST}/` : `https://${INDEXNOW_HOST}${route}`
  );

  let questionUrls = [];
  let knowledgeUrls = [];

  try {
    const { PrismaClient } = await import("@prisma/client");
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const pg = await import("pg");

    const pool = new (pg.default?.Pool || pg.Pool)({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const questions = await prisma.question.findMany({
      where: { status: { in: ["open", "closed"] } },
      select: { id: true },
    });
    questionUrls = questions.map((q) => `https://${INDEXNOW_HOST}/insights/${q.id}`);

    const insights = await prisma.knowledgeInsight.findMany({
      where: { status: "published" },
      select: { id: true },
    });
    knowledgeUrls = insights.map(
      (k) => `https://${INDEXNOW_HOST}/insights/knowledge/${k.id}`
    );

    await prisma.$disconnect();
    await pool.end();
  } catch (dbErr) {
    console.warn("Notice: Database query skipped or failed, using static list:", dbErr.message);
  }

  const allUrls = Array.from(
    new Set([...staticUrls, ...questionUrls, ...knowledgeUrls])
  );

  console.log(`📡 Submitting ${allUrls.length} public URL(s) to IndexNow (${INDEXNOW_ENDPOINT})...`);

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: allUrls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow Response Status: ${res.status}`);

    if (res.status === 200 || res.status === 202) {
      console.log(`✅ SUCCESS: ${allUrls.length} URLs submitted successfully to IndexNow!`);
    } else {
      const body = await res.text();
      console.warn(`⚠️ Warning: IndexNow returned status ${res.status}:`, body);
    }
  } catch (err) {
    console.error("❌ Network error submitting to IndexNow:", err);
  }
}

run();

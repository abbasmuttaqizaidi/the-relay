#!/usr/bin/env node
/**
 * Manual IndexNow submission script for The Relay.
 * Submits all public canonical URLs from sitemap to IndexNow API.
 *
 * Usage:
 *   node --env-file=.env scripts/submit-indexnow.js
 */

import { submitAllPublicUrlsToIndexNow } from "../src/lib/indexnow.server";

async function run() {
  console.log("🚀 Initiating IndexNow public sitemap submission...");
  const result = await submitAllPublicUrlsToIndexNow({ force: true });
  if (result.success) {
    console.log(
      `✅ Success! Submitted ${result.totalSubmitted} public URLs to IndexNow.`
    );
    process.exit(0);
  } else {
    console.error(
      `❌ Submission failed or encountered an error. URLs attempted: ${result.totalSubmitted}`
    );
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Fatal error during IndexNow submission:", err);
  process.exit(1);
});

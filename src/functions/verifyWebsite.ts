import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BusinessService } from "../services/business.service";
import { getAuthenticatedUser } from "../lib/auth.server";

const verifyWebsiteSchema = z.object({
  url: z.string().min(1, "Please provide a website URL"),
  business_id: z.string().uuid("Please provide a valid business ID"),
});

/**
 * Attempt a fetch (HEAD then GET fallback) for a single URL.
 * Returns the Response on success, or null on network/DNS failure.
 */
async function tryFetch(
  targetUrl: string,
  signal: AbortSignal
): Promise<{ response: Response; method: string } | null> {
  // Try HEAD first
  try {
    const res = await fetch(targetUrl, {
      method: "HEAD",
      signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; TheRelay-Verification/1.0; +https://therelay.co)",
      },
    });
    // If HEAD returns 405 (Method Not Allowed) or 5xx, try GET instead
    if (res.status !== 405 && res.status < 500) {
      return { response: res, method: "HEAD" };
    }
  } catch (_) {}

  // Fallback to GET
  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; TheRelay-Verification/1.0; +https://therelay.co)",
      },
    });
    return { response: res, method: "GET" };
  } catch (_) {}

  return null;
}

export const verifyWebsite = createServerFn({ method: "POST" })
  .inputValidator(verifyWebsiteSchema)
  .handler(async ({ data }) => {
    const { url: rawUrl, business_id } = data;

    // Ensure the caller is authenticated
    await getAuthenticatedUser();

    // Normalize: prepend https:// if no protocol is present
    const url = /^https?:\/\//i.test(rawUrl.trim())
      ? rawUrl.trim()
      : `https://${rawUrl.trim()}`;

    try {
      // Parse and validate domain
      const parsed = new URL(url);
      const rawHostname = parsed.hostname;
      const domain = rawHostname.replace(/^www\./i, "");

      if (!domain || domain.includes("localhost") || /^[\d.]+$/.test(domain)) {
        return {
          valid: false,
          domain,
          error: "Private or invalid domain",
          checks: { dns: false, reachable: false, ssl: false },
        };
      }

      // Build URL variants to try (original first, then with/without www)
      const variants: string[] = [url];
      const hasWww = rawHostname.toLowerCase().startsWith("www.");

      if (hasWww) {
        // Also try without www
        const withoutWww = url.replace(
          /^(https?:\/\/)www\./i,
          "$1"
        );
        variants.push(withoutWww);
      } else {
        // Also try with www
        const withWww = url.replace(
          /^(https?:\/\/)/i,
          "$1www."
        );
        variants.push(withWww);
      }

      // Also try HTTPS if the original was HTTP, and vice versa
      for (const v of [...variants]) {
        if (v.startsWith("http://")) {
          variants.push(v.replace("http://", "https://"));
        } else if (v.startsWith("https://")) {
          variants.push(v.replace("https://", "http://"));
        }
      }

      // Deduplicate
      const uniqueVariants = [...new Set(variants)];

      let result: { response: Response; method: string; usedUrl: string } | null = null;

      for (const variant of uniqueVariants) {
        // Each variant gets its own abort controller so one failure doesn't kill the rest
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const fetchResult = await tryFetch(variant, controller.signal);
        clearTimeout(timeout);

        if (fetchResult) {
          result = { ...fetchResult, usedUrl: variant };
          break;
        }
      }

      if (!result) {
        return {
          valid: false,
          domain,
          error: `Could not reach ${domain} — DNS resolution failed or website is down`,
          checks: { dns: false, reachable: false, ssl: false },
        };
      }

      const { response, usedUrl } = result;
      const statusCode = response.status;
      const isReachable = statusCode >= 200 && statusCode < 500;

      // Check if the successful URL used HTTPS
      const usedParsed = new URL(usedUrl);
      const isSSL = usedParsed.protocol === "https:";

      // Check final domain after redirects
      const finalUrl = response.url || usedUrl;
      let finalDomain = domain;
      try {
        finalDomain = new URL(finalUrl).hostname.replace(/^www\./i, "");
      } catch (_) {}

      const sameDomain =
        finalDomain === domain ||
        finalDomain.endsWith("." + domain) ||
        domain.endsWith("." + finalDomain);

      // Persist the verification result to the database if reachable
      if (isReachable) {
        await BusinessService.markWebsiteVerified(business_id, domain);
      }

      return {
        valid: isReachable,
        domain,
        resolvedUrl: usedUrl !== url ? usedUrl : undefined,
        finalDomain: sameDomain ? undefined : finalDomain,
        statusCode,
        checks: {
          dns: true,
          reachable: isReachable,
          ssl: isSSL,
        },
      };
    } catch (err: any) {
      return {
        valid: false,
        domain: "",
        error: err?.message || "Verification failed",
        checks: { dns: false, reachable: false, ssl: false },
      };
    }
  });

export type VerifyWebsiteFn = typeof verifyWebsite;

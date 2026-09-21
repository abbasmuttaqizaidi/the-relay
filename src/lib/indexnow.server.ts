/**
 * IndexNow Protocol Submission Utility for The Relay
 * Server-side only module.
 *
 * Reference: https://www.indexnow.org/documentation
 */

import { getPublicSitemapUrls } from "./sitemap.server";

export const INDEXNOW_HOST = "www.usetherelay.com";
export const INDEXNOW_KEY = "0cdb24a0857f4d83bf7839b1b83e5833";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface SubmitIndexNowOptions {
  /** If true, executes the API call even in development/test environment */
  force?: boolean;
}

/**
 * Submit one or more public canonical URLs to IndexNow search engine protocol.
 * This operation is asynchronous, isolated, and will NEVER throw or disrupt calling workflows.
 */
export async function submitToIndexNow(
  urls: string | string[],
  options?: SubmitIndexNowOptions
): Promise<boolean> {
  const urlList = (Array.isArray(urls) ? urls : [urls])
    .filter((u) => typeof u === "string" && u.startsWith(`https://${INDEXNOW_HOST}`))
    .filter((u, idx, arr) => arr.indexOf(u) === idx);

  if (urlList.length === 0) {
    return false;
  }

  const isProduction =
    process.env.NODE_ENV === "production" ||
    (typeof import.meta !== "undefined" && Boolean(import.meta.env?.PROD));

  if (!isProduction && !options?.force) {
    console.info(
      `[IndexNow] Development mode: skipping submission for ${urlList.length} URL(s):\n  ${urlList.join("\n  ")}`
    );
    return true;
  }

  const payload: IndexNowPayload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    switch (response.status) {
      case 200:
      case 202:
        console.info(
          `[IndexNow] Successfully submitted ${urlList.length} URL(s). Status: ${response.status}`
        );
        return true;
      case 400:
        console.warn(
          `[IndexNow] Bad Request (400): Invalid request format for payload.`,
          payload
        );
        return false;
      case 403:
        console.error(
          `[IndexNow] Forbidden (403): In valid key or key verification failed at ${INDEXNOW_KEY_LOCATION}.`
        );
        return false;
      case 422:
        console.warn(
          `[IndexNow] Unprocessable Entity (422): URLs don't belong to host (${INDEXNOW_HOST}) or key doesn't match.`
        );
        return false;
      case 429:
        console.warn(
          `[IndexNow] Too Many Requests (429): Rate limited by IndexNow API.`
        );
        return false;
      default:
        console.warn(
          `[IndexNow] Received response status ${response.status} from IndexNow.`
        );
        return false;
    }
  } catch (error) {
    console.warn(`[IndexNow] Network or dispatch error submitting URLs:`, error);
    return false;
  }
}

/**
 * Submits all currently indexable public URLs from the sitemap definition to IndexNow.
 */
export async function submitAllPublicUrlsToIndexNow(
  options?: SubmitIndexNowOptions
): Promise<{ success: boolean; totalSubmitted: number }> {
  try {
    const { staticUrls, questionUrls, knowledgeUrls } = await getPublicSitemapUrls();
    const allUrls = Array.from(
      new Set([...staticUrls, ...questionUrls, ...knowledgeUrls])
    );

    const success = await submitToIndexNow(allUrls, options);
    return {
      success,
      totalSubmitted: allUrls.length,
    };
  } catch (error) {
    console.warn(`[IndexNow] Error querying public sitemap URLs for submission:`, error);
    return {
      success: false,
      totalSubmitted: 0,
    };
  }
}

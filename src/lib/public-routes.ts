import { STATIC_CANONICAL_ROUTES } from "./sitemap.server";

/**
 * Set of all static canonical public SEO routes.
 * Includes all marketing, playbook index, network directory, and foundational pages.
 */
export const PUBLIC_STATIC_ROUTES = new Set<string>([
  ...STATIC_CANONICAL_ROUTES,
  "/network",
  "/eight-step-journey",
]);

/**
 * Determines whether a given request pathname is a public, indexable SEO route.
 *
 * Public SEO routes:
 * - Must return HTTP 200 without requiring authentication.
 * - Must never be redirected into Clerk client handshake (307).
 * - Must be freely crawlable by search engines (e.g. Googlebot).
 *
 * Private/application routes (like /dashboard, /opportunities, /proposals, /requests, etc.)
 * return `false` and retain their strict authentication enforcement.
 */
export function isPublicSeoRoute(pathname: string): boolean {
  if (!pathname) return false;

  // Normalize: remove trailing slash (except root "/")
  const normalized = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (PUBLIC_STATIC_ROUTES.has(normalized)) {
    return true;
  }

  // Dynamic public knowledge insights: /insights/knowledge/:slugOrId
  // Exclude protected contributor actions: /insights/knowledge/new, /insights/knowledge/:id/edit
  if (normalized.startsWith("/insights/knowledge/")) {
    const subpath = normalized.slice("/insights/knowledge/".length);
    if (subpath === "new" || subpath.endsWith("/edit")) {
      return false;
    }
    return subpath.length > 0;
  }

  // Dynamic public peer questions: /insights/:slugOrId
  // Exclude protected action: /insights/ask
  if (normalized.startsWith("/insights/")) {
    const subpath = normalized.slice("/insights/".length);
    if (subpath === "ask") {
      return false;
    }
    return subpath.length > 0;
  }

  return false;
}

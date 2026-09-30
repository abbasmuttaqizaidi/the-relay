import { createStart, createMiddleware } from "@tanstack/react-start";
import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { renderErrorPage } from "./lib/error-page";
import { isPublicSeoRoute } from "./lib/public-routes";

const rawClerkMiddleware = clerkMiddleware();

/**
 * Public-Route Boundary Middleware
 *
 * Establishes a clean boundary between Public SEO routes and Private application routes.
 *
 * Problem:
 * Clerk's default `clerkMiddleware()` unconditionally attempts to authenticate all requests.
 * In production or cross-domain environments, when a visitor (such as Googlebot or an unauthenticated
 * first-time user) requests a public page without an active session cookie, Clerk's `authenticateRequest`
 * returns a handshake redirect (HTTP 307) pointing to the Clerk accounts/handshake URL.
 * Google Search Console consequently flags these public SEO routes with a "Redirect error" rather than indexing them.
 *
 * Solution:
 * 1. For Public SEO routes (`isPublicSeoRoute(pathname)` is true):
 *    - If no Clerk session cookie is present, skip Clerk authentication entirely and call `next()`.
 *      The public route immediately renders complete HTML and returns HTTP 200 to Googlebot and public guests.
 *    - If a session cookie is present, allow Clerk to hydrate session state, but catch any 307 Handshake
 *      Redirect response and fall back to `next()` so a public marketing/content page NEVER redirects into a handshake.
 * 2. For Private/Application routes (`/dashboard`, `/opportunities`, `/proposals`, RPCs `/_serverFn`, etc.):
 *    - Execute Clerk middleware unconditionally, preserving all existing authentication, guards,
 *      and authorization logic exactly as before.
 */
const authBoundaryMiddleware = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const isPublic = isPublicSeoRoute(pathname);

  const cookieHeader = request.headers.get("cookie") || "";
  const hasClerkCookie =
    cookieHeader.includes("__session") || cookieHeader.includes("__client_uat");

  // Public SEO route without session cookie -> serve immediately without Clerk handshake
  if (isPublic && !hasClerkCookie) {
    return await next();
  }

  // Public route with session cookie, or any private / auth / RPC route:
  try {
    return await (rawClerkMiddleware as any).options.server({ request, next });
  } catch (err) {
    // Under no circumstances should a public SEO route throw a 307 Handshake Redirect
    if (isPublic && err instanceof Response && err.status === 307) {
      return await next();
    }
    throw err;
  }
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(error), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [authBoundaryMiddleware, errorMiddleware],
}));

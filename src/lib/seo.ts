/**
 * The Relay — Technical SEO Foundation & Canonical Configuration
 * Reference: seo_code_guide.md
 */

export const SITE_URL = "https://www.usetherelay.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_NAME = "The Relay";

export interface SeoMetaOptions {
  title: string;
  description: string;
  /** Route path for canonical URL generation. Accepts either 'path' or 'canonicalPath'. */
  path?: string;
  /** Alias for 'path' — both are supported for convenience. */
  canonicalPath?: string;
  keywords?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Construct a clean, absolute canonical URL for any route path
 */
export function buildCanonicalUrl(path: string): string {
  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  // Strip trailing slashes for clean canonical URLs (except root)
  const normalizedPath = cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;
  return `${SITE_URL}${normalizedPath}`;
}

/**
 * Generate standard TanStack Start route head configuration
 */
export function createSeoMeta({
  title,
  description,
  path,
  canonicalPath,
  keywords,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SeoMetaOptions) {
  const resolvedPath = canonicalPath || path || "/";
  const canonicalUrl = buildCanonicalUrl(resolvedPath);
  const robotsDirective = noIndex ? "noindex, nofollow" : "index, follow";

  const meta: Array<{ name?: string; property?: string; content: string }> = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robotsDirective },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:type", content: ogType },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }

  return {
    meta,
    links: [
      { rel: "canonical", href: canonicalUrl },
    ],
  };
}

/**
 * Generate private/authenticated route head configuration with strict noindex
 */
export function createPrivateMeta(title = "The Relay") {
  return {
    meta: [
      { title: `${title} | The Relay` },
      { name: "robots", content: "noindex, nofollow" },
    ],
  };
}

/**
 * Core Structured Data Schemas
 */
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Relay",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: "The governed B2B opportunity exchange for verified companies.",
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Relay",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/opportunities?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function createArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  authorName = "The Relay Editorial Team",
  imageUrl = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildCanonicalUrl(path),
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "The Relay",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    image: imageUrl,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

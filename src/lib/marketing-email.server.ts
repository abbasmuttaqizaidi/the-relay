import crypto from "node:crypto";
import sanitizeHtml from "sanitize-html";
import { SITE_URL } from "./seo";

const allowedStyleValues: NonNullable<sanitizeHtml.IOptions["allowedStyles"]>[string] = {
  color: [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i, /^[a-z]+$/i],
  "background-color": [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i, /^[a-z]+$/i],
  "font-family": [/^[\w\s,'-]+$/],
  "font-size": [/^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/],
  "font-weight": [/^(?:normal|bold|[1-9]00)$/],
  "line-height": [/^\d+(?:\.\d+)?(?:px|%|em|rem)?$/],
  "text-align": [/^(?:left|right|center|justify)$/],
  "text-decoration": [/^(?:none|underline|line-through)$/],
  "vertical-align": [/^(?:top|middle|bottom|baseline)$/],
  display: [/^(?:block|inline|inline-block|table|table-cell|none)$/],
  width: [/^\d+(?:\.\d+)?(?:px|%|em|rem)$/],
  height: [/^\d+(?:\.\d+)?(?:px|%|em|rem)$/],
  margin: [/^[\d.\s%-]+(?:px|%|em|rem)?$/],
  padding: [/^[\d.\s%-]+(?:px|%|em|rem)?$/],
  border: [/^[\w\s#().,-]+$/],
  "border-collapse": [/^(?:collapse|separate)$/],
};

const sanitizedOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel", "title", "class", "style"],
    img: ["src", "alt", "title", "width", "height", "class", "style"],
    "*": ["class", "style"],
  },
  allowedStyles: { "*": allowedStyleValues },
  allowedSchemes: ["https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["https"] },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }, true),
  },
};

function getUnsubscribeSecret(): string {
  const secret = process.env.MARKETING_UNSUBSCRIBE_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("MARKETING_UNSUBSCRIBE_SECRET must be configured with at least 32 bytes.");
  }
  return secret;
}

export function sanitizeMarketingHtml(html: string): string {
  return sanitizeHtml(html, sanitizedOptions).trim();
}

export function createMarketingUnsubscribeToken(
  clerkUserId: string | null,
  email: string,
  contactId: string | null = null,
): string {
  const payload = Buffer.from(
    JSON.stringify({ clerkUserId, contactId, email: email.trim().toLowerCase() }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getUnsubscribeSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyMarketingUnsubscribeToken(
  token: string,
): { clerkUserId: string | null; contactId: string | null; email: string } | null {
  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return null;

    const expected = crypto
      .createHmac("sha256", getUnsubscribeSecret())
      .update(payload)
      .digest("base64url");
    const suppliedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (
      suppliedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)
    ) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      (decoded.clerkUserId !== null &&
        (typeof decoded.clerkUserId !== "string" ||
          decoded.clerkUserId.length === 0 ||
          decoded.clerkUserId.length > 255)) ||
      (decoded.contactId !== null &&
        (typeof decoded.contactId !== "string" ||
          decoded.contactId.length === 0 ||
          decoded.contactId.length > 36)) ||
      typeof decoded.email !== "string" ||
      decoded.email.length > 320 ||
      decoded.email !== decoded.email.trim().toLowerCase()
    ) {
      return null;
    }
    return {
      clerkUserId: decoded.clerkUserId,
      contactId: decoded.contactId,
      email: decoded.email,
    };
  } catch {
    return null;
  }
}

export function prepareMarketingEmail(
  html: string,
  clerkUserId: string | null,
  email: string,
  contactId: string | null = null,
) {
  const safeHtml = sanitizeMarketingHtml(html);
  if (!safeHtml) throw new Error("Email content is empty after HTML sanitization.");

  const token = createMarketingUnsubscribeToken(clerkUserId, email, contactId);
  const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${encodeURIComponent(token)}`;
  const footer = `<hr><p style="font-size:12px;color:#555"><a href="${unsubscribeUrl}">Unsubscribe from marketing emails</a></p>`;
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

  return {
    html: `<!doctype html><html><body>${safeHtml}${footer}</body></html>`,
    text: `${text}\n\nUnsubscribe: ${unsubscribeUrl}`,
    unsubscribeUrl,
  };
}

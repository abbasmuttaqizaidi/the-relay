import crypto from "crypto";

const DEFAULT_SECRET = "relay_super_admin_session_hmac_secret_2026_x89a42f";
const DEFAULT_ADMIN_EMAIL = "nexorembws@gmail.com";
const DEFAULT_ADMIN_PASS = "PP@password110";

export function getAdminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASS;
}

/**
 * Validates super admin credentials using timing-safe comparison.
 */
export function validateAdminCredentials(email: string, pass: string): boolean {
  const expectedEmail = getAdminEmail().toLowerCase().trim();
  const expectedPass = getAdminPassword();

  const inputEmail = email.toLowerCase().trim();
  const inputPass = pass;

  if (inputEmail !== expectedEmail) {
    return false;
  }

  const inputBuf = Buffer.from(inputPass);
  const expectedBuf = Buffer.from(expectedPass);

  if (inputBuf.length !== expectedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuf, expectedBuf);
}

/**
 * Generates an opaque, HMAC-SHA256 signed session token for authenticated admin sessions.
 * Never exposes the admin password in the token or cookie.
 */
export function createAdminSessionToken(email: string): string {
  const payload = {
    email: email.toLowerCase().trim(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours validity
    nonce: crypto.randomBytes(16).toString("hex"),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies an admin session token from either a raw token or an incoming cookie header.
 * Checks HMAC signature validity, expiration, and format.
 */
export function verifyAdminSession(
  cookieHeaderOrToken: string | null | undefined,
): boolean {
  if (!cookieHeaderOrToken) return false;

  let token = cookieHeaderOrToken.trim();

  // If passed a full Cookie header string, extract relay_admin_token
  if (token.includes("=")) {
    const match = token.match(/relay_admin_token=([^;]+)/);
    if (!match) return false;
    token = decodeURIComponent(match[1]).trim();
  }

  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadB64, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payloadB64)
    .digest("base64url");

  const sigBuf = Buffer.from(signature);
  const expectedSigBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedSigBuf.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8"),
    );
    if (!payload.exp || typeof payload.exp !== "number") {
      return false;
    }
    if (payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

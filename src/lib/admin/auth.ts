import { SignJWT, jwtVerify } from 'jose';

/**
 * Admin session tokens.
 *
 * Tokens are signed JWTs using HS256 (symmetric key). The secret comes from
 * ADMIN_SESSION_SECRET. Tokens are stored in an HTTP-only cookie named
 * "admin_session" and verified by the Next.js middleware on every /admin/* request.
 *
 * `jose` is used (not `jsonwebtoken`) because it works in the Next.js Edge runtime
 * where the middleware runs.
 */

export const ADMIN_COOKIE_NAME = 'admin_session';
const ALG = 'HS256';
const ISSUER = 'akademia-ia-admin';
const DEFAULT_TTL_HOURS = 12;

function getSecret(): Uint8Array {
  const raw = process.env.ADMIN_SESSION_SECRET;
  if (!raw || raw.length < 16) {
    throw new Error(
      'ADMIN_SESSION_SECRET is missing or too short (set a long random value in .env.local).',
    );
  }
  return new TextEncoder().encode(raw);
}

export type AdminSession = {
  role: 'admin';
  iat: number;
  exp: number;
};

/** Sign a fresh admin session token. */
export async function createAdminToken(ttlHours: number = DEFAULT_TTL_HOURS): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: ALG })
    .setIssuer(ISSUER)
    .setIssuedAt(now)
    .setExpirationTime(now + ttlHours * 3600)
    .sign(getSecret());
}

/** Verify a token. Returns the payload if valid, null otherwise. */
export async function verifyAdminToken(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { issuer: ISSUER });
    if (payload.role !== 'admin') return null;
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

/** Default cookie attributes used both at sign-in and at sign-out. */
export function adminCookieOptions(maxAgeSeconds = DEFAULT_TTL_HOURS * 3600) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminToken,
} from '@/lib/admin/auth';

// Password comparison must run on Node, not Edge, to use timingSafeEqual.
export const runtime = 'nodejs';

const schema = z.object({
  password: z.string().min(1),
});

/**
 * Constant-time string comparison to mitigate timing attacks.
 */
function safeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_PASSWORD non configuré côté serveur.' },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Mot de passe requis.' },
      { status: 422 },
    );
  }

  if (!safeEquals(parsed.data.password, expected)) {
    return NextResponse.json(
      { ok: false, error: 'Mot de passe incorrect.' },
      { status: 401 },
    );
  }

  const token = await createAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res;
}

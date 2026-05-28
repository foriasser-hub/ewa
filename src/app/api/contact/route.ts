import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { sendContactEmail } from '@/lib/email';
import { adminMessages } from '@/lib/admin/store';

/**
 * Contact form API route.
 *
 * Defenses:
 *  - Zod validation (server side, in addition to client side)
 *  - Honeypot field "website" (silently swallowed)
 *  - Per-IP in-memory rate limit (3 submissions / 10 minutes)
 *
 * The in-memory limiter is sufficient for a small marketing site running
 * on a single Vercel region. For higher-traffic deployments, swap this
 * out for Upstash Ratelimit or another shared store.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Trop de tentatives. Réessayez dans quelques minutes.',
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validation échouée.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot — pretend success but do nothing.
  // The field is hidden from humans; if a bot fills it in, we silently
  // accept the submission and discard it.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, mocked: true });
  }

  const result = await sendContactEmail(parsed.data);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: 'Une erreur est survenue lors de l\u2019envoi.' },
      { status: 502 },
    );
  }

  // Persist the message in the admin store so it shows up in /admin/messages.
  // Errors here are non-fatal: the user already got the email confirmation.
  try {
    adminMessages.create({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone ?? '',
      subject: parsed.data.subject,
      formation: parsed.data.formation ?? '',
      message: parsed.data.message,
    });
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true });
}

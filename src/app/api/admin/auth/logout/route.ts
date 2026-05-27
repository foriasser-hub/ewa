import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, adminCookieOptions } from '@/lib/admin/auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Expire the cookie immediately.
  res.cookies.set(ADMIN_COOKIE_NAME, '', { ...adminCookieOptions(0) });
  return res;
}

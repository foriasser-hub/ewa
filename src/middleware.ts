import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin/auth';

/**
 * Admin route protection.
 *
 * Any request to /admin/* (except /admin/login) requires a valid signed
 * admin_session cookie. Unauthorised requests are redirected to /admin/login,
 * preserving the original path in the `next` query parameter.
 *
 * Runs on the Edge runtime — `jose` is used in lib/admin/auth.ts because
 * Node's `crypto` is not fully available here.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page itself and the auth API.
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/')) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifyAdminToken(token);

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    if (pathname !== '/admin') {
      url.searchParams.set('next', pathname);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Protect every /admin/* route AND the admin API routes.
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

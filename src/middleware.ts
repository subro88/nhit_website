import { NextRequest, NextResponse } from 'next/server';

/*
 * Light gate for the admin panel: if there is no session cookie at all,
 * bounce to the login page. Full signature verification happens in the
 * admin server pages and API routes themselves.
 */

const PUBLIC_ADMIN_PATHS = ['/admin'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin') return NextResponse.next();

  const isAdminArea =
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/api/admin/');

  if (!isAdminArea) return NextResponse.next();

  // API routes answer with JSON instead of redirecting.
  if (pathname.startsWith('/api/admin/')) {
    if (req.cookies.get('nhit_admin_session')) return NextResponse.next();
    const isPublicApi =
      pathname === '/api/admin/login' || pathname === '/api/admin/logout';
    if (isPublicApi) return NextResponse.next();
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  if (!req.cookies.get('nhit_admin_session')) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

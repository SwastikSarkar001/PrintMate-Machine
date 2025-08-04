import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const publicRoutes = ['/'];

  const userId = request.cookies.get('userId')?.value;

  // DEBUG: Log path and cookie state
  // console.log('pathname:', pathname, 'userId:', userId);

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublic = publicRoutes.some(route => pathname === route); // use strict equality for public root

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Prevent redirect loop by ensuring we're not already on /dashboard
  if (isPublic && userId && pathname !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
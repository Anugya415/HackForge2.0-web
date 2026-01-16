import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.ico') ||
    pathname.includes('.png') ||
    pathname.includes('.jpg') ||
    pathname.includes('.svg') ||
    pathname.includes('.css') ||
    pathname.includes('.js')
  ) {
    return NextResponse.next();
  }

  // Get auth token from cookie
  const authToken = request.cookies.get('authToken')?.value;
  const userRole = request.cookies.get('userRole')?.value || '';
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  // Public routes
  const isPublicRoute = 
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/jobs') ||
    pathname.startsWith('/companies') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/resume-scanner') ||
    pathname.startsWith('/upload-resume');

  // Protected routes
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/super-admin');

  // Redirect authenticated users away from login/signup
  if ((pathname === '/login' || pathname === '/signup') && isLoggedIn && authToken) {
    const redirectUrl = userRole === 'admin' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Protect routes requiring authentication
  if (isProtectedRoute && (!isLoggedIn || !authToken)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect super-admin routes
  if (pathname.startsWith('/super-admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
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

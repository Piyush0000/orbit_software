import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Exclude internal paths, api, static files
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/placeholder')
  ) {
    return NextResponse.next();
  }

  // Handle localhost and subdomains
  // Example: more.localhost:3000 -> subdomain is "more"
  // Example: brand.orbit.com -> subdomain is "brand"
  
  let subdomain = '';
  const parts = hostname.split('.');
  
  if (parts.length > 1) {
    // If using localhost:3000, parts might be ["localhost:3000"]
    // If using more.localhost:3000, parts might be ["more", "localhost:3000"]
    if (parts[parts.length - 1].includes('localhost')) {
      if (parts.length > 1) {
        subdomain = parts[0];
      }
    } else {
      // For production domains like brand.orbit.com
      if (parts.length >= 3) {
        subdomain = parts[0];
      }
    }
  }

  // If we have a subdomain and it's not "www", rewrite the path
  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
    // Rewrite to /storefront/[subdomain]/[path]
    url.pathname = `/storefront/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
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

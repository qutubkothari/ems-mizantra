import { NextRequest, NextResponse } from 'next/server';

// EMS is a standalone entry to one existing Mizantra module. Prevent direct
// links, browser history and the inherited command palette from exposing the
// rest of the ERP in this hostname.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/dashboard' || (pathname.startsWith('/dashboard/') && !pathname.startsWith('/dashboard/crm'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard/crm';
    url.search = '';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

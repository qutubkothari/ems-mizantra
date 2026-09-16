import { NextRequest, NextResponse } from 'next/server';

// EMS is a standalone entry to one existing Mizantra module. Prevent direct
// links, browser history and the inherited command palette from exposing the
// rest of the ERP in this hostname.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep old bookmarks working without exposing the inherited product name.
  if (pathname === '/dashboard/crm' || pathname.startsWith('/dashboard/crm/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/dashboard/crm', '/dashboard/ems');
    return NextResponse.redirect(url);
  }

  const isEmsWorkspace = pathname === '/dashboard/ems' || pathname.startsWith('/dashboard/ems/');
  // Mizantra Assist is an EMS capability when opened with the EMS topic. It
  // needs its own route because it retains the conversation and governance
  // UI, while all other inherited ERP workspaces stay unavailable here.
  const isEmsAssist =
    pathname === '/dashboard/active-planner' &&
    request.nextUrl.searchParams.get('topic') === 'ems';
  const isCommunicationSettings =
    pathname === '/dashboard/settings' ||
    pathname === '/dashboard/settings/whatsapp' ||
    pathname.startsWith('/dashboard/settings/whatsapp/');

  if (pathname === '/dashboard' || (pathname.startsWith('/dashboard/') && !isEmsWorkspace && !isEmsAssist && !isCommunicationSettings)) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard/ems';
    url.search = '';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

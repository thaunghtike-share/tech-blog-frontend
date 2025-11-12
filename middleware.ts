import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  const mobileRegex = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  if (mobileRegex.test(ua)) {
    return NextResponse.redirect(new URL('/mobile-blocked', req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/((?!mobile-blocked).*)'],
};

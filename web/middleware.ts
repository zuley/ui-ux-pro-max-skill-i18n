import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware is effectively disabled: matcher is empty so this function
// is never invoked. All pages are served statically via Cloudflare Assets.
// Root locale redirect is handled client-side in app/page.tsx.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // empty — middleware never runs
};

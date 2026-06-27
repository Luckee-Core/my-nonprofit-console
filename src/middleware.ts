import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Injects FORMATION_API_SECRET on proxied /api requests (server-side only).
 */
export const middleware = (request: NextRequest) => {
  const secret = process.env.FORMATION_API_SECRET?.trim();
  if (!secret) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-formation-api-key', secret);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
};

export const config = {
  matcher: ['/api/:path*'],
};

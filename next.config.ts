import type { NextConfig } from 'next';

const resolveExpressTarget = (): string => {
  const target =
    process.env.EXPRESS_API_URL?.trim() ||
    process.env.FORMATION_EXPRESS_INTERNAL_URL?.trim() ||
    (process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3080' : '');

  if (!target && process.env.NODE_ENV === 'production') {
    throw new Error(
      'EXPRESS_API_URL (or FORMATION_EXPRESS_INTERNAL_URL) is required when NODE_ENV=production',
    );
  }

  return target;
};

/**
 * Same-origin rewrites to Express when no matching App Router BFF route exists.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    const target = resolveExpressTarget();

    if (!target) {
      return [];
    }

    const base = target.replace(/\/$/, '');
    return [
      { source: '/api/setup/:path*', destination: `${base}/api/setup/:path*` },
      { source: '/api/formation-cases/:path*', destination: `${base}/api/formation-cases/:path*` },
      { source: '/api/formation-checklist/:path*', destination: `${base}/api/formation-checklist/:path*` },
      { source: '/api/formation-board/:path*', destination: `${base}/api/formation-board/:path*` },
      { source: '/api/formation-documents/:path*', destination: `${base}/api/formation-documents/:path*` },
      { source: '/api/formation-filings/:path*', destination: `${base}/api/formation-filings/:path*` },
      { source: '/api/health', destination: `${base}/api/health` },
      { source: '/api-docs.json', destination: `${base}/api-docs.json` },
    ];
  },
};

export default nextConfig;

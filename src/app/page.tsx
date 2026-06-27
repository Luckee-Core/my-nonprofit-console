import type { Metadata } from 'next';
import { MarketingLanding } from '@/packages/landing';

export const metadata: Metadata = {
  title: 'My Nonprofit — Open-source PA formation wizard',
  description:
    'Self-hostable nonprofit formation checklist for Pennsylvania / Philadelphia. Your Supabase, AI document drafts, board and filing tracker. MIT.',
  openGraph: {
    title: 'My Nonprofit — Open-source formation wizard',
    description:
      'Local-first PA nonprofit formation with checklist, AI drafts, and filing tracker. Next.js + Express + Supabase.',
    type: 'website',
  },
};

export default function HomePage() {
  return <MarketingLanding />;
}

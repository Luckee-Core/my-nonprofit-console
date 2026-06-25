import { Suspense } from 'react';
import { GettingStartedPage } from '@/packages/getting-started';

export default function Page() {
  return (
    <Suspense fallback={<p className="p-8 text-slate-500">Loading…</p>}>
      <GettingStartedPage />
    </Suspense>
  );
}

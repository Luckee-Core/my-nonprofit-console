'use client';

import { useEffect, useState } from 'react';
import { getApiDocsCatalog } from '@/api/api-docs';
import type { ApiDocsCatalog } from '@/api/api-docs';
import { AppShell } from '@/components';
import { ApiDocsContent } from '../api-docs-content';

/**
 * API reference page — fetches catalog from Express via rewrite.
 */
export const ApiDocsPage = () => {
  const [catalog, setCatalog] = useState<ApiDocsCatalog | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    void getApiDocsCatalog().then((data) => {
      if (data) {
        setCatalog(data);
        setStatus('ready');
      } else {
        setStatus('error');
      }
    });
  }, []);

  return (
    <AppShell>
      <section className={styles.section}>
        {status === 'loading' ? <p className={styles.muted}>Loading API reference…</p> : null}
        {status === 'error' ? (
          <p className={styles.error}>
            Could not load API catalog. Start Express on port 3080 and ensure rewrites are configured.
          </p>
        ) : null}
        {catalog ? <ApiDocsContent catalog={catalog} /> : null}
      </section>
    </AppShell>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  muted: `text-sm text-slate-500`,
  error: `text-sm text-red-600`,
};

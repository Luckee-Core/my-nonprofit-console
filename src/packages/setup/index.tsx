'use client';

import { useEffect } from 'react';
import { AppShell, StatusBadge } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadSetupStatusThunk } from '@/store/thunks';

/**
 * Setup page — verifies Express, Supabase, and Anthropic connectivity.
 */
export const SetupPage = () => {
  const dispatch = useAppDispatch();
  const setupBuilder = useAppSelector((s) => s.setupBuilder);
  const { isLoading, lastStatus: status, lastError: error } = setupBuilder;

  useEffect(() => {
    void dispatch(loadSetupStatusThunk());
  }, [dispatch]);

  return (
    <AppShell>
      <section className={styles.section}>
        <h1 className={styles.title}>Setup</h1>
        <p className={styles.subtitle}>
          Connect your Supabase project and Express server. Run{' '}
          <code className={styles.code}>my-nonprofit-express-server/docs/supabase-setup.sql</code>{' '}
          first.
        </p>

        {isLoading ? <p className={styles.muted}>Checking connectivity…</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        {status ? (
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Supabase: <StatusBadge value={status.supabase} message={status.supabaseMessage} />
            </li>
            <li className={styles.listItem}>
              Anthropic: <StatusBadge value={status.anthropic} />
            </li>
          </ul>
        ) : null}

        <ol className={styles.steps}>
          <li>Create a Supabase project and run the SQL runbook (see wire-contract.md).</li>
          <li>
            Copy <code className={styles.code}>.env.example</code> to{' '}
            <code className={styles.code}>.env</code> in Express and set keys.
          </li>
          <li>Start Express on port 3080 and this app on port 3081.</li>
        </ol>
      </section>
    </AppShell>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  title: `text-2xl font-semibold text-slate-900`,
  subtitle: `text-slate-600`,
  muted: `text-sm text-slate-500`,
  error: `text-sm text-red-600`,
  code: `rounded bg-slate-100 px-1.5 py-0.5 text-sm`,
  list: `rounded-lg border border-slate-200 bg-white p-4`,
  listItem: `py-1 text-sm`,
  steps: `list-decimal space-y-2 pl-5 text-sm text-slate-600`,
};

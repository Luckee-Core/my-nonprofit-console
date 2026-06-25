'use client';

import { useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadSetupStatusThunk } from '@/store/thunks';

/**
 * Setup page — verifies Express, Supabase, and Anthropic connectivity.
 */
export const SetupPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((s) => s.setupBuilder.isLoading);
  const status = useAppSelector((s) => s.setupBuilder.lastStatus);
  const error = useAppSelector((s) => s.setupBuilder.lastError);

  useEffect(() => {
    void dispatch(loadSetupStatusThunk());
  }, [dispatch]);

  return (
    <AppShell>
      <section className={styles.section}>
        <h1 className={styles.title}>Setup</h1>
        <p className={styles.subtitle}>
          Connect your Supabase project and Express server. Run SQL from{' '}
          <code className={styles.code}>my-nonprofit-express-server/docs/</code> first.
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
          <li>Copy <code className={styles.code}>.env.example</code> to <code className={styles.code}>.env</code> in Express and set keys.</li>
          <li>Start Express on port 3011 and this app on port 3010.</li>
        </ol>
      </section>
    </AppShell>
  );
};

const StatusBadge = ({ value, message }: { value: string; message?: string }) => {
  const tone =
    value === 'ok' ? styles.badgeOk : value === 'missing' ? styles.badgeMissing : styles.badgeError;
  return (
    <span>
      <span className={`${styles.badge} ${tone}`}>{value}</span>
      {message ? <span className={styles.muted}> — {message}</span> : null}
    </span>
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
  badge: `rounded px-2 py-0.5 text-xs font-medium uppercase`,
  badgeOk: `bg-green-100 text-green-800`,
  badgeMissing: `bg-amber-100 text-amber-800`,
  badgeError: `bg-red-100 text-red-800`,
  steps: `list-decimal space-y-2 pl-5 text-sm text-slate-600`,
};

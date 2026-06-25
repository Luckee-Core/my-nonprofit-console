'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { FORMATION_DETAIL_PAGE_PATH, GETTING_STARTED_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFormationCasesThunk, openFormationCaseThunk } from '@/store/thunks';

/**
 * Dashboard — list nonprofits and continue formation work.
 */
export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const casesDump = useAppSelector((s) => s.formationCases);
  const isLoading = useAppSelector((s) => s.dashboardBuilder.isLoading);
  const lastError = useAppSelector((s) => s.dashboardBuilder.lastError);

  const nonprofits = useMemo(
    () => Object.values(casesDump).sort((a, b) => b.updated_at.localeCompare(a.updated_at)),
    [casesDump],
  );

  useEffect(() => {
    void dispatch(fetchFormationCasesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && nonprofits.length === 0) {
      router.replace(GETTING_STARTED_PATH);
    }
  }, [isLoading, nonprofits.length, router]);

  const handleContinue = async (id: string) => {
    const code = await dispatch(openFormationCaseThunk(id));
    if (code === 200) {
      router.push(FORMATION_DETAIL_PAGE_PATH);
    }
  };

  if (!isLoading && nonprofits.length === 0) {
    return null;
  }

  return (
    <AppShell>
      <section className={styles.section}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Your nonprofits</h1>
            <p className={styles.subtitle}>
              Each row is one organization you are forming — open it to continue the checklist,
              board, documents, and filings.
            </p>
          </div>
          <Link href={`${GETTING_STARTED_PATH}?step=name`} className={styles.primaryButton}>
            Start another nonprofit
          </Link>
        </div>

        {lastError ? <p className={styles.error}>{lastError}</p> : null}
        {isLoading ? <p className={styles.muted}>Loading…</p> : null}

        <ul className={styles.list}>
          {nonprofits.map((row) => (
            <li key={row.id} className={styles.listItem}>
              <div>
                <p className={styles.orgName}>{row.working_name || row.legal_name || 'Unnamed'}</p>
                <p className={styles.orgMeta}>
                  {row.status.replace('_', ' ')} · updated{' '}
                  {new Date(row.updated_at).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => void handleContinue(row.id)}
              >
                Continue
              </button>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  headerRow: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold`,
  subtitle: `mt-1 text-slate-600`,
  primaryButton: `inline-flex shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800`,
  error: `text-sm text-red-600`,
  muted: `text-sm text-slate-500`,
  list: `divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white`,
  listItem: `flex items-center justify-between gap-4 px-4 py-3`,
  orgName: `font-medium text-slate-900`,
  orgMeta: `text-xs text-slate-500`,
  linkButton: `text-sm font-medium text-slate-700 hover:text-slate-900`,
};

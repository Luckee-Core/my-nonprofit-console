'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { FORMATION_DETAIL_PAGE_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  createFormationCaseThunk,
  fetchFormationCasesThunk,
  openFormationCaseThunk,
} from '@/store/thunks';

/**
 * Dashboard — list formation cases and create new ones.
 */
export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const casesDump = useAppSelector((s) => s.formationCases);
  const isLoading = useAppSelector((s) => s.dashboardBuilder.isLoading);
  const isCreating = useAppSelector((s) => s.dashboardBuilder.isCreating);
  const lastError = useAppSelector((s) => s.dashboardBuilder.lastError);
  const [workingName, setWorkingName] = useState('');

  const cases = useMemo(
    () => Object.values(casesDump).sort((a, b) => b.updated_at.localeCompare(a.updated_at)),
    [casesDump],
  );

  useEffect(() => {
    void dispatch(fetchFormationCasesThunk());
  }, [dispatch]);

  const handleCreate = async () => {
    const code = await dispatch(createFormationCaseThunk(workingName));
    if (code === 200) {
      setWorkingName('');
      await dispatch(fetchFormationCasesThunk());
    }
  };

  const handleOpen = async (id: string) => {
    const code = await dispatch(openFormationCaseThunk(id));
    if (code === 200) {
      router.push(FORMATION_DETAIL_PAGE_PATH);
    }
  };

  return (
    <AppShell>
      <section className={styles.section}>
        <h1 className={styles.title}>Formation cases</h1>
        <p className={styles.subtitle}>Pennsylvania / Philadelphia nonprofit formation wizard</p>

        <div className={styles.createRow}>
          <input
            className={styles.input}
            placeholder="Working nonprofit name"
            value={workingName}
            onChange={(e) => setWorkingName(e.target.value)}
          />
          <button
            type="button"
            className={styles.primaryButton}
            disabled={isCreating}
            onClick={() => void handleCreate()}
          >
            {isCreating ? 'Creating…' : 'New case'}
          </button>
        </div>

        {lastError ? <p className={styles.error}>{lastError}</p> : null}
        {isLoading ? <p className={styles.muted}>Loading cases…</p> : null}

        <ul className={styles.list}>
          {cases.map((row) => (
            <li key={row.id} className={styles.listItem}>
              <div>
                <p className={styles.caseName}>{row.working_name || row.legal_name}</p>
                <p className={styles.caseMeta}>
                  {row.status} · updated {new Date(row.updated_at).toLocaleDateString()}
                </p>
              </div>
              <button type="button" className={styles.linkButton} onClick={() => void handleOpen(row.id)}>
                Open
              </button>
            </li>
          ))}
          {!isLoading && cases.length === 0 ? (
            <li className={styles.empty}>No cases yet — create one above.</li>
          ) : null}
        </ul>
      </section>
    </AppShell>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  title: `text-2xl font-semibold`,
  subtitle: `text-slate-600`,
  createRow: `flex flex-wrap gap-2`,
  input: `min-w-[240px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  primaryButton: `rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50`,
  error: `text-sm text-red-600`,
  muted: `text-sm text-slate-500`,
  list: `divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white`,
  listItem: `flex items-center justify-between gap-4 px-4 py-3`,
  caseName: `font-medium text-slate-900`,
  caseMeta: `text-xs text-slate-500`,
  linkButton: `text-sm font-medium text-slate-700 hover:text-slate-900`,
  empty: `px-4 py-6 text-center text-sm text-slate-500`,
};

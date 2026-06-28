'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components';
import { FORMATION_WORKSPACE_PATH, GETTING_STARTED_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFormationCasesThunk, openFormationCaseThunk } from '@/store/thunks';
import { DashboardHeader } from './dashboard-header';
import { NonprofitListItem } from './nonprofit-list-item';

/**
 * Dashboard — list nonprofits and continue formation work.
 */
export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formationCases = useAppSelector((s) => s.formationCases);
  const dashboardBuilder = useAppSelector((s) => s.dashboardBuilder);
  const { isLoading, lastError } = dashboardBuilder;

  const nonprofits = useMemo(
    () => Object.values(formationCases).sort((a, b) => b.updated_at.localeCompare(a.updated_at)),
    [formationCases],
  );

  useEffect(() => {
    void dispatch(fetchFormationCasesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !lastError && nonprofits.length === 0) {
      router.replace(GETTING_STARTED_PATH);
    }
  }, [isLoading, lastError, nonprofits.length, router]);

  const handleContinue = async (id: string) => {
    const code = await dispatch(openFormationCaseThunk(id));
    if (code === 200) {
      router.push(FORMATION_WORKSPACE_PATH);
    }
  };

  if (!isLoading && !lastError && nonprofits.length === 0) {
    return null;
  }

  return (
    <AppShell>
      <section className={styles.section}>
        <DashboardHeader />

        {lastError ? <p className={styles.error}>{lastError}</p> : null}
        {isLoading ? <p className={styles.muted}>Loading…</p> : null}

        <ul className={styles.list}>
          {nonprofits.map((row) => (
            <NonprofitListItem key={row.id} row={row} onContinue={(id) => void handleContinue(id)} />
          ))}
        </ul>
      </section>
    </AppShell>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  error: `text-sm text-red-600`,
  muted: `text-sm text-slate-500`,
  list: `divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white`,
};

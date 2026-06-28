'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components';
import { DASHBOARD_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { GettingStartedBuilderActions } from '@/store/builders/gettingStartedBuilder';
import { fetchFormationCasesThunk } from '@/store/thunks';
import { ConnectStep } from './connect-step';
import { NameStep } from './name-step';
import { WizardProgress } from './shared/wizard-progress';
import { WelcomeStep } from './welcome-step';

/**
 * Getting started wizard — welcome, connect, name.
 */
export const GettingStartedPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const gettingStartedBuilder = useAppSelector((s) => s.gettingStartedBuilder);
  const formationCases = useAppSelector((s) => s.formationCases);
  const dashboardBuilder = useAppSelector((s) => s.dashboardBuilder);
  const { activeStep } = gettingStartedBuilder;
  const { isLoading, lastError } = dashboardBuilder;

  const existingNonprofitCount = useMemo(() => Object.keys(formationCases).length, [formationCases]);

  useEffect(() => {
    void dispatch(fetchFormationCasesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !lastError && existingNonprofitCount > 0) {
      router.replace(DASHBOARD_PATH);
    }
  }, [existingNonprofitCount, isLoading, lastError, router]);

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam === 'name') {
      dispatch(GettingStartedBuilderActions.setGettingStartedStep('name'));
    }
  }, [dispatch, searchParams]);

  if (!isLoading && !lastError && existingNonprofitCount > 0) {
    return null;
  }

  return (
    <AppShell>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>Get started</h1>
        <p className={styles.pageSubtitle}>
          Set up your workspace, then create your first nonprofit formation project.
        </p>

        <WizardProgress activeStep={activeStep} />

        <div className={styles.stepBody}>
          {activeStep === 'welcome' ? <WelcomeStep /> : null}
          {activeStep === 'connect' ? <ConnectStep /> : null}
          {activeStep === 'name' ? <NameStep /> : null}
        </div>
      </section>
    </AppShell>
  );
};

const styles = {
  section: `flex flex-col gap-6`,
  pageTitle: `text-2xl font-semibold text-slate-900`,
  pageSubtitle: `text-slate-600`,
  stepBody: `mt-2`,
};

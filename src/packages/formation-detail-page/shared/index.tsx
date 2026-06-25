'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { DASHBOARD_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

type FormationDetailGuardProps = {
  children: React.ReactNode;
};

/**
 * Redirects to dashboard when no current formation case is selected.
 */
export const FormationDetailGuard = ({ children }: FormationDetailGuardProps) => {
  const router = useRouter();
  const currentCase = useAppSelector((s) => s.currentFormationCase);

  useEffect(() => {
    if (!currentCase.id) {
      router.replace(DASHBOARD_PATH);
    }
  }, [currentCase.id, router]);

  if (!currentCase.id) {
    return null;
  }

  return <AppShell showFormationNav>{children}</AppShell>;
};

/**
 * Header showing the active case name.
 */
export const FormationCaseHeader = () => {
  const currentCase = useAppSelector((s) => s.currentFormationCase);
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{currentCase.working_name || currentCase.legal_name}</h1>
      <p className={styles.subtitle}>Pennsylvania / Philadelphia formation workspace</p>
    </div>
  );
};

export const useFormationCaseId = (): string => {
  const id = useAppSelector((s) => s.currentFormationCase.id);
  return id;
};

export const useSortedChecklistSteps = () => {
  const stepsDump = useAppSelector((s) => s.formationChecklistSteps);
  const statusDump = useAppSelector((s) => s.formationCaseStepStatus);
  const caseId = useAppSelector((s) => s.currentFormationCase.id);

  return useMemo(() => {
    const steps = Object.values(stepsDump).sort((a, b) => a.sort_order - b.sort_order);
    const statuses = Object.values(statusDump).filter((s) => s.formation_case_id === caseId);
    const statusByStepId = new Map(statuses.map((s) => [s.checklist_step_id, s]));
    return steps.map((step) => ({
      step,
      status: statusByStepId.get(step.id),
    }));
  }, [stepsDump, statusDump, caseId]);
};

const styles = {
  header: `mb-6`,
  title: `text-2xl font-semibold text-slate-900`,
  subtitle: `text-sm text-slate-500`,
};

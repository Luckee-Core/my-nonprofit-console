'use client';

import { useAppSelector } from '@/store';

/**
 * Header showing the active case name.
 */
export const FormationCaseHeader = () => {
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {currentFormationCase.working_name || currentFormationCase.legal_name}
      </h1>
      <p className={styles.subtitle}>Pennsylvania / Philadelphia formation workspace</p>
    </div>
  );
};

const styles = {
  header: `mb-6`,
  title: `text-2xl font-semibold text-slate-900`,
  subtitle: `text-sm text-slate-500`,
};

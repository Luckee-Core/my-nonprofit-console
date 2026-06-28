'use client';

import { useMemo } from 'react';
import type { FormationChecklistStepStatus } from '@/model/formation';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFormationChecklistStepThunk } from '@/store/thunks';

type StepStatusHeaderProps = {
  stepKey: string;
  title: string;
};

/**
 * Step status dropdown for workspace pane headers.
 */
export const StepStatusHeader = ({ stepKey, title }: StepStatusHeaderProps) => {
  const dispatch = useAppDispatch();
  const formationChecklistSteps = useAppSelector((s) => s.formationChecklistSteps);
  const formationCaseStepStatus = useAppSelector((s) => s.formationCaseStepStatus);
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);

  const { step, statusRow } = useMemo(() => {
    const stepRow = Object.values(formationChecklistSteps).find((s) => s.step_key === stepKey);
    const status = Object.values(formationCaseStepStatus).find(
      (row) =>
        row.formation_case_id === currentFormationCase.id &&
        row.checklist_step_id === stepRow?.id,
    );
    return { step: stepRow, statusRow: status };
  }, [formationChecklistSteps, formationCaseStepStatus, stepKey, currentFormationCase.id]);

  const handleStatusChange = (status: FormationChecklistStepStatus) => {
    if (!step || !statusRow) {
      return;
    }
    void dispatch(
      updateFormationChecklistStepThunk({
        formation_case_id: currentFormationCase.id,
        checklist_step_id: step.id,
        status,
        notes: statusRow.notes,
      }),
    );
  };

  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {step?.description ? <p className={styles.desc}>{step.description}</p> : null}
      </div>
      {statusRow ? (
        <select
          className={styles.select}
          value={statusRow.status}
          onChange={(e) => handleStatusChange(e.target.value as FormationChecklistStepStatus)}
        >
          <option value="not_started">Not started</option>
          <option value="in_progress">In progress</option>
          <option value="complete">Complete</option>
          <option value="skipped">Skipped</option>
        </select>
      ) : null}
    </div>
  );
};

const styles = {
  header: `mb-6 flex flex-wrap items-start justify-between gap-4`,
  title: `text-2xl font-semibold text-slate-900`,
  desc: `mt-1 text-sm text-slate-600`,
  select: `rounded-lg border border-slate-300 px-3 py-2 text-sm`,
};

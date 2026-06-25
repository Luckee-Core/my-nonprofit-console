'use client';

import { FormationCaseHeader, FormationDetailGuard, useFormationCaseId, useSortedChecklistSteps } from '../shared';
import { useAppDispatch } from '@/store';
import { updateFormationChecklistStepThunk } from '@/store/thunks';
import type { FormationChecklistStepStatus } from '@/model/formation';

const STATUS_OPTIONS: FormationChecklistStepStatus[] = [
  'not_started',
  'in_progress',
  'complete',
  'skipped',
];

/**
 * Checklist tab — update per-step progress.
 */
export const FormationChecklistTab = () => {
  const dispatch = useAppDispatch();
  const caseId = useFormationCaseId();
  const rows = useSortedChecklistSteps();

  const handleStatusChange = (checklistStepId: string, status: FormationChecklistStepStatus) => {
    void dispatch(
      updateFormationChecklistStepThunk({
        formation_case_id: caseId,
        checklist_step_id: checklistStepId,
        status,
      }),
    );
  };

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      <ul className={styles.list}>
        {rows.map(({ step, status }) => (
          <li key={step.id} className={styles.item}>
            <div className={styles.itemBody}>
              <p className={styles.itemTitle}>
                {step.sort_order}. {step.title}
              </p>
              <p className={styles.itemDesc}>{step.description}</p>
            </div>
            <select
              className={styles.select}
              value={status?.status ?? 'not_started'}
              onChange={(e) =>
                handleStatusChange(step.id, e.target.value as FormationChecklistStepStatus)
              }
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.replace('_', ' ')}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </FormationDetailGuard>
  );
};

const styles = {
  list: `space-y-3`,
  item: `flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-start sm:justify-between`,
  itemBody: `flex-1`,
  itemTitle: `font-medium text-slate-900`,
  itemDesc: `mt-1 text-sm text-slate-600`,
  select: `rounded border border-slate-300 px-2 py-1 text-sm`,
};

import type { FormationChecklistStepStatus } from '@/model/formation';
import type { FormationCaseStepStatus, FormationChecklistStep } from '@/model/formation';
import { STATUS_OPTIONS } from '../constants';

type ChecklistStepRowProps = {
  step: FormationChecklistStep;
  status: FormationCaseStepStatus | undefined;
  onStatusChange: (checklistStepId: string, status: FormationChecklistStepStatus) => void;
};

/**
 * One checklist step row with status select.
 */
export const ChecklistStepRow = ({ step, status, onStatusChange }: ChecklistStepRowProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemBody}>
        <p className={styles.itemTitle}>
          {step.sort_order}. {step.title}
        </p>
        <p className={styles.itemDesc}>{step.description}</p>
      </div>
      <select
        className={styles.select}
        value={status?.status ?? 'not_started'}
        onChange={(e) => onStatusChange(step.id, e.target.value as FormationChecklistStepStatus)}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt.replace('_', ' ')}
          </option>
        ))}
      </select>
    </li>
  );
};

const styles = {
  item: `flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-start sm:justify-between`,
  itemBody: `flex-1`,
  itemTitle: `font-medium text-slate-900`,
  itemDesc: `mt-1 text-sm text-slate-600`,
  select: `rounded border border-slate-300 px-2 py-1 text-sm`,
};

'use client';

import type { FormationCaseStepStatus } from '@/model/formation';
import { useAppDispatch } from '@/store';
import { updateFormationChecklistStepThunk } from '@/store/thunks';

type StepNotesFieldProps = {
  formationCaseId: string;
  checklistStepId: string;
  status: FormationCaseStepStatus | undefined;
  label?: string;
  placeholder?: string;
};

type InnerProps = StepNotesFieldProps & {
  initialNotes: string;
  stepStatus: FormationCaseStepStatus['status'];
};

const StepNotesFieldInner = ({
  formationCaseId,
  checklistStepId,
  initialNotes,
  stepStatus,
  label = 'Notes',
  placeholder = 'Add notes for this step…',
}: InnerProps) => {
  const dispatch = useAppDispatch();

  const handleBlur = (notes: string) => {
    if (notes === initialNotes) {
      return;
    }
    void dispatch(
      updateFormationChecklistStepThunk({
        formation_case_id: formationCaseId,
        checklist_step_id: checklistStepId,
        status: stepStatus,
        notes,
      }),
    );
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={`notes-${checklistStepId}`}>
        {label}
      </label>
      <textarea
        id={`notes-${checklistStepId}`}
        className={styles.textarea}
        rows={3}
        placeholder={placeholder}
        defaultValue={initialNotes}
        onBlur={(e) => handleBlur(e.target.value)}
      />
    </div>
  );
};

/**
 * Step notes field — saves to formation_case_step_status.notes on blur.
 */
export const StepNotesField = ({
  formationCaseId,
  checklistStepId,
  status,
  label,
  placeholder,
}: StepNotesFieldProps) => {
  const initialNotes = status?.notes ?? '';
  const stepStatus = status?.status ?? 'not_started';

  return (
    <StepNotesFieldInner
      key={`${checklistStepId}-${status?.updated_at ?? 'new'}`}
      formationCaseId={formationCaseId}
      checklistStepId={checklistStepId}
      status={status}
      initialNotes={initialNotes}
      stepStatus={stepStatus}
      label={label}
      placeholder={placeholder}
    />
  );
};

const styles = {
  wrap: `mt-3`,
  label: `block text-sm font-medium text-slate-700`,
  textarea: `mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm`,
};

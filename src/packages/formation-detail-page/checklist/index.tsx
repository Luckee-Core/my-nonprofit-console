'use client';

import { useMemo } from 'react';
import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { ChecklistIntroBanner } from './checklist-intro-banner';
import { ChecklistStepAccordion } from './checklist-step-accordion';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFormationChecklistStepThunk } from '@/store/thunks';
import type { FormationChecklistStepStatus } from '@/model/formation';

/**
 * Checklist tab — expandable steps with in-app forms and trackers.
 */
export const FormationChecklistTab = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationChecklistSteps = useAppSelector((s) => s.formationChecklistSteps);
  const formationCaseStepStatus = useAppSelector((s) => s.formationCaseStepStatus);
  const caseId = currentFormationCase.id;

  const rows = useMemo(() => {
    const steps = Object.values(formationChecklistSteps).sort((a, b) => a.sort_order - b.sort_order);
    const statuses = Object.values(formationCaseStepStatus).filter((s) => s.formation_case_id === caseId);
    const statusByStepId = new Map(statuses.map((s) => [s.checklist_step_id, s]));
    return steps.map((step) => ({
      step,
      status: statusByStepId.get(step.id),
    }));
  }, [formationChecklistSteps, formationCaseStepStatus, caseId]);

  const handleStatusChange = (checklistStepId: string, status: FormationChecklistStepStatus) => {
    const existing = rows.find((r) => r.step.id === checklistStepId)?.status;
    void dispatch(
      updateFormationChecklistStepThunk({
        formation_case_id: caseId,
        checklist_step_id: checklistStepId,
        status,
        notes: existing?.notes,
      }),
    );
  };

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      <ChecklistIntroBanner />
      <ul className={styles.list}>
        {rows.map(({ step, status }) => (
          <ChecklistStepAccordion
            key={step.id}
            step={step}
            status={status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </FormationDetailGuard>
  );
};

const styles = {
  list: `space-y-3`,
};

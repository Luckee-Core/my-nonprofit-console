import { requestApi } from '@/api/_shared';
import type { FormationCaseStepStatus, FormationChecklistStep } from '@/model/formation';

export type FormationChecklistBundle = {
  steps: FormationChecklistStep[];
  stepStatuses: FormationCaseStepStatus[];
};

export const getFormationChecklistForCase = (formationCaseId: string) =>
  requestApi<FormationChecklistBundle>(
    `/api/formation-checklist/get-for-case?formationCaseId=${encodeURIComponent(formationCaseId)}`,
  );

export const updateFormationChecklistStep = (body: {
  formation_case_id: string;
  checklist_step_id: string;
  status: string;
  notes?: string;
}) =>
  requestApi<FormationCaseStepStatus>('/api/formation-checklist/update-step', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

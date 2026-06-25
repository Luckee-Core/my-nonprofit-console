import { updateFormationChecklistStep } from '@/api/formation-checklist';
import { FormationCaseStepStatusActions } from '@/store/dumps/formationCaseStepStatus';
import type { FormationChecklistStepStatus } from '@/model/formation';
import type { AppThunk } from '@/store';

/**
 * Update one checklist step status for the current case.
 */
export const updateFormationChecklistStepThunk =
  (input: {
    formation_case_id: string;
    checklist_step_id: string;
    status: FormationChecklistStepStatus;
    notes?: string;
  }): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateFormationChecklistStep(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(FormationCaseStepStatusActions.upsertFormationCaseStepStatus(result.data));
    return 200;
  };

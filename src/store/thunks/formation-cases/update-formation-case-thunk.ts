import { updateFormationCase } from '@/api/formation-cases/detail';
import { ChecklistBuilderActions } from '@/store/builders/checklistBuilder';
import { CurrentFormationCaseActions } from '@/store/current/currentFormationCase';
import { FormationCasesActions } from '@/store/dumps/formationCases';
import type { FormationCase } from '@/model/formation';
import type { AppThunk } from '@/store';

type UpdateFormationCaseInput = Partial<
  Pick<
    FormationCase,
    | 'working_name'
    | 'legal_name'
    | 'mission_statement'
    | 'charitable_purpose_summary'
    | 'status'
    | 'registered_office_address'
    | 'ein'
    | 'fiscal_year_end_month'
    | 'irs_exemption_status'
  >
> & {
  id: string;
};

/**
 * Patch formation case fields and sync Redux dumps.
 */
export const updateFormationCaseThunk =
  (input: UpdateFormationCaseInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    dispatch(ChecklistBuilderActions.setCaseFieldError(null));

    const result = await updateFormationCase(input);
    if (!result.success || !result.data) {
      dispatch(
        ChecklistBuilderActions.setCaseFieldError(result.error ?? 'Failed to save nonprofit details'),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(CurrentFormationCaseActions.patchCurrentFormationCase(result.data));
    dispatch(FormationCasesActions.upsertFormationCase(result.data));
    return 200;
  };

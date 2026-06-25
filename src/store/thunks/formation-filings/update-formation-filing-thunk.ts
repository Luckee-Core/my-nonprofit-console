import { updateFormationFiling } from '@/api/formation-filings';
import { FormationFilingsActions } from '@/store/dumps/formationFilings';
import type { AppThunk } from '@/store';

/**
 * Update a filing tracker row.
 */
export const updateFormationFilingThunk =
  (input: Record<string, unknown>): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateFormationFiling(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(FormationFilingsActions.upsertFormationFiling(result.data));
    return 200;
  };

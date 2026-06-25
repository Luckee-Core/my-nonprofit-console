import { createFormationCase } from '@/api/formation-cases';
import { GettingStartedBuilderActions } from '@/store/builders/gettingStartedBuilder';
import { FormationCasesActions } from '@/store/dumps/formationCases';
import { openFormationCaseThunk } from '@/store/thunks/formation-cases/open-formation-case-thunk';
import type { AppThunk } from '@/store';

/**
 * Create a nonprofit, hydrate Redux, and open the formation bundle.
 */
export const completeGettingStartedThunk =
  (workingName: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const trimmed = workingName.trim();
    if (!trimmed) {
      dispatch(GettingStartedBuilderActions.setGettingStartedError('Enter a working name for your nonprofit.'));
      return 400;
    }

    dispatch(GettingStartedBuilderActions.setGettingStartedCompleting(true));
    dispatch(GettingStartedBuilderActions.setGettingStartedError(null));

    const result = await createFormationCase({ working_name: trimmed });
    dispatch(GettingStartedBuilderActions.setGettingStartedCompleting(false));

    if (!result.success || !result.data) {
      dispatch(
        GettingStartedBuilderActions.setGettingStartedError(
          result.error ?? 'Failed to create nonprofit',
        ),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(FormationCasesActions.upsertFormationCase(result.data));
    const openCode = await dispatch(openFormationCaseThunk(result.data.id));
    if (openCode !== 200) {
      dispatch(GettingStartedBuilderActions.setGettingStartedError('Created nonprofit but failed to open it.'));
      return openCode;
    }

    return 200;
  };

import { getSetupStatus } from '@/api/formation-cases';
import { SetupBuilderActions } from '@/store/builders/setupBuilder';
import type { AppThunk } from '@/store';

/**
 * Load Express + Supabase + Anthropic connectivity status.
 */
export const loadSetupStatusThunk = (): AppThunk<Promise<200 | 400 | 500>> => async (dispatch) => {
  dispatch(SetupBuilderActions.setSetupLoading(true));
  const result = await getSetupStatus();
  dispatch(SetupBuilderActions.setSetupLoading(false));

  if (!result.success) {
    dispatch(SetupBuilderActions.setSetupError(result.error ?? 'Failed to load setup status'));
    return result.httpStatus === 400 ? 400 : 500;
  }

  dispatch(SetupBuilderActions.setSetupStatus(result.data ?? null));
  return 200;
};

import { listFormationCases } from '@/api/formation-cases';
import { DashboardBuilderActions } from '@/store/builders/dashboardBuilder';
import { FormationCasesActions } from '@/store/dumps/formationCases';
import type { AppThunk } from '@/store';

/**
 * Load all formation cases for the dashboard.
 */
export const fetchFormationCasesThunk = (): AppThunk<Promise<200 | 400 | 500>> => async (dispatch) => {
  dispatch(DashboardBuilderActions.setDashboardLoading(true));
  const result = await listFormationCases();
  dispatch(DashboardBuilderActions.setDashboardLoading(false));

  if (!result.success || !result.data) {
    dispatch(DashboardBuilderActions.setDashboardError(result.error ?? 'Failed to load cases'));
    return result.httpStatus === 400 ? 400 : 500;
  }

  dispatch(FormationCasesActions.upsertFormationCases(result.data));
  dispatch(DashboardBuilderActions.setDashboardError(null));
  return 200;
};

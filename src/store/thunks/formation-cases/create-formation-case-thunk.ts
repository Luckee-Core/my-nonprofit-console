import { createFormationCase } from '@/api/formation-cases';
import { DashboardBuilderActions } from '@/store/builders/dashboardBuilder';
import { FormationCasesActions } from '@/store/dumps/formationCases';
import type { AppThunk } from '@/store';

/**
 * Create a new formation case from the dashboard.
 */
export const createFormationCaseThunk =
  (workingName: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const trimmed = workingName.trim();
    if (!trimmed) {
      dispatch(DashboardBuilderActions.setDashboardError('Working name is required'));
      return 400;
    }

    dispatch(DashboardBuilderActions.setDashboardCreating(true));
    const result = await createFormationCase({ working_name: trimmed });
    dispatch(DashboardBuilderActions.setDashboardCreating(false));

    if (!result.success || !result.data) {
      dispatch(DashboardBuilderActions.setDashboardError(result.error ?? 'Failed to create case'));
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(FormationCasesActions.upsertFormationCase(result.data));
    dispatch(DashboardBuilderActions.setDashboardError(null));
    return 200;
  };

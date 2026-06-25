import { getFormationCaseById } from '@/api/formation-cases/detail';
import { CurrentFormationCaseActions } from '@/store/current/currentFormationCase';
import { FormationBoardMembersActions } from '@/store/dumps/formationBoardMembers';
import { FormationCaseStepStatusActions } from '@/store/dumps/formationCaseStepStatus';
import { FormationCasesActions } from '@/store/dumps/formationCases';
import { FormationChecklistStepsActions } from '@/store/dumps/formationChecklistSteps';
import { FormationDocumentsActions } from '@/store/dumps/formationDocuments';
import { FormationFilingsActions } from '@/store/dumps/formationFilings';
import { FormationOfficersActions } from '@/store/dumps/formationOfficers';
import type { AppThunk } from '@/store';

/**
 * Load a formation case bundle and hydrate Redux dumps.
 */
export const openFormationCaseThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getFormationCaseById(id);
    if (!result.success || !result.data) {
      return result.httpStatus === 404 ? 400 : 500;
    }

    const bundle = result.data;
    dispatch(CurrentFormationCaseActions.setCurrentFormationCase(bundle.formationCase));
    dispatch(FormationCasesActions.upsertFormationCase(bundle.formationCase));
    dispatch(FormationChecklistStepsActions.setFormationChecklistSteps(bundle.checklistSteps));
    dispatch(FormationCaseStepStatusActions.upsertFormationCaseStepStatuses(bundle.stepStatuses));
    dispatch(FormationBoardMembersActions.upsertFormationBoardMembers(bundle.boardMembers));
    dispatch(FormationOfficersActions.upsertFormationOfficers(bundle.officers));
    dispatch(FormationDocumentsActions.upsertFormationDocuments(bundle.documents));
    dispatch(FormationFilingsActions.upsertFormationFilings(bundle.filings));
    return 200;
  };

import {
  createFormationBoardMember,
  deleteFormationBoardMember,
  upsertFormationOfficer,
} from '@/api/formation-board';
import { FormationBoardMembersActions } from '@/store/dumps/formationBoardMembers';
import { FormationOfficersActions } from '@/store/dumps/formationOfficers';
import type { AppThunk } from '@/store';

export const createFormationBoardMemberThunk =
  (input: {
    formation_case_id: string;
    full_name: string;
    email?: string;
    is_incorporator?: boolean;
  }): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createFormationBoardMember(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(FormationBoardMembersActions.upsertFormationBoardMember(result.data));
    return 200;
  };

export const deleteFormationBoardMemberThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteFormationBoardMember(id);
    if (!result.success) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(FormationBoardMembersActions.removeFormationBoardMember(id));
    return 200;
  };

export const upsertFormationOfficerThunk =
  (input: {
    formation_case_id: string;
    role: string;
    full_name: string;
    email?: string;
  }): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await upsertFormationOfficer(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(FormationOfficersActions.upsertFormationOfficer(result.data));
    return 200;
  };

import { updateFormationBoardMember } from '@/api/formation-board';
import { CurrentFormationBoardMemberActions } from '@/store/current/currentFormationBoardMember';
import { FormationBoardMembersActions } from '@/store/dumps/formationBoardMembers';
import type { FormationBoardMember } from '@/model/formation';
import type { AppThunk } from '@/store';

/**
 * Open a board member for the detail page.
 */
export const openFormationBoardMemberThunk =
  (member: FormationBoardMember): AppThunk =>
  (dispatch) => {
    dispatch(CurrentFormationBoardMemberActions.setCurrentFormationBoardMember(member));
  };

/**
 * Save board member edits from the detail page.
 */
export const updateFormationBoardMemberThunk =
  (patch: {
    full_name?: string;
    email?: string;
    phone?: string;
    address?: Record<string, string>;
    is_incorporator?: boolean;
  }): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentFormationBoardMember;
    if (!current.id) {
      return 400;
    }

    const result = await updateFormationBoardMember({ id: current.id, ...patch });
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(CurrentFormationBoardMemberActions.setCurrentFormationBoardMember(result.data));
    dispatch(FormationBoardMembersActions.upsertFormationBoardMember(result.data));
    return 200;
  };

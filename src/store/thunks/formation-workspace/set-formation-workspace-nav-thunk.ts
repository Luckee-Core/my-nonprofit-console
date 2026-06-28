import { FormationWorkspaceBuilderActions } from '@/store/builders/formationWorkspaceBuilder';
import type { WorkspaceNavKey } from '@/model/formation-workspace';
import type { AppThunk } from '@/store';

/**
 * Set the active formation workspace sidebar nav key.
 */
export const setFormationWorkspaceNavThunk =
  (navKey: WorkspaceNavKey): AppThunk =>
  (dispatch) => {
    dispatch(FormationWorkspaceBuilderActions.setFormationWorkspaceNavKey(navKey));
  };

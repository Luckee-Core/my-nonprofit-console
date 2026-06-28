import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WorkspaceNavKey } from '@/model/formation-workspace';
import { getDefaultWorkspaceNavKey } from '@/model/formation-workspace';

type FormationWorkspaceBuilderState = {
  activeNavKey: WorkspaceNavKey;
  activeStudioDomainTab: string;
};

const initialState: FormationWorkspaceBuilderState = {
  activeNavKey: getDefaultWorkspaceNavKey(),
  activeStudioDomainTab: '',
};

const formationWorkspaceBuilderSlice = createSlice({
  name: 'formationWorkspaceBuilder',
  initialState,
  reducers: {
    setFormationWorkspaceNavKey: (state, action: PayloadAction<WorkspaceNavKey>) => {
      state.activeNavKey = action.payload;
    },
    setFormationWorkspaceStudioTab: (state, action: PayloadAction<string>) => {
      state.activeStudioDomainTab = action.payload;
    },
    resetFormationWorkspaceBuilder: () => initialState,
  },
});

export const FormationWorkspaceBuilderActions = formationWorkspaceBuilderSlice.actions;
export default formationWorkspaceBuilderSlice.reducer;

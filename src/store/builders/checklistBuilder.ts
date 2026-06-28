import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ChecklistBuilderState = {
  expandedStepId: string | null;
  savingStepId: string | null;
  caseFieldError: string | null;
};

const initialState: ChecklistBuilderState = {
  expandedStepId: null,
  savingStepId: null,
  caseFieldError: null,
};

const checklistBuilderSlice = createSlice({
  name: 'checklistBuilder',
  initialState,
  reducers: {
    setExpandedStepId: (state, action: PayloadAction<string | null>) => {
      state.expandedStepId = action.payload;
    },
    setSavingStepId: (state, action: PayloadAction<string | null>) => {
      state.savingStepId = action.payload;
    },
    setCaseFieldError: (state, action: PayloadAction<string | null>) => {
      state.caseFieldError = action.payload;
    },
    resetChecklistBuilder: () => initialState,
  },
});

export const ChecklistBuilderActions = checklistBuilderSlice.actions;
export default checklistBuilderSlice.reducer;

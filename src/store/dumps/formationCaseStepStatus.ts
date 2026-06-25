import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationCaseStepStatus } from '@/model/formation';

type InitialState = Record<string, FormationCaseStepStatus>;

const formationCaseStepStatusSlice = createSlice({
  name: 'formationCaseStepStatus',
  initialState: {} as InitialState,
  reducers: {
    upsertFormationCaseStepStatuses: (state, action: PayloadAction<FormationCaseStepStatus[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationCaseStepStatus: (state, action: PayloadAction<FormationCaseStepStatus>) => {
      state[action.payload.id] = action.payload;
    },
    resetFormationCaseStepStatus: () => ({} as InitialState),
  },
});

export const FormationCaseStepStatusActions = formationCaseStepStatusSlice.actions;
export default formationCaseStepStatusSlice.reducer;

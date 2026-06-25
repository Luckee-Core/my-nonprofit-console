import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationChecklistStep } from '@/model/formation';

type InitialState = Record<string, FormationChecklistStep>;

const initialState: InitialState = {};

const formationChecklistStepsSlice = createSlice({
  name: 'formationChecklistSteps',
  initialState,
  reducers: {
    setFormationChecklistSteps: (state, action: PayloadAction<FormationChecklistStep[]>) => {
      for (const step of action.payload) {
        state[step.id] = step;
      }
    },
    resetFormationChecklistSteps: () => initialState,
  },
});

export const FormationChecklistStepsActions = formationChecklistStepsSlice.actions;
export default formationChecklistStepsSlice.reducer;

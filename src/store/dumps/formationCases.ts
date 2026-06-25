import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationCase } from '@/model/formation';

type InitialState = Record<string, FormationCase>;

const initialState: InitialState = {};

const formationCasesSlice = createSlice({
  name: 'formationCases',
  initialState,
  reducers: {
    upsertFormationCases: (state, action: PayloadAction<FormationCase[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationCase: (state, action: PayloadAction<FormationCase>) => {
      state[action.payload.id] = action.payload;
    },
    resetFormationCases: () => initialState,
  },
});

export const FormationCasesActions = formationCasesSlice.actions;
export default formationCasesSlice.reducer;

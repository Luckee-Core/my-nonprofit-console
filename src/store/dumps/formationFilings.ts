import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationFiling } from '@/model/formation';

type InitialState = Record<string, FormationFiling>;

const formationFilingsSlice = createSlice({
  name: 'formationFilings',
  initialState: {} as InitialState,
  reducers: {
    upsertFormationFilings: (state, action: PayloadAction<FormationFiling[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationFiling: (state, action: PayloadAction<FormationFiling>) => {
      state[action.payload.id] = action.payload;
    },
    resetFormationFilings: () => ({} as InitialState),
  },
});

export const FormationFilingsActions = formationFilingsSlice.actions;
export default formationFilingsSlice.reducer;

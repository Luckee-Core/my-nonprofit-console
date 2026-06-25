import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationOfficer } from '@/model/formation';

type InitialState = Record<string, FormationOfficer>;

const formationOfficersSlice = createSlice({
  name: 'formationOfficers',
  initialState: {} as InitialState,
  reducers: {
    upsertFormationOfficers: (state, action: PayloadAction<FormationOfficer[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationOfficer: (state, action: PayloadAction<FormationOfficer>) => {
      state[action.payload.id] = action.payload;
    },
    resetFormationOfficers: () => ({} as InitialState),
  },
});

export const FormationOfficersActions = formationOfficersSlice.actions;
export default formationOfficersSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationContextFact } from '@/model/formation-workspace';

type InitialState = Record<string, FormationContextFact>;

const initialState: InitialState = {};

const formationContextFactsSlice = createSlice({
  name: 'formationContextFacts',
  initialState,
  reducers: {
    setFormationContextFacts: (state, action: PayloadAction<FormationContextFact[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationContextFact: (state, action: PayloadAction<FormationContextFact>) => {
      state[action.payload.id] = action.payload;
    },
    removeFormationContextFact: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetFormationContextFacts: () => initialState,
  },
});

export const FormationContextFactsActions = formationContextFactsSlice.actions;
export default formationContextFactsSlice.reducer;

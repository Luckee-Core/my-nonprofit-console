import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationDocument } from '@/model/formation';

type InitialState = Record<string, FormationDocument>;

const formationDocumentsSlice = createSlice({
  name: 'formationDocuments',
  initialState: {} as InitialState,
  reducers: {
    upsertFormationDocuments: (state, action: PayloadAction<FormationDocument[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationDocument: (state, action: PayloadAction<FormationDocument>) => {
      state[action.payload.id] = action.payload;
    },
    resetFormationDocuments: () => ({} as InitialState),
  },
});

export const FormationDocumentsActions = formationDocumentsSlice.actions;
export default formationDocumentsSlice.reducer;

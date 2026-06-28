import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationContextSection } from '@/model/formation-workspace';

type InitialState = Record<string, FormationContextSection>;

const initialState: InitialState = {};

const formationContextSectionsSlice = createSlice({
  name: 'formationContextSections',
  initialState,
  reducers: {
    setFormationContextSections: (state, action: PayloadAction<FormationContextSection[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    resetFormationContextSections: () => initialState,
  },
});

export const FormationContextSectionsActions = formationContextSectionsSlice.actions;
export default formationContextSectionsSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FormationContextBuilderState = {
  isLoading: boolean;
  isSaving: boolean;
  lastError: string | null;
};

const initialState: FormationContextBuilderState = {
  isLoading: false,
  isSaving: false,
  lastError: null,
};

const formationContextBuilderSlice = createSlice({
  name: 'formationContextBuilder',
  initialState,
  reducers: {
    setFormationContextLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFormationContextSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setFormationContextError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
  },
});

export const FormationContextBuilderActions = formationContextBuilderSlice.actions;
export default formationContextBuilderSlice.reducer;

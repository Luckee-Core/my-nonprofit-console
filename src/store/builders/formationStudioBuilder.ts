import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FormationStudioBuilderState = {
  postingDomain: string | null;
  applyingDomain: string | null;
  lastError: string | null;
};

const initialState: FormationStudioBuilderState = {
  postingDomain: null,
  applyingDomain: null,
  lastError: null,
};

const formationStudioBuilderSlice = createSlice({
  name: 'formationStudioBuilder',
  initialState,
  reducers: {
    setFormationStudioPosting: (state, action: PayloadAction<string | null>) => {
      state.postingDomain = action.payload;
    },
    setFormationStudioApplying: (state, action: PayloadAction<string | null>) => {
      state.applyingDomain = action.payload;
    },
    setFormationStudioError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
  },
});

export const FormationStudioBuilderActions = formationStudioBuilderSlice.actions;
export default formationStudioBuilderSlice.reducer;

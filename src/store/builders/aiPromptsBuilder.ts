import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AiPromptsBuilderState = {
  isLoading: boolean;
  isSaving: boolean;
  lastError: string | null;
};

const initialState: AiPromptsBuilderState = {
  isLoading: false,
  isSaving: false,
  lastError: null,
};

const aiPromptsBuilderSlice = createSlice({
  name: 'aiPromptsBuilder',
  initialState,
  reducers: {
    setAiPromptsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAiPromptsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setAiPromptsError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
  },
});

export const AiPromptsBuilderActions = aiPromptsBuilderSlice.actions;
export default aiPromptsBuilderSlice.reducer;

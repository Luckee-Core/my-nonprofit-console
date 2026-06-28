import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationAiPrompt } from '@/model/formation-workspace';

const emptyPrompt: FormationAiPrompt = {
  id: '',
  flow: '',
  name: '',
  version: 0,
  system_prompt: '',
  is_active: false,
  created_at: '',
};

const currentAiPromptSlice = createSlice({
  name: 'currentAiPrompt',
  initialState: emptyPrompt,
  reducers: {
    setCurrentAiPrompt: (_state, action: PayloadAction<FormationAiPrompt>) => action.payload,
    patchCurrentAiPrompt: (state, action: PayloadAction<Partial<FormationAiPrompt>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentAiPrompt: () => emptyPrompt,
  },
});

export const CurrentAiPromptActions = currentAiPromptSlice.actions;
export default currentAiPromptSlice.reducer;

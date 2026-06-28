import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationAiPrompt } from '@/model/formation-workspace';

type InitialState = Record<string, FormationAiPrompt>;

const initialState: InitialState = {};

const aiPromptsSlice = createSlice({
  name: 'aiPrompts',
  initialState,
  reducers: {
    setAiPrompts: (state, action: PayloadAction<FormationAiPrompt[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertAiPrompt: (state, action: PayloadAction<FormationAiPrompt>) => {
      state[action.payload.id] = action.payload;
    },
    resetAiPrompts: () => initialState,
  },
});

export const AiPromptsActions = aiPromptsSlice.actions;
export default aiPromptsSlice.reducer;

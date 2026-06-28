import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationStudioChatMessage } from '@/model/formation-workspace';

type StudioMessagesState = Record<string, FormationStudioChatMessage[]>;

const initialState: StudioMessagesState = {};

const formationStudiosSlice = createSlice({
  name: 'formationStudios',
  initialState,
  reducers: {
    setFormationStudioMessages: (
      state,
      action: PayloadAction<{ key: string; messages: FormationStudioChatMessage[] }>,
    ) => {
      state[action.payload.key] = action.payload.messages;
    },
    appendFormationStudioMessages: (
      state,
      action: PayloadAction<{ key: string; messages: FormationStudioChatMessage[] }>,
    ) => {
      state[action.payload.key] = action.payload.messages;
    },
    resetFormationStudios: () => initialState,
  },
});

export const FormationStudiosActions = formationStudiosSlice.actions;
export default formationStudiosSlice.reducer;

export const formationStudioKey = (domain: string, caseId: string) => `${domain}:${caseId}`;

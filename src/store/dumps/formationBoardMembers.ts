import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationBoardMember } from '@/model/formation';

type InitialState = Record<string, FormationBoardMember>;

const formationBoardMembersSlice = createSlice({
  name: 'formationBoardMembers',
  initialState: {} as InitialState,
  reducers: {
    upsertFormationBoardMembers: (state, action: PayloadAction<FormationBoardMember[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertFormationBoardMember: (state, action: PayloadAction<FormationBoardMember>) => {
      state[action.payload.id] = action.payload;
    },
    removeFormationBoardMember: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetFormationBoardMembers: () => ({} as InitialState),
  },
});

export const FormationBoardMembersActions = formationBoardMembersSlice.actions;
export default formationBoardMembersSlice.reducer;

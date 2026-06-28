import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationBoardMember } from '@/model/formation';

const emptyMember: FormationBoardMember = {
  id: '',
  formation_case_id: '',
  full_name: '',
  email: '',
  phone: '',
  address: {},
  is_incorporator: true,
  sort_order: 0,
  created_at: '',
  updated_at: '',
};

const currentFormationBoardMemberSlice = createSlice({
  name: 'currentFormationBoardMember',
  initialState: emptyMember,
  reducers: {
    setCurrentFormationBoardMember: (_state, action: PayloadAction<FormationBoardMember>) =>
      action.payload,
    patchCurrentFormationBoardMember: (
      state,
      action: PayloadAction<Partial<FormationBoardMember>>,
    ) => ({ ...state, ...action.payload }),
    resetCurrentFormationBoardMember: () => emptyMember,
  },
});

export const CurrentFormationBoardMemberActions = currentFormationBoardMemberSlice.actions;
export default currentFormationBoardMemberSlice.reducer;

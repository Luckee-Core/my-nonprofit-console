import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationCase } from '@/model/formation';

const emptyCase: FormationCase = {
  id: '',
  working_name: '',
  legal_name: '',
  mission_statement: '',
  charitable_purpose_summary: '',
  status: 'draft',
  registered_office_address: {},
  ein: '',
  fiscal_year_end_month: null,
  irs_exemption_status: 'not_started',
  created_at: '',
  updated_at: '',
};

const currentFormationCaseSlice = createSlice({
  name: 'currentFormationCase',
  initialState: emptyCase,
  reducers: {
    setCurrentFormationCase: (_state, action: PayloadAction<FormationCase>) => action.payload,
    patchCurrentFormationCase: (state, action: PayloadAction<Partial<FormationCase>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentFormationCase: () => emptyCase,
  },
});

export const CurrentFormationCaseActions = currentFormationCaseSlice.actions;
export default currentFormationCaseSlice.reducer;

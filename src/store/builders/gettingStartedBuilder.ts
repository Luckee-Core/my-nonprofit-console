import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type GettingStartedStep = 'welcome' | 'connect' | 'name';

type GettingStartedBuilderState = {
  activeStep: GettingStartedStep;
  checklistIntroDismissed: boolean;
  isCompleting: boolean;
  lastError: string | null;
};

const initialState: GettingStartedBuilderState = {
  activeStep: 'welcome',
  checklistIntroDismissed: false,
  isCompleting: false,
  lastError: null,
};

const gettingStartedBuilderSlice = createSlice({
  name: 'gettingStartedBuilder',
  initialState,
  reducers: {
    setGettingStartedStep: (state, action: PayloadAction<GettingStartedStep>) => {
      state.activeStep = action.payload;
      state.lastError = null;
    },
    setGettingStartedCompleting: (state, action: PayloadAction<boolean>) => {
      state.isCompleting = action.payload;
    },
    setGettingStartedError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
    setChecklistIntroDismissed: (state, action: PayloadAction<boolean>) => {
      state.checklistIntroDismissed = action.payload;
    },
    resetGettingStartedBuilder: () => initialState,
  },
});

export const GettingStartedBuilderActions = gettingStartedBuilderSlice.actions;
export default gettingStartedBuilderSlice.reducer;

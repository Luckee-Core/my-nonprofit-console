import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SetupStatus } from '@/model/formation';

type SetupBuilderState = {
  isLoading: boolean;
  lastStatus: SetupStatus | null;
  lastError: string | null;
};

const initialState: SetupBuilderState = {
  isLoading: false,
  lastStatus: null,
  lastError: null,
};

const setupBuilderSlice = createSlice({
  name: 'setupBuilder',
  initialState,
  reducers: {
    setSetupLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSetupStatus: (state, action: PayloadAction<SetupStatus | null>) => {
      state.lastStatus = action.payload;
      state.lastError = null;
    },
    setSetupError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
    resetSetupBuilder: () => initialState,
  },
});

export const SetupBuilderActions = setupBuilderSlice.actions;
export default setupBuilderSlice.reducer;

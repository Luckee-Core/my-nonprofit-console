import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type DashboardBuilderState = {
  isLoading: boolean;
  isCreating: boolean;
  lastError: string | null;
};

const initialState: DashboardBuilderState = {
  isLoading: false,
  isCreating: false,
  lastError: null,
};

const dashboardBuilderSlice = createSlice({
  name: 'dashboardBuilder',
  initialState,
  reducers: {
    setDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDashboardCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    setDashboardError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
  },
});

export const DashboardBuilderActions = dashboardBuilderSlice.actions;
export default dashboardBuilderSlice.reducer;

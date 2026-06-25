import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormationDocumentType } from '@/model/formation';

type FormationWizardBuilderState = {
  isGenerating: boolean;
  activeDocumentType: FormationDocumentType | null;
  lastError: string | null;
};

const initialState: FormationWizardBuilderState = {
  isGenerating: false,
  activeDocumentType: null,
  lastError: null,
};

const formationWizardBuilderSlice = createSlice({
  name: 'formationWizardBuilder',
  initialState,
  reducers: {
    setFormationGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    setActiveDocumentType: (state, action: PayloadAction<FormationDocumentType | null>) => {
      state.activeDocumentType = action.payload;
    },
    setFormationWizardError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
    resetFormationWizardBuilder: () => initialState,
  },
});

export const FormationWizardBuilderActions = formationWizardBuilderSlice.actions;
export default formationWizardBuilderSlice.reducer;

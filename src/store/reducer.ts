import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import dashboardBuilderReducer from './builders/dashboardBuilder';
import formationWizardBuilderReducer from './builders/formationWizardBuilder';
import setupBuilderReducer from './builders/setupBuilder';
import currentFormationCaseReducer from './current/currentFormationCase';
import formationBoardMembersReducer from './dumps/formationBoardMembers';
import formationCaseStepStatusReducer from './dumps/formationCaseStepStatus';
import formationCasesReducer from './dumps/formationCases';
import formationChecklistStepsReducer from './dumps/formationChecklistSteps';
import formationDocumentsReducer from './dumps/formationDocuments';
import formationFilingsReducer from './dumps/formationFilings';
import formationOfficersReducer from './dumps/formationOfficers';

export const rootReducer = combineReducers({
  app: appReducer,
  formationCases: formationCasesReducer,
  formationChecklistSteps: formationChecklistStepsReducer,
  formationCaseStepStatus: formationCaseStepStatusReducer,
  formationBoardMembers: formationBoardMembersReducer,
  formationOfficers: formationOfficersReducer,
  formationDocuments: formationDocumentsReducer,
  formationFilings: formationFilingsReducer,
  currentFormationCase: currentFormationCaseReducer,
  dashboardBuilder: dashboardBuilderReducer,
  formationWizardBuilder: formationWizardBuilderReducer,
  setupBuilder: setupBuilderReducer,
});

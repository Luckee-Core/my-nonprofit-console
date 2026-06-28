import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import dashboardBuilderReducer from './builders/dashboardBuilder';
import gettingStartedBuilderReducer from './builders/gettingStartedBuilder';
import checklistBuilderReducer from './builders/checklistBuilder';
import formationWizardBuilderReducer from './builders/formationWizardBuilder';
import formationWorkspaceBuilderReducer from './builders/formationWorkspaceBuilder';
import formationContextBuilderReducer from './builders/formationContextBuilder';
import formationStudioBuilderReducer from './builders/formationStudioBuilder';
import aiPromptsBuilderReducer from './builders/aiPromptsBuilder';
import setupBuilderReducer from './builders/setupBuilder';
import currentFormationCaseReducer from './current/currentFormationCase';
import currentFormationBoardMemberReducer from './current/currentFormationBoardMember';
import currentAiPromptReducer from './current/currentAiPrompt';
import formationBoardMembersReducer from './dumps/formationBoardMembers';
import formationContextSectionsReducer from './dumps/formationContextSections';
import formationContextFactsReducer from './dumps/formationContextFacts';
import formationStudiosReducer from './dumps/formationStudios';
import aiPromptsReducer from './dumps/aiPrompts';
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
  formationContextSections: formationContextSectionsReducer,
  formationContextFacts: formationContextFactsReducer,
  formationStudios: formationStudiosReducer,
  aiPrompts: aiPromptsReducer,
  currentFormationCase: currentFormationCaseReducer,
  currentFormationBoardMember: currentFormationBoardMemberReducer,
  currentAiPrompt: currentAiPromptReducer,
  dashboardBuilder: dashboardBuilderReducer,
  gettingStartedBuilder: gettingStartedBuilderReducer,
  checklistBuilder: checklistBuilderReducer,
  formationWizardBuilder: formationWizardBuilderReducer,
  formationWorkspaceBuilder: formationWorkspaceBuilderReducer,
  formationContextBuilder: formationContextBuilderReducer,
  formationStudioBuilder: formationStudioBuilderReducer,
  aiPromptsBuilder: aiPromptsBuilderReducer,
  setupBuilder: setupBuilderReducer,
});

import {
  createFormationAiPromptVersion,
  getFormationAiPromptById,
  listFormationAiPrompts,
} from '@/api/formation-ai-prompts';
import { AiPromptsBuilderActions } from '@/store/builders/aiPromptsBuilder';
import { CurrentAiPromptActions } from '@/store/current/currentAiPrompt';
import { AiPromptsActions } from '@/store/dumps/aiPrompts';
import type { FormationAiPrompt } from '@/model/formation-workspace';
import type { AppThunk } from '@/store';

/**
 * Load all formation AI prompts.
 */
export const loadAiPromptsThunk = (): AppThunk<Promise<200 | 400 | 500>> => async (dispatch) => {
  dispatch(AiPromptsBuilderActions.setAiPromptsLoading(true));
  const result = await listFormationAiPrompts();
  dispatch(AiPromptsBuilderActions.setAiPromptsLoading(false));

  if (!result.success || !result.data) {
    dispatch(AiPromptsBuilderActions.setAiPromptsError(result.error ?? 'Failed to load prompts'));
    return result.httpStatus === 400 ? 400 : 500;
  }

  dispatch(AiPromptsActions.setAiPrompts(result.data));
  dispatch(AiPromptsBuilderActions.setAiPromptsError(null));
  return 200;
};

/**
 * Set current AI prompt and optionally refresh from API.
 */
export const setCurrentAiPromptThunk =
  (prompt: FormationAiPrompt): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    dispatch(CurrentAiPromptActions.setCurrentAiPrompt(prompt));
    const result = await getFormationAiPromptById(prompt.id);
    if (result.success && result.data) {
      dispatch(CurrentAiPromptActions.setCurrentAiPrompt(result.data));
      dispatch(AiPromptsActions.upsertAiPrompt(result.data));
      return 200;
    }
    return result.httpStatus === 404 ? 400 : 500;
  };

/**
 * Save a new AI prompt version from the detail editor.
 */
export const saveAiPromptVersionThunk =
  (): AppThunk<Promise<200 | 400 | 500>> => async (dispatch, getState) => {
    const current = getState().currentAiPrompt;
    if (!current.flow || !current.system_prompt.trim()) {
      return 400;
    }

    dispatch(AiPromptsBuilderActions.setAiPromptsSaving(true));
    const result = await createFormationAiPromptVersion({
      flow: current.flow,
      name: current.name || `${current.flow}-v${current.version + 1}`,
      system_prompt: current.system_prompt,
    });
    dispatch(AiPromptsBuilderActions.setAiPromptsSaving(false));

    if (!result.success || !result.data) {
      dispatch(AiPromptsBuilderActions.setAiPromptsError(result.error ?? 'Failed to save prompt'));
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(AiPromptsActions.upsertAiPrompt(result.data));
    dispatch(CurrentAiPromptActions.setCurrentAiPrompt(result.data));
    dispatch(AiPromptsBuilderActions.setAiPromptsError(null));
    return 200;
  };

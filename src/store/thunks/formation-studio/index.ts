import {
  getFormationStudioLedger,
  postFormationStudioApply,
  postFormationStudioMessage,
} from '@/api/formation-studio';
import { FormationStudioBuilderActions } from '@/store/builders/formationStudioBuilder';
import {
  FormationStudiosActions,
  formationStudioKey,
} from '@/store/dumps/formationStudios';
import type { FormationStudioDomain } from '@/model/formation-workspace';
import type { AppThunk } from '@/store';
import { openFormationCaseThunk } from '../formation-cases/open-formation-case-thunk';

/**
 * Load studio chat ledger for a domain and case.
 */
export const loadFormationStudioLedgerThunk =
  (domain: FormationStudioDomain, caseId: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getFormationStudioLedger(domain, caseId);
    if (!result.success || !result.data) {
      dispatch(
        FormationStudioBuilderActions.setFormationStudioError(
          result.error ?? 'Failed to load studio chat',
        ),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(
      FormationStudiosActions.setFormationStudioMessages({
        key: formationStudioKey(domain, caseId),
        messages: result.data.messages,
      }),
    );
    dispatch(FormationStudioBuilderActions.setFormationStudioError(null));
    return 200;
  };

/**
 * Send a studio coach message.
 */
export const sendFormationStudioMessageThunk =
  (domain: FormationStudioDomain, content: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const caseId = getState().currentFormationCase.id;
    if (!caseId) {
      return 400;
    }

    dispatch(FormationStudioBuilderActions.setFormationStudioPosting(domain));
    const result = await postFormationStudioMessage(domain, {
      formation_case_id: caseId,
      content,
    });
    dispatch(FormationStudioBuilderActions.setFormationStudioPosting(null));

    if (!result.success || !result.data) {
      dispatch(
        FormationStudioBuilderActions.setFormationStudioError(
          result.error ?? 'Failed to send message',
        ),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(
      FormationStudiosActions.appendFormationStudioMessages({
        key: formationStudioKey(domain, caseId),
        messages: result.data.messages,
      }),
    );
    dispatch(FormationStudioBuilderActions.setFormationStudioError(null));
    return 200;
  };

/**
 * Apply a studio suggestion to the case or document.
 */
export const applyFormationStudioSuggestionThunk =
  (domain: FormationStudioDomain, suggestedValue: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const caseId = getState().currentFormationCase.id;
    if (!caseId || !suggestedValue.trim()) {
      return 400;
    }

    dispatch(FormationStudioBuilderActions.setFormationStudioApplying(domain));
    const result = await postFormationStudioApply(domain, {
      formation_case_id: caseId,
      suggested_value: suggestedValue,
    });
    dispatch(FormationStudioBuilderActions.setFormationStudioApplying(null));

    if (!result.success) {
      dispatch(
        FormationStudioBuilderActions.setFormationStudioError(
          result.error ?? 'Failed to apply suggestion',
        ),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    await dispatch(openFormationCaseThunk(caseId));
    dispatch(FormationStudioBuilderActions.setFormationStudioError(null));
    return 200;
  };

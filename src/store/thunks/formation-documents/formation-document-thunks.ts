import { generateFormationDocument, updateFormationDocument } from '@/api/formation-documents';
import { FormationWizardBuilderActions } from '@/store/builders/formationWizardBuilder';
import { CurrentFormationCaseActions } from '@/store/current/currentFormationCase';
import { FormationCasesActions } from '@/store/dumps/formationCases';
import { FormationDocumentsActions } from '@/store/dumps/formationDocuments';
import type { FormationDocumentType } from '@/model/formation';
import type { AppThunk } from '@/store';

/**
 * Generate an AI draft for a formation document.
 */
export const generateFormationDocumentThunk =
  (formationCaseId: string, documentType: FormationDocumentType): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    dispatch(FormationWizardBuilderActions.setFormationGenerating(true));
    dispatch(FormationWizardBuilderActions.setActiveDocumentType(documentType));
    dispatch(FormationWizardBuilderActions.setFormationWizardError(null));

    const result = await generateFormationDocument({
      formation_case_id: formationCaseId,
      document_type: documentType,
    });

    dispatch(FormationWizardBuilderActions.setFormationGenerating(false));
    dispatch(FormationWizardBuilderActions.setActiveDocumentType(null));

    if (!result.success || !result.data) {
      dispatch(FormationWizardBuilderActions.setFormationWizardError(result.error ?? 'Generation failed'));
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(FormationDocumentsActions.upsertFormationDocument(result.data.document));

    if (result.data.mission_statement || result.data.charitable_purpose_summary) {
      dispatch(
        CurrentFormationCaseActions.patchCurrentFormationCase({
          ...(result.data.mission_statement ? { mission_statement: result.data.mission_statement } : {}),
          ...(result.data.charitable_purpose_summary
            ? { charitable_purpose_summary: result.data.charitable_purpose_summary }
            : {}),
        }),
      );
      const current = getState().currentFormationCase;
      if (current.id) {
        dispatch(FormationCasesActions.upsertFormationCase(current));
      }
    }

    return 200;
  };

/**
 * Mark a document as reviewed or update its content.
 */
export const updateFormationDocumentThunk =
  (input: { id: string; content?: string; status?: string }): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateFormationDocument(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(FormationDocumentsActions.upsertFormationDocument(result.data));
    return 200;
  };

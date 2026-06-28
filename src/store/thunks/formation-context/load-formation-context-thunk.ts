import { getFormationContext } from '@/api/formation-context';
import { FormationContextBuilderActions } from '@/store/builders/formationContextBuilder';
import { FormationContextFactsActions } from '@/store/dumps/formationContextFacts';
import { FormationContextSectionsActions } from '@/store/dumps/formationContextSections';
import type { AppThunk } from '@/store';

/**
 * Load formation context sections and facts for a case.
 */
export const loadFormationContextThunk =
  (formationCaseId: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    dispatch(FormationContextBuilderActions.setFormationContextLoading(true));
    const result = await getFormationContext(formationCaseId);
    dispatch(FormationContextBuilderActions.setFormationContextLoading(false));

    if (!result.success || !result.data) {
      dispatch(
        FormationContextBuilderActions.setFormationContextError(
          result.error ?? 'Failed to load facts',
        ),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(FormationContextSectionsActions.setFormationContextSections(result.data.sections));
    dispatch(FormationContextFactsActions.setFormationContextFacts(result.data.facts));
    dispatch(FormationContextBuilderActions.setFormationContextError(null));
    return 200;
  };

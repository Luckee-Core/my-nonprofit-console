import { upsertFormationContextFact } from '@/api/formation-context';
import { FormationContextBuilderActions } from '@/store/builders/formationContextBuilder';
import { FormationContextFactsActions } from '@/store/dumps/formationContextFacts';
import type { AppThunk } from '@/store';

/**
 * Upsert one formation context fact.
 */
export const saveFormationContextFactThunk =
  (input: {
    formation_case_id: string;
    section_id: string;
    fact_key: string;
    fact_value: string;
  }): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    dispatch(FormationContextBuilderActions.setFormationContextSaving(true));
    const result = await upsertFormationContextFact(input);
    dispatch(FormationContextBuilderActions.setFormationContextSaving(false));

    if (!result.success || !result.data) {
      dispatch(
        FormationContextBuilderActions.setFormationContextError(
          result.error ?? 'Failed to save fact',
        ),
      );
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(FormationContextFactsActions.upsertFormationContextFact(result.data));
    dispatch(FormationContextBuilderActions.setFormationContextError(null));
    return 200;
  };

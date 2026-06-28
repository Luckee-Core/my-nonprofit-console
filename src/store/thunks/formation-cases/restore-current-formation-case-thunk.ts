import { fetchFormationCasesThunk } from './fetch-formation-cases-thunk';
import { openFormationCaseThunk } from './open-formation-case-thunk';
import type { AppThunk } from '@/store';

/**
 * Rehydrate currentFormationCase after refresh by loading the list from the API
 * and opening the most recently updated case (ADR 008 — no URL or browser storage).
 */
export const restoreCurrentFormationCaseThunk =
  (): AppThunk<Promise<200 | 400 | 500>> => async (dispatch, getState) => {
    const { currentFormationCase, formationCases } = getState();
    if (currentFormationCase.id) {
      return 200;
    }

    let cases = Object.values(formationCases);
    if (cases.length === 0) {
      const fetchCode = await dispatch(fetchFormationCasesThunk());
      if (fetchCode !== 200) {
        return fetchCode;
      }
      cases = Object.values(getState().formationCases);
    }

    if (cases.length === 0) {
      return 400;
    }

    cases.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    return dispatch(openFormationCaseThunk(cases[0].id));
  };

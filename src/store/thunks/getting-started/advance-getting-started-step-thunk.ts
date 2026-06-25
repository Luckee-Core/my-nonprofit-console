import { GettingStartedBuilderActions } from '@/store/builders/gettingStartedBuilder';
import type { AppThunk } from '@/store';

/**
 * Advance the getting-started wizard to the next step with validation.
 */
export const advanceGettingStartedStepThunk =
  (): AppThunk<Promise<200 | 400>> => async (dispatch, getState) => {
    const { activeStep } = getState().gettingStartedBuilder;

    if (activeStep === 'welcome') {
      dispatch(GettingStartedBuilderActions.setGettingStartedStep('connect'));
      return 200;
    }

    if (activeStep === 'connect') {
      const status = getState().setupBuilder.lastStatus;
      if (status?.supabase !== 'ok') {
        dispatch(
          GettingStartedBuilderActions.setGettingStartedError(
            'Connect your Supabase project before continuing.',
          ),
        );
        return 400;
      }
      dispatch(GettingStartedBuilderActions.setGettingStartedStep('name'));
      return 200;
    }

    return 400;
  };

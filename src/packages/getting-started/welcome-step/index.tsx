'use client';

import { useAppDispatch } from '@/store';
import { advanceGettingStartedStepThunk } from '@/store/thunks';
import { StepCard } from '../shared/step-card';

/**
 * Welcome step — explain the product and what a nonprofit workspace is.
 */
export const WelcomeStep = () => {
  const dispatch = useAppDispatch();

  return (
    <StepCard>
      <h2 className={styles.title}>Start forming your Pennsylvania nonprofit</h2>
      <p className={styles.lead}>
        This tool walks you through nonprofit formation in Pennsylvania and Philadelphia — at your
        own pace, on your own computer.
      </p>

      <ul className={styles.bullets}>
        <li>
          <strong>12-step checklist</strong> — track progress from mission to city licenses
        </li>
        <li>
          <strong>Board and officers</strong> — capture who leads the organization
        </li>
        <li>
          <strong>AI document drafts</strong> — mission, articles, bylaws, and more for attorney
          review
        </li>
      </ul>

      <p className={styles.explainer}>
        Each nonprofit you work on gets its own workspace — checklist, board, documents, and
        filings in one place. You can run more than one at a time if you are helping multiple
        groups.
      </p>

      <button
        type="button"
        className={styles.primaryButton}
        onClick={() => void dispatch(advanceGettingStartedStepThunk())}
      >
        Continue
      </button>
    </StepCard>
  );
};

const styles = {
  title: `text-xl font-semibold text-slate-900`,
  lead: `mt-2 text-slate-600`,
  bullets: `mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700`,
  explainer: `mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600`,
  primaryButton: `mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800`,
};

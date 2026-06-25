'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { GettingStartedBuilderActions } from '@/store/builders/gettingStartedBuilder';

/**
 * First-visit banner on the checklist tab after completing getting started.
 */
export const ChecklistIntroBanner = () => {
  const dispatch = useAppDispatch();
  const dismissed = useAppSelector((s) => s.gettingStartedBuilder.checklistIntroDismissed);

  if (dismissed) {
    return null;
  }

  return (
    <div className={styles.banner} role="status">
      <p className={styles.text}>
        You are in your checklist — 12 steps for PA / Philadelphia formation. Mark steps as you go;
        use the <strong>Board</strong> and <strong>Documents</strong> tabs when you are ready.
      </p>
      <button
        type="button"
        className={styles.dismissButton}
        onClick={() => dispatch(GettingStartedBuilderActions.setChecklistIntroDismissed(true))}
      >
        Got it
      </button>
    </div>
  );
};

const styles = {
  banner: `mb-6 flex flex-col gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between`,
  text: `text-sm text-blue-900`,
  dismissButton: `shrink-0 rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800`,
};

'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMATION_CHECKLIST_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { completeGettingStartedThunk } from '@/store/thunks';
import { StepCard } from '../shared/step-card';

/**
 * Name step — create nonprofit and open checklist.
 */
export const NameStep = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const gettingStartedBuilder = useAppSelector((s) => s.gettingStartedBuilder);
  const { isCompleting, lastError } = gettingStartedBuilder;
  const [workingName, setWorkingName] = useState('');

  const trimmed = useMemo(() => workingName.trim(), [workingName]);
  const canSubmit = trimmed.length > 0 && !isCompleting;

  const handleSubmit = async () => {
    const code = await dispatch(completeGettingStartedThunk(workingName));
    if (code === 200) {
      router.push(FORMATION_CHECKLIST_PATH);
    }
  };

  return (
    <StepCard>
      <h2 className={styles.title}>Name your nonprofit</h2>
      <p className={styles.lead}>
        Use a working name for now — what you are calling the organization while you form it. You
        can set the official legal name later.
      </p>

      <label className={styles.label} htmlFor="working-name">
        Working name
      </label>
      <input
        id="working-name"
        className={styles.input}
        placeholder="e.g. West Philly Community Garden"
        value={workingName}
        onChange={(e) => setWorkingName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && canSubmit) {
            void handleSubmit();
          }
        }}
      />
      <p className={styles.hint}>
        Examples: &quot;Riverside Youth Arts&quot;, &quot;North Philly Food Pantry&quot;
      </p>

      {lastError ? <p className={styles.error}>{lastError}</p> : null}

      <button
        type="button"
        className={styles.primaryButton}
        disabled={!canSubmit}
        onClick={() => void handleSubmit()}
      >
        {isCompleting ? 'Creating…' : 'Start checklist'}
      </button>
    </StepCard>
  );
};

const styles = {
  title: `text-xl font-semibold text-slate-900`,
  lead: `mt-2 text-slate-600`,
  label: `mt-4 block text-sm font-medium text-slate-700`,
  input: `mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  hint: `mt-2 text-xs text-slate-500`,
  error: `mt-3 text-sm text-red-600`,
  primaryButton: `mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50`,
};

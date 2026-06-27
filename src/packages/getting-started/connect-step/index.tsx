'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { StatusBadge } from '@/components';
import { SETUP_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { advanceGettingStartedStepThunk, loadSetupStatusThunk } from '@/store/thunks';
import { StepCard } from '../shared/step-card';

/**
 * Connect step — verify Supabase and optional Anthropic before creating a nonprofit.
 */
export const ConnectStep = () => {
  const dispatch = useAppDispatch();
  const setupBuilder = useAppSelector((s) => s.setupBuilder);
  const gettingStartedBuilder = useAppSelector((s) => s.gettingStartedBuilder);
  const { isLoading, lastStatus: status, lastError: setupError } = setupBuilder;
  const { lastError } = gettingStartedBuilder;

  const supabaseOk = status?.supabase === 'ok';
  const anthropicOk = status?.anthropic === 'ok';

  useEffect(() => {
    void dispatch(loadSetupStatusThunk());
  }, [dispatch]);

  return (
    <StepCard>
      <h2 className={styles.title}>Connect your database</h2>
      <p className={styles.lead}>
        My Nonprofit stores your progress in <strong>your</strong> Supabase project. We will check
        that Express can reach it before you continue.
      </p>

      <ol className={styles.steps}>
        <li>Create a Supabase project at supabase.com</li>
        <li>
          Run the SQL files from{' '}
          <code className={styles.code}>my-nonprofit-express-server/docs/</code> (schema, then AI
          prompts)
        </li>
        <li>
          Copy <code className={styles.code}>.env.example</code> to{' '}
          <code className={styles.code}>.env</code> in Express and add your keys
        </li>
        <li>Start Express (port 3080) and this app (port 3081)</li>
      </ol>

      <div className={styles.statusRow}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => void dispatch(loadSetupStatusThunk())}
        >
          {isLoading ? 'Checking…' : 'Recheck connection'}
        </button>
        <Link href={SETUP_PATH} className={styles.link}>
          Full setup details
        </Link>
      </div>

      {setupError ? <p className={styles.error}>{setupError}</p> : null}
      {lastError ? <p className={styles.error}>{lastError}</p> : null}

      {status ? (
        <ul className={styles.statusList}>
          <li className={styles.statusItem}>
            Supabase: <StatusBadge value={status.supabase} message={status.supabaseMessage} />
          </li>
          <li className={styles.statusItem}>
            Anthropic (AI drafts): <StatusBadge value={status.anthropic} />
          </li>
        </ul>
      ) : null}

      {!anthropicOk && supabaseOk ? (
        <p className={styles.warning}>
          Anthropic is not configured. You can still use the checklist and board; AI document drafts
          will not work until you add <code className={styles.code}>ANTHROPIC_API_KEY</code> to
          Express.
        </p>
      ) : null}

      <button
        type="button"
        className={styles.primaryButton}
        disabled={!supabaseOk || isLoading}
        onClick={() => void dispatch(advanceGettingStartedStepThunk())}
      >
        Continue
      </button>
      {!supabaseOk && status && !isLoading ? (
        <p className={styles.hint}>Fix Supabase connection above, then recheck.</p>
      ) : null}
    </StepCard>
  );
};

const styles = {
  title: `text-xl font-semibold text-slate-900`,
  lead: `mt-2 text-slate-600`,
  steps: `mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600`,
  code: `rounded bg-slate-100 px-1.5 py-0.5 text-sm`,
  statusRow: `mt-4 flex flex-wrap items-center gap-3`,
  secondaryButton: `rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50`,
  link: `text-sm font-medium text-slate-700 underline hover:text-slate-900`,
  error: `mt-3 text-sm text-red-600`,
  statusList: `mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4`,
  statusItem: `py-1 text-sm`,
  warning: `mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900`,
  primaryButton: `mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50`,
  hint: `mt-2 text-sm text-slate-500`,
};

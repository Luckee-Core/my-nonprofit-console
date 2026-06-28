'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { CurrentAiPromptActions } from '@/store/current/currentAiPrompt';
import { saveAiPromptVersionThunk } from '@/store/thunks';

/**
 * AI prompt detail editor — save creates a new active version.
 */
export const AiPromptDetailPage = () => {
  const dispatch = useAppDispatch();
  const currentAiPrompt = useAppSelector((s) => s.currentAiPrompt);
  const aiPromptsBuilder = useAppSelector((s) => s.aiPromptsBuilder);

  if (!currentAiPrompt.id) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{currentAiPrompt.flow}</h1>
      <p className={styles.meta}>
        v{currentAiPrompt.version} · {currentAiPrompt.name}
      </p>

      <label className={styles.label}>System prompt</label>
      <textarea
        className={styles.textarea}
        rows={24}
        value={currentAiPrompt.system_prompt}
        onChange={(e) =>
          dispatch(CurrentAiPromptActions.patchCurrentAiPrompt({ system_prompt: e.target.value }))
        }
      />

      {aiPromptsBuilder.lastError ? <p className={styles.error}>{aiPromptsBuilder.lastError}</p> : null}

      <button
        type="button"
        className={styles.primaryButton}
        disabled={aiPromptsBuilder.isSaving}
        onClick={() => void dispatch(saveAiPromptVersionThunk())}
      >
        {aiPromptsBuilder.isSaving ? 'Saving…' : 'Save new version'}
      </button>
    </section>
  );
};

const styles = {
  section: `mx-auto flex max-w-3xl flex-col gap-3`,
  title: `text-2xl font-semibold text-slate-900`,
  meta: `text-sm text-slate-600`,
  label: `text-sm font-medium text-slate-700`,
  textarea: `rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm`,
  error: `text-sm text-red-600`,
  primaryButton: `mt-2 self-start rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50`,
};

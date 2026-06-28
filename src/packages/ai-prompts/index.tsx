'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AI_PROMPT_DETAIL_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadAiPromptsThunk, setCurrentAiPromptThunk } from '@/store/thunks';

/**
 * AI prompts admin list.
 */
export const AiPromptsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const aiPrompts = useAppSelector((s) => s.aiPrompts);
  const aiPromptsBuilder = useAppSelector((s) => s.aiPromptsBuilder);

  const rows = useMemo(
    () =>
      Object.values(aiPrompts).sort((a, b) => {
        const flow = a.flow.localeCompare(b.flow);
        if (flow !== 0) {
          return flow;
        }
        return b.version - a.version;
      }),
    [aiPrompts],
  );

  useEffect(() => {
    void dispatch(loadAiPromptsThunk());
  }, [dispatch]);

  const handleEdit = async (id: string) => {
    const prompt = aiPrompts[id];
    if (!prompt) {
      return;
    }
    await dispatch(setCurrentAiPromptThunk(prompt));
    router.push(AI_PROMPT_DETAIL_PATH);
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>AI Prompts</h1>
      <p className={styles.lead}>Versioned coach prompts for formation AI studios.</p>

      {aiPromptsBuilder.isLoading ? <p className={styles.muted}>Loading…</p> : null}
      {aiPromptsBuilder.lastError ? <p className={styles.error}>{aiPromptsBuilder.lastError}</p> : null}

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Flow</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Version</th>
            <th className={styles.th}>Active</th>
            <th className={styles.th} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              <td className={styles.td}>{row.flow}</td>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.td}>{row.version}</td>
              <td className={styles.td}>{row.is_active ? 'Yes' : 'No'}</td>
              <td className={styles.td}>
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => void handleEdit(row.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  title: `text-2xl font-semibold text-slate-900`,
  lead: `text-slate-600`,
  muted: `text-sm text-slate-500`,
  error: `text-sm text-red-600`,
  table: `w-full border-collapse text-sm`,
  th: `border-b border-slate-200 px-3 py-2 text-left font-medium text-slate-600`,
  tr: `border-b border-slate-100`,
  td: `px-3 py-2`,
  linkButton: `text-slate-700 underline hover:text-slate-900`,
};

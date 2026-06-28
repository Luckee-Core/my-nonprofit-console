'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FormationStudioDomain } from '@/model/formation-workspace';
import { FORMATION_STUDIO_DOMAIN_LABELS } from '@/model/formation-workspace';
import { useAppDispatch, useAppSelector } from '@/store';
import { formationStudioKey } from '@/store/dumps/formationStudios';
import {
  applyFormationStudioSuggestionThunk,
  loadFormationStudioLedgerThunk,
  sendFormationStudioMessageThunk,
} from '@/store/thunks';

type StudioPaneProps = {
  domain: FormationStudioDomain;
};

/**
 * Reusable AI studio chat pane for text drafting domains.
 */
export const StudioPane = ({ domain }: StudioPaneProps) => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationDocuments = useAppSelector((s) => s.formationDocuments);
  const formationStudios = useAppSelector((s) => s.formationStudios);
  const formationStudioBuilder = useAppSelector((s) => s.formationStudioBuilder);
  const [draft, setDraft] = useState('');
  const [lastSuggestion, setLastSuggestion] = useState('');

  const caseId = currentFormationCase.id;
  const key = formationStudioKey(domain, caseId);
  const messages = formationStudios[key] ?? [];
  const isPosting = formationStudioBuilder.postingDomain === domain;
  const isApplying = formationStudioBuilder.applyingDomain === domain;

  const currentPreview = useMemo(() => {
    if (domain === 'mission') {
      return currentFormationCase.mission_statement;
    }
    if (domain === 'charitable_purpose') {
      return currentFormationCase.charitable_purpose_summary;
    }
    const docTypeMap: Partial<Record<FormationStudioDomain, string>> = {
      articles: 'articles',
      bylaws: 'bylaws',
      conflict_policy: 'conflict_of_interest',
      board_consent: 'board_consent',
    };
    const docType = docTypeMap[domain];
    if (docType) {
      return (
        Object.values(formationDocuments).find(
          (d) => d.formation_case_id === caseId && d.document_type === docType,
        )?.content ?? ''
      );
    }
    return '';
  }, [domain, currentFormationCase, formationDocuments, caseId]);

  useEffect(() => {
    if (caseId) {
      void dispatch(loadFormationStudioLedgerThunk(domain, caseId));
    }
  }, [caseId, domain, dispatch]);

  useEffect(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
    if (lastAssistant?.suggestedValue) {
      setLastSuggestion(lastAssistant.suggestedValue);
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }
    const code = await dispatch(sendFormationStudioMessageThunk(domain, trimmed));
    if (code === 200) {
      setDraft('');
    }
  };

  const handleApply = async (value: string) => {
    await dispatch(applyFormationStudioSuggestionThunk(domain, value));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.chatColumn}>
        <h2 className={styles.title}>{FORMATION_STUDIO_DOMAIN_LABELS[domain]}</h2>
        <p className={styles.subtitle}>Chat with the AI coach to brainstorm and refine your draft.</p>

        <div className={styles.thread}>
          {messages.length === 0 ? (
            <p className={styles.muted}>Start the conversation — describe what your nonprofit does.</p>
          ) : null}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.role === 'user' ? styles.userBubble : styles.assistantBubble}
            >
              <p className={styles.bubbleLabel}>{msg.role === 'user' ? 'You' : 'Coach'}</p>
              <p className={styles.bubbleText}>{msg.content}</p>
              {msg.suggestedValue ? (
                <div className={styles.suggestionBox}>
                  <p className={styles.suggestionLabel}>Suggested draft</p>
                  <p className={styles.suggestionText}>{msg.suggestedValue}</p>
                  <button
                    type="button"
                    className={styles.applyButton}
                    disabled={isApplying}
                    onClick={() => void handleApply(msg.suggestedValue ?? '')}
                  >
                    Apply to case
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {formationStudioBuilder.lastError ? (
          <p className={styles.error}>{formationStudioBuilder.lastError}</p>
        ) : null}

        <div className={styles.compose}>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Tell the coach what you want to work on…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
          />
          <button
            type="button"
            className={styles.sendButton}
            disabled={isPosting || !draft.trim()}
            onClick={() => void handleSend()}
          >
            {isPosting ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>

      <div className={styles.previewColumn}>
        <h3 className={styles.previewTitle}>Current draft</h3>
        <pre className={styles.previewBody}>{currentPreview || '(empty)'}</pre>
        {lastSuggestion && lastSuggestion !== currentPreview ? (
          <button
            type="button"
            className={styles.applyButtonSecondary}
            disabled={isApplying}
            onClick={() => void handleApply(lastSuggestion)}
          >
            Apply latest suggestion
          </button>
        ) : null}
      </div>
    </div>
  );
};

const styles = {
  layout: `grid gap-6 lg:grid-cols-[1fr_280px]`,
  chatColumn: `flex min-h-[480px] flex-col`,
  title: `text-xl font-semibold text-slate-900`,
  subtitle: `mt-1 text-sm text-slate-600`,
  thread: `mt-4 flex flex-1 flex-col gap-3 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4`,
  muted: `text-sm text-slate-500`,
  userBubble: `rounded-lg bg-white p-3 shadow-sm`,
  assistantBubble: `rounded-lg bg-slate-900 p-3 text-white`,
  bubbleLabel: `text-xs font-medium uppercase opacity-70`,
  bubbleText: `mt-1 whitespace-pre-wrap text-sm`,
  suggestionBox: `mt-3 rounded border border-slate-300 bg-slate-100 p-3 text-slate-900`,
  suggestionLabel: `text-xs font-medium uppercase text-slate-600`,
  suggestionText: `mt-1 whitespace-pre-wrap text-sm`,
  applyButton: `mt-2 rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50`,
  compose: `mt-4 flex flex-col gap-2`,
  textarea: `rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  sendButton: `self-end rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50`,
  error: `mt-2 text-sm text-red-600`,
  previewColumn: `rounded-lg border border-slate-200 bg-white p-4`,
  previewTitle: `text-sm font-medium text-slate-700`,
  previewBody: `mt-2 max-h-[420px] overflow-y-auto whitespace-pre-wrap text-sm text-slate-800`,
  applyButtonSecondary: `mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50`,
};

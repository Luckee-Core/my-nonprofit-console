'use client';

import { useMemo } from 'react';
import { FormationCaseHeader, FormationDetailGuard, useFormationCaseId } from '../shared';
import { useAppDispatch, useAppSelector } from '@/store';
import { generateFormationDocumentThunk, updateFormationDocumentThunk } from '@/store/thunks';
import type { FormationDocumentType } from '@/model/formation';
import { downloadFormationDocumentMarkdown } from '@/utils/formation/download-formation-document-markdown';

const AI_DOCUMENTS: { type: FormationDocumentType; label: string }[] = [
  { type: 'mission_draft', label: 'Mission statement' },
  { type: 'articles', label: 'Articles of incorporation' },
  { type: 'bylaws', label: 'Bylaws' },
  { type: 'conflict_of_interest', label: 'Conflict of interest policy' },
  { type: 'board_consent', label: 'Board consent resolutions' },
];

/**
 * Documents tab — AI drafts, review, and markdown export.
 */
export const FormationDocumentsTab = () => {
  const dispatch = useAppDispatch();
  const caseId = useFormationCaseId();
  const caseName = useAppSelector((s) => s.currentFormationCase.working_name);
  const documentsDump = useAppSelector((s) => s.formationDocuments);
  const isGenerating = useAppSelector((s) => s.formationWizardBuilder.isGenerating);
  const activeType = useAppSelector((s) => s.formationWizardBuilder.activeDocumentType);
  const lastError = useAppSelector((s) => s.formationWizardBuilder.lastError);

  const documents = useMemo(
    () => Object.values(documentsDump).filter((d) => d.formation_case_id === caseId),
    [documentsDump, caseId],
  );

  const docByType = useMemo(() => {
    const map = new Map(documents.map((d) => [d.document_type, d]));
    return map;
  }, [documents]);

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      {lastError ? <p className={styles.error}>{lastError}</p> : null}

      <div className={styles.grid}>
        {AI_DOCUMENTS.map(({ type, label }) => {
          const doc = docByType.get(type);
          const loading = isGenerating && activeType === type;
          return (
            <section key={type} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{label}</h2>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.button}
                    disabled={isGenerating}
                    onClick={() => void dispatch(generateFormationDocumentThunk(caseId, type))}
                  >
                    {loading ? 'Generating…' : doc ? 'Regenerate' : 'Generate'}
                  </button>
                  {doc ? (
                    <>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() =>
                          void dispatch(updateFormationDocumentThunk({ id: doc.id, status: 'reviewed' }))
                        }
                      >
                        Mark reviewed
                      </button>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => downloadFormationDocumentMarkdown(doc, caseName || 'nonprofit')}
                      >
                        Export .md
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              {doc ? (
                <pre className={styles.preview}>{doc.content || '(empty draft)'}</pre>
              ) : (
                <p className={styles.muted}>No draft yet.</p>
              )}
            </section>
          );
        })}
      </div>
    </FormationDetailGuard>
  );
};

const styles = {
  error: `mb-4 text-sm text-red-600`,
  grid: `space-y-4`,
  card: `rounded-lg border border-slate-200 bg-white p-4`,
  cardHeader: `mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
  cardTitle: `font-semibold text-slate-900`,
  actions: `flex flex-wrap gap-2`,
  button: `rounded bg-slate-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
  secondaryButton: `rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700`,
  preview: `max-h-64 overflow-auto whitespace-pre-wrap rounded bg-slate-50 p-3 text-xs text-slate-800`,
  muted: `text-sm text-slate-500`,
};

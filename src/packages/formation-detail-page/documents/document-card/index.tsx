'use client';

import type { FormationDocument, FormationDocumentType } from '@/model/formation';
import { downloadFormationDocumentMarkdown } from '../download-formation-document-markdown';

type DocumentCardProps = {
  type: FormationDocumentType;
  label: string;
  doc: FormationDocument | undefined;
  caseId: string;
  caseName: string;
  isGenerating: boolean;
  activeType: FormationDocumentType | null;
  onGenerate: (caseId: string, type: FormationDocumentType) => void;
  onMarkReviewed: (docId: string) => void;
};

/**
 * One AI document card — generate, review, export.
 */
export const DocumentCard = ({
  type,
  label,
  doc,
  caseId,
  caseName,
  isGenerating,
  activeType,
  onGenerate,
  onMarkReviewed,
}: DocumentCardProps) => {
  const loading = isGenerating && activeType === type;

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{label}</h2>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.button}
            disabled={isGenerating}
            onClick={() => onGenerate(caseId, type)}
          >
            {loading ? 'Generating…' : doc ? 'Regenerate' : 'Generate'}
          </button>
          {doc ? (
            <>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => onMarkReviewed(doc.id)}
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
};

const styles = {
  card: `rounded-lg border border-slate-200 bg-white p-4`,
  cardHeader: `mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
  cardTitle: `font-semibold text-slate-900`,
  actions: `flex flex-wrap gap-2`,
  button: `rounded bg-slate-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
  secondaryButton: `rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700`,
  preview: `max-h-64 overflow-auto whitespace-pre-wrap rounded bg-slate-50 p-3 text-xs text-slate-800`,
  muted: `text-sm text-slate-500`,
};

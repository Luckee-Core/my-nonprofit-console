'use client';

import type { FormationDocument, FormationDocumentType } from '@/model/formation';
import { downloadFormationDocumentMarkdown } from '../../documents/download-formation-document-markdown';
import { useAppDispatch, useAppSelector } from '@/store';
import { generateFormationDocumentThunk, updateFormationDocumentThunk } from '@/store/thunks';

const DOCUMENT_LABELS: Record<FormationDocumentType, string> = {
  mission_draft: 'Mission statement',
  articles: 'Articles of incorporation',
  bylaws: 'Bylaws',
  conflict_of_interest: 'Conflict of interest policy',
  board_consent: 'Board consent resolutions',
  form_1023_ez_checklist: 'Form 1023-EZ checklist',
  bco_10_checklist: 'BCO-10 checklist',
  philly_license_checklist: 'Philadelphia license checklist',
};

type InlineDocumentPanelProps = {
  documentType: FormationDocumentType;
  label?: string;
};

type EditorProps = {
  doc: FormationDocument;
  caseName: string;
  displayLabel: string;
  loading: boolean;
  isGenerating: boolean;
  onGenerate: () => void;
};

const DocumentEditor = ({
  doc,
  caseName,
  displayLabel,
  loading,
  isGenerating,
  onGenerate,
}: EditorProps) => {
  const dispatch = useAppDispatch();

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{displayLabel}</h3>
        <div className={styles.actions}>
          <button type="button" className={styles.button} disabled={isGenerating} onClick={onGenerate}>
            {loading ? 'Generating…' : 'Regenerate'}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => void dispatch(updateFormationDocumentThunk({ id: doc.id, status: 'reviewed' }))}
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
        </div>
      </div>
      <textarea
        key={doc.updated_at}
        className={styles.textarea}
        rows={8}
        defaultValue={doc.content}
        onBlur={(e) => {
          if (e.target.value !== doc.content) {
            void dispatch(updateFormationDocumentThunk({ id: doc.id, content: e.target.value }));
          }
        }}
        placeholder="Edit draft content…"
      />
    </section>
  );
};

/**
 * Compact document panel — generate, edit content, export.
 */
export const InlineDocumentPanel = ({ documentType, label }: InlineDocumentPanelProps) => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationDocuments = useAppSelector((s) => s.formationDocuments);
  const formationWizardBuilder = useAppSelector((s) => s.formationWizardBuilder);
  const caseId = currentFormationCase.id;
  const caseName = currentFormationCase.working_name;
  const { isGenerating, activeDocumentType } = formationWizardBuilder;

  const doc = Object.values(formationDocuments).find(
    (d) => d.formation_case_id === caseId && d.document_type === documentType,
  );

  const loading = isGenerating && activeDocumentType === documentType;
  const displayLabel = label ?? DOCUMENT_LABELS[documentType] ?? documentType;

  const handleGenerate = () => {
    void dispatch(generateFormationDocumentThunk(caseId, documentType));
  };

  if (doc) {
    return (
      <DocumentEditor
        doc={doc}
        caseName={caseName}
        displayLabel={displayLabel}
        loading={loading}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />
    );
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{displayLabel}</h3>
        <button type="button" className={styles.button} disabled={isGenerating} onClick={handleGenerate}>
          {loading ? 'Generating…' : 'Generate draft'}
        </button>
      </div>
      <p className={styles.muted}>
        No draft yet. Generate uses your nonprofit details and board info — review with an attorney before
        filing.
      </p>
    </section>
  );
};

const styles = {
  card: `rounded-lg border border-slate-200 bg-slate-50 p-4`,
  header: `flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-sm font-semibold text-slate-900`,
  actions: `flex flex-wrap gap-2`,
  button: `rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
  secondaryButton: `rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700`,
  textarea: `mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs`,
  muted: `text-sm text-slate-500`,
};

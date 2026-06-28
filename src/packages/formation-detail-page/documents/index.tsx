'use client';

import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { InlineDocumentPanel } from '../shared/inline-document-panel';
import { AI_DOCUMENTS } from './constants';
import { useAppSelector } from '@/store';

/**
 * Documents tab — AI drafts, review, and markdown export (full view).
 */
export const FormationDocumentsTab = () => {
  const formationWizardBuilder = useAppSelector((s) => s.formationWizardBuilder);
  const { lastError } = formationWizardBuilder;

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      {lastError ? <p className={styles.error}>{lastError}</p> : null}
      <div className={styles.grid}>
        {AI_DOCUMENTS.map(({ type, label }) => (
          <InlineDocumentPanel key={type} documentType={type} label={label} />
        ))}
      </div>
    </FormationDetailGuard>
  );
};

const styles = {
  error: `mb-4 text-sm text-red-600`,
  grid: `space-y-4`,
};

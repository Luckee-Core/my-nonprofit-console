'use client';

import { useMemo } from 'react';
import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { DocumentCard } from './document-card';
import { AI_DOCUMENTS } from './constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { generateFormationDocumentThunk, updateFormationDocumentThunk } from '@/store/thunks';
import type { FormationDocumentType } from '@/model/formation';

/**
 * Documents tab — AI drafts, review, and markdown export.
 */
export const FormationDocumentsTab = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationDocuments = useAppSelector((s) => s.formationDocuments);
  const formationWizardBuilder = useAppSelector((s) => s.formationWizardBuilder);
  const caseId = currentFormationCase.id;
  const caseName = currentFormationCase.working_name;
  const { isGenerating, activeDocumentType: activeType, lastError } = formationWizardBuilder;

  const documents = useMemo(
    () => Object.values(formationDocuments).filter((d) => d.formation_case_id === caseId),
    [formationDocuments, caseId],
  );

  const docByType = useMemo(() => {
    return new Map(documents.map((d) => [d.document_type, d]));
  }, [documents]);

  const handleGenerate = (id: string, type: FormationDocumentType) => {
    void dispatch(generateFormationDocumentThunk(id, type));
  };

  const handleMarkReviewed = (docId: string) => {
    void dispatch(updateFormationDocumentThunk({ id: docId, status: 'reviewed' }));
  };

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      {lastError ? <p className={styles.error}>{lastError}</p> : null}

      <div className={styles.grid}>
        {AI_DOCUMENTS.map(({ type, label }) => (
          <DocumentCard
            key={type}
            type={type}
            label={label}
            doc={docByType.get(type)}
            caseId={caseId}
            caseName={caseName}
            isGenerating={isGenerating}
            activeType={activeType}
            onGenerate={handleGenerate}
            onMarkReviewed={handleMarkReviewed}
          />
        ))}
      </div>
    </FormationDetailGuard>
  );
};

const styles = {
  error: `mb-4 text-sm text-red-600`,
  grid: `space-y-4`,
};

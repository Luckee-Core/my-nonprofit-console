'use client';

import { useMemo } from 'react';
import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { InlineFilingPanel } from '../shared/inline-filing-panel';
import { useAppSelector } from '@/store';

/**
 * Filings tab — track external submission status (full view).
 */
export const FormationFilingsTab = () => {
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationFilings = useAppSelector((s) => s.formationFilings);
  const caseId = currentFormationCase.id;

  const filings = useMemo(
    () =>
      Object.values(formationFilings)
        .filter((f) => f.formation_case_id === caseId)
        .sort((a, b) => a.filing_type.localeCompare(b.filing_type)),
    [formationFilings, caseId],
  );

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      <div className={styles.list}>
        {filings.map((filing) => (
          <InlineFilingPanel key={`${filing.id}-${filing.updated_at}`} filing={filing} />
        ))}
      </div>
    </FormationDetailGuard>
  );
};

const styles = {
  list: `space-y-3`,
};

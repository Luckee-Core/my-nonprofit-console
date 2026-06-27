'use client';

import { useMemo } from 'react';
import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { FilingRow } from './filing-row';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFormationFilingThunk } from '@/store/thunks';
import type { FormationFilingStatus } from '@/model/formation';

/**
 * Filings tab — track external submission status.
 */
export const FormationFilingsTab = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationFilings = useAppSelector((s) => s.formationFilings);
  const caseId = currentFormationCase.id;

  const filings = useMemo(
    () => Object.values(formationFilings).filter((f) => f.formation_case_id === caseId),
    [formationFilings, caseId],
  );

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      <ul className={styles.list}>
        {filings.map((filing) => (
          <FilingRow
            key={filing.id}
            filing={filing}
            onUpdateNotes={(id, notes) => void dispatch(updateFormationFilingThunk({ id, notes }))}
            onUpdateStatus={(id, status) =>
              void dispatch(updateFormationFilingThunk({ id, status }))
            }
          />
        ))}
      </ul>
    </FormationDetailGuard>
  );
};

const styles = {
  list: `space-y-3`,
};

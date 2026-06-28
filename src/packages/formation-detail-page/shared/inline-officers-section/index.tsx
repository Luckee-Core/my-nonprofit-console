'use client';

import { useMemo } from 'react';
import { OfficerRow } from '../../board/officer-row';
import { OFFICER_ROLES } from '../../board/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { upsertFormationOfficerThunk } from '@/store/thunks';

/**
 * Inline officers section for first board meeting step.
 */
export const InlineOfficersSection = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationOfficers = useAppSelector((s) => s.formationOfficers);
  const caseId = currentFormationCase.id;

  const officers = useMemo(
    () => Object.values(formationOfficers).filter((o) => o.formation_case_id === caseId),
    [formationOfficers, caseId],
  );

  const officerByRole = useMemo(() => new Map(officers.map((o) => [o.role, o])), [officers]);

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Officers</h3>
      {OFFICER_ROLES.map((role) => (
        <OfficerRow
          key={role}
          role={role}
          initialName={officerByRole.get(role)?.full_name ?? ''}
          onSave={(full_name) =>
            void dispatch(upsertFormationOfficerThunk({ formation_case_id: caseId, role, full_name }))
          }
        />
      ))}
    </section>
  );
};

const styles = {
  section: `mt-4`,
  heading: `mb-2 text-sm font-semibold text-slate-900`,
};

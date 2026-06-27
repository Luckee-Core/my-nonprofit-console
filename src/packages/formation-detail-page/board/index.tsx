'use client';

import { useMemo, useState } from 'react';
import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { OfficerRow } from './officer-row';
import { OFFICER_ROLES } from './constants';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  createFormationBoardMemberThunk,
  deleteFormationBoardMemberThunk,
  upsertFormationOfficerThunk,
} from '@/store/thunks';

/**
 * Board tab — directors and officers.
 */
export const FormationBoardTab = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationBoardMembers = useAppSelector((s) => s.formationBoardMembers);
  const formationOfficers = useAppSelector((s) => s.formationOfficers);
  const caseId = currentFormationCase.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const members = useMemo(
    () => Object.values(formationBoardMembers).filter((m) => m.formation_case_id === caseId),
    [formationBoardMembers, caseId],
  );

  const officers = useMemo(
    () => Object.values(formationOfficers).filter((o) => o.formation_case_id === caseId),
    [formationOfficers, caseId],
  );

  const officerByRole = useMemo(() => {
    return new Map(officers.map((o) => [o.role, o]));
  }, [officers]);

  const handleAddMember = () => {
    void dispatch(
      createFormationBoardMemberThunk({ formation_case_id: caseId, full_name: name, email }),
    );
    setName('');
    setEmail('');
  };

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />

      <section className={styles.section}>
        <h2 className={styles.heading}>Directors / incorporators</h2>
        <div className={styles.row}>
          <input
            className={styles.input}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className={styles.button} onClick={handleAddMember}>
            Add
          </button>
        </div>
        <ul className={styles.list}>
          {members.map((member) => (
            <li key={member.id} className={styles.listItem}>
              <span>
                {member.full_name}
                {member.email ? ` · ${member.email}` : ''}
              </span>
              <button
                type="button"
                className={styles.linkDanger}
                onClick={() => void dispatch(deleteFormationBoardMemberThunk(member.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Officers</h2>
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
    </FormationDetailGuard>
  );
};

const styles = {
  section: `mb-8`,
  heading: `mb-3 text-lg font-semibold`,
  row: `mb-3 flex flex-wrap gap-2`,
  input: `rounded border border-slate-300 px-3 py-2 text-sm`,
  button: `rounded bg-slate-900 px-3 py-2 text-sm text-white`,
  list: `divide-y divide-slate-100 rounded border border-slate-200 bg-white`,
  listItem: `flex items-center justify-between px-3 py-2 text-sm`,
  linkDanger: `text-sm text-red-600`,
};

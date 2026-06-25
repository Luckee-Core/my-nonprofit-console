'use client';

import { useMemo, useState } from 'react';
import { FormationCaseHeader, FormationDetailGuard, useFormationCaseId } from '../shared';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  createFormationBoardMemberThunk,
  deleteFormationBoardMemberThunk,
  upsertFormationOfficerThunk,
} from '@/store/thunks';

const OFFICER_ROLES = ['president', 'secretary', 'treasurer'] as const;

/**
 * Board tab — directors and officers.
 */
export const FormationBoardTab = () => {
  const dispatch = useAppDispatch();
  const caseId = useFormationCaseId();
  const membersDump = useAppSelector((s) => s.formationBoardMembers);
  const officersDump = useAppSelector((s) => s.formationOfficers);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const members = useMemo(
    () => Object.values(membersDump).filter((m) => m.formation_case_id === caseId),
    [membersDump, caseId],
  );

  const officers = useMemo(
    () => Object.values(officersDump).filter((o) => o.formation_case_id === caseId),
    [officersDump, caseId],
  );

  const officerByRole = useMemo(() => {
    const map = new Map(officers.map((o) => [o.role, o]));
    return map;
  }, [officers]);

  const handleAddMember = () => {
    void dispatch(createFormationBoardMemberThunk({ formation_case_id: caseId, full_name: name, email }));
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
            caseId={caseId}
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

const OfficerRow = ({
  role,
  initialName,
  onSave,
}: {
  role: string;
  caseId: string;
  initialName: string;
  onSave: (name: string) => void;
}) => {
  const [fullName, setFullName] = useState(initialName);

  return (
    <div className={styles.officerRow}>
      <label className={styles.officerLabel}>{role}</label>
      <input
        className={styles.input}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Officer name"
      />
      <button type="button" className={styles.button} onClick={() => onSave(fullName.trim())}>
        Save
      </button>
    </div>
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
  officerRow: `mb-2 flex flex-wrap items-center gap-2`,
  officerLabel: `w-24 text-sm font-medium capitalize text-slate-700`,
};

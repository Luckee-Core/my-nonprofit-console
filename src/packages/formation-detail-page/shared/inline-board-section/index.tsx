'use client';

import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { createFormationBoardMemberThunk, deleteFormationBoardMemberThunk } from '@/store/thunks';

/**
 * Inline board member list and add form.
 */
export const InlineBoardSection = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationBoardMembers = useAppSelector((s) => s.formationBoardMembers);
  const caseId = currentFormationCase.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const members = useMemo(
    () => Object.values(formationBoardMembers).filter((m) => m.formation_case_id === caseId),
    [formationBoardMembers, caseId],
  );

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    void dispatch(
      createFormationBoardMemberThunk({ formation_case_id: caseId, full_name: trimmed, email }),
    );
    setName('');
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Directors / incorporators</h3>
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
        <button type="button" className={styles.button} onClick={handleAdd}>
          Add
        </button>
      </div>
      {members.length === 0 ? (
        <p className={styles.muted}>No board members yet — add at least one incorporator or director.</p>
      ) : (
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
      )}
    </section>
  );
};

const styles = {
  section: `mt-4`,
  heading: `text-sm font-semibold text-slate-900`,
  row: `mt-2 flex flex-wrap gap-2`,
  input: `rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  button: `rounded-lg bg-slate-900 px-3 py-2 text-sm text-white`,
  muted: `mt-2 text-sm text-slate-500`,
  list: `mt-2 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white`,
  listItem: `flex items-center justify-between px-3 py-2 text-sm`,
  linkDanger: `text-sm text-red-600`,
};

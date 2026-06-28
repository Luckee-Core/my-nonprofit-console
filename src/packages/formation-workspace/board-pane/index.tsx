'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMATION_BOARD_MEMBER_DETAIL_PATH } from '@/config/routes';
import { InlineOfficersSection } from '@/packages/formation-detail-page/shared/inline-officers-section';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  createFormationBoardMemberThunk,
  deleteFormationBoardMemberThunk,
  openFormationBoardMemberThunk,
} from '@/store/thunks';
import { StepStatusHeader } from '../step-status-header';
import { StudioPane } from '../studio-pane';

type BoardPaneProps = {
  stepKey: string;
  title: string;
  showOfficers?: boolean;
  studioDomain?: 'board_consent';
};

/**
 * Board table workspace or hybrid first-board-meeting pane.
 */
export const BoardPane = ({ stepKey, title, showOfficers, studioDomain }: BoardPaneProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationBoardMembers = useAppSelector((s) => s.formationBoardMembers);
  const [name, setName] = useState('');

  const members = useMemo(
    () =>
      Object.values(formationBoardMembers)
        .filter((m) => m.formation_case_id === currentFormationCase.id)
        .sort((a, b) => a.sort_order - b.sort_order),
    [formationBoardMembers, currentFormationCase.id],
  );

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    await dispatch(
      createFormationBoardMemberThunk({
        formation_case_id: currentFormationCase.id,
        full_name: trimmed,
        is_incorporator: true,
      }),
    );
    setName('');
  };

  const handleOpen = (member: (typeof members)[number]) => {
    dispatch(openFormationBoardMemberThunk(member));
    router.push(FORMATION_BOARD_MEMBER_DETAIL_PATH);
  };

  return (
    <section>
      <StepStatusHeader stepKey={stepKey} title={title} />

      {showOfficers ? (
        <div className={styles.block}>
          <h2 className={styles.subheading}>Officers</h2>
          <InlineOfficersSection />
        </div>
      ) : null}

      {studioDomain ? (
        <div className={styles.block}>
          <StudioPane domain={studioDomain} />
        </div>
      ) : (
        <div className={styles.block}>
          <h2 className={styles.subheading}>Board members</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Incorporator</th>
                <th className={styles.th} />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className={styles.tr}>
                  <td className={styles.td}>{member.full_name}</td>
                  <td className={styles.td}>{member.email || '—'}</td>
                  <td className={styles.td}>{member.is_incorporator ? 'Yes' : 'No'}</td>
                  <td className={styles.td}>
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() => handleOpen(member)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() => void dispatch(deleteFormationBoardMemberThunk(member.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.addRow}>
            <input
              className={styles.input}
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="button" className={styles.primaryButton} onClick={() => void handleAdd()}>
              Add member
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  block: `mt-6`,
  subheading: `text-lg font-medium text-slate-900`,
  table: `mt-3 w-full border-collapse text-sm`,
  th: `border-b border-slate-200 px-3 py-2 text-left font-medium text-slate-600`,
  tr: `border-b border-slate-100`,
  td: `px-3 py-2`,
  linkButton: `mr-2 text-slate-700 underline hover:text-slate-900`,
  dangerButton: `text-red-600 hover:text-red-800`,
  addRow: `mt-4 flex gap-2`,
  input: `flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  primaryButton: `rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800`,
};

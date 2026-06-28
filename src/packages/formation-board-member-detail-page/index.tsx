'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMATION_WORKSPACE_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFormationBoardMemberThunk } from '@/store/thunks';

/**
 * Board member detail — edit contact info (ADR 008 static route).
 */
export const FormationBoardMemberDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const member = useAppSelector((s) => s.currentFormationBoardMember);
  const [fullName, setFullName] = useState(member.full_name);
  const [email, setEmail] = useState(member.email);
  const [phone, setPhone] = useState(member.phone);

  if (!member.id) {
    return null;
  }

  const handleSave = async () => {
    const code = await dispatch(
      updateFormationBoardMemberThunk({
        full_name: fullName,
        email,
        phone,
      }),
    );
    if (code === 200) {
      router.push(FORMATION_WORKSPACE_PATH);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Board member</h1>
      <label className={styles.label}>Full name</label>
      <input
        className={styles.input}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <label className={styles.label}>Email</label>
      <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className={styles.label}>Phone</label>
      <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={() => void handleSave()}>
          Save
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => router.push(FORMATION_WORKSPACE_PATH)}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: `mx-auto max-w-lg flex flex-col gap-3`,
  title: `text-2xl font-semibold text-slate-900`,
  label: `text-sm font-medium text-slate-700`,
  input: `rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  actions: `mt-4 flex gap-2`,
  primaryButton: `rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800`,
  secondaryButton: `rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50`,
};

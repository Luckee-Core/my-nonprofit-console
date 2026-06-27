'use client';

import { useState } from 'react';

type OfficerRowProps = {
  role: string;
  initialName: string;
  onSave: (name: string) => void;
};

/**
 * Single officer role row with name input and save.
 */
export const OfficerRow = ({ role, initialName, onSave }: OfficerRowProps) => {
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
  officerRow: `mb-2 flex flex-wrap items-center gap-2`,
  officerLabel: `w-24 text-sm font-medium capitalize text-slate-700`,
  input: `rounded border border-slate-300 px-3 py-2 text-sm`,
  button: `rounded bg-slate-900 px-3 py-2 text-sm text-white`,
};

'use client';

import type { FormationFiling, FormationFilingStatus } from '@/model/formation';
import { FILING_LABELS, FILING_STATUSES } from '../constants';

type FilingRowProps = {
  filing: FormationFiling;
  onUpdateNotes: (id: string, notes: string) => void;
  onUpdateStatus: (id: string, status: FormationFilingStatus) => void;
};

/**
 * One filing tracker row with notes and status.
 */
export const FilingRow = ({ filing, onUpdateNotes, onUpdateStatus }: FilingRowProps) => {
  return (
    <li className={styles.item}>
      <div>
        <p className={styles.title}>{FILING_LABELS[filing.filing_type] ?? filing.filing_type}</p>
        <input
          className={styles.notes}
          placeholder="Notes"
          defaultValue={filing.notes}
          onBlur={(e) => onUpdateNotes(filing.id, e.target.value)}
        />
      </div>
      <select
        className={styles.select}
        value={filing.status}
        onChange={(e) => onUpdateStatus(filing.id, e.target.value as FormationFilingStatus)}
      >
        {FILING_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace('_', ' ')}
          </option>
        ))}
      </select>
    </li>
  );
};

const styles = {
  item: `flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:justify-between`,
  title: `font-medium text-slate-900`,
  notes: `mt-2 w-full rounded border border-slate-200 px-2 py-1 text-sm`,
  select: `rounded border border-slate-300 px-2 py-1 text-sm`,
};

'use client';

import type { FormationCase } from '@/model/formation';

type NonprofitListItemProps = {
  row: FormationCase;
  onContinue: (id: string) => void;
};

/**
 * One nonprofit row on the dashboard list.
 */
export const NonprofitListItem = ({ row, onContinue }: NonprofitListItemProps) => {
  return (
    <li className={styles.listItem}>
      <div>
        <p className={styles.orgName}>{row.working_name || row.legal_name || 'Unnamed'}</p>
        <p className={styles.orgMeta}>
          {row.status.replace('_', ' ')} · updated {new Date(row.updated_at).toLocaleDateString()}
        </p>
      </div>
      <button type="button" className={styles.linkButton} onClick={() => onContinue(row.id)}>
        Continue
      </button>
    </li>
  );
};

const styles = {
  listItem: `flex items-center justify-between gap-4 px-4 py-3`,
  orgName: `font-medium text-slate-900`,
  orgMeta: `text-xs text-slate-500`,
  linkButton: `text-sm font-medium text-slate-700 hover:text-slate-900`,
};

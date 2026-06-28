'use client';

import type { FormationFiling, FormationFilingStatus } from '@/model/formation';
import { FILING_LABELS, FILING_STATUSES } from '../../filings/constants';
import { useAppDispatch } from '@/store';
import { updateFormationFilingThunk } from '@/store/thunks';

type InlineFilingPanelProps = {
  filing: FormationFiling;
};

/**
 * Filing tracker row with status, filed date, confirmation ref, and notes.
 */
export const InlineFilingPanel = ({ filing }: InlineFilingPanelProps) => {
  const dispatch = useAppDispatch();

  const update = (patch: Record<string, unknown>) => {
    void dispatch(updateFormationFilingThunk({ id: filing.id, ...patch }));
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>{FILING_LABELS[filing.filing_type] ?? filing.filing_type}</h3>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select
            className={styles.select}
            defaultValue={filing.status}
            onChange={(e) => update({ status: e.target.value as FormationFilingStatus })}
          >
            {FILING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Filed date</span>
          <input
            className={styles.input}
            type="date"
            defaultValue={filing.filed_at?.slice(0, 10) ?? ''}
            onBlur={(e) =>
              update({ filed_at: e.target.value ? `${e.target.value}T00:00:00.000Z` : null })
            }
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Confirmation #</span>
          <input
            className={styles.input}
            placeholder="Tracking or confirmation number"
            defaultValue={filing.confirmation_ref}
            onBlur={(e) => update({ confirmation_ref: e.target.value })}
          />
        </label>
        <label className={styles.fieldFull}>
          <span className={styles.label}>Notes</span>
          <textarea
            className={styles.textarea}
            rows={2}
            placeholder="Portal used, fees paid, etc."
            defaultValue={filing.notes}
            onBlur={(e) => update({ notes: e.target.value })}
          />
        </label>
      </div>
    </section>
  );
};

const styles = {
  card: `rounded-lg border border-slate-200 bg-slate-50 p-4`,
  title: `text-sm font-semibold text-slate-900`,
  grid: `mt-3 grid gap-3 sm:grid-cols-2`,
  field: `flex flex-col gap-1`,
  fieldFull: `flex flex-col gap-1 sm:col-span-2`,
  label: `text-xs font-medium text-slate-600`,
  select: `rounded-lg border border-slate-300 px-2 py-1.5 text-sm`,
  input: `rounded-lg border border-slate-300 px-2 py-1.5 text-sm`,
  textarea: `rounded-lg border border-slate-300 px-2 py-1.5 text-sm`,
};

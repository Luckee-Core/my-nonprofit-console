'use client';

import { useMemo } from 'react';
import { FormationCaseHeader, FormationDetailGuard, useFormationCaseId } from '../shared';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFormationFilingThunk } from '@/store/thunks';
import type { FormationFilingStatus } from '@/model/formation';

const FILING_LABELS: Record<string, string> = {
  pa_articles: 'PA Articles of Incorporation',
  pa_publication: 'Newspaper publication',
  irs_ein: 'IRS EIN',
  irs_1023_ez: 'IRS 501(c)(3) application',
  pa_bco_10: 'PA BCO-10 charitable registration',
  philly_tax_account: 'Philadelphia tax account',
  philly_activity_license: 'Philadelphia nonprofit activity license',
};

const STATUSES: FormationFilingStatus[] = [
  'not_started',
  'in_progress',
  'submitted',
  'confirmed',
  'not_applicable',
];

/**
 * Filings tab — track external submission status.
 */
export const FormationFilingsTab = () => {
  const dispatch = useAppDispatch();
  const caseId = useFormationCaseId();
  const filingsDump = useAppSelector((s) => s.formationFilings);

  const filings = useMemo(
    () => Object.values(filingsDump).filter((f) => f.formation_case_id === caseId),
    [filingsDump, caseId],
  );

  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      <ul className={styles.list}>
        {filings.map((filing) => (
          <li key={filing.id} className={styles.item}>
            <div>
              <p className={styles.title}>{FILING_LABELS[filing.filing_type] ?? filing.filing_type}</p>
              <input
                className={styles.notes}
                placeholder="Notes"
                defaultValue={filing.notes}
                onBlur={(e) =>
                  void dispatch(updateFormationFilingThunk({ id: filing.id, notes: e.target.value }))
                }
              />
            </div>
            <select
              className={styles.select}
              value={filing.status}
              onChange={(e) =>
                void dispatch(
                  updateFormationFilingThunk({
                    id: filing.id,
                    status: e.target.value,
                  }),
                )
              }
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace('_', ' ')}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </FormationDetailGuard>
  );
};

const styles = {
  list: `space-y-3`,
  item: `flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:justify-between`,
  title: `font-medium text-slate-900`,
  notes: `mt-2 w-full rounded border border-slate-200 px-2 py-1 text-sm`,
  select: `rounded border border-slate-300 px-2 py-1 text-sm`,
};

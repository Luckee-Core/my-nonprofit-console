import { requestApi } from '@/api/_shared';
import type { FormationFiling } from '@/model/formation';

export const listFormationFilingsForCase = (formationCaseId: string) =>
  requestApi<FormationFiling[]>(
    `/api/formation-filings/list-for-case?formationCaseId=${encodeURIComponent(formationCaseId)}`,
  );

export const updateFormationFiling = (body: Record<string, unknown>) =>
  requestApi<FormationFiling>('/api/formation-filings/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

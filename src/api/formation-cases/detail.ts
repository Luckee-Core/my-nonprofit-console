import { requestApi } from '@/api/_shared';
import type { FormationCaseBundle } from '@/model/formation';

export const getFormationCaseById = (id: string) =>
  requestApi<FormationCaseBundle>(`/api/formation-cases/get-by-id?id=${encodeURIComponent(id)}`);

export const updateFormationCase = (body: Record<string, unknown>) =>
  requestApi<FormationCaseBundle['formationCase']>('/api/formation-cases/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

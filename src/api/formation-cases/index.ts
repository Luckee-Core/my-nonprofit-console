import { requestApi } from '@/api/_shared';
import type { FormationCase, SetupStatus } from '@/model/formation';

export const getSetupStatus = () => requestApi<SetupStatus>('/api/setup/status');

export const listFormationCases = () => requestApi<FormationCase[]>('/api/formation-cases/list');

export const createFormationCase = (body: {
  working_name: string;
  legal_name?: string;
  mission_statement?: string;
  charitable_purpose_summary?: string;
}) =>
  requestApi<FormationCase>('/api/formation-cases/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

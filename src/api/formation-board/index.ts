import { requestApi } from '@/api/_shared';
import type { FormationBoardMember, FormationOfficer } from '@/model/formation';

export type FormationBoardBundle = {
  boardMembers: FormationBoardMember[];
  officers: FormationOfficer[];
};

export const getFormationBoardForCase = (formationCaseId: string) =>
  requestApi<FormationBoardBundle>(
    `/api/formation-board/get-for-case?formationCaseId=${encodeURIComponent(formationCaseId)}`,
  );

export const createFormationBoardMember = (body: {
  formation_case_id: string;
  full_name: string;
  email?: string;
  phone?: string;
  is_incorporator?: boolean;
}) =>
  requestApi<FormationBoardMember>('/api/formation-board/create-member', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const deleteFormationBoardMember = (id: string) =>
  requestApi<void>(`/api/formation-board/delete-member?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

export const upsertFormationOfficer = (body: {
  formation_case_id: string;
  role: string;
  full_name: string;
  email?: string;
}) =>
  requestApi<FormationOfficer>('/api/formation-board/upsert-officer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const updateFormationBoardMember = (body: {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  address?: Record<string, string>;
  is_incorporator?: boolean;
  sort_order?: number;
}) =>
  requestApi<FormationBoardMember>('/api/formation-board/update-member', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

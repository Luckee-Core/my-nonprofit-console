import { requestApi } from '@/api/_shared';
import type { FormationStudioChatMessage, FormationStudioDomain } from '@/model/formation-workspace';

export type StudioLedgerResponse = {
  messages: FormationStudioChatMessage[];
};

export type StudioMessageResponse = {
  message: FormationStudioChatMessage;
  messages: FormationStudioChatMessage[];
};

export const getFormationStudioLedger = (domain: FormationStudioDomain, formationCaseId: string) =>
  requestApi<StudioLedgerResponse>(
    `/api/formation-studio/${domain}/ledger?formation_case_id=${encodeURIComponent(formationCaseId)}`,
  );

export const postFormationStudioMessage = (
  domain: FormationStudioDomain,
  body: { formation_case_id: string; content: string },
) =>
  requestApi<StudioMessageResponse>(`/api/formation-studio/${domain}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const postFormationStudioApply = (
  domain: FormationStudioDomain,
  body: { formation_case_id: string; suggested_value: string },
) =>
  requestApi<{ appliedValue: string }>(`/api/formation-studio/${domain}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

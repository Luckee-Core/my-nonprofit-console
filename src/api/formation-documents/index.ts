import { requestApi } from '@/api/_shared';
import type { FormationDocument, FormationDocumentType } from '@/model/formation';

export const listFormationDocumentsForCase = (formationCaseId: string) =>
  requestApi<FormationDocument[]>(
    `/api/formation-documents/list-for-case?formationCaseId=${encodeURIComponent(formationCaseId)}`,
  );

export const generateFormationDocument = (body: {
  formation_case_id: string;
  document_type: FormationDocumentType;
}) =>
  requestApi<{
    document: FormationDocument;
    mission_statement?: string;
    charitable_purpose_summary?: string;
  }>('/api/formation-documents/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const updateFormationDocument = (body: {
  id: string;
  content?: string;
  status?: string;
}) =>
  requestApi<FormationDocument>('/api/formation-documents/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

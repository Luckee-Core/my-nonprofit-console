import { requestApi } from '@/api/_shared';
import type { FormationContextFact, FormationContextSection } from '@/model/formation-workspace';

export type FormationContextBundle = {
  sections: FormationContextSection[];
  facts: FormationContextFact[];
};

export const getFormationContext = (formationCaseId: string) =>
  requestApi<FormationContextBundle>(
    `/api/formation-context/list?formation_case_id=${encodeURIComponent(formationCaseId)}`,
  );

export const upsertFormationContextFact = (body: {
  formation_case_id: string;
  section_id: string;
  fact_key: string;
  fact_value: string;
  sort_order?: number;
}) =>
  requestApi<FormationContextFact>('/api/formation-context/upsert-fact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const deleteFormationContextFact = (id: string) =>
  requestApi<{ id: string }>(`/api/formation-context/fact/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

import { requestApi } from '@/api/_shared';
import type { FormationAiPrompt } from '@/model/formation-workspace';

export const listFormationAiPrompts = () =>
  requestApi<FormationAiPrompt[]>('/api/formation-ai-prompts/list');

export const getFormationAiPromptById = (id: string) =>
  requestApi<FormationAiPrompt>(`/api/formation-ai-prompts/${encodeURIComponent(id)}`);

export const createFormationAiPromptVersion = (body: {
  flow: string;
  name: string;
  system_prompt: string;
}) =>
  requestApi<FormationAiPrompt>('/api/formation-ai-prompts/create-version', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

import type { ApiDocsCatalog } from './types';

/**
 * Fetches the API documentation catalog from Express (via Next rewrite).
 */
export const getApiDocsCatalog = async (): Promise<ApiDocsCatalog | null> => {
  try {
    const res = await fetch('/api-docs.json');
    const json = (await res.json()) as { success?: boolean; data?: ApiDocsCatalog };
    if (!json.success || !json.data) {
      return null;
    }
    return json.data;
  } catch {
    return null;
  }
};

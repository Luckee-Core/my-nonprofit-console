import type { ApiResponse } from '@/api/_shared/types';

const isApiResponseShape = (value: unknown): value is ApiResponse<unknown> => {
  return typeof value === 'object' && value !== null && 'success' in value;
};

/**
 * Parses JSON from a fetch response into ApiResponse<T>.
 */
export const parseApiJson = async <T>(res: Response, requestUrl?: string): Promise<ApiResponse<T>> => {
  const urlLabel = requestUrl ? ` for ${requestUrl}` : '';
  let bodyText = '';

  try {
    bodyText = await res.text();
  } catch {
    return { success: false, error: `No response body${urlLabel} (HTTP ${res.status})` };
  }

  if (!bodyText.trim()) {
    return {
      success: false,
      error: `Empty response${urlLabel} (HTTP ${res.status}). Is Express running on port 3011?`,
    };
  }

  let json: unknown;
  try {
    json = JSON.parse(bodyText) as unknown;
  } catch {
    return { success: false, error: `Invalid JSON${urlLabel} (HTTP ${res.status})` };
  }

  if (!isApiResponseShape(json)) {
    return { success: false, error: `Invalid API shape${urlLabel}` };
  }

  return json as ApiResponse<T>;
};

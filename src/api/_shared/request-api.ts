import { parseApiJson } from '@/api/_shared/parse-api-json';
import type { ApiResult } from '@/api/_shared/types';

/**
 * Same-origin fetch + JSON parse. Never throws.
 */
export const requestApi = async <T>(url: string, init?: RequestInit): Promise<ApiResult<T>> => {
  try {
    const res = await fetch(url, init);
    const parsed = await parseApiJson<T>(res, url);
    return { ...parsed, httpStatus: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: `Network error: ${message}`, httpStatus: 0 };
  }
};

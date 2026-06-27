/**
 * Slugifies API docs group/endpoint labels for anchor ids.
 */
export const slugifyApiDocs = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

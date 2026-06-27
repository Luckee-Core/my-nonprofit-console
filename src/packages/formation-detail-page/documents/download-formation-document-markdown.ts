import type { FormationDocument } from '@/model/formation';

/**
 * Trigger a browser download of document content as markdown.
 */
export const downloadFormationDocumentMarkdown = (doc: FormationDocument, caseName: string): void => {
  const filename = `${caseName.replace(/\s+/g, '-').toLowerCase()}-${doc.document_type}.md`;
  const blob = new Blob([doc.content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

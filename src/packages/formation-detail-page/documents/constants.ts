import type { FormationDocumentType } from '@/model/formation';

export const AI_DOCUMENTS: { type: FormationDocumentType; label: string }[] = [
  { type: 'mission_draft', label: 'Mission statement' },
  { type: 'articles', label: 'Articles of incorporation' },
  { type: 'bylaws', label: 'Bylaws' },
  { type: 'conflict_of_interest', label: 'Conflict of interest policy' },
  { type: 'board_consent', label: 'Board consent resolutions' },
];

import type { FormationDocumentType, FormationFilingType } from '@/model/formation';

export type ChecklistStepKey =
  | 'define_mission_board'
  | 'draft_articles'
  | 'file_pa_articles'
  | 'publish_notice'
  | 'first_board_meeting'
  | 'obtain_ein'
  | 'adopt_bylaws'
  | 'apply_501c3'
  | 'open_bank_account'
  | 'pa_bco_10'
  | 'philly_license'
  | 'ongoing_compliance';

export type ChecklistPanelType =
  | 'mission_board'
  | 'articles_draft'
  | 'filings'
  | 'first_board_meeting'
  | 'ein'
  | 'bylaws'
  | 'apply_501c3'
  | 'notes_only'
  | 'ongoing_compliance';

export type ChecklistStepConfig = {
  stepKey: ChecklistStepKey;
  panelType: ChecklistPanelType;
  filingTypes?: FormationFilingType[];
  documentTypes?: FormationDocumentType[];
};

export const CHECKLIST_STEP_CONFIG: Record<ChecklistStepKey, ChecklistStepConfig> = {
  define_mission_board: { stepKey: 'define_mission_board', panelType: 'mission_board' },
  draft_articles: {
    stepKey: 'draft_articles',
    panelType: 'articles_draft',
    documentTypes: ['articles'],
  },
  file_pa_articles: {
    stepKey: 'file_pa_articles',
    panelType: 'filings',
    filingTypes: ['pa_articles'],
  },
  publish_notice: {
    stepKey: 'publish_notice',
    panelType: 'filings',
    filingTypes: ['pa_publication'],
  },
  first_board_meeting: {
    stepKey: 'first_board_meeting',
    panelType: 'first_board_meeting',
    documentTypes: ['board_consent'],
  },
  obtain_ein: {
    stepKey: 'obtain_ein',
    panelType: 'ein',
    filingTypes: ['irs_ein'],
  },
  adopt_bylaws: {
    stepKey: 'adopt_bylaws',
    panelType: 'bylaws',
    documentTypes: ['bylaws', 'conflict_of_interest'],
  },
  apply_501c3: {
    stepKey: 'apply_501c3',
    panelType: 'apply_501c3',
    filingTypes: ['irs_1023_ez'],
  },
  open_bank_account: { stepKey: 'open_bank_account', panelType: 'notes_only' },
  pa_bco_10: {
    stepKey: 'pa_bco_10',
    panelType: 'filings',
    filingTypes: ['pa_bco_10'],
  },
  philly_license: {
    stepKey: 'philly_license',
    panelType: 'filings',
    filingTypes: ['philly_tax_account', 'philly_activity_license'],
  },
  ongoing_compliance: { stepKey: 'ongoing_compliance', panelType: 'ongoing_compliance' },
};

export const getChecklistStepConfig = (stepKey: string): ChecklistStepConfig | null => {
  if (stepKey in CHECKLIST_STEP_CONFIG) {
    return CHECKLIST_STEP_CONFIG[stepKey as ChecklistStepKey];
  }
  return null;
};

export type FormationCaseStatus =
  | 'draft'
  | 'in_progress'
  | 'incorporated'
  | 'exempt_pending'
  | 'active'
  | 'archived';

export type IrsExemptionStatus = 'not_started' | 'submitted' | 'approved' | 'denied';

export type FormationAddress = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export type FormationCase = {
  id: string;
  working_name: string;
  legal_name: string;
  mission_statement: string;
  charitable_purpose_summary: string;
  status: FormationCaseStatus;
  registered_office_address: FormationAddress;
  ein: string;
  fiscal_year_end_month: number | null;
  irs_exemption_status: IrsExemptionStatus;
  created_at: string;
  updated_at: string;
};

export type FormationChecklistStepStatus = 'not_started' | 'in_progress' | 'complete' | 'skipped';

export type FormationChecklistStep = {
  id: string;
  step_key: string;
  title: string;
  description: string;
  sort_order: number;
  jurisdiction: string;
};

export type FormationCaseStepStatus = {
  id: string;
  formation_case_id: string;
  checklist_step_id: string;
  status: FormationChecklistStepStatus;
  notes: string;
  updated_at: string;
};

export type FormationBoardMember = {
  id: string;
  formation_case_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: FormationAddress;
  is_incorporator: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type FormationOfficerRole = 'president' | 'secretary' | 'treasurer' | 'other';

export type FormationOfficer = {
  id: string;
  formation_case_id: string;
  role: FormationOfficerRole;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type FormationDocumentType =
  | 'articles'
  | 'bylaws'
  | 'conflict_of_interest'
  | 'board_consent'
  | 'mission_draft'
  | 'form_1023_ez_checklist'
  | 'bco_10_checklist'
  | 'philly_license_checklist';

export type FormationDocumentStatus = 'draft' | 'reviewed' | 'approved' | 'filed';

export type FormationDocument = {
  id: string;
  formation_case_id: string;
  document_type: FormationDocumentType;
  content: string;
  version: number;
  status: FormationDocumentStatus;
  latest_exchange_id: string | null;
  created_at: string;
  updated_at: string;
};

export type FormationFilingType =
  | 'pa_articles'
  | 'pa_publication'
  | 'irs_ein'
  | 'irs_1023_ez'
  | 'pa_bco_10'
  | 'philly_tax_account'
  | 'philly_activity_license';

export type FormationFilingStatus =
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'confirmed'
  | 'not_applicable';

export type FormationFiling = {
  id: string;
  formation_case_id: string;
  filing_type: FormationFilingType;
  status: FormationFilingStatus;
  filed_at: string | null;
  confirmation_ref: string;
  notes: string;
  updated_at: string;
};

export type FormationCaseBundle = {
  formationCase: FormationCase;
  checklistSteps: FormationChecklistStep[];
  stepStatuses: FormationCaseStepStatus[];
  boardMembers: FormationBoardMember[];
  officers: FormationOfficer[];
  documents: FormationDocument[];
  filings: FormationFiling[];
};

export type SetupStatus = {
  supabase: 'ok' | 'missing' | 'error';
  anthropic: 'ok' | 'missing';
  supabaseMessage?: string;
};

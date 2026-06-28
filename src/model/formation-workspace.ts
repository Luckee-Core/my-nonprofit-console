export type FormationStudioDomain =
  | 'mission'
  | 'charitable_purpose'
  | 'articles'
  | 'bylaws'
  | 'conflict_policy'
  | 'board_consent';

export type FormationStudioChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestedValue?: string;
  rationale?: string;
  createdAt: string;
};

export type FormationContextSection = {
  id: string;
  section_key: string;
  label: string;
  description: string;
  sort_order: number;
  created_at: string;
};

export type FormationContextFact = {
  id: string;
  formation_case_id: string;
  section_id: string;
  fact_key: string;
  fact_value: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type FormationAiPrompt = {
  id: string;
  flow: string;
  name: string;
  version: number;
  system_prompt: string;
  is_active: boolean;
  created_at: string;
};

export type WorkspaceNavKey = 'facts' | string;

export type WorkspaceType =
  | 'facts'
  | 'ai_studio'
  | 'data_table'
  | 'filing'
  | 'profile'
  | 'notes'
  | 'hybrid';

export type StepWorkspaceConfig = {
  navKey: WorkspaceNavKey;
  stepKey: string | null;
  title: string;
  workspaceType: WorkspaceType;
  studioDomain?: FormationStudioDomain;
  studioDomains?: FormationStudioDomain[];
  filingTypes?: import('./formation').FormationFilingType[];
  profileFields?: {
    showEin?: boolean;
    showAddress?: boolean;
    showLegalName?: boolean;
  };
};

export const FORMATION_STUDIO_DOMAIN_LABELS: Record<FormationStudioDomain, string> = {
  mission: 'Mission statement',
  charitable_purpose: 'Charitable purpose',
  articles: 'Articles of incorporation',
  bylaws: 'Bylaws',
  conflict_policy: 'Conflict of interest policy',
  board_consent: 'Board consent',
};

export const STEP_WORKSPACE_REGISTRY: StepWorkspaceConfig[] = [
  { navKey: 'facts', stepKey: null, title: 'Facts', workspaceType: 'facts' },
  {
    navKey: 'define_mission',
    stepKey: 'define_mission',
    title: 'Mission statement',
    workspaceType: 'ai_studio',
    studioDomain: 'mission',
  },
  {
    navKey: 'define_charitable_purpose',
    stepKey: 'define_charitable_purpose',
    title: 'Charitable purpose',
    workspaceType: 'ai_studio',
    studioDomain: 'charitable_purpose',
  },
  {
    navKey: 'define_board',
    stepKey: 'define_board',
    title: 'Board',
    workspaceType: 'data_table',
  },
  {
    navKey: 'draft_articles',
    stepKey: 'draft_articles',
    title: 'Articles of incorporation',
    workspaceType: 'ai_studio',
    studioDomain: 'articles',
  },
  {
    navKey: 'file_pa_articles',
    stepKey: 'file_pa_articles',
    title: 'File PA articles',
    workspaceType: 'filing',
    filingTypes: ['pa_articles'],
  },
  {
    navKey: 'publish_notice',
    stepKey: 'publish_notice',
    title: 'Publish notice',
    workspaceType: 'filing',
    filingTypes: ['pa_publication'],
  },
  {
    navKey: 'first_board_meeting',
    stepKey: 'first_board_meeting',
    title: 'First board meeting',
    workspaceType: 'hybrid',
    studioDomain: 'board_consent',
  },
  {
    navKey: 'obtain_ein',
    stepKey: 'obtain_ein',
    title: 'Obtain EIN',
    workspaceType: 'profile',
    filingTypes: ['irs_ein'],
    profileFields: { showEin: true, showAddress: true, showLegalName: true },
  },
  {
    navKey: 'adopt_bylaws',
    stepKey: 'adopt_bylaws',
    title: 'Bylaws & policies',
    workspaceType: 'hybrid',
    studioDomains: ['bylaws', 'conflict_policy'],
  },
  {
    navKey: 'apply_501c3',
    stepKey: 'apply_501c3',
    title: 'Apply for 501(c)(3)',
    workspaceType: 'filing',
    filingTypes: ['irs_1023_ez'],
  },
  {
    navKey: 'open_bank_account',
    stepKey: 'open_bank_account',
    title: 'Open bank account',
    workspaceType: 'notes',
  },
  {
    navKey: 'pa_bco_10',
    stepKey: 'pa_bco_10',
    title: 'PA charitable registration',
    workspaceType: 'filing',
    filingTypes: ['pa_bco_10'],
  },
  {
    navKey: 'philly_license',
    stepKey: 'philly_license',
    title: 'Philadelphia licenses',
    workspaceType: 'filing',
    filingTypes: ['philly_tax_account', 'philly_activity_license'],
  },
  {
    navKey: 'ongoing_compliance',
    stepKey: 'ongoing_compliance',
    title: 'Ongoing compliance',
    workspaceType: 'notes',
  },
];

export const getStepWorkspaceConfig = (navKey: string): StepWorkspaceConfig | null =>
  STEP_WORKSPACE_REGISTRY.find((row) => row.navKey === navKey) ?? null;

export const getDefaultWorkspaceNavKey = (): WorkspaceNavKey => 'define_mission';

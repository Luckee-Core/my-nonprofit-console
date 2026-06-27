import type { FormationFilingStatus } from '@/model/formation';

export const FILING_LABELS: Record<string, string> = {
  pa_articles: 'PA Articles of Incorporation',
  pa_publication: 'Newspaper publication',
  irs_ein: 'IRS EIN',
  irs_1023_ez: 'IRS 501(c)(3) application',
  pa_bco_10: 'PA BCO-10 charitable registration',
  philly_tax_account: 'Philadelphia tax account',
  philly_activity_license: 'Philadelphia nonprofit activity license',
};

export const FILING_STATUSES: FormationFilingStatus[] = [
  'not_started',
  'in_progress',
  'submitted',
  'confirmed',
  'not_applicable',
];

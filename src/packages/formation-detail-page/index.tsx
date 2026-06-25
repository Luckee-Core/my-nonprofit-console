import { redirect } from 'next/navigation';
import { FORMATION_CHECKLIST_PATH } from '@/config/routes';

/**
 * Formation detail hub redirects to checklist tab.
 */
export const FormationDetailHubPage = () => {
  redirect(FORMATION_CHECKLIST_PATH);
};

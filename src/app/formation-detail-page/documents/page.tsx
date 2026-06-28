import { redirect } from 'next/navigation';
import { FORMATION_WORKSPACE_PATH } from '@/config/routes';

export default function Page() {
  redirect(FORMATION_WORKSPACE_PATH);
}

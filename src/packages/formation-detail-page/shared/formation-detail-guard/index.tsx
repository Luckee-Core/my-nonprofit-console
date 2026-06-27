'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components';
import { DASHBOARD_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

type FormationDetailGuardProps = {
  children: React.ReactNode;
};

/**
 * Redirects to dashboard when no current formation case is selected.
 */
export const FormationDetailGuard = ({ children }: FormationDetailGuardProps) => {
  const router = useRouter();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);

  useEffect(() => {
    if (!currentFormationCase.id) {
      router.replace(DASHBOARD_PATH);
    }
  }, [currentFormationCase.id, router]);

  if (!currentFormationCase.id) {
    return null;
  }

  return <AppShell showFormationNav>{children}</AppShell>;
};

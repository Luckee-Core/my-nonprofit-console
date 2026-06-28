'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components';
import { DASHBOARD_PATH } from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { restoreCurrentFormationCaseThunk } from '@/store/thunks';

type FormationDetailGuardProps = {
  children: React.ReactNode;
};

/**
 * Restores the open formation case from the API after refresh, then redirects
 * to the dashboard only when no cases exist.
 */
export const FormationDetailGuard = ({ children }: FormationDetailGuardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    if (currentFormationCase.id) {
      return;
    }

    setIsRestoring(true);
    void dispatch(restoreCurrentFormationCaseThunk()).then((code) => {
      setIsRestoring(false);
      if (code !== 200) {
        router.replace(DASHBOARD_PATH);
      }
    });
  }, [currentFormationCase.id, dispatch, router]);

  if (!currentFormationCase.id) {
    if (isRestoring) {
      return (
        <AppShell>
          <p className={styles.muted}>Loading your nonprofit…</p>
        </AppShell>
      );
    }
    return null;
  }

  return <AppShell>{children}</AppShell>;
};

const styles = {
  muted: `text-sm text-slate-500`,
};

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FORMATION_FACTS_PATH, FORMATION_WORKSPACE_PATH } from '@/config/routes';
import { getDefaultWorkspaceNavKey } from '@/model/formation-workspace';
import { FormationDetailGuard } from '@/packages/formation-detail-page/shared/formation-detail-guard';
import { useAppDispatch, useAppSelector } from '@/store';
import { FormationWorkspaceBuilderActions } from '@/store/builders/formationWorkspaceBuilder';
import { setFormationWorkspaceNavThunk } from '@/store/thunks';
import { FormationSidebar } from './formation-sidebar';
import { FactsPane } from './facts-pane';
import { WorkspacePane } from './workspace-pane';

type FormationWorkspaceShellProps = {
  children?: React.ReactNode;
};

/**
 * Two-column formation workspace — sidebar + main pane.
 */
export const FormationWorkspaceShell = ({ children }: FormationWorkspaceShellProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const formationWorkspaceBuilder = useAppSelector((s) => s.formationWorkspaceBuilder);

  useEffect(() => {
    if (pathname === FORMATION_FACTS_PATH) {
      dispatch(FormationWorkspaceBuilderActions.setFormationWorkspaceNavKey('facts'));
      return;
    }
    if (pathname === FORMATION_WORKSPACE_PATH && formationWorkspaceBuilder.activeNavKey === 'facts') {
      dispatch(setFormationWorkspaceNavThunk(getDefaultWorkspaceNavKey()));
    }
  }, [pathname, dispatch, formationWorkspaceBuilder.activeNavKey]);

  const showFacts = pathname === FORMATION_FACTS_PATH || formationWorkspaceBuilder.activeNavKey === 'facts';

  return (
    <FormationDetailGuard>
      <div className={styles.layout}>
        <FormationSidebar />
        <div className={styles.main}>
          {children}
          {showFacts ? <FactsPane /> : null}
          {pathname === FORMATION_WORKSPACE_PATH ? <WorkspacePane /> : null}
        </div>
      </div>
    </FormationDetailGuard>
  );
};

const styles = {
  layout: `flex min-h-[calc(100vh-120px)]`,
  main: `flex-1 overflow-y-auto p-6 lg:p-8`,
};

'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  AI_PROMPTS_PATH,
  FORMATION_BOARD_MEMBER_DETAIL_PATH,
  FORMATION_FACTS_PATH,
  FORMATION_WORKSPACE_PATH,
} from '@/config/routes';
import {
  STEP_WORKSPACE_REGISTRY,
  type WorkspaceNavKey,
} from '@/model/formation-workspace';
import { useAppDispatch, useAppSelector } from '@/store';
import { openFormationCaseThunk, setFormationWorkspaceNavThunk } from '@/store/thunks';

const statusDotClass: Record<string, string> = {
  not_started: `bg-slate-300`,
  in_progress: `bg-amber-400`,
  complete: `bg-emerald-500`,
  skipped: `bg-slate-200`,
};

/**
 * Left sidebar — case switcher, facts, all formation steps with status badges.
 */
export const FormationSidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formationCases = useAppSelector((s) => s.formationCases);
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationChecklistSteps = useAppSelector((s) => s.formationChecklistSteps);
  const formationCaseStepStatus = useAppSelector((s) => s.formationCaseStepStatus);
  const formationWorkspaceBuilder = useAppSelector((s) => s.formationWorkspaceBuilder);
  const { activeNavKey } = formationWorkspaceBuilder;

  const nonprofits = useMemo(
    () => Object.values(formationCases).sort((a, b) => b.updated_at.localeCompare(a.updated_at)),
    [formationCases],
  );

  const statusByStepKey = useMemo(() => {
    const stepIdToKey = Object.fromEntries(
      Object.values(formationChecklistSteps).map((s) => [s.id, s.step_key]),
    );
    const map: Record<string, string> = {};
    for (const row of Object.values(formationCaseStepStatus)) {
      if (row.formation_case_id !== currentFormationCase.id) {
        continue;
      }
      const key = stepIdToKey[row.checklist_step_id];
      if (key) {
        map[key] = row.status;
      }
    }
    return map;
  }, [formationCaseStepStatus, formationChecklistSteps, currentFormationCase.id]);

  const handleCaseChange = async (id: string) => {
    if (id === currentFormationCase.id) {
      return;
    }
    const code = await dispatch(openFormationCaseThunk(id));
    if (code === 200) {
      router.push(FORMATION_WORKSPACE_PATH);
    }
  };

  const navigate = (navKey: WorkspaceNavKey) => {
    dispatch(setFormationWorkspaceNavThunk(navKey));
    if (navKey === 'facts') {
      router.push(FORMATION_FACTS_PATH);
      return;
    }
    router.push(FORMATION_WORKSPACE_PATH);
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Nonprofit</p>
        <select
          className={styles.select}
          value={currentFormationCase.id}
          onChange={(e) => void handleCaseChange(e.target.value)}
        >
          {nonprofits.map((row) => (
            <option key={row.id} value={row.id}>
              {row.working_name || row.legal_name || 'Untitled'}
            </option>
          ))}
        </select>
      </div>

      <nav className={styles.nav}>
        {STEP_WORKSPACE_REGISTRY.map((item) => {
          const status = item.stepKey ? statusByStepKey[item.stepKey] ?? 'not_started' : null;
          const isActive = activeNavKey === item.navKey;
          return (
            <button
              key={item.navKey}
              type="button"
              className={isActive ? styles.navItemActive : styles.navItem}
              onClick={() => navigate(item.navKey)}
            >
              <span className={styles.navTitle}>{item.title}</span>
              {status ? (
                <span className={`${styles.statusDot} ${statusDotClass[status] ?? statusDotClass.not_started}`} />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button type="button" className={styles.adminLink} onClick={() => router.push(AI_PROMPTS_PATH)}>
          AI Prompts
        </button>
      </div>
    </aside>
  );
};

const styles = {
  aside: `flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white`,
  section: `border-b border-slate-200 p-4`,
  sectionLabel: `text-xs font-medium uppercase tracking-wide text-slate-500`,
  select: `mt-2 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm`,
  nav: `flex flex-1 flex-col gap-0.5 overflow-y-auto p-2`,
  navItem: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100`,
  navItemActive: `flex w-full items-center justify-between rounded-lg bg-slate-900 px-3 py-2 text-left text-sm font-medium text-white`,
  navTitle: `truncate pr-2`,
  statusDot: `h-2 w-2 shrink-0 rounded-full`,
  footer: `border-t border-slate-200 p-3`,
  adminLink: `text-sm text-slate-600 hover:text-slate-900`,
};

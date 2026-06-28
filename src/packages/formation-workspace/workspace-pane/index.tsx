'use client';

import { useMemo, useState } from 'react';
import type { FormationFilingType } from '@/model/formation';
import { InlineFilingPanel } from '@/packages/formation-detail-page/shared/inline-filing-panel';
import { CaseProfileFields } from '@/packages/formation-detail-page/shared/case-profile-fields';
import { StepNotesField } from '@/packages/formation-detail-page/shared/step-notes-field';
import { useAppDispatch, useAppSelector } from '@/store';
import { FormationWorkspaceBuilderActions } from '@/store/builders/formationWorkspaceBuilder';
import {
  FORMATION_STUDIO_DOMAIN_LABELS,
  getStepWorkspaceConfig,
  type FormationStudioDomain,
} from '@/model/formation-workspace';
import { StepStatusHeader } from '../step-status-header';
import { StudioPane } from '../studio-pane';
import { BoardPane } from '../board-pane';

/**
 * Renders the active workspace pane based on sidebar nav selection.
 */
export const WorkspacePane = () => {
  const dispatch = useAppDispatch();
  const formationWorkspaceBuilder = useAppSelector((s) => s.formationWorkspaceBuilder);
  const formationChecklistSteps = useAppSelector((s) => s.formationChecklistSteps);
  const formationCaseStepStatus = useAppSelector((s) => s.formationCaseStepStatus);
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const { activeNavKey, activeStudioDomainTab } = formationWorkspaceBuilder;

  const config = getStepWorkspaceConfig(activeNavKey);

  const checklistStepId = useMemo(() => {
    if (!config?.stepKey) {
      return '';
    }
    return Object.values(formationChecklistSteps).find((s) => s.step_key === config.stepKey)?.id ?? '';
  }, [config?.stepKey, formationChecklistSteps]);

  const statusRow = useMemo(() => {
    if (!checklistStepId) {
      return undefined;
    }
    return Object.values(formationCaseStepStatus).find(
      (row) =>
        row.formation_case_id === currentFormationCase.id &&
        row.checklist_step_id === checklistStepId,
    );
  }, [checklistStepId, formationCaseStepStatus, currentFormationCase.id]);

  if (!config || config.workspaceType === 'facts') {
    return null;
  }

  if (config.workspaceType === 'ai_studio' && config.studioDomain) {
    return (
      <section>
        <StepStatusHeader stepKey={config.stepKey ?? ''} title={config.title} />
        <StudioPane domain={config.studioDomain} />
      </section>
    );
  }

  if (config.workspaceType === 'data_table' && config.navKey === 'define_board') {
    return <BoardPane stepKey={config.stepKey ?? ''} title={config.title} />;
  }

  if (config.workspaceType === 'hybrid' && config.navKey === 'first_board_meeting') {
    return (
      <BoardPane
        stepKey={config.stepKey ?? ''}
        title={config.title}
        showOfficers
        studioDomain="board_consent"
      />
    );
  }

  if (config.workspaceType === 'hybrid' && config.studioDomains) {
    const domains = config.studioDomains;
    const activeDomain = (activeStudioDomainTab || domains[0]) as FormationStudioDomain;

    return (
      <section>
        <StepStatusHeader stepKey={config.stepKey ?? ''} title={config.title} />
        <div className={styles.tabs}>
          {domains.map((domain) => (
            <button
              key={domain}
              type="button"
              className={activeDomain === domain ? styles.tabActive : styles.tab}
              onClick={() =>
                dispatch(FormationWorkspaceBuilderActions.setFormationWorkspaceStudioTab(domain))
              }
            >
              {FORMATION_STUDIO_DOMAIN_LABELS[domain]}
            </button>
          ))}
        </div>
        <StudioPane domain={activeDomain} />
      </section>
    );
  }

  if (config.workspaceType === 'filing' && config.filingTypes) {
    return (
      <FilingPane
        stepKey={config.stepKey ?? ''}
        title={config.title}
        filingTypes={config.filingTypes}
      />
    );
  }

  if (config.workspaceType === 'profile') {
    return (
      <ProfilePane
        stepKey={config.stepKey ?? ''}
        title={config.title}
        filingTypes={config.filingTypes}
        profileFields={config.profileFields}
      />
    );
  }

  if (config.workspaceType === 'notes' && config.stepKey) {
    return (
      <section>
        <StepStatusHeader stepKey={config.stepKey} title={config.title} />
        {statusRow && checklistStepId ? (
          <StepNotesField
            formationCaseId={currentFormationCase.id}
            checklistStepId={checklistStepId}
            status={statusRow}
          />
        ) : null}
        <p className={styles.guidance}>
          Track progress and notes for this step. Mark status above when you complete key actions.
        </p>
      </section>
    );
  }

  return <p className={styles.muted}>Workspace not configured.</p>;
};

type FilingPaneProps = {
  stepKey: string;
  title: string;
  filingTypes: FormationFilingType[];
};

const FilingPane = ({ stepKey, title, filingTypes }: FilingPaneProps) => {
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationFilings = useAppSelector((s) => s.formationFilings);

  const filings = useMemo(() => {
    const rows = Object.values(formationFilings).filter(
      (f) => f.formation_case_id === currentFormationCase.id,
    );
    return filingTypes
      .map((type) => rows.find((f) => f.filing_type === type))
      .filter((f): f is NonNullable<typeof f> => f !== undefined);
  }, [formationFilings, currentFormationCase.id, filingTypes]);

  return (
    <section>
      <StepStatusHeader stepKey={stepKey} title={title} />
      <div className={styles.stack}>
        {filings.map((filing) => (
          <InlineFilingPanel key={filing.id} filing={filing} />
        ))}
      </div>
    </section>
  );
};

type ProfilePaneProps = {
  stepKey: string;
  title: string;
  filingTypes?: FormationFilingType[];
  profileFields?: {
    showEin?: boolean;
    showAddress?: boolean;
    showLegalName?: boolean;
  };
};

const ProfilePane = ({ stepKey, title, filingTypes, profileFields }: ProfilePaneProps) => {
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationFilings = useAppSelector((s) => s.formationFilings);

  const filings = useMemo(() => {
    if (!filingTypes?.length) {
      return [];
    }
    const rows = Object.values(formationFilings).filter(
      (f) => f.formation_case_id === currentFormationCase.id,
    );
    return filingTypes
      .map((type) => rows.find((f) => f.filing_type === type))
      .filter((f): f is NonNullable<typeof f> => f !== undefined);
  }, [formationFilings, currentFormationCase.id, filingTypes]);

  return (
    <section>
      <StepStatusHeader stepKey={stepKey} title={title} />
      <CaseProfileFields
        showEin={profileFields?.showEin}
        showAddress={profileFields?.showAddress}
        showLegalName={profileFields?.showLegalName}
      />
      {filings.length > 0 ? (
        <div className={styles.stack}>
          {filings.map((filing) => (
            <InlineFilingPanel key={filing.id} filing={filing} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

const styles = {
  tabs: `mb-4 flex gap-2`,
  tab: `rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50`,
  tabActive: `rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white`,
  stack: `mt-4 flex flex-col gap-4`,
  guidance: `mt-4 text-sm text-slate-600`,
  muted: `text-sm text-slate-500`,
};

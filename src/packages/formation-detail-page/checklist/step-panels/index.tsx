'use client';

import { useMemo } from 'react';
import type { FormationCaseStepStatus, FormationChecklistStep } from '@/model/formation';
import type { FormationFilingType, FormationDocumentType } from '@/model/formation';
import { getChecklistStepConfig } from '../step-config';
import { CaseProfileFields } from '../../shared/case-profile-fields';
import { InlineBoardSection } from '../../shared/inline-board-section';
import { InlineOfficersSection } from '../../shared/inline-officers-section';
import { InlineDocumentPanel } from '../../shared/inline-document-panel';
import { InlineFilingPanel } from '../../shared/inline-filing-panel';
import { StepNotesField } from '../../shared/step-notes-field';
import { useAppSelector } from '@/store';

type StepPanelProps = {
  step: FormationChecklistStep;
  status: FormationCaseStepStatus | undefined;
};

const FilingsSection = ({ filingTypes }: { filingTypes: FormationFilingType[] }) => {
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationFilings = useAppSelector((s) => s.formationFilings);
  const caseId = currentFormationCase.id;

  const filings = useMemo(() => {
    const rows = Object.values(formationFilings).filter((f) => f.formation_case_id === caseId);
    return filingTypes
      .map((type) => rows.find((f) => f.filing_type === type))
      .filter((f): f is NonNullable<typeof f> => f !== undefined);
  }, [formationFilings, caseId, filingTypes]);

  return (
    <div className={styles.stack}>
      {filings.map((filing) => (
        <InlineFilingPanel key={`${filing.id}-${filing.updated_at}`} filing={filing} />
      ))}
    </div>
  );
};

const DocumentsSection = ({ documentTypes }: { documentTypes: FormationDocumentType[] }) => (
  <div className={styles.stack}>
    {documentTypes.map((type) => (
      <InlineDocumentPanel key={type} documentType={type} />
    ))}
  </div>
);

/**
 * Renders the actionable panel for a checklist step by step_key.
 */
export const StepPanel = ({ step, status }: StepPanelProps) => {
  const config = getChecklistStepConfig(step.step_key);
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const caseId = currentFormationCase.id;
  const checklistStepId = step.id;

  if (!config) {
    return <p className={styles.muted}>No panel configured for this step.</p>;
  }

  const notesField = (
    <StepNotesField
      formationCaseId={caseId}
      checklistStepId={checklistStepId}
      status={status}
    />
  );

  switch (config.panelType) {
    case 'mission_board':
      return (
        <div className={styles.stack}>
          <CaseProfileFields showMission showCharitablePurpose />
          <InlineBoardSection />
        </div>
      );
    case 'articles_draft':
      return (
        <div className={styles.stack}>
          <CaseProfileFields showLegalName showAddress />
          {config.documentTypes ? <DocumentsSection documentTypes={config.documentTypes} /> : null}
        </div>
      );
    case 'filings':
      return (
        <div className={styles.stack}>
          {config.filingTypes ? <FilingsSection filingTypes={config.filingTypes} /> : null}
        </div>
      );
    case 'first_board_meeting':
      return (
        <div className={styles.stack}>
          <InlineOfficersSection />
          {config.documentTypes ? <DocumentsSection documentTypes={config.documentTypes} /> : null}
          {notesField}
        </div>
      );
    case 'ein':
      return (
        <div className={styles.stack}>
          <CaseProfileFields showEin />
          {config.filingTypes ? <FilingsSection filingTypes={config.filingTypes} /> : null}
        </div>
      );
    case 'bylaws':
      return (
        <div className={styles.stack}>
          {config.documentTypes ? <DocumentsSection documentTypes={config.documentTypes} /> : null}
        </div>
      );
    case 'apply_501c3':
      return (
        <div className={styles.stack}>
          <CaseProfileFields showIrsExemption />
          {config.filingTypes ? <FilingsSection filingTypes={config.filingTypes} /> : null}
        </div>
      );
    case 'notes_only':
      return (
        <StepNotesField
          formationCaseId={caseId}
          checklistStepId={checklistStepId}
          status={status}
          label="Bank account notes"
          placeholder="Bank name, date opened, signers, etc."
        />
      );
    case 'ongoing_compliance':
      return (
        <div className={styles.stack}>
          <CaseProfileFields showFiscalYear />
          <StepNotesField
            formationCaseId={caseId}
            checklistStepId={checklistStepId}
            status={status}
            label="Compliance calendar notes"
            placeholder="Form 990 due dates, PA renewal, board meeting schedule…"
          />
        </div>
      );
    default:
      return null;
  }
};

const styles = {
  stack: `space-y-4 pt-2`,
  muted: `text-sm text-slate-500`,
};

'use client';

import type { FormationCaseStepStatus, FormationChecklistStep, FormationChecklistStepStatus as StepStatus } from '@/model/formation';
import { STATUS_OPTIONS } from '../constants';
import { StepPanel } from '../step-panels';
import { useAppDispatch, useAppSelector } from '@/store';
import { ChecklistBuilderActions } from '@/store/builders/checklistBuilder';

type ChecklistStepAccordionProps = {
  step: FormationChecklistStep;
  status: FormationCaseStepStatus | undefined;
  onStatusChange: (checklistStepId: string, status: StepStatus) => void;
};

const formatStatus = (value: string): string => value.replace(/_/g, ' ');

const statusBadgeClass = (status: StepStatus): string => {
  switch (status) {
    case 'in_progress':
      return styles.badgeInProgress;
    case 'complete':
      return styles.badgeComplete;
    case 'skipped':
      return styles.badgeSkipped;
    default:
      return styles.badgeNotStarted;
  }
};

/**
 * Expandable checklist step with embedded action panel.
 */
export const ChecklistStepAccordion = ({
  step,
  status,
  onStatusChange,
}: ChecklistStepAccordionProps) => {
  const dispatch = useAppDispatch();
  const expandedStepId = useAppSelector((s) => s.checklistBuilder.expandedStepId);
  const isExpanded = expandedStepId === step.id;
  const currentStatus = status?.status ?? 'not_started';

  const toggleExpanded = () => {
    dispatch(ChecklistBuilderActions.setExpandedStepId(isExpanded ? null : step.id));
  };

  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <button type="button" className={styles.headerButton} onClick={toggleExpanded}>
          <span className={styles.chevron} aria-hidden>
            {isExpanded ? '▼' : '▶'}
          </span>
          <span className={styles.titleBlock}>
            <span className={styles.title}>
              {step.sort_order}. {step.title}
            </span>
            <span className={styles.description}>{step.description}</span>
          </span>
          <span className={`${styles.badge} ${statusBadgeClass(currentStatus)}`}>
            {formatStatus(currentStatus)}
          </span>
        </button>
        <select
          className={styles.select}
          value={currentStatus}
          aria-label={`Status for ${step.title}`}
          onChange={(e) => onStatusChange(step.id, e.target.value as StepStatus)}
          onClick={(e) => e.stopPropagation()}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {formatStatus(opt)}
            </option>
          ))}
        </select>
      </div>
      {isExpanded ? (
        <div className={styles.panel}>
          <StepPanel step={step} status={status} />
        </div>
      ) : null}
    </li>
  );
};

const styles = {
  item: `rounded-lg border border-slate-200 bg-white overflow-hidden`,
  header: `flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between`,
  headerButton: `flex flex-1 items-start gap-2 text-left`,
  chevron: `mt-0.5 w-4 shrink-0 text-xs text-slate-400`,
  titleBlock: `flex-1 min-w-0`,
  title: `font-medium text-slate-900`,
  description: `mt-0.5 block text-sm text-slate-600`,
  badge: `ml-2 hidden shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize sm:inline`,
  badgeNotStarted: `bg-slate-100 text-slate-600`,
  badgeInProgress: `bg-amber-100 text-amber-800`,
  badgeComplete: `bg-green-100 text-green-800`,
  badgeSkipped: `bg-slate-100 text-slate-500`,
  select: `rounded-lg border border-slate-300 px-2 py-1 text-sm sm:w-36`,
  panel: `border-t border-slate-100 bg-slate-50/50 px-4 pb-4`,
};

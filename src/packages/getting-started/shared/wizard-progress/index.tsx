type WizardProgressProps = {
  activeStep: 'welcome' | 'connect' | 'name';
};

const STEPS = [
  { key: 'welcome' as const, label: 'Welcome' },
  { key: 'connect' as const, label: 'Connect' },
  { key: 'name' as const, label: 'Name' },
];

/**
 * Step indicator for the getting-started wizard.
 */
export const WizardProgress = ({ activeStep }: WizardProgressProps) => {
  const activeIndex = STEPS.findIndex((s) => s.key === activeStep);

  return (
    <ol className={styles.list} aria-label="Getting started progress">
      {STEPS.map((step, index) => {
        const isActive = step.key === activeStep;
        const isComplete = index < activeIndex;
        return (
          <li
            key={step.key}
            className={`${styles.item} ${isActive ? styles.itemActive : ''} ${isComplete ? styles.itemComplete : ''}`}
          >
            <span className={styles.badge}>{index + 1}</span>
            <span className={styles.label}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
};

const styles = {
  list: `flex flex-wrap gap-2`,
  item: `flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500`,
  itemActive: `border-slate-900 text-slate-900`,
  itemComplete: `border-green-200 bg-green-50 text-green-800`,
  badge: `flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-xs font-medium`,
  label: `font-medium`,
};

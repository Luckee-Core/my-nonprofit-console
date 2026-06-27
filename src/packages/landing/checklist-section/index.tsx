import { ClipboardList } from 'lucide-react';
import { LandingSectionLabel } from '../section-label';
import {
  LANDING_CHECKLIST_HEADING,
  LANDING_CHECKLIST_HEADING_ACCENT,
  LANDING_CHECKLIST_LEAD,
  LANDING_CHECKLIST_STEPS,
} from '../content/landing-content';

const statusClass = (status: string): string => {
  if (status === 'complete') return styles.badgeComplete;
  if (status === 'in_progress') return styles.badgeProgress;
  return styles.badgeMuted;
};

/**
 * Landing checklist section with step mock list.
 */
export const LandingChecklistSection = () => {
  return (
    <section id="checklist" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="02" label="Checklist" />
        <div className={styles.grid}>
          <div className={styles.mock}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrap}>
                  <ClipboardList className={styles.icon} />
                </span>
                <div>
                  <p className={styles.cardTitle}>Formation checklist</p>
                  <p className={styles.cardSub}>12 steps · PA / Philadelphia</p>
                </div>
              </div>
              <ul className={styles.steps}>
                {LANDING_CHECKLIST_STEPS.map((step) => (
                  <li key={step.n} className={styles.step}>
                    <div className={styles.stepBody}>
                      <p className={styles.stepTitle}>
                        {step.n}. {step.title}
                      </p>
                    </div>
                    <span className={`${styles.badge} ${statusClass(step.status)}`}>
                      {step.status.replace('_', ' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.copy}>
            <h2 className={styles.heading}>
              {LANDING_CHECKLIST_HEADING}{' '}
              <span className={styles.accent}>{LANDING_CHECKLIST_HEADING_ACCENT}</span>
            </h2>
            <p className={styles.lead}>{LANDING_CHECKLIST_LEAD}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border bg-muted/30`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28`,
  grid: `mt-8 grid gap-12 md:grid-cols-12 md:gap-10 items-start`,
  mock: `md:col-span-7 md:order-1`,
  copy: `md:col-span-5 md:order-2`,
  card: `rounded-xl border border-border bg-card p-6 shadow-sm`,
  cardHeader: `flex items-start gap-3 border-b border-border pb-4`,
  iconWrap: `grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary`,
  icon: `h-4 w-4`,
  cardTitle: `text-sm font-semibold`,
  cardSub: `text-xs text-muted-foreground`,
  steps: `mt-4 space-y-3`,
  step: `flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2.5`,
  stepBody: `flex-1 min-w-0`,
  stepTitle: `text-sm font-medium leading-snug`,
  badge: `shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase`,
  badgeComplete: `bg-emerald-50 text-emerald-700`,
  badgeProgress: `bg-slate-100 text-slate-700`,
  badgeMuted: `bg-muted text-muted-foreground`,
  heading: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 text-muted-foreground leading-relaxed`,
};

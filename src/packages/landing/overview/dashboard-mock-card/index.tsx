import { LANDING_DASHBOARD_ROWS } from '../../content/landing-content';

const statusLabel = (status: string): string => status.replace('_', ' ');

const statusClass = (status: string): string => {
  if (status === 'complete') return styles.badgeComplete;
  if (status === 'in_progress') return styles.badgeProgress;
  return styles.badgeDraft;
};

/**
 * Presentational mock of the nonprofits dashboard for the landing overview section.
 */
export const LandingDashboardMockCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Workspace</p>
          <p className={styles.sidebarActive}>Your nonprofits</p>
          <p className={styles.sidebarSection}>Formation</p>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarItem}>Checklist</li>
            <li className={styles.sidebarItem}>Board</li>
            <li className={styles.sidebarItem}>Documents</li>
            <li className={styles.sidebarItem}>Filings</li>
          </ul>
        </aside>
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <p className={styles.headerTitle}>Your nonprofits</p>
              <p className={styles.headerSub}>{LANDING_DASHBOARD_ROWS.length} in progress</p>
            </div>
          </div>
          <ul className={styles.list}>
            {LANDING_DASHBOARD_ROWS.map((row) => (
              <li key={row.name} className={styles.listItem}>
                <div>
                  <p className={styles.orgName}>{row.name}</p>
                  <p className={styles.orgMeta}>
                    Updated {row.updated} ·{' '}
                    <span className={`${styles.badge} ${statusClass(row.status)}`}>
                      {statusLabel(row.status)}
                    </span>
                  </p>
                </div>
                <span className={styles.continue}>Continue</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: `rounded-xl border border-border bg-card shadow-sm overflow-hidden`,
  layout: `flex`,
  sidebar: `hidden sm:block w-44 border-r border-border bg-muted/40 p-4 text-xs`,
  sidebarLabel: `section-label mb-2`,
  sidebarActive: `rounded-md bg-primary/10 px-2 py-1 text-primary font-medium`,
  sidebarSection: `section-label mt-5 mb-2`,
  sidebarList: `space-y-1 text-muted-foreground`,
  sidebarItem: `px-2 py-1`,
  main: `flex-1 min-w-0`,
  header: `border-b border-border px-4 py-3`,
  headerTitle: `text-sm font-semibold`,
  headerSub: `text-xs text-muted-foreground`,
  list: `divide-y divide-border`,
  listItem: `flex items-center justify-between gap-4 px-4 py-3`,
  orgName: `font-medium text-sm`,
  orgMeta: `mt-0.5 text-xs text-muted-foreground`,
  badge: `inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase`,
  badgeComplete: `bg-emerald-50 text-emerald-700`,
  badgeProgress: `bg-slate-100 text-slate-700`,
  badgeDraft: `bg-muted text-muted-foreground`,
  continue: `text-xs font-medium text-muted-foreground`,
};

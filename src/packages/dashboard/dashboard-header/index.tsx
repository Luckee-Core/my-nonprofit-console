import Link from 'next/link';
import { GETTING_STARTED_PATH } from '@/config/routes';

/**
 * Dashboard header with title and start-another CTA.
 */
export const DashboardHeader = () => {
  return (
    <div className={styles.headerRow}>
      <div>
        <h1 className={styles.title}>Your nonprofits</h1>
        <p className={styles.subtitle}>
          Each row is one organization you are forming — open it to continue the checklist, board,
          documents, and filings.
        </p>
      </div>
      <Link href={`${GETTING_STARTED_PATH}?step=name`} className={styles.primaryButton}>
        Start another nonprofit
      </Link>
    </div>
  );
};

const styles = {
  headerRow: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold`,
  subtitle: `mt-1 text-slate-600`,
  primaryButton: `inline-flex shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800`,
};

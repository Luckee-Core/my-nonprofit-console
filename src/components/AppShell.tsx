'use client';

import Link from 'next/link';
import {
  AI_PROMPTS_PATH,
  DASHBOARD_PATH,
  GETTING_STARTED_PATH,
  LANDING_PATH,
  SETUP_PATH,
} from '@/config/routes';

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Shared chrome — header and footer; formation workspace uses its own sidebar.
 */
export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href={LANDING_PATH} className={styles.brand}>
          My Nonprofit
        </Link>
        <nav className={styles.nav}>
          <Link href={GETTING_STARTED_PATH} className={styles.navLink}>
            Get started
          </Link>
          <Link href={SETUP_PATH} className={styles.navLink}>
            Setup
          </Link>
          <Link href={DASHBOARD_PATH} className={styles.navLink}>
            Your nonprofits
          </Link>
          <Link href={AI_PROMPTS_PATH} className={styles.navLink}>
            AI Prompts
          </Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          Drafts are for planning only — not legal advice. Have an attorney review before filing.
        </p>
      </footer>
    </div>
  );
};

const styles = {
  page: `min-h-screen bg-slate-50 text-slate-900`,
  header: `flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4`,
  brand: `text-lg font-semibold text-slate-900`,
  nav: `flex gap-4`,
  navLink: `text-sm text-slate-600 hover:text-slate-900`,
  main: `mx-auto w-full`,
  footer: `border-t border-slate-200 bg-white px-6 py-4`,
  disclaimer: `text-center text-xs text-slate-500`,
};

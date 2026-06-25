'use client';

import Link from 'next/link';
import {
  DASHBOARD_PATH,
  FORMATION_BOARD_PATH,
  FORMATION_CHECKLIST_PATH,
  FORMATION_DOCUMENTS_PATH,
  FORMATION_FILINGS_PATH,
  LANDING_PATH,
  SETUP_PATH,
} from '@/config/routes';

type AppShellProps = {
  children: React.ReactNode;
  showFormationNav?: boolean;
};

/**
 * Shared chrome for dashboard and formation wizard pages.
 */
export const AppShell = ({ children, showFormationNav = false }: AppShellProps) => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href={LANDING_PATH} className={styles.brand}>
          My Nonprofit
        </Link>
        <nav className={styles.nav}>
          <Link href={SETUP_PATH} className={styles.navLink}>
            Setup
          </Link>
          <Link href={DASHBOARD_PATH} className={styles.navLink}>
            Dashboard
          </Link>
        </nav>
      </header>
      {showFormationNav ? (
        <nav className={styles.subNav}>
          <Link href={FORMATION_CHECKLIST_PATH} className={styles.subNavLink}>
            Checklist
          </Link>
          <Link href={FORMATION_BOARD_PATH} className={styles.subNavLink}>
            Board
          </Link>
          <Link href={FORMATION_DOCUMENTS_PATH} className={styles.subNavLink}>
            Documents
          </Link>
          <Link href={FORMATION_FILINGS_PATH} className={styles.subNavLink}>
            Filings
          </Link>
        </nav>
      ) : null}
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
  subNav: `flex gap-4 border-b border-slate-200 bg-white px-6 py-3`,
  subNavLink: `text-sm font-medium text-slate-700 hover:text-slate-900`,
  main: `mx-auto max-w-5xl px-6 py-8`,
  footer: `border-t border-slate-200 bg-white px-6 py-4`,
  disclaimer: `text-center text-xs text-slate-500`,
};

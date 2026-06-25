import Link from 'next/link';
import { DASHBOARD_PATH, GETTING_STARTED_PATH, SETUP_PATH } from '@/config/routes';

/**
 * Marketing landing page for the OSS formation wizard.
 */
export const LandingPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Open source · Pennsylvania / Philadelphia</p>
        <h1 className={styles.title}>Start a nonprofit with a guided checklist and AI drafts</h1>
        <p className={styles.subtitle}>
          Run locally, connect your own Supabase, and walk through PA nonprofit formation steps with
          document drafts you can review with an attorney.
        </p>
        <div className={styles.actions}>
          <Link href={GETTING_STARTED_PATH} className={styles.primaryButton}>
            Get started
          </Link>
          <Link href={DASHBOARD_PATH} className={styles.secondaryButton}>
            Your nonprofits
          </Link>
        </div>
        <p className={styles.setupLink}>
          Already configured?{' '}
          <Link href={SETUP_PATH} className={styles.inlineLink}>
            Check setup status
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: `min-h-screen bg-slate-50`,
  hero: `mx-auto flex max-w-3xl flex-col gap-4 px-6 py-20`,
  eyebrow: `text-sm font-medium uppercase tracking-wide text-slate-500`,
  title: `text-4xl font-bold text-slate-900`,
  subtitle: `text-lg text-slate-600`,
  actions: `mt-4 flex flex-wrap gap-3`,
  primaryButton: `rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800`,
  secondaryButton: `rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50`,
  setupLink: `mt-2 text-sm text-slate-500`,
  inlineLink: `font-medium text-slate-700 underline hover:text-slate-900`,
};

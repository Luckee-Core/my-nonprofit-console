import Link from 'next/link';
import { LandingGitHubIcon } from '../github-icon';
import {
  DOCS_URL,
  GITHUB_API_URL,
  GITHUB_WEB_URL,
  LANDING_FINAL_CTA_HEADING,
  LANDING_FINAL_CTA_HEADING_ACCENT,
  LANDING_FINAL_CTA_KICKER,
} from '../content/landing-content';
import { GETTING_STARTED_PATH } from '@/config/routes';

/**
 * Landing final CTA band with GitHub and app links.
 */
export const LandingFinalCta = () => {
  return (
    <section className={styles.section}>
      <div className={styles.gridOverlay} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.kicker}>{LANDING_FINAL_CTA_KICKER}</p>
        <h2 className={styles.heading}>
          {LANDING_FINAL_CTA_HEADING}{' '}
          <span className={styles.accent}>{LANDING_FINAL_CTA_HEADING_ACCENT}</span>
        </h2>
        <div className={styles.ctaRow}>
          <Link href={GETTING_STARTED_PATH} className={styles.ctaPrimary}>
            Open wizard
          </Link>
          <a
            href={GITHUB_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaGhost}
          >
            <LandingGitHubIcon className={styles.ctaIcon} /> Console repo
          </a>
          <a
            href={GITHUB_API_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaGhost}
          >
            Express server
          </a>
          <Link href={DOCS_URL} className={styles.ctaGhost}>
            API docs
          </Link>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `relative overflow-hidden bg-foreground text-background`,
  gridOverlay: `absolute inset-0 grid-overlay-dark pointer-events-none`,
  inner: `relative mx-auto max-w-7xl px-5 sm:px-8 py-24 md:py-32 text-center`,
  kicker: `mono-label text-white/60`,
  heading: `mt-5 mx-auto max-w-3xl text-4xl md:text-5xl font-semibold tracking-tight leading-tight`,
  accent: `text-white`,
  ctaRow: `mt-9 flex flex-wrap justify-center gap-3`,
  ctaPrimary: `
    inline-flex items-center gap-2 rounded-md bg-background px-4 py-2.5 text-sm font-medium
    text-foreground hover:bg-white/90 transition-colors
  `,
  ctaGhost: `
    inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm
    font-medium text-background hover:bg-white/10 transition-colors
  `,
  ctaIcon: `h-4 w-4`,
};

import Link from 'next/link';
import { LandingBrandMark } from '../brand-mark';
import { DOCS_URL, GITHUB_WEB_URL, LANDING_FOOTER_TAGLINE } from '../content/landing-content';

/**
 * Landing page footer with brand, links, and attribution.
 */
export const LandingFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <LandingBrandMark />
          <p className={styles.tagline}>{LANDING_FOOTER_TAGLINE}</p>
        </div>
        <div className={styles.linksCol}>
          <div className={styles.links}>
            <a href="#features" className={styles.link}>
              Features
            </a>
            <a href="#checklist" className={styles.link}>
              Checklist
            </a>
            <a href="#open-source" className={styles.link}>
              Open source
            </a>
            <Link href={DOCS_URL} className={styles.link}>
              API docs
            </Link>
            <a
              href={GITHUB_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          </div>
          <p className={styles.copyright}>Luckee-Core · MIT · © 2026</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: `border-t border-border`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-12 grid gap-8 md:grid-cols-2`,
  tagline: `mt-3 max-w-sm text-sm text-muted-foreground`,
  linksCol: `md:text-right`,
  links: `flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-end`,
  link: `hover:text-foreground`,
  copyright: `mt-6 text-xs text-muted-foreground`,
};

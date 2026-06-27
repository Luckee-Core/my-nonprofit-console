import { ArrowRight, Code2 } from 'lucide-react';
import { LandingSectionLabel } from '../section-label';
import {
  LANDING_ARCHITECTURE_CARD_TITLE,
  LANDING_ARCHITECTURE_HEADING,
  LANDING_ARCHITECTURE_HEADING_ACCENT,
  LANDING_ARCHITECTURE_LEAD,
  LANDING_CLI_SNIPPET,
} from '../content/landing-content';

/**
 * Landing architecture section with CLI setup card.
 */
export const LandingArchitectureSection = () => {
  return (
    <section id="architecture" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="05" label="Architecture" />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 className={styles.heading}>
              {LANDING_ARCHITECTURE_HEADING}{' '}
              <span className={styles.accent}>{LANDING_ARCHITECTURE_HEADING_ACCENT}</span>
            </h2>
            <p className={styles.lead}>{LANDING_ARCHITECTURE_LEAD}</p>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.card}>
              <div className={styles.gridOverlay} aria-hidden />
              <div className={styles.cardInner}>
                <div className={styles.cardHead}>
                  <span className={styles.iconWrap}>
                    <Code2 className={styles.icon} />
                  </span>
                  <span className={styles.badge}>Stack</span>
                </div>
                <h3 className={styles.cardTitle}>{LANDING_ARCHITECTURE_CARD_TITLE}</h3>
                <pre className={styles.cli}>{LANDING_CLI_SNIPPET}</pre>
                <a href="#open-source" className={styles.docsLink}>
                  Open source repos <ArrowRight className={styles.docsIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28`,
  grid: `mt-8 grid gap-12 md:grid-cols-12 md:gap-10 items-start`,
  copy: `md:col-span-5`,
  heading: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 text-muted-foreground leading-relaxed`,
  cardWrap: `md:col-span-7`,
  card: `relative overflow-hidden rounded-xl bg-foreground text-background p-8 shadow-sm`,
  gridOverlay: `absolute inset-0 grid-overlay-dark pointer-events-none`,
  cardInner: `relative`,
  cardHead: `flex items-center gap-3`,
  iconWrap: `grid h-9 w-9 place-items-center rounded-md bg-white/10 text-primary-foreground`,
  icon: `h-4 w-4`,
  badge: `
    rounded-full border border-white/15 px-2 py-0.5 text-[11px] uppercase
    tracking-[0.18em] text-white/70
  `,
  cardTitle: `mt-5 text-2xl font-semibold tracking-tight`,
  cli: `
    mt-6 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-[12px]
    text-white/70 leading-relaxed whitespace-pre
  `,
  docsLink: `
    mt-5 inline-flex items-center gap-1 text-sm font-medium text-white/90
    hover:text-white transition-colors
  `,
  docsIcon: `h-4 w-4`,
};

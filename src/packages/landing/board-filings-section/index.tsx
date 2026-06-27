import { LandingSectionLabel } from '../section-label';
import {
  LANDING_BOARD_FILINGS_HEADING,
  LANDING_BOARD_FILINGS_HEADING_ACCENT,
  LANDING_BOARD_FILINGS_ITEMS,
  LANDING_BOARD_FILINGS_LEAD,
} from '../content/landing-content';

/**
 * Landing board and filings section.
 */
export const LandingBoardFilingsSection = () => {
  return (
    <section id="board-filings" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="04" label="Board & filings" />
        <h2 className={styles.heading}>
          {LANDING_BOARD_FILINGS_HEADING}{' '}
          <span className={styles.accent}>{LANDING_BOARD_FILINGS_HEADING_ACCENT}</span>
        </h2>
        <p className={styles.lead}>{LANDING_BOARD_FILINGS_LEAD}</p>
        <div className={styles.cards}>
          {LANDING_BOARD_FILINGS_ITEMS.map((item) => (
            <div key={item.key} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border bg-muted/30`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28`,
  heading: `mt-6 max-w-3xl text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 max-w-2xl text-muted-foreground leading-relaxed`,
  cards: `mt-10 grid gap-5 md:grid-cols-2`,
  card: `rounded-xl border border-border bg-card p-6`,
  cardTitle: `text-lg font-semibold`,
  cardBody: `mt-3 text-sm text-muted-foreground leading-relaxed`,
};

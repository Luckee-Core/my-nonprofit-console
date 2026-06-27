import { FileText } from 'lucide-react';
import { LandingSectionLabel } from '../section-label';
import {
  LANDING_DISCLAIMER,
  LANDING_DOCUMENT_TYPES,
  LANDING_DOCUMENTS_HEADING,
  LANDING_DOCUMENTS_HEADING_ACCENT,
  LANDING_DOCUMENTS_LEAD,
} from '../content/landing-content';

/**
 * Landing documents section — AI drafts with legal disclaimer.
 */
export const LandingDocumentsSection = () => {
  return (
    <section id="documents" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="03" label="Documents" />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 className={styles.heading}>
              {LANDING_DOCUMENTS_HEADING}{' '}
              <span className={styles.accent}>{LANDING_DOCUMENTS_HEADING_ACCENT}</span>
            </h2>
            <p className={styles.lead}>{LANDING_DOCUMENTS_LEAD}</p>
            <p className={styles.disclaimer}>{LANDING_DISCLAIMER}</p>
          </div>
          <div className={styles.mock}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrap}>
                  <FileText className={styles.icon} />
                </span>
                <div>
                  <p className={styles.cardTitle}>AI document drafts</p>
                  <p className={styles.cardSub}>Generate · review · export .md</p>
                </div>
              </div>
              <div className={styles.docs}>
                {LANDING_DOCUMENT_TYPES.map((doc) => (
                  <div key={doc.title} className={styles.docRow}>
                    <div>
                      <p className={styles.docTitle}>{doc.title}</p>
                      <p className={styles.docNote}>{doc.note}</p>
                    </div>
                    <span className={styles.docAction}>Generate</span>
                  </div>
                ))}
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
  mock: `md:col-span-7`,
  heading: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 text-muted-foreground leading-relaxed`,
  disclaimer: `
    mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900
  `,
  card: `rounded-xl border border-border bg-card p-6 shadow-sm`,
  cardHeader: `flex items-start gap-3 border-b border-border pb-4`,
  iconWrap: `grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary`,
  icon: `h-4 w-4`,
  cardTitle: `text-sm font-semibold`,
  cardSub: `text-xs text-muted-foreground`,
  docs: `mt-4 space-y-3`,
  docRow: `
    flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3
  `,
  docTitle: `text-sm font-medium`,
  docNote: `text-xs text-muted-foreground`,
  docAction: `text-xs font-medium text-muted-foreground`,
};

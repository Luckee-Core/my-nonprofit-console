import { LandingArchitectureSection } from './architecture-section';
import { LandingBoardFilingsSection } from './board-filings-section';
import { LandingChecklistSection } from './checklist-section';
import { LandingDocumentsSection } from './documents-section';
import { LandingFinalCta } from './final-cta';
import { LandingFooter } from './footer';
import { LandingHero } from './hero';
import { LandingNav } from './nav';
import { LandingOpenSourceSection } from './open-source-section';
import { LandingOverview } from './overview';

/**
 * Marketing home — hero, features, architecture, open source, CTA.
 */
export const MarketingLanding = () => {
  return (
    <div className={styles.page}>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingOverview />
        <LandingChecklistSection />
        <LandingDocumentsSection />
        <LandingBoardFilingsSection />
        <LandingArchitectureSection />
        <LandingOpenSourceSection />
        <LandingFinalCta />
      </main>
      <LandingFooter />
    </div>
  );
};

const styles = {
  page: `min-h-screen bg-background text-foreground antialiased`,
};

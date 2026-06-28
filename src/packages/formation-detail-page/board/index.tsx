'use client';

import { FormationCaseHeader, FormationDetailGuard } from '../shared';
import { InlineBoardSection } from '../shared/inline-board-section';
import { InlineOfficersSection } from '../shared/inline-officers-section';

/**
 * Board tab — directors and officers (full view).
 */
export const FormationBoardTab = () => {
  return (
    <FormationDetailGuard>
      <FormationCaseHeader />
      <InlineBoardSection />
      <InlineOfficersSection />
    </FormationDetailGuard>
  );
};

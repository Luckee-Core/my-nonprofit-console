'use client';

import { FormationBoardMemberDetailPage } from '@/packages/formation-board-member-detail-page';
import { FormationDetailGuard } from '@/packages/formation-detail-page/shared/formation-detail-guard';

export default function Page() {
  return (
    <FormationDetailGuard>
      <div className="p-6 lg:p-8">
        <FormationBoardMemberDetailPage />
      </div>
    </FormationDetailGuard>
  );
}

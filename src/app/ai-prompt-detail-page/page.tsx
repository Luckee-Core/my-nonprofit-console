'use client';

import { AppShell } from '@/components';
import { AiPromptDetailPage } from '@/packages/ai-prompt-detail-page';

export default function Page() {
  return (
    <AppShell>
      <div className="p-6 lg:p-8">
        <AiPromptDetailPage />
      </div>
    </AppShell>
  );
}

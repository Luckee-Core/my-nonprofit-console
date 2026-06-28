'use client';

import { AppShell } from '@/components';
import { AiPromptsPage } from '@/packages/ai-prompts';

export default function Page() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <AiPromptsPage />
      </div>
    </AppShell>
  );
}

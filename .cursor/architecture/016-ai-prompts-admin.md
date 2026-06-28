# 016 – AI prompts admin

## Status

Accepted

## Decision

- Admin UI at `/ai-prompts` and `/ai-prompt-detail-page` (static detail, Redux `currentAiPrompt`).
- Express `/api/formation-ai-prompts/*` CRUD on `formation_ai_flow_prompt`.
- Save creates a **new version** and deactivates prior rows for the same `flow`.
- Coach flows: `formation_*_studio_coach` (six studio domains).

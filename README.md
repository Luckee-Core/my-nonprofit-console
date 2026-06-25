# My Nonprofit — Formation Wizard (Console)

Local-first OSS Next.js app for Pennsylvania / Philadelphia nonprofit formation.

## Quick start

1. Create a Supabase project and run SQL from `../my-nonprofit-express-server/docs/` (see `docs/wire-contract.md`).
2. Configure and start the Express server (`PORT=3011`).
3. `npm install && npm run dev` (web on port **3010**).
4. Visit `/setup`, then `/dashboard` to create a formation case.

## Features (v1)

- PA/Philadelphia 12-step checklist with progress tracking
- Board members and officers
- AI drafts: mission, articles, bylaws, conflict policy, board consent
- Filing tracker (manual status — no auto-filing)
- Markdown export of documents

**Not legal advice.** All AI output is draft material for attorney review.

## Architecture

See `.cursor/architecture/` and `.cursor/rules/AGENTS.md`.

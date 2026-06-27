# My Nonprofit — Formation Wizard (Console)

Local-first OSS Next.js app for Pennsylvania / Philadelphia nonprofit formation.

**Companion API:** [Luckee-Core/my-nonprofit-express-server](https://github.com/Luckee-Core/my-nonprofit-express-server) (port **3080**).

**OSS governance:** [mentorai-server `data/open-source/README.md`](https://github.com/Luckee-Core/mentorai-server/blob/main/data/open-source/README.md)

## Quick start

```bash
# 1. Clone both repos side by side
git clone https://github.com/Luckee-Core/my-nonprofit-express-server.git
git clone https://github.com/Luckee-Core/my-nonprofit-console.git

# 2. Supabase — run SQL from express-server/docs/ (schema, then AI prompts)

# 3. Express (port 3080)
cd my-nonprofit-express-server
cp .env.example .env
# SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
npm install && npm run dev

# 4. Console (port 3081)
cd ../my-nonprofit-console
cp .env.example .env
npm install && npm run dev
```

Open **http://localhost:3081** → `/getting-started` wizard, then `/dashboard`.

Wire contract: [docs/wire-contract.md](./docs/wire-contract.md).

## Features (v1)

- PA/Philadelphia 12-step checklist with progress tracking
- Board members and officers
- AI drafts: mission, articles, bylaws, conflict policy, board consent
- Filing tracker (manual status — no auto-filing)
- Markdown export of documents
- In-app setup wizard with Supabase connectivity check

## Threat model

- **Local-first / single operator** — you run Express + Supabase on your infrastructure.
- **No secrets in the browser** — no `NEXT_PUBLIC_*` API keys. The console calls same-origin `/api/*`; Next rewrites to Express.
- **Production** requires `EXPRESS_API_URL`. If Express uses `FORMATION_API_SECRET`, set it in console `.env` (server-side; forwarded by middleware). See [SECURITY.md](./SECURITY.md).
- Detail screens use Redux `currentFormationCase`, not URL entity ids (ADR 008).

**Not legal advice.** All AI output is draft material for attorney review.

## Architecture

- Feature UI: `src/packages/`
- Redux / thunks: `src/store/`
- API clients: `src/api/`
- ADRs: `.cursor/architecture/` · [AGENTS.md](.cursor/rules/AGENTS.md)
- API docs UI: `/docs/api`

## License

MIT — see [LICENSE](./LICENSE). Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md).

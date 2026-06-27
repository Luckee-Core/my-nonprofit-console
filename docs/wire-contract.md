# Web + Express wire contract — My Nonprofit Formation Wizard

## Contract summary

| Field | Value |
|-------|-------|
| **Web repo** | my-nonprofit-console |
| **Express repo** | my-nonprofit-express-server |
| **Default web port** | 3081 |
| **Default API port** | 3080 |
| **API base env (web)** | `EXPRESS_API_URL` (server-side rewrites) |
| **Proxy mechanism** | Next.js `rewrites()` in `next.config.ts` |
| **Health endpoint** | `GET /api/health` → `{ success: true, data: { status, message, … } }` |
| **API docs** | `GET /api-docs.json` (rewritten); UI at `/docs/api` |
| **Auth (OSS default)** | None locally; optional `FORMATION_API_SECRET` (forwarded by Next middleware) |

## Environment variables

### Web

| Variable | Required | Purpose |
|----------|----------|---------|
| `EXPRESS_API_URL` | **Yes in production** | Rewrite target (dev default `http://127.0.0.1:3080`) |
| `FORMATION_API_SECRET` | No | Server-side only; forwarded to Express via `src/middleware.ts` |

Never put `SUPABASE_*` or `ANTHROPIC_API_KEY` in `NEXT_PUBLIC_*`.

### Express

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | Yes | User Supabase project |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side CRUD + AI ledger |
| `ANTHROPIC_API_KEY` | For AI docs | Document generation |
| `FORMATION_API_SECRET` | No | Optional shared secret |
| `PORT` | No | Default 3080 |
| `HOST` | No | Default 127.0.0.1 in dev |

## Supabase runbook (Express `docs/`)

1. `docs/formation-postgres-schema.sql`
2. `docs/formation-ai-prompts-v1.sql`
3. `docs/supabase-error-log-schema.sql` (optional)

## Local dev

```bash
# Terminal 1 — Express
cd my-nonprofit-express-server && cp .env.example .env  # fill keys
npm install && npm run dev

# Terminal 2 — Web
cd my-nonprofit-console && npm install && npm run dev
```

Open http://localhost:3081/setup to verify connectivity.

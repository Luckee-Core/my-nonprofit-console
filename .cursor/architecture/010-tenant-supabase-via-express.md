# 010 – Tenant Supabase via Express

## Status

Accepted

## Decision

- Browser never holds Supabase keys; all persistence goes through same-origin `/api/*` rewrites to Express.
- User runs SQL runbook on their own Supabase project and sets `SUPABASE_*` on Express only.
- `/setup` calls `GET /api/setup/status` to verify schema and Anthropic configuration.

## References

- `docs/wire-contract.md`

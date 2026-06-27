# 011 – Getting started wizard

## Status

Accepted

## Context

New users landed on a dashboard labeled "Formation cases" with no explanation of what a case is, no setup gate, and a dead-end create flow. Internal DB terminology leaked into the UI.

## Decision

### Route

- `/getting-started` — `src/packages/getting-started/` (static route, no `[id]`)

### Steps

1. **Welcome** — product explanation; what a "nonprofit workspace" is
2. **Connect** — setup probe via `loadSetupStatusThunk`; **Continue** blocked until `supabase === 'ok'`
3. **Name** — working name form; create + `openFormationCaseThunk` → checklist

Query `?step=name` opens step 3 directly (e.g. "Start another nonprofit" from dashboard). This is **onboarding navigation only** — ADR 008 forbids query params for entity id; formation identity stays in `currentFormationCase`.

### Terminology (UI only)

| Internal | User-facing |
|----------|-------------|
| formation case | nonprofit |
| Formation cases | Your nonprofits |
| New case | Start a nonprofit |
| Open | Continue |

API, Redux slice keys, and types keep `formation_case` naming.

### Redirects

- `/dashboard` with zero nonprofits → `router.replace('/getting-started')`
- Landing primary CTA → `/getting-started`

### Redux

- Builder: `gettingStartedBuilder` — `activeStep`, `checklistIntroDismissed`, `isCompleting`, `lastError`
- Thunks: `src/store/thunks/getting-started/` — step advance, complete (create + open)

### Checklist intro

Dismissible banner on first checklist visit; flag in `gettingStartedBuilder.checklistIntroDismissed`.

## Related

- [009 – Formation wizard UI](./009-formation-wizard-ui.md)
- [008 – Detail page routing](./008-detail-page-routing.md)
- [010 – Tenant Supabase via Express](./010-tenant-supabase-via-express.md)

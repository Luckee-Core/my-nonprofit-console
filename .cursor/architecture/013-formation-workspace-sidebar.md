# 013 – Formation workspace sidebar

## Status

Accepted

## Decision

- Replace horizontal formation tabs + checklist accordion with a **left sidebar** listing Facts + all 14 checklist steps with status badges.
- One **workspace main pane** driven by `formationWorkspaceBuilder.activeNavKey` and `src/model/formation-workspace.ts` registry.
- Static routes: `/formation-workspace-page`, `/formation-facts-page`, `/formation-board-member-detail-page`.
- Retire `/formation-detail-page/*` as primary nav (redirect to workspace).

## Workspace types

| Type | Example steps |
|------|----------------|
| `facts` | Cross-cutting fact editor |
| `ai_studio` | Mission, charitable purpose, articles, bylaws, policies, board consent |
| `data_table` | Board roster |
| `filing` | PA filings, EIN filing, 501(c)(3), licenses |
| `profile` | Obtain EIN (case fields + filing) |
| `notes` | Bank account, ongoing compliance |
| `hybrid` | First board meeting (officers + consent studio), adopt bylaws (two studios) |

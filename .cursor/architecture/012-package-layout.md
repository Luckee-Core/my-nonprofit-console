# 012 – Package layout (My Nonprofit)

## Status

Accepted

## Context

My Nonprofit Console follows the nextjs-template `src/packages/` pattern with formation-wizard-specific tab structure and OSS onboarding flows.

## Decision

### Screen → package mapping

| Screen | Package path |
|--------|----------------|
| Landing | `src/packages/landing/` |
| Getting started | `src/packages/getting-started/` (+ `welcome-step/`, `connect-step/`, `name-step/`, `shared/`) |
| Setup | `src/packages/setup/` |
| Dashboard | `src/packages/dashboard/` (+ `dashboard-header/`, `nonprofit-list-item/`) |
| Formation hub | `src/packages/formation-detail-page/index.tsx` (redirect to checklist) |
| Formation tabs | `formation-detail-page/{checklist,board,documents,filings}/` |
| API docs UI | `src/packages/api-docs/` |
| Shared chrome | `src/components/` (`AppShell`, `StatusBadge`) |

### Formation detail conventions

- `formation-detail-page/shared/` exports `FormationDetailGuard` and `FormationCaseHeader` only — no custom Redux hooks.
- Tab folders may include `constants.ts`, colocated helpers, and subcomponents (`document-card/`, `officer-row/`, etc.).
- Entity-specific formatters stay in the tab package, not `src/utils/{entity}/`.

### Import rules

- App pages import from `@/packages/{feature}` barrels (`index.ts`).
- Cross-feature shared UI → `src/components/`.
- No `store/` or `api/` inside packages.

### Redux reads

Identity slice reads only: `(state) => state.<sliceKey>`. Destructure or `useMemo` in the component. No selector modules, no custom hooks wrapping reads.

## Related

- [002 – Component composition](./002-component-composition.md)
- [005 – File organization](./005-file-organization.md)
- [006 – Constants and utilities](./006-constants-utilities.md)
- [009 – Formation wizard UI](./009-formation-wizard-ui.md)

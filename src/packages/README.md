# `src/packages` — Feature modules

**Domain-owned UI** for My Nonprofit Console: one folder per screen. Route files under `src/app` import the package barrel only.

## Screen map

| Route | Package |
|-------|---------|
| `/` | `landing/` |
| `/getting-started` | `getting-started/` |
| `/setup` | `setup/` |
| `/dashboard` | `dashboard/` |
| `/formation-detail-page/*` | `formation-detail-page/{checklist,board,documents,filings}/` |
| `/docs/api` | `api-docs/` |

## Layout (typical)

```text
src/packages/<feature>/
  index.tsx           # Main component — export const FeaturePage = …
  index.ts            # Barrel re-exports public API (ADR 005)
  <sub-component>/    # One component per folder when split
    index.tsx
    index.ts
```

Formation detail tabs colocate `constants.ts` and helpers (e.g. `download-formation-document-markdown.ts`) under the tab folder — not `src/utils/formation/`.

## Redux and API

| Concern | Location |
|---------|----------|
| Slices, builders, dumps | `src/store/` |
| Thunks | `src/store/thunks/` |
| HTTP clients | `src/api/{domain}/` |
| Domain types | `src/model/` |

Packages dispatch thunks via `useAppDispatch` / `useAppSelector` from `@/store`. **Do not** add `store/` or `api/` inside packages.

`useAppSelector` must read whole slices only (`(s) => s.formationCases`); derive with `useMemo` in the component (ADR 001 §5).

## Related

- [012 – Package layout (My Nonprofit)](../../.cursor/architecture/012-package-layout.md)
- [009 – Formation wizard UI](../../.cursor/architecture/009-formation-wizard-ui.md)
- [011 – Getting started wizard](../../.cursor/architecture/011-getting-started-wizard.md)
- [001 – Redux patterns](../../.cursor/architecture/001-redux-patterns.md)
- [005 – File organization](../../.cursor/architecture/005-file-organization.md)

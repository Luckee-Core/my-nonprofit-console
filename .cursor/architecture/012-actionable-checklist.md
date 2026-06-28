# 012 – Actionable checklist

## Status

Accepted

## Context

The checklist tab only showed status dropdowns. Formation work (mission, board, documents, filings) lived on separate tabs with no UI for core case fields.

## Decision

### Primary workspace

The **Checklist** tab is the primary formation workspace. Each of 12 PA steps expands to an accordion panel with in-app forms wired to existing Express APIs.

### Step config

[`checklist/step-config.ts`](../src/packages/formation-detail-page/checklist/step-config.ts) maps seeded `step_key` values to panel types, linked document types, and filing types.

### Shared components

Reusable panels live under `src/packages/formation-detail-page/shared/`:

- `case-profile-fields` — mission, legal name, address, EIN, fiscal month, IRS status
- `inline-board-section`, `inline-officers-section`
- `inline-document-panel` — generate, edit content, export
- `inline-filing-panel` — status, filed date, confirmation ref, notes
- `step-notes-field` — per-step notes on `formation_case_step_status`

Board / Documents / Filings tabs import the same shared components (full-screen alternate view).

### Redux

- `checklistBuilder` — `expandedStepId`, `caseFieldError`
- `updateFormationCaseThunk` — patches case + syncs `currentFormationCase` and `formationCases`

### Backend

No schema changes — uses existing PATCH endpoints for cases, checklist steps, documents, and filings.

## Related

- [009 – Formation wizard UI](./009-formation-wizard-ui.md)
- [011 – Getting started wizard](./011-getting-started-wizard.md)

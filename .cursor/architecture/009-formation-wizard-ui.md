# 009 – Formation wizard UI

## Status

Accepted

## Decision

- Dashboard lists `formation_cases`; create opens static `/formation-detail-page` via Redux `currentFormationCase` (ADR 008).
- Wizard tabs: checklist, board, documents, filings under `/formation-detail-page/*`.
- AI generation state in `formationWizardBuilder`; orchestration via thunks only.
- Legal disclaimer in `AppShell` footer on all app pages.

## References

- ADR 008 detail routing
- Express ADR 009 AI document generation

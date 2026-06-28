# 009 – Formation wizard UI

## Status

Accepted

## Decision

- Dashboard lists `formation_cases` as **Your nonprofits**; first-time users go through [011 – Getting started wizard](./011-getting-started-wizard.md).
- **Checklist** is the primary workspace — expandable steps with embedded forms ([012 – Actionable checklist](./012-actionable-checklist.md)).
- Wizard tabs: checklist, board, documents, filings under `/formation-detail-page/*`.
- AI generation state in `formationWizardBuilder`; orchestration via thunks only.
- Legal disclaimer in `AppShell` footer on all app pages.

## References

- ADR 008 detail routing
- Express ADR 009 AI document generation

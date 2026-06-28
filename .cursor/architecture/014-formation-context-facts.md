# 014 – Formation context facts

## Status

Accepted

## Decision

- Port my-fundraise **business context** pattern scoped per `formation_case_id`.
- Tables: `formation_context_sections` (global seed), `formation_context_facts`.
- Express: `/api/formation-context/*` CRUD + `loadFormationContextForPrompt()` injected into every AI studio message.
- Console: `formationContextSections` / `formationContextFacts` dumps, Facts pane in sidebar.

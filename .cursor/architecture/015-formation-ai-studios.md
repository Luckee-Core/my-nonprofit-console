# 015 – Formation AI studios

## Status

Accepted

## Decision

- Six text domains get coached chat with the **three-table pattern** each (18 ledger tables).
- Domains: `mission`, `charitable_purpose`, `articles`, `bylaws`, `conflict_policy`, `board_consent`.
- Express generic `processStudioMessage` / `processStudioApply` parameterized by domain config.
- Suggestions are **proposals**; user applies via `POST /api/formation-studio/:domain/apply`.
- One-shot document generate is legacy; studios are the primary path for draft prose.

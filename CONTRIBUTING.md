# Contributing

Thank you for contributing to **My Nonprofit Console**.

## Before you code

1. Read [`.cursor/rules/AGENTS.md`](.cursor/rules/AGENTS.md).
2. Read relevant ADRs under [`.cursor/architecture/`](.cursor/architecture/README.md).
3. Feature UI belongs in `src/packages/`; route files in `src/app/` stay thin.
4. For OSS governance context, see [mentorai-server `data/open-source/README.md`](https://github.com/Luckee-Core/mentorai-server/blob/main/data/open-source/README.md).

## Pull requests

1. Fork the repo and create a feature branch from `main`.
2. Match Redux patterns: manual thunks, identity `useAppSelector` reads, no selector modules.
3. Update `docs/wire-contract.md` when env or API integration changes.
4. Run `npm run build` and `npm run lint` before opening a PR.
5. Describe what changed and how you tested it.

## Code style

- Use `type`, not `interface`.
- `export const` for components; styles object after component (ADR 003).
- One component per file; barrel `index.ts` per folder.

## Questions

Open a GitHub issue for bugs or feature discussion before large refactors.

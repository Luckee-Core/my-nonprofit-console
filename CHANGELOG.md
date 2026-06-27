# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-06-27

### Added

- MIT license, CONTRIBUTING.md, SECURITY.md
- GitHub Actions CI (`npm run lint`, `npm run build`)
- Getting-started wizard, formation detail tabs, `/docs/api` reference page
- Next middleware forwards `FORMATION_API_SECRET` server-side
- `src/packages/README.md` and ADR 012 package layout

### Changed

- `src/packages/` ADR compliance: barrels, one component per file, identity `useAppSelector` reads
- Production requires `EXPRESS_API_URL` (fail-fast in `next.config.ts`)
- Shared `StatusBadge` in `src/components/`

### Security

- Documented local-first threat model; no `NEXT_PUBLIC_*` secrets

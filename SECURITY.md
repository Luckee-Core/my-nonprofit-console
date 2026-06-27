# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |

## Reporting a vulnerability

Email security reports to the maintainers via a [GitHub Security Advisory](https://github.com/Luckee-Core/my-nonprofit-console/security/advisories/new) on this repository. Do not open public issues for undisclosed vulnerabilities.

## Scope and threat model

**My Nonprofit Console** is a **local-first** Next.js app for a single operator forming a Pennsylvania nonprofit:

- No `NEXT_PUBLIC_*` secrets — Supabase and Anthropic keys stay on the Express server only.
- The browser calls same-origin `/api/*`; Next rewrites to Express (`EXPRESS_API_URL`).
- Entity identity for detail screens lives in Redux (`currentFormationCase`), not in URLs.

### Production expectations

1. Set `EXPRESS_API_URL` to your Express base URL (required in production builds).
2. If Express uses `FORMATION_API_SECRET`, set the same value in the console `.env` (server-side only; forwarded via middleware).
3. Do not expose Express directly to the internet without API secret and CORS review.

### Out of scope

- Legal advice (footer disclaimer applies)
- Multi-user auth (not in v1)

## Related

See [my-nonprofit-express-server SECURITY.md](https://github.com/Luckee-Core/my-nonprofit-express-server/blob/main/SECURITY.md) for API-side threat model.

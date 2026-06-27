const githubOrg = process.env.NEXT_PUBLIC_GITHUB_ORG ?? 'Luckee-Core';

export const GITHUB_WEB_URL =
  process.env.NEXT_PUBLIC_GITHUB_WEB_URL ??
  `https://github.com/${githubOrg}/my-nonprofit-console`;

export const GITHUB_API_URL =
  process.env.NEXT_PUBLIC_GITHUB_API_URL ??
  `https://github.com/${githubOrg}/my-nonprofit-express-server`;

export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? '/docs/api';

export const LANDING_BRAND_NAME = 'My Nonprofit';

export const LANDING_HERO_KICKER = 'Open source · Self-hostable · Your Supabase';

export const LANDING_HERO_HEADLINE =
  'PA nonprofit paperwork should not live in twelve browser tabs.';

export const LANDING_HERO_HEADLINE_ACCENT =
  'One checklist, your database, drafts you can edit.';

export const LANDING_HERO_SUB =
  'I built this after formation steps scattered across spreadsheets, Google Docs, and half-finished state PDFs. Run it on your machine, connect your Supabase project, walk a 12-step Pennsylvania / Philadelphia checklist, track board and filings, and generate AI document drafts you review with an attorney — not pasted from a chat window.';

export const LANDING_HERO_CTA_PRIMARY = 'Get started';
export const LANDING_HERO_CTA_SECONDARY = 'See the dashboard';

export const LANDING_HERO_STATS = [
  { h: '12-step checklist', s: 'PA / Philadelphia formation path' },
  { h: 'Your Supabase', s: 'Progress stays in your project' },
  { h: 'AI drafts', s: 'Articles, bylaws, policies — export as markdown' },
] as const;

export const LANDING_NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Checklist', href: '#checklist' },
  { label: 'Documents', href: '#documents' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Docs', href: DOCS_URL },
] as const;

export const LANDING_OVERVIEW_HEADING = 'Each nonprofit you form gets';
export const LANDING_OVERVIEW_HEADING_ACCENT = 'its own workspace — not another folder.';

export const LANDING_OVERVIEW_LEAD =
  'The dashboard lists every organization you are forming. Open one, pick up the checklist where you left off, and jump to board, documents, or filings without hunting through email.';

export const LANDING_OVERVIEW_BULLETS = [
  'One formation case per nonprofit you are starting',
  'Checklist, board, documents, and filings under one case',
  'Getting-started wizard checks Supabase before you create anything',
  'Markdown export when a draft is ready for attorney review',
] as const;

export const LANDING_DASHBOARD_ROWS = [
  { name: 'West Philly Community Garden', status: 'in_progress', updated: 'Mar 8' },
  { name: 'Riverside Youth Arts', status: 'draft', updated: 'Feb 22' },
  { name: 'Northside Food Pantry', status: 'in_progress', updated: 'Jan 14' },
] as const;

export const LANDING_CHECKLIST_HEADING = 'Twelve steps';
export const LANDING_CHECKLIST_HEADING_ACCENT = 'you can mark — not guess.';

export const LANDING_CHECKLIST_LEAD =
  'The checklist mirrors a real PA / Philadelphia formation path. Mark each step not started, in progress, complete, or skipped. No more wondering whether you already filed the BCO-10.';

export const LANDING_CHECKLIST_STEPS = [
  { n: 1, title: 'Choose a name and check availability', status: 'complete' },
  { n: 2, title: 'Draft mission and charitable purpose', status: 'in_progress' },
  { n: 3, title: 'Prepare articles of incorporation', status: 'in_progress' },
  { n: 4, title: 'File with the Department of State', status: 'not_started' },
  { n: 5, title: 'Publish notice (if required)', status: 'not_started' },
] as const;

export const LANDING_DOCUMENTS_HEADING = 'AI drafts for the boring parts —';
export const LANDING_DOCUMENTS_HEADING_ACCENT = 'you still need a lawyer.';

export const LANDING_DOCUMENTS_LEAD =
  'Generate mission statements, articles, bylaws, conflict-of-interest policy, and board consent resolutions from your case data. Edit in the app, mark reviewed, export markdown. This is planning software, not legal advice.';

export const LANDING_DOCUMENT_TYPES = [
  { title: 'Articles of incorporation', note: 'PA nonprofit structure' },
  { title: 'Bylaws', note: 'Officers, meetings, amendments' },
  { title: 'Conflict of interest policy', note: 'Board-facing draft' },
] as const;

export const LANDING_BOARD_FILINGS_HEADING = 'Board, officers, and filing tracker —';
export const LANDING_BOARD_FILINGS_HEADING_ACCENT = 'same case, no duplicate typing.';

export const LANDING_BOARD_FILINGS_LEAD =
  'Directors and president / secretary / treasurer live with the case. The filing tracker is manual status for state, IRS, and Philadelphia steps — we do not auto-file anything.';

export const LANDING_BOARD_FILINGS_ITEMS = [
  {
    key: 'board',
    title: 'Board & officers',
    body: 'Add directors and set officer roles. Data feeds document generation instead of re-entering names in every draft.',
  },
  {
    key: 'filings',
    title: 'Filing tracker',
    body: 'PA articles, publication, EIN, 501(c)(3), BCO-10, Philly licenses — status and notes per row.',
  },
] as const;

export const LANDING_ARCHITECTURE_HEADING = 'Next.js console, Express API,';
export const LANDING_ARCHITECTURE_HEADING_ACCENT = 'your Supabase — not ours.';

export const LANDING_ARCHITECTURE_LEAD =
  'The browser calls same-origin /api/*; Next rewrites to Express on port 3080. Express holds the service role key and Anthropic key. You run the SQL migrations on your Supabase project. Two repos, one wire contract.';

export const LANDING_ARCHITECTURE_CARD_TITLE = 'Clone both repos, run SQL, start two terminals';

export const LANDING_CLI_SNIPPET = `# terminal 1 — Express (port 3080)
git clone ${GITHUB_API_URL}.git
cd my-nonprofit-express-server
cp .env.example .env   # SUPABASE_* + optional ANTHROPIC_*
npm install && npm run dev

# terminal 2 — Console (port 3081)
git clone ${GITHUB_WEB_URL}.git
cd my-nonprofit-console
npm install && npm run dev

# open http://localhost:3081`;

export const LANDING_OPEN_SOURCE_HEADING = 'MIT license.';
export const LANDING_OPEN_SOURCE_HEADING_ACCENT = 'Fork it, self-host it, strip what you do not need.';

export const LANDING_OPEN_SOURCE_LEAD =
  'No database credentials in the browser bundle. Optional FORMATION_API_SECRET when you expose Express beyond localhost. Governance and threat model in SECURITY.md — read it before you deploy.';

export const LANDING_REPOS = [
  {
    tag: 'web',
    name: 'my-nonprofit-console',
    body: 'Next.js wizard, Redux, getting-started flow, /docs/api reference. Rewrites to Express.',
    href: GITHUB_WEB_URL,
  },
  {
    tag: 'api',
    name: 'my-nonprofit-express-server',
    body: 'Express /api/formation-* routes, Supabase CRUD, Anthropic document generation, GET /api-docs.json.',
    href: GITHUB_API_URL,
  },
] as const;

export const LANDING_FINAL_CTA_KICKER = 'Get started';

export const LANDING_FINAL_CTA_HEADING = 'Run it locally.';
export const LANDING_FINAL_CTA_HEADING_ACCENT = 'Keep the records in your Supabase.';

export const LANDING_FOOTER_TAGLINE =
  'Open-source PA nonprofit formation wizard — checklist, board, AI drafts, filing tracker. Not legal advice.';

export const LANDING_DISCLAIMER =
  'Draft documents are for planning only. Have a Pennsylvania nonprofit attorney review before filing.';

# Findings

- The app is intentionally public: `app/api/page.tsx` and `app/agent/page.tsx` explicitly say there is no auth, and there is no `middleware.ts` or server-side auth layer in the repo.
- `app/api/v1/agent/query/route.ts` enforces a 4 KiB size cap only after `await request.text()`, so a chunked or missing `content-length` request can still be fully buffered before rejection.
- The same agent route uses an in-memory `Map` keyed by `x-forwarded-for` or `x-real-ip`, which is weak on multi-instance/serverless deployments and can grow with attacker-supplied unique keys.
- `next.config.mjs` ships a production CSP with `script-src 'self' 'unsafe-inline'`, which materially weakens XSS mitigation even though other headers are present.
- `public/data/responses.json` and `public/data/responses.csv` expose full row-level microdata, and `/api/v1/responses` plus `/download/responses-csv` make the same data easy to automate against.
- The published data is labeled de-identified, but the combination of role, region, work context, tools, blockers, and outlook still creates a meaningful re-identification/compliance risk for niche respondents.
- `robots.ts` explicitly allows `/api/`, which increases crawler discovery and scraping pressure on the public API surface.
- `npm audit --json` and `npm audit --omit=dev --json` both reported zero known dependency vulnerabilities at the current lockfile state.


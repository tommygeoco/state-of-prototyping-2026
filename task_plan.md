# Task Plan

## Goal
Replace the fragile client-side DOM screenshot / clipboard flow for chart sharing with stable server-generated PNG URLs, then point the chart action button at those PNGs.

## Phases
- [complete] Map existing chart anchors to social share slugs
- [complete] Add real PNG generation route(s) for social cards
- [complete] Update chart action button to open PNG URL directly
- [complete] Verify behavior in browser and note any remaining gaps

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Blank `about:blank` tab for Copy PNG | 1 | Root issue appears to be browser/client-side PNG generation flow, so switching to server PNG route |
| `TypeError: Failed to fetch` during PNG flow | 2 | Found CSP blocked `fetch(data:image/png...)`; removed `toPng()+fetch` approach |
| `failed to pipe response` in `next/og` route | 3 | `@vercel/og` rejected mixed text/expression children in some `<div>` nodes; converted those nodes to plain strings |

## Final Decision
- Use stable server-rendered PNG routes at `/social/png/[slug]`.
- Use existing `anchorId` values as PNG slugs so client code stays simple.
- Open those PNG URLs directly from `ChartActions` instead of generating images in the browser.

